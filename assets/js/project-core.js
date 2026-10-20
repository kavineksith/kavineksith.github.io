/**
 * PROJECT CORE — shared by index.html (main.js) and every pages/*-projects.html
 * (project-catalog.js). Exposes window.ProjectCore.
 *
 *  - XSS-safe helpers (escapeHtml / sanitizeUrl)
 *  - Status model: pending | ongoing | hold | completed  (+ chip HTML)
 *  - JSON loading from a manifest (resolved relative to the manifest itself)
 *  - Language detection from each project's GitHub link
 *      1. `languages: [...]` baked into the JSON (scripts/update_languages.py)
 *      2. otherwise GitHub API  /repos/{owner}/{repo}/languages  (cached 24h)
 *      3. otherwise the human-written `lang` field as a fallback
 */
(function (window) {
  'use strict';

  // -----------------------------
  // Helpers
  // -----------------------------
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.href;
    } catch (e) { /* fall through */ }
    return '';
  }

  // -----------------------------
  // Status model
  // -----------------------------
  const STATUS_META = {
    ongoing:   { label: 'Ongoing',   icon: 'fa-solid fa-spinner',      chip: 'bg-blue-50 text-blue-700 ring-blue-200',         dot: 'bg-blue-500' },
    pending:   { label: 'Pending',   icon: 'fa-regular fa-clock',      chip: 'bg-amber-50 text-amber-700 ring-amber-200',      dot: 'bg-amber-500' },
    hold:      { label: 'On Hold',   icon: 'fa-solid fa-circle-pause', chip: 'bg-slate-100 text-slate-600 ring-slate-300',     dot: 'bg-slate-400' },
    completed: { label: 'Completed', icon: 'fa-solid fa-circle-check', chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' }
  };
  const STATUS_ORDER = ['ongoing', 'pending', 'hold', 'completed'];

  const STATUS_ALIASES = {
    ongoing: 'ongoing', inprogress: 'ongoing', active: 'ongoing', wip: 'ongoing', developing: 'ongoing',
    pending: 'pending', planned: 'pending', upcoming: 'pending', todo: 'pending', notstarted: 'pending',
    hold: 'hold', onhold: 'hold', freeze: 'hold', frozen: 'hold', paused: 'hold', freezehold: 'hold',
    completed: 'completed', complete: 'completed', done: 'completed', finished: 'completed', live: 'completed'
  };

  function normalizeStatus(raw) {
    const key = String(raw || '').toLowerCase().replace(/[^a-z]/g, '');
    return STATUS_ALIASES[key] || 'completed';
  }

  function statusChipHtml(status, extraClass) {
    const meta = STATUS_META[normalizeStatus(status)];
    return '<span class="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ring-inset ' +
      meta.chip + (extraClass ? ' ' + extraClass : '') + '">' +
      '<span class="w-1.5 h-1.5 rounded-full ' + meta.dot + '"></span>' + escapeHtml(meta.label) + '</span>';
  }

  // -----------------------------
  // Language handling
  // -----------------------------
  const LANG_CACHE_PREFIX = 'ke_lang_v1:';
  const LANG_CACHE_TTL = 24 * 60 * 60 * 1000;
  const LANG_MIN_SHARE = 0.05; // ignore languages under 5% of the repo

  function parseGithubRepo(url) {
    if (!url || typeof url !== 'string') return null;
    const m = url.match(/^https?:\/\/(?:www\.)?github\.com\/([^\/\s#?]+)\/([^\/\s#?]+)/i);
    if (!m) return null;
    return { owner: m[1], name: m[2].replace(/\.git$/i, '') };
  }

  function fallbackLanguages(lang) {
    if (!lang || /^(unspecified|n\/a|none|unknown)$/i.test(String(lang).trim())) return [];
    return String(lang).split(/[\/,&+]/).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function languagesFromBytes(obj) {
    const entries = Object.keys(obj || {}).map(function (k) { return [k, Number(obj[k]) || 0]; });
    const total = entries.reduce(function (sum, e) { return sum + e[1]; }, 0);
    if (!total) return [];
    entries.sort(function (a, b) { return b[1] - a[1]; });
    return entries
      .filter(function (e, i) { return i === 0 || e[1] / total >= LANG_MIN_SHARE; })
      .slice(0, 5)
      .map(function (e) { return e[0]; });
  }

  function readCache(key) {
    try {
      const raw = window.localStorage.getItem(LANG_CACHE_PREFIX + key);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || Date.now() - data.t > LANG_CACHE_TTL || !Array.isArray(data.l)) return null;
      return data.l;
    } catch (e) { return null; }
  }

  function writeCache(key, langs) {
    try {
      window.localStorage.setItem(LANG_CACHE_PREFIX + key, JSON.stringify({ t: Date.now(), l: langs }));
    } catch (e) { /* storage may be unavailable — ignore */ }
  }

  function fetchRepoLanguages(repo) {
    const url = 'https://api.github.com/repos/' + encodeURIComponent(repo.owner) + '/' +
      encodeURIComponent(repo.name) + '/languages';
    return window.fetch(url, { headers: { Accept: 'application/vnd.github+json' } }).then(function (res) {
      if (res.status === 403 || res.status === 429) {
        const err = new Error('GitHub API rate limit');
        err.rateLimited = true;
        throw err;
      }
      if (!res.ok) return {}; // 404 etc. — repo missing or private
      return res.json();
    });
  }

  /**
   * Detect languages from GitHub links. Calls onUpdate() (debounced) whenever
   * at least one project's `langs` changed so the caller can re-render.
   */
  function enrichLanguages(projects, onUpdate) {
    const jobs = [];
    let changedFromCache = false;

    projects.forEach(function (p) {
      if (Array.isArray(p.languages) && p.languages.length) return; // already baked into JSON
      const repo = parseGithubRepo(p.source_code);
      if (!repo) return;
      const key = repo.owner + '/' + repo.name;
      const cached = readCache(key);
      if (cached) {
        if (cached.length) { p.langs = cached; p.langSource = 'github'; changedFromCache = true; }
        return;
      }
      jobs.push({ project: p, repo: repo, key: key });
    });

    if (changedFromCache) onUpdate();
    if (!jobs.length || typeof window.fetch !== 'function') return Promise.resolve();

    let timer = null;
    function scheduleUpdate() {
      clearTimeout(timer);
      timer = setTimeout(onUpdate, 250);
    }

    let blocked = false;
    let next = 0;

    function worker() {
      if (blocked || next >= jobs.length) return Promise.resolve();
      const job = jobs[next++];
      return fetchRepoLanguages(job.repo)
        .then(function (bytes) {
          const langs = languagesFromBytes(bytes);
          writeCache(job.key, langs);
          if (langs.length) {
            job.project.langs = langs;
            job.project.langSource = 'github';
            scheduleUpdate();
          }
        })
        .catch(function (err) {
          if (err && err.rateLimited) blocked = true; // keep fallback languages
        })
        .then(worker);
    }

    return Promise.all([worker(), worker(), worker(), worker()]).then(function () {
      clearTimeout(timer);
      onUpdate();
    });
  }

  // -----------------------------
  // Data loading
  // -----------------------------
  function getJson(url) {
    return window.fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
      return res.json();
    });
  }

  function prepareProject(p, categoryLabel) {
    p.status = normalizeStatus(p.status);
    p.tags = Array.isArray(p.tags) ? p.tags : [];
    p.categoryLabel = categoryLabel || '';
    if (Array.isArray(p.languages) && p.languages.length) {
      p.langs = p.languages.slice();
      p.langSource = 'json';
    } else {
      p.langs = fallbackLanguages(p.lang);
      p.langSource = 'fallback';
    }
    return p;
  }

  /**
   * Load every category file listed in a manifest.
   * Files are resolved relative to the manifest URL, so data/ stays portable.
   * Resolves to a flat array of normalised projects. Empty category files are fine.
   */
  function loadProjects(manifestUrl) {
    const base = new URL(manifestUrl, window.location.href);
    return getJson(base.href).then(function (manifest) {
      const cats = Array.isArray(manifest.categories) ? manifest.categories : [];
      return Promise.all(cats.map(function (cat) {
        const fileUrl = new URL(cat.file, base).href;
        return getJson(fileUrl).then(function (data) {
          const label = cat.label || data.label || cat.id;
          return (Array.isArray(data.projects) ? data.projects : []).map(function (p) {
            if (!p.category) p.category = cat.id || data.category;
            return prepareProject(p, label);
          });
        });
      })).then(function (lists) {
        return [].concat.apply([], lists);
      });
    });
  }

  window.ProjectCore = {
    escapeHtml: escapeHtml,
    sanitizeUrl: sanitizeUrl,
    STATUS_META: STATUS_META,
    STATUS_ORDER: STATUS_ORDER,
    normalizeStatus: normalizeStatus,
    statusChipHtml: statusChipHtml,
    parseGithubRepo: parseGithubRepo,
    languagesFromBytes: languagesFromBytes,
    enrichLanguages: enrichLanguages,
    loadProjects: loadProjects
  };
})(window);
