/**
 * GENERIC PROJECT CATALOG — search, filter, and safe rendering.
 * Reusable across the three project divisions (CLI, Web, GitHub).
 * Configure per-page via window.CATALOG_CONFIG before this file loads:
 *   {
 *     manifestUrl: 'data/<division>/manifest.json',
 *     categoryLabels: { catId: 'Label', ... },   // optional override
 *     categoryIcons:  { catId: 'fa-solid fa-x' }, // optional
 *     defaultIcon: 'fa-solid fa-diagram-project'
 *   }
 */
$(function () {
  'use strict';

  const CONFIG = window.CATALOG_CONFIG || {};
  const MANIFEST_URL = CONFIG.manifestUrl;
  const CATEGORY_LABELS = CONFIG.categoryLabels || {};
  const CATEGORY_ICONS = CONFIG.categoryIcons || {};
  const DEFAULT_ICON = CONFIG.defaultIcon || 'fa-solid fa-diagram-project';

  const SEARCH_MAX_LEN = 80;
  const SEARCH_SAFE_PATTERN = /^[a-zA-Z0-9\s\-_.+#/]*$/;

  let allProjects = [];
  let filtered = [];

  const $grid = $('#projectsGrid');
  const $empty = $('#emptyState');
  const $loadError = $('#loadError');
  const $count = $('#resultsCount');
  const $search = $('#searchInput');
  const $searchError = $('#searchError');
  const $categoryFilter = $('#categoryFilter');
  const $langFilter = $('#langFilter');
  const $linkFilter = $('#linkFilter');

  // -----------------------------
  // XSS-safe helpers
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
    } catch (e) {
      return '';
    }
    return '';
  }

  function validateSearchInput(raw) {
    let value = String(raw || '');
    value = value.slice(0, SEARCH_MAX_LEN);
    value = value.replace(/[<>]/g, '');
    if (value.length > 0 && !SEARCH_SAFE_PATTERN.test(value)) {
      return { value: value.replace(/[^a-zA-Z0-9\s\-_.+#/]/g, ''), warned: true };
    }
    return { value: value, warned: false };
  }

  // -----------------------------
  // DATA LOADING
  // -----------------------------
  function loadData() {
    // Resolve each category file relative to the manifest's own location,
    // not the page's location — this keeps data/* portable no matter how
    // deep the calling page is nested (e.g. /pages/cli-projects.html).
    const manifestDir = MANIFEST_URL.substring(0, MANIFEST_URL.lastIndexOf('/') + 1);

    return $.getJSON(MANIFEST_URL).then(function (manifest) {
      const requests = manifest.categories.map(function (cat) {
        const fileUrl = /^https?:\/\//i.test(cat.file) || cat.file.indexOf('/') === 0
          ? cat.file
          : manifestDir + cat.file;
        return $.getJSON(fileUrl).then(function (data) {
          return data.projects || [];
        });
      });
      return $.when.apply($, requests).then(function () {
        const results = requests.length === 1 ? [arguments[0]] : Array.prototype.slice.call(arguments);
        let combined = [];
        results.forEach(function (r) {
          const list = Array.isArray(r) ? r : r[0];
          combined = combined.concat(list);
        });
        return combined;
      });
    });
  }

  function labelizeCategory(cat) {
    if (CATEGORY_LABELS[cat]) return CATEGORY_LABELS[cat];
    return cat ? cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ') : 'Other';
  }

  function populateFilterOptions(projects) {
    const categories = {};
    const langs = new Set();
    projects.forEach(function (p) {
      categories[p.category] = categories[p.category] || labelizeCategory(p.category);
      if (p.lang) langs.add(p.lang);
    });
    Object.keys(categories).sort().forEach(function (key) {
      $categoryFilter.append($('<option>').val(key).text(categories[key]));
    });
    Array.from(langs).sort().forEach(function (lang) {
      $langFilter.append($('<option>').val(lang).text(lang));
    });
  }

  // -----------------------------
  // RENDERING (always escaped)
  // -----------------------------
  function renderCard(project) {
    const title = escapeHtml(project.title);
    const desc = escapeHtml(project.description);
    const lang = escapeHtml(project.lang);
    const categoryLabel = escapeHtml(labelizeCategory(project.category));
    const icon = CATEGORY_ICONS[project.category] || DEFAULT_ICON;
    const tags = Array.isArray(project.tags) ? project.tags.slice(0, 4) : [];

    const tagsHtml = tags
      .map(function (t) {
        return '<span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">' + escapeHtml(t) + '</span>';
      })
      .join('');

    const sourceUrl = sanitizeUrl(project.source_code);
    const previewUrl = sanitizeUrl(project.live_preview);

    let actionsHtml = '';
    if (previewUrl) {
      actionsHtml += '<a href="' + previewUrl + '" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"><i class="fa-solid fa-eye mr-1.5"></i>Live Preview</a>';
    }
    if (sourceUrl) {
      actionsHtml += '<a href="' + sourceUrl + '" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:border-brand-400 hover:text-brand-600 transition-colors"><i class="fa-brands fa-github mr-1.5"></i>Source Code</a>';
    }
    if (!actionsHtml) {
      actionsHtml = '<span class="flex-1 text-center px-4 py-2.5 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold">Not publicly available</span>';
    }

    return (
      '<div class="glass-panel rounded-3xl p-6 flex flex-col justify-between border border-white/60 hover:border-brand-300/60 transition-all duration-300 hover:-translate-y-1 project-card">' +
        '<div>' +
          '<div class="flex items-center justify-between mb-4">' +
            '<div class="w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600"><i class="' + icon + '"></i></div>' +
            '<span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">' + categoryLabel + '</span>' +
          '</div>' +
          '<h3 class="text-lg font-serif font-bold text-slate-900 mb-2">' + title + '</h3>' +
          '<p class="text-slate-500 text-sm leading-relaxed mb-4">' + desc + '</p>' +
          '<div class="flex flex-wrap gap-2 mb-2">' + tagsHtml + '</div>' +
          '<p class="text-xs text-slate-400 mb-4"><i class="fa-solid fa-code mr-1"></i>' + lang + '</p>' +
        '</div>' +
        '<div class="flex gap-2 pt-2 border-t border-slate-100">' + actionsHtml + '</div>' +
      '</div>'
    );
  }

  function render() {
    if (filtered.length === 0) {
      $grid.empty();
      $empty.removeClass('hidden');
    } else {
      $empty.addClass('hidden');
      $grid.html(filtered.map(renderCard).join(''));
    }
    $count.text(filtered.length + (filtered.length === 1 ? ' project found' : ' projects found'));
  }

  // -----------------------------
  // FILTER / SEARCH LOGIC
  // -----------------------------
  function applyFilters() {
    const rawQuery = $search.val();
    const result = validateSearchInput(rawQuery);
    const query = result.value;
    if (result.warned) {
      $searchError.text('Only letters, numbers, and basic punctuation are allowed.').removeClass('hidden');
    } else {
      $searchError.addClass('hidden').text('');
    }
    if (query !== rawQuery) {
      $search.val(query);
    }

    const category = $categoryFilter.val();
    const lang = $langFilter.val();
    const linkAvailability = $linkFilter.val();
    const q = query.trim().toLowerCase();

    filtered = allProjects.filter(function (p) {
      if (category !== 'all' && p.category !== category) return false;
      if (lang !== 'all' && p.lang !== lang) return false;
      if (linkAvailability === 'preview' && !p.live_preview) return false;
      if (linkAvailability === 'source' && !p.source_code) return false;

      if (q) {
        const haystack = [
          p.title,
          p.description,
          p.lang,
          p.category,
          Array.isArray(p.tags) ? p.tags.join(' ') : ''
        ].join(' ').toLowerCase();
        if (haystack.indexOf(q) === -1) return false;
      }
      return true;
    });

    render();
  }

  // -----------------------------
  // INIT
  // -----------------------------
  if (!MANIFEST_URL) {
    console.error('CATALOG_CONFIG.manifestUrl is required');
    return;
  }

  loadData()
    .then(function (projects) {
      allProjects = projects;
      filtered = projects.slice();
      populateFilterOptions(projects);
      render();
    })
    .catch(function () {
      $grid.empty();
      $count.text('');
      $loadError.removeClass('hidden');
    });

  $search.on('input', applyFilters);
  $categoryFilter.on('change', applyFilters);
  $langFilter.on('change', applyFilters);
  $linkFilter.on('change', applyFilters);
  $('#resetFilters').on('click', function () {
    $search.val('');
    $searchError.addClass('hidden');
    $categoryFilter.val('all');
    $langFilter.val('all');
    $linkFilter.val('all');
    applyFilters();
  });

  // -----------------------------
  // NAV (shared behaviour with main site)
  // -----------------------------
  $('#navToggle').on('click', function () {
    $('#mobileMenu').toggleClass('hidden');
  });
  $('#currentYear').text(new Date().getFullYear());
});
