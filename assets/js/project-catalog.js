/**
 * GENERIC PROJECT CATALOG — search, filter (category / status / language /
 * links) and safe rendering. Requires project-core.js (window.ProjectCore).
 *
 * Configure per page via window.CATALOG_CONFIG before this file loads:
 *   {
 *     manifestUrl: '../data/<division>/manifest.json',
 *     categoryLabels: { catId: 'Label' },        // optional (manifest labels are used otherwise)
 *     categoryIcons:  { catId: 'fa-solid fa-x' }, // optional
 *     defaultIcon: 'fa-solid fa-diagram-project'
 *   }
 *
 * Optional per-project fields (see README): status, languages, icon, year,
 * role, stack[], highlights[].
 */
$(function () {
  'use strict';

  const Core = window.ProjectCore;
  const CONFIG = window.CATALOG_CONFIG || {};
  const MANIFEST_URL = CONFIG.manifestUrl;
  const CATEGORY_LABELS = CONFIG.categoryLabels || {};
  const CATEGORY_ICONS = CONFIG.categoryIcons || {};
  const DEFAULT_ICON = CONFIG.defaultIcon || 'fa-solid fa-diagram-project';

  const SEARCH_MAX_LEN = 80;
  const SEARCH_SAFE_PATTERN = /^[a-zA-Z0-9\s\-_.+#/]*$/;

  const escapeHtml = Core.escapeHtml;
  const sanitizeUrl = Core.sanitizeUrl;

  let allProjects = [];
  let filtered = [];
  let activeStatus = 'all';

  const $grid = $('#projectsGrid');
  const $empty = $('#emptyState');
  const $loadError = $('#loadError');
  const $count = $('#resultsCount');
  const $search = $('#searchInput');
  const $searchError = $('#searchError');
  const $categoryFilter = $('#categoryFilter');
  const $langFilter = $('#langFilter');
  const $linkFilter = $('#linkFilter');
  const $statusChips = $('#statusChips');

  function validateSearchInput(raw) {
    let value = String(raw || '');
    value = value.slice(0, SEARCH_MAX_LEN);
    value = value.replace(/[<>]/g, '');
    if (value.length > 0 && !SEARCH_SAFE_PATTERN.test(value)) {
      return { value: value.replace(/[^a-zA-Z0-9\s\-_.+#/]/g, ''), warned: true };
    }
    return { value: value, warned: false };
  }

  function labelizeCategory(project) {
    if (CATEGORY_LABELS[project.category]) return CATEGORY_LABELS[project.category];
    if (project.categoryLabel) return project.categoryLabel;
    const cat = project.category;
    return cat ? cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ') : 'Other';
  }

  // -----------------------------
  // FILTER CONTROLS
  // -----------------------------
  function populateCategoryOptions(projects) {
    const seen = {};
    projects.forEach(function (p) { seen[p.category] = labelizeCategory(p); });
    Object.keys(seen).sort().forEach(function (key) {
      $categoryFilter.append($('<option>').val(key).text(seen[key]));
    });
  }

  // Rebuilt every time language detection updates, keeping the current choice.
  function populateLanguageOptions() {
    const previous = $langFilter.val() || 'all';
    const langs = new Set();
    allProjects.forEach(function (p) { p.langs.forEach(function (l) { langs.add(l); }); });
    const sorted = Array.from(langs).sort(function (a, b) { return a.localeCompare(b); });

    $langFilter.empty().append($('<option>').val('all').text('All Languages'));
    sorted.forEach(function (lang) {
      $langFilter.append($('<option>').val(lang).text(lang));
    });
    $langFilter.val(sorted.indexOf(previous) !== -1 ? previous : 'all');
  }

  function renderStatusChips() {
    if (!$statusChips.length) return;
    const counts = { all: allProjects.length };
    Core.STATUS_ORDER.forEach(function (s) { counts[s] = 0; });
    allProjects.forEach(function (p) { counts[p.status] += 1; });

    const items = [{ key: 'all', label: 'All', dot: '' }].concat(
      Core.STATUS_ORDER.map(function (s) {
        return { key: s, label: Core.STATUS_META[s].label, dot: Core.STATUS_META[s].dot };
      })
    );

    $statusChips.html(items.map(function (item) {
      const active = item.key === activeStatus;
      const empty = item.key !== 'all' && counts[item.key] === 0;
      const base = 'status-filter inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ';
      const state = active
        ? 'bg-slate-900 text-white border-slate-900'
        : (empty
          ? 'bg-white/50 text-slate-300 border-slate-200 cursor-not-allowed'
          : 'bg-white/70 text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600');
      return '<button type="button" data-status="' + escapeHtml(item.key) + '" class="' + base + state + '"' +
        (empty && !active ? ' disabled' : '') + ' aria-pressed="' + active + '">' +
        (item.dot ? '<span class="w-2 h-2 rounded-full ' + item.dot + '"></span>' : '') +
        escapeHtml(item.label) +
        '<span class="' + (active ? 'text-white/70' : 'text-slate-400') + '">' + counts[item.key] + '</span>' +
        '</button>';
    }).join(''));
  }

  // -----------------------------
  // RENDERING (always escaped)
  // -----------------------------
  function renderCard(project) {
    const title = escapeHtml(project.title);
    const desc = escapeHtml(project.description);
    const categoryLabel = escapeHtml(labelizeCategory(project));
    const icon = escapeHtml(project.icon || CATEGORY_ICONS[project.category] || DEFAULT_ICON);

    const tagsHtml = project.tags.slice(0, 4).map(function (t) {
      return '<span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">' + escapeHtml(t) + '</span>';
    }).join('');

    const stackHtml = (Array.isArray(project.stack) ? project.stack : []).slice(0, 6).map(function (t) {
      return '<span class="px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-[11px] font-medium">' + escapeHtml(t) + '</span>';
    }).join('');

    const highlightsHtml = (Array.isArray(project.highlights) ? project.highlights : []).slice(0, 3).map(function (h) {
      return '<li class="flex gap-2"><i class="fa-solid fa-check text-emerald-500 mt-0.5 text-[10px]"></i><span>' + escapeHtml(h) + '</span></li>';
    }).join('');

    const metaParts = [];
    if (project.year) metaParts.push('<i class="fa-regular fa-calendar mr-1"></i>' + escapeHtml(project.year));
    if (project.role) metaParts.push('<i class="fa-regular fa-user mr-1"></i>' + escapeHtml(project.role));
    const metaHtml = metaParts.length
      ? '<p class="text-xs text-slate-500 mb-3 flex flex-wrap gap-x-4 gap-y-1">' + metaParts.map(function (m) { return '<span>' + m + '</span>'; }).join('') + '</p>'
      : '';

    const shownLangs = project.langs.slice(0, 3);
    const extraLangs = project.langs.length - shownLangs.length;
    const langHtml = shownLangs.length
      ? '<i class="fa-solid fa-code text-slate-400 text-xs"></i>' +
        shownLangs.map(function (l) {
          return '<span class="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium">' + escapeHtml(l) + '</span>';
        }).join('') +
        (extraLangs > 0 ? '<span class="text-[11px] text-slate-400">+' + extraLangs + '</span>' : '')
      : '<span class="text-[11px] text-slate-400"><i class="fa-solid fa-code mr-1"></i>Language not specified</span>';

    const sourceUrl = sanitizeUrl(project.source_code);
    const previewUrl = sanitizeUrl(project.live_preview);

    let actionsHtml = '';
    const btn = 'flex-1 inline-flex items-center justify-center whitespace-nowrap px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ';
    if (previewUrl) {
      actionsHtml += '<a href="' + previewUrl + '" target="_blank" rel="noopener noreferrer" class="' + btn + 'bg-brand-600 text-white hover:bg-brand-700"><i class="fa-solid fa-eye mr-1.5"></i>Live Preview</a>';
    }
    if (sourceUrl) {
      actionsHtml += '<a href="' + sourceUrl + '" target="_blank" rel="noopener noreferrer" class="' + btn + 'border border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-600"><i class="fa-brands fa-github mr-1.5"></i>Source Code</a>';
    }
    if (!actionsHtml) {
      actionsHtml = '<span class="' + btn + 'bg-slate-50 text-slate-400"><i class="fa-solid fa-lock mr-1.5"></i>Not publicly available</span>';
    }

    return (
      '<article class="glass-panel project-card rounded-3xl p-6 h-full flex flex-col border border-white/60 hover:border-brand-300/60 transition-all duration-300 hover:-translate-y-1">' +
        '<div class="flex items-start justify-between gap-3 mb-4">' +
          '<div class="w-11 h-11 shrink-0 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600"><i class="' + icon + '"></i></div>' +
          '<div class="flex flex-wrap justify-end gap-2">' +
            Core.statusChipHtml(project.status) +
            '<span class="inline-flex items-center whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">' + categoryLabel + '</span>' +
          '</div>' +
        '</div>' +
        '<h3 class="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug line-clamp-2 min-h-[3.1rem]" title="' + title + '">' + title + '</h3>' +
        '<p class="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[3.9rem]" title="' + desc + '">' + desc + '</p>' +
        metaHtml +
        (highlightsHtml ? '<ul class="text-xs text-slate-600 space-y-1.5 mb-4">' + highlightsHtml + '</ul>' : '') +
        (stackHtml ? '<div class="flex flex-wrap gap-2 mb-3">' + stackHtml + '</div>' : '') +
        '<div class="flex flex-wrap gap-2 mb-4 min-h-[1.75rem]">' + tagsHtml + '</div>' +
        '<div class="mt-auto">' +
          '<div class="flex flex-wrap items-center gap-1.5 mb-4 min-h-[1.5rem]">' + langHtml + '</div>' +
          '<div class="flex gap-2 pt-4 border-t border-slate-100">' + actionsHtml + '</div>' +
        '</div>' +
      '</article>'
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
    renderStatusChips();
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
    if (query !== rawQuery) $search.val(query);

    const category = $categoryFilter.val();
    const lang = $langFilter.val();
    const linkAvailability = $linkFilter.val();
    const q = query.trim().toLowerCase();

    filtered = allProjects.filter(function (p) {
      if (category !== 'all' && p.category !== category) return false;
      if (activeStatus !== 'all' && p.status !== activeStatus) return false;
      if (lang !== 'all' && p.langs.indexOf(lang) === -1) return false;
      if (linkAvailability === 'preview' && !p.live_preview) return false;
      if (linkAvailability === 'source' && !p.source_code) return false;

      if (q) {
        const haystack = [
          p.title, p.description, p.lang, p.langs.join(' '), p.category, p.categoryLabel,
          Core.STATUS_META[p.status].label, p.tags.join(' '),
          Array.isArray(p.stack) ? p.stack.join(' ') : ''
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

  Core.loadProjects(MANIFEST_URL)
    .then(function (projects) {
      allProjects = projects;
      populateCategoryOptions(projects);
      populateLanguageOptions();
      applyFilters();

      // Languages are read from each project's GitHub link; re-render as they arrive.
      Core.enrichLanguages(allProjects, function () {
        populateLanguageOptions();
        applyFilters();
      });
    })
    .catch(function () {
      $grid.empty();
      $count.text('');
      $statusChips.empty();
      $loadError.removeClass('hidden');
    });

  $search.on('input', applyFilters);
  $categoryFilter.on('change', applyFilters);
  $langFilter.on('change', applyFilters);
  $linkFilter.on('change', applyFilters);
  $statusChips.on('click', '.status-filter', function () {
    activeStatus = $(this).attr('data-status') || 'all';
    applyFilters();
  });
  $('#resetFilters').on('click', function () {
    $search.val('');
    $searchError.addClass('hidden');
    $categoryFilter.val('all');
    $langFilter.val('all');
    $linkFilter.val('all');
    activeStatus = 'all';
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
