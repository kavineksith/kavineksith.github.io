/**
 * KAVIN EKSITH — PORTFOLIO MAIN JS (jQuery + Canvas background)
 */
$(function () {
  'use strict';

  // ===================
  // CONFIGURATION DATA
  // ===================
  const siteData = {
    company: {
      name: "Kavin Eksith | Portfolio",
      person: "Kavin Eksith",
      since: "May 2025"
    }
  };

  const GRADIENTS = [
    "from-brand-400/70 via-brand-500/50 to-brand-600/30",
    "from-blue-500/70 via-indigo-500/50 to-indigo-600/30",
    "from-rose-500/70 via-pink-500/50 to-pink-600/30",
    "from-emerald-500/70 via-teal-500/50 to-teal-600/30",
    "from-amber-400/70 via-orange-500/50 to-orange-600/30",
    "from-violet-500/70 via-purple-500/50 to-purple-600/30",
    "from-cyan-500/70 via-blue-500/50 to-blue-600/30",
    "from-lime-400/70 via-green-500/50 to-green-600/30",
    "from-fuchsia-500/70 via-purple-500/50 to-purple-600/30",
    "from-sky-400/70 via-blue-400/50 to-blue-500/30"
  ];

  // ==========================================
  // DYNAMIC COMPONENT RENDERING
  // ==========================================

  // ----------------------------------------------------------------
  // PROJECTS — read from data/web/*.json (same source as the catalog pages)
  // Shows HOME_PAGE_SIZE projects at a time ("Show more" reveals the rest); status chips count and filter ALL divisions.
  // ----------------------------------------------------------------
  const Core = window.ProjectCore;
  const escapeHtml = Core.escapeHtml;
  const sanitizeUrl = function (u) { return Core.sanitizeUrl(u) || '#'; };

  // Every division feeds the homepage chips & grid. Remove a line to hide a division.
  const HOME_MANIFESTS = [
    'data/web/manifest.json',
    'data/cli/manifest.json',
    'data/github/manifest.json',
    'data/portfolio/manifest.json'
  ];
  const HOME_PAGE_SIZE = 6; // cards shown first, and added per "Show more" click
  // Lower number = shown first on the homepage (unlisted categories go last)
  const CATEGORY_PRIORITY = { 'real-world': 0, personal: 1, templates: 2, dummy: 3 };
  const CATEGORY_ICONS = {
    'real-world': 'fa-solid fa-briefcase',
    personal: 'fa-solid fa-user-gear',
    templates: 'fa-solid fa-id-card',
    dummy: 'fa-solid fa-flask',
    networking: 'fa-solid fa-network-wired',
    sysadmin: 'fa-solid fa-server',
    privacy: 'fa-solid fa-user-shield',
    'task-management': 'fa-solid fa-list-check',
    'it-support': 'fa-solid fa-toolbox',
    'java-spring': 'fa-solid fa-leaf',
    'testing-qa': 'fa-solid fa-vial',
    'static-site': 'fa-solid fa-file-code',
    misc: 'fa-solid fa-code-branch',
    portfolio: 'fa-solid fa-star'
  };

  const $projectsGrid = $('#projects-grid');
  const $statusFilters = $('#home-status-filters');
  const $projectsEmpty = $('#home-projects-empty');
  const $projectsError = $('#home-projects-error');

  let homeProjects = [];
  let homeStatus = 'all';
  let homeShown = HOME_PAGE_SIZE;
  const $projectsMore = $('#home-projects-more');
  const $projectsCount = $('#home-projects-count');
  const $moreBtn = $('#home-projects-toggle');

  function getProjectHtml(project, index) {
    const gradient = GRADIENTS[index % GRADIENTS.length];
    const url = sanitizeUrl(project.live_preview || project.source_code);
    const icon = escapeHtml(project.icon || CATEGORY_ICONS[project.category] || 'fa-solid fa-diagram-project');
    const category = escapeHtml(project.categoryLabel);
    const title = escapeHtml(project.title);
    const description = escapeHtml(project.description);
    const langs = project.langs.slice(0, 3).map(escapeHtml).join(' · ');
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer block border border-white/60 hover:border-brand-400/60 transition-all duration-500 bg-gradient-to-br ${gradient} backdrop-blur-xl project-card-link shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.3)]">
        <!-- Glossy glass sheen -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent pointer-events-none"></div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-9xl text-white/50 group-hover:scale-110 group-hover:text-white/70 transition-all duration-700 drop-shadow-sm">
            <i class="${icon}"></i>
          </div>
        </div>
        <!-- Status chip -->
        <div class="absolute top-4 left-4 z-10">
          ${Core.statusChipHtml(project.status, 'bg-white/90 backdrop-blur-sm shadow-sm')}
        </div>
        <div class="absolute top-0 right-0 p-8">
          <div class="w-12 h-1 bg-white/60 rounded-full group-hover:bg-white/90 transition-colors"></div>
        </div>
        <!-- Frosted glass text panel -->
        <!-- Fixed height: the panel's top edge lines up on every card, whatever the title/description length -->
        <div class="absolute bottom-0 left-0 right-0 h-[8.5rem] p-6 flex flex-col overflow-hidden bg-white/70 backdrop-blur-md border-t border-white/60 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span class="shrink-0 text-brand-700 text-xs font-semibold tracking-widest uppercase mb-1 block truncate">${category}${langs ? ' &middot; ' + langs : ''}</span>
          <h3 class="shrink-0 text-lg md:text-xl font-serif font-bold text-slate-900 mb-1 leading-tight line-clamp-2" title="${title}">${title}</h3>
          <div class="min-h-0 flex-1 overflow-hidden">
            <p class="text-slate-600 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              ${description}
            </p>
          </div>
        </div>
      </a>
    `;
  }

  function renderHomeStatusChips() {
    const counts = { all: homeProjects.length };
    Core.STATUS_ORDER.forEach(function (s) { counts[s] = 0; });
    homeProjects.forEach(function (p) { counts[p.status] += 1; });

    const items = [{ key: 'all', label: 'All', dot: '' }].concat(
      Core.STATUS_ORDER.map(function (s) {
        return { key: s, label: Core.STATUS_META[s].label, dot: Core.STATUS_META[s].dot };
      })
    );

    $statusFilters.html(items.map(function (item) {
      const active = item.key === homeStatus;
      const empty = item.key !== 'all' && counts[item.key] === 0;
      const state = active
        ? 'bg-slate-900 text-white border-slate-900'
        : (empty
          ? 'bg-white/50 text-slate-300 border-slate-200 cursor-not-allowed'
          : 'bg-white/70 text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600');
      return '<button type="button" data-status="' + escapeHtml(item.key) + '" aria-pressed="' + active + '"' +
        (empty && !active ? ' disabled' : '') +
        ' class="home-status-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ' + state + '">' +
        (item.dot ? '<span class="w-2 h-2 rounded-full ' + item.dot + '"></span>' : '') +
        escapeHtml(item.label) +
        '<span class="' + (active ? 'text-white/70' : 'text-slate-400') + '">' + counts[item.key] + '</span></button>';
    }).join(''));
  }

  function renderHomeProjects() {
    const matches = homeProjects.filter(function (p) {
      return homeStatus === 'all' || p.status === homeStatus;
    });
    const visible = matches.slice(0, homeShown);
    const remaining = matches.length - visible.length;
    $projectsGrid.html(visible.map(getProjectHtml).join(''));
    $projectsEmpty.toggleClass('hidden', matches.length > 0);

    // "Showing x of y" + Show more / Show less (hidden when everything fits)
    $projectsMore.toggleClass('hidden', matches.length <= HOME_PAGE_SIZE);
    $projectsCount.text('Showing ' + visible.length + ' of ' + matches.length + ' project' + (matches.length === 1 ? '' : 's'));
    $moreBtn.html(remaining > 0
      ? 'Show ' + Math.min(HOME_PAGE_SIZE, remaining) + ' more <i class="fa-solid fa-chevron-down text-xs"></i>'
      : 'Show less <i class="fa-solid fa-chevron-up text-xs"></i>');
    $moreBtn.attr('data-mode', remaining > 0 ? 'more' : 'less');
    renderHomeStatusChips();
  }

  Promise.all(HOME_MANIFESTS.map(function (url) {
    return Core.loadProjects(url).catch(function (err) {
      console.error('Could not load ' + url, err);
      return null;
    });
  }))
    .then(function (lists) {
      const loaded = lists.filter(Boolean);
      if (!loaded.length) throw new Error('No project manifest could be loaded');
      return [].concat.apply([], loaded);
    })
    .then(function (projects) {
      // featured first, then by category priority, then original JSON order
      homeProjects = projects
        .map(function (p, i) { return { p: p, i: i }; })
        .sort(function (a, b) {
          const fa = a.p.featured ? 0 : 1, fb = b.p.featured ? 0 : 1;
          if (fa !== fb) return fa - fb;
          const ca = CATEGORY_PRIORITY[a.p.category], cb = CATEGORY_PRIORITY[b.p.category];
          const pa = ca === undefined ? 99 : ca, pb = cb === undefined ? 99 : cb;
          return pa !== pb ? pa - pb : a.i - b.i;
        })
        .map(function (x) { return x.p; });
      renderHomeProjects();

      // Detect languages from each GitHub link and refresh the visible cards
      Core.enrichLanguages(homeProjects.slice(0, 24), renderHomeProjects);
    })
    .catch(function () {
      $projectsGrid.empty();
      $statusFilters.empty();
      $projectsError.removeClass('hidden');
    });

  $statusFilters.on('click', '.home-status-chip', function () {
    homeStatus = $(this).attr('data-status') || 'all';
    homeShown = HOME_PAGE_SIZE;
    renderHomeProjects();
  });

  $moreBtn.on('click', function () {
    if ($(this).attr('data-mode') === 'more') {
      homeShown += HOME_PAGE_SIZE;
      renderHomeProjects();
    } else {
      homeShown = HOME_PAGE_SIZE;
      renderHomeProjects();
      const section = document.getElementById('projects');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Render "Let's Connect" social grid from data/site/socials.json
  // (the footer reads the same file — see assets/js/footer.js)
  const $connectSocialsGrid = $('#connect-socials-grid');
  window.fetch('data/site/socials.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      (Array.isArray(data.socials) ? data.socials : []).forEach(function (social) {
        const cardHtml = `
      <a href="${sanitizeUrl(social.url)}" target="_blank" rel="noopener noreferrer"
        class="glass-panel rounded-2xl p-6 flex flex-col items-center text-center gap-4 border-t border-brand-500/20 hover:border-brand-500/50 hover:-translate-y-1 transition-all duration-300 group">
        <div class="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 text-2xl group-hover:scale-110 group-hover:bg-brand-100 transition-all duration-500">
          <i class="${escapeHtml(social.icon)}"></i>
        </div>
        <span class="text-slate-900 font-medium text-sm tracking-wide">${escapeHtml(social.platform)}</span>
      </a>
    `;
        $connectSocialsGrid.append(cardHtml);
      });
    })
    .catch(function (err) { console.error('Could not load socials:', err); });


  // ==========================================
  // NAVIGATION & MENU INTERACTION
  // ==========================================

  // Mobile nav toggles
  $('#navToggle').on('click', function () {
    $('#mobileMenu').slideToggle(200);
    $(this).find('i').toggleClass('fa-bars fa-xmark');
  });

  $('.mobile-link').on('click', function () {
    $('#mobileMenu').slideUp(200);
    $('#navToggle').find('i').removeClass('fa-xmark').addClass('fa-bars');
  });

  // Scrollspy & Navbar styling toggles
  const sections = $('section[id]');
  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop();

    // Header shadow background threshold
    if (scrollPos > 50) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }

    // Scroll-to-top button threshold
    if (scrollPos > 300) {
      $('#scrollToTop').removeClass('hidden').addClass('show').css('opacity', '1');
    } else {
      $('#scrollToTop').css('opacity', '0').removeClass('show');
    }

    // Active Section highlight logic
    const lookAheadPos = scrollPos + 120;
    sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');
      if (lookAheadPos >= top && lookAheadPos < bottom) {
        $('header nav a').removeClass('active');
        $('header nav a[href="#' + id + '"]').addClass('active');
      }
    });
  });

  // Smooth scroll back-to-top handler
  $('#scrollToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });


  // ==========================================
  // INTERSECTION OBSERVER SCROLL REVEALS
  // ==========================================
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    $('.reveal').addClass('is-visible');
  }


  // NOTE: The old "View All Projects" popup modal has been removed.
  // "View All Projects" and the projects-section CTA now redirect to the
  // dedicated cli-projects.html multi-page application (plain <a> links),
  // so no JS handler is needed here anymore.


  // ==========================================
  // CUSTOM INTEGRATION TOAST NOTIFICATIONS
  // ==========================================
  const $toastNotification = $('#toastNotification');
  const $toastIcon = $('#toastIcon');
  const $toastMessage = $('#toastMessage');
  let toastTimer;

  function showToast(type, message) {
    clearTimeout(toastTimer);
    $toastNotification.removeClass('hidden border-green-500/30 text-green-200 shadow-green-900/20 bg-green-950/90 border-red-500/30 text-red-200 shadow-red-900/20 bg-red-950/90');

    if (type === 'success') {
      $toastNotification.addClass('bg-green-950/90 border-green-500/30 text-green-200 shadow-green-900/20');
      $toastIcon.html('<i class="fa-solid fa-circle-check text-green-400 text-xl"></i>');
    } else {
      $toastNotification.addClass('bg-red-950/90 border-red-500/30 text-red-200 shadow-red-900/20');
      $toastIcon.html('<i class="fa-solid fa-circle-xmark text-red-400 text-xl"></i>');
    }

    $toastMessage.text(message);
    $toastNotification.removeClass('hidden');
    setTimeout(() => {
      $toastNotification.addClass('show').css('opacity', '1');
    }, 50);

    toastTimer = setTimeout(hideToast, 5000);
  }

  function hideToast() {
    $toastNotification.removeClass('show').css('opacity', '0');
    setTimeout(() => {
      $toastNotification.addClass('hidden');
    }, 300);
  }

  $('#closeToast').on('click', hideToast);


  // ==========================================
  // DATA-DRIVEN SECTIONS: SKILLS, TECHNOLOGIES & CREDENTIALS
  // Content lives in data/site/skills.json, technologies.json and credentials.json
  // ==========================================
  const TAB_ACTIVE = 'active bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-md';
  const TAB_IDLE = 'text-slate-500 hover:text-slate-900';

  function loadSiteJson(path) {
    return window.fetch(path).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + path);
      return res.json();
    });
  }

  // Only allow safe slug characters in ids / data attributes / icon names
  function slug(value) {
    return String(value == null ? '' : value).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function showSectionError($target, message) {
    $target.empty().append(
      $('<p class="col-span-full text-center text-slate-400 text-sm" role="alert"></p>').text(message)
    );
  }

  // ---- Technologies grid ----
  function renderTechnologies(data) {
    const $grid = $('#tech-grid');
    const groups = Array.isArray(data && data.groups) ? data.groups : [];
    const html = [];
    groups.forEach(function (group) {
      (Array.isArray(group.items) ? group.items : []).forEach(function (item) {
        const icon = slug(item.icon);
        if (!item.name || !icon) return;
        html.push(
          '<div title="' + escapeHtml(item.name) + '" class="tech-card" data-group="' + escapeHtml(slug(group.id || group.label)) + '">' +
            '<img src="https://skillicons.dev/icons?i=' + encodeURIComponent(icon) + '" alt="' + escapeHtml(item.name) + '" class="w-12 h-12" loading="lazy" />' +
          '</div>'
        );
      });
    });
    if (!html.length) { showSectionError($grid, 'No technologies to show yet.'); return; }
    $grid.html(html.join(''));
  }

  // ---- About sidebar: strengths chips ----
  function renderAbout(data) {
    const strengths = Array.isArray(data && data.strengths) ? data.strengths : [];
    $('#about-strengths').html(strengths.map(function (text) {
      return '<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 text-xs font-medium">' +
        '<i class="fa-solid fa-check text-[10px] text-brand-500"></i>' + escapeHtml(text) + '</span>';
    }).join(''));
  }

  // ---- Credentials: tabs + panes, academic history, languages ----
  function renderCredentialTabs(tabs) {
    const $tabs = $('#cred-tabs');
    const $contents = $('#cred-tab-contents');
    const valid = (Array.isArray(tabs) ? tabs : []).filter(function (t) { return t && slug(t.id) && t.label; });
    if (!valid.length) { $tabs.empty(); showSectionError($contents, 'No credentials to show yet.'); return; }

    const btnHtml = [];
    const paneHtml = [];
    valid.forEach(function (tab, i) {
      const id = slug(tab.id);
      const first = i === 0;
      btnHtml.push(
        '<button type="button" role="tab" aria-selected="' + first + '" aria-controls="' + id + '" ' +
        'class="cred-tab-btn ' + (first ? TAB_ACTIVE : TAB_IDLE) + ' px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all" ' +
        'data-target="' + id + '">' + escapeHtml(tab.label) + '</button>'
      );
      const items = (Array.isArray(tab.items) ? tab.items : []).map(function (text) {
        return '<div class="flex items-start gap-2">' +
          '<i class="fa-solid fa-circle-check text-brand-600 mt-1"></i>' +
          '<span>' + escapeHtml(text) + '</span></div>';
      }).join('');
      paneHtml.push(
        '<div id="' + id + '" role="tabpanel" class="cred-content-pane space-y-4' + (first ? '' : ' hidden') + '">' +
          '<h4 class="text-lg font-serif font-bold text-brand-600 border-b border-slate-200 pb-2">' + escapeHtml(tab.heading || tab.label) +
            (tab.note ? ' <span class="block sm:inline sm:ml-2 text-xs font-sans font-medium text-slate-400">' + escapeHtml(tab.note) + '</span>' : '') +
          '</h4>' +
          '<div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 text-sm">' + items + '</div>' +
        '</div>'
      );
    });
    $tabs.html(btnHtml.join(''));
    $contents.html(paneHtml.join(''));
    updateTabFades();
  }

  // ---- Skills (About section) ----
  function renderSkills(data) {
    const $grid = $('#skills-grid');
    const cats = (Array.isArray(data && data.categories) ? data.categories : []).filter(function (c) {
      return c && c.title && Array.isArray(c.items) && c.items.length;
    });
    if (!cats.length) { showSectionError($grid, 'No skills to show yet.'); return; }
    $grid.html(cats.map(function (c, i) {
      const last = i === cats.length - 1;
      return '<div class="break-inside-avoid' + (last ? '' : ' mb-4') + '" data-category="' + escapeHtml(slug(c.id || c.title)) + '">' +
        '<h5 class="text-brand-600 font-semibold mb-2 text-sm uppercase tracking-wider">' + escapeHtml(c.title) + '</h5>' +
        '<p class="text-slate-600 text-xs leading-relaxed">' + c.items.map(escapeHtml).join(', ') + '</p>' +
      '</div>';
    }).join(''));
  }

  // ---- Credential tab bar: drag-to-scroll (mouse) + edge fades ----
  // Touch devices scroll natively; this gives desktop the same swipe feel.
  const credTabsEl = document.getElementById('cred-tabs');

  function updateTabFades() {
    if (!credTabsEl) return;
    const max = credTabsEl.scrollWidth - credTabsEl.clientWidth;
    credTabsEl.classList.toggle('fade-left', credTabsEl.scrollLeft > 2);
    credTabsEl.classList.toggle('fade-right', max > 2 && credTabsEl.scrollLeft < max - 2);
  }

  if (credTabsEl) {
    let dragging = false, moved = false, startX = 0, startLeft = 0;

    credTabsEl.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true; moved = false;
      startX = e.clientX; startLeft = credTabsEl.scrollLeft;
    });

    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        credTabsEl.classList.add('is-dragging');
      }
      if (moved) credTabsEl.scrollLeft = startLeft - dx;
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      credTabsEl.classList.remove('is-dragging');
      if (moved) {
        // A drag must not count as a tab click
        const swallow = function (ev) { ev.stopPropagation(); ev.preventDefault(); };
        credTabsEl.addEventListener('click', swallow, true);
        setTimeout(function () { credTabsEl.removeEventListener('click', swallow, true); }, 0);
      }
    }
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    credTabsEl.addEventListener('scroll', updateTabFades, { passive: true });
    window.addEventListener('resize', updateTabFades);
  }

  function renderAcademic(list) {
    const html = (Array.isArray(list) ? list : []).map(function (entry) {
      const meta = [entry.institution, entry.period].filter(Boolean).map(escapeHtml).join(' · ');
      const title = '<p class="text-slate-900 font-semibold text-sm">' + escapeHtml(entry.title) + '</p>';
      const head = entry.grade
        ? '<div class="flex justify-between items-baseline">' + title +
            '<span class="text-xs text-brand-600 font-bold">' + escapeHtml(entry.grade) + '</span></div>'
        : title;
      return '<li>' + head + '<p class="text-slate-500 text-xs">' + meta + '</p></li>';
    }).join('');
    $('#academic-list').html(html);
  }

  function renderLanguages(list) {
    const html = (Array.isArray(list) ? list : []).map(function (lang) {
      return '<div class="flex justify-between items-center">' +
        '<span class="text-slate-900 text-sm font-medium">' + escapeHtml(lang.name) + '</span>' +
        '<span class="text-xs text-brand-600 font-semibold">' + escapeHtml(lang.proficiency) + '</span></div>';
    }).join('');
    $('#languages-list').html(html);
  }

  // Delegated, so it works for buttons rendered after the JSON loads
  $('#cred-tabs').on('click', '.cred-tab-btn', function () {
    const $btn = $(this);
    $('#cred-tabs .cred-tab-btn')
      .removeClass(TAB_ACTIVE).addClass(TAB_IDLE).attr('aria-selected', 'false');
    $btn.removeClass(TAB_IDLE).addClass(TAB_ACTIVE).attr('aria-selected', 'true');
    $('.cred-content-pane').addClass('hidden');
    $('#' + slug($btn.attr('data-target'))).removeClass('hidden');
    if (this.scrollIntoView) this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });

  loadSiteJson('data/site/about.json')
    .then(renderAbout)
    .catch(function (err) { console.error('Could not load about data:', err); });

  loadSiteJson('data/site/skills.json')
    .then(renderSkills)
    .catch(function (err) {
      console.error('Could not load skills:', err);
      showSectionError($('#skills-grid'), 'Skills could not be loaded right now.');
    });

  loadSiteJson('data/site/technologies.json')
    .then(renderTechnologies)
    .catch(function (err) {
      console.error('Could not load technologies:', err);
      showSectionError($('#tech-grid'), 'Technologies could not be loaded right now.');
    });

  loadSiteJson('data/site/credentials.json')
    .then(function (data) {
      renderCredentialTabs(data.tabs);
      renderAcademic(data.academic);
      renderLanguages(data.languages);
    })
    .catch(function (err) {
      console.error('Could not load credentials:', err);
      showSectionError($('#cred-tab-contents'), 'Credentials could not be loaded right now.');
    });


  // ==========================================
  // FESTIVAL & TIME DYNAMIC CANVAS BACKGROUND
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // Time & Festival Theme Evaluator (Ported from useTheme.ts)
  function getTheme() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();

    // Specific Holiday dates
    if (month === 2 && day === 4) return 'independence';
    if (month === 4 && (day === 13 || day === 14)) return 'newyear';
    if (month === 5 && (day === 1 || day === 2)) return 'vesak';
    if ((month === 5 && day === 31) || (month === 6 && day === 1)) return 'poson';
    if (month === 12 && day >= 24 && day <= 26) return 'christmas';
    if (month === 4 && day === 5) return 'easter';
    if (month === 4 && day === 3) return 'goodfriday';
    if (month === 3 && (day === 19 || day === 20 || day === 21)) return 'ramadan';

    // Time-based fallback
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }

  const theme = getTheme();

  // Set CSS class gradient style matching React's determineTheme hook
  const $dynamicBg = $('#dynamic-bg');
  const gradientClasses = {
    morning: 'bg-gradient-to-br from-sky-100/60 via-slate-50 to-amber-50/60',
    afternoon: 'bg-gradient-to-br from-blue-100/50 via-slate-50 to-sky-50/50',
    evening: 'bg-gradient-to-br from-orange-100/40 via-slate-50 to-purple-100/30',
    night: 'bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100/40',
    newyear: 'bg-gradient-to-br from-red-100/30 via-slate-50 to-green-100/30',
    vesak: 'bg-gradient-to-br from-orange-100/30 via-slate-50 to-yellow-100/30',
    poson: 'bg-gradient-to-br from-orange-100/30 via-slate-50 to-yellow-100/30',
    christmas: 'bg-gradient-to-br from-red-100/30 via-slate-50 to-emerald-100/30',
    easter: 'bg-gradient-to-br from-purple-100/30 via-slate-50 to-pink-100/30',
    goodfriday: 'bg-gradient-to-br from-purple-100/30 via-slate-50 to-pink-100/30',
    ramadan: 'bg-gradient-to-br from-emerald-100/30 via-slate-50 to-teal-100/30',
    independence: 'bg-gradient-to-br from-orange-100/30 via-slate-50 to-green-100/30'
  };
  $dynamicBg.addClass(gradientClasses[theme] || 'bg-slate-50');

  // Initialize Particle States
  const particles = [];
  let particleCount = 0;
  if (theme === 'christmas') {
    particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 3 + 1, d: Math.random() * particleCount });
    }
  } else if (theme === 'vesak' || theme === 'poson') {
    particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 4 + 2, speedY: Math.random() * 1 + 0.5, speedX: (Math.random() - 0.5) * 0.5 });
    }
  } else if (theme === 'night' || theme === 'ramadan') {
    particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      particles.push({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.5, opacity: Math.random(), fadeDir: Math.random() > 0.5 ? 1 : -1 });
    }
  } else if (theme === 'newyear' || theme === 'independence') {
    particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        targetY: Math.random() * (height / 2),
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        exploded: false,
        particles: []
      });
    }
  }

  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);

    if (theme === 'christmas') {
      ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
      ctx.beginPath();
      angle += 0.01;
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 0.5;
        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          particles[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d };
        }
      }
      ctx.fill();
    } else if (theme === 'vesak' || theme === 'poson') {
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        gradient.addColorStop(0, 'rgba(255, 200, 50, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2, true);
        ctx.fill();
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -50) {
          particles[i] = { x: Math.random() * width, y: height + 50, r: p.r, speedY: p.speedY, speedX: p.speedX };
        }
      }
    } else if (theme === 'night' || theme === 'ramadan') {
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity * 0.5})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fill();
        p.opacity += 0.01 * p.fadeDir;
        if (p.opacity >= 1) p.fadeDir = -1;
        if (p.opacity <= 0.1) p.fadeDir = 1;
      }
    } else if (theme === 'newyear' || theme === 'independence') {
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        if (!p.exploded) {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
          p.y -= 4;
          if (p.y <= p.targetY) {
            p.exploded = true;
            for (let j = 0; j < 30; j++) {
              const angleVal = Math.random() * Math.PI * 2;
              const speed = Math.random() * 3 + 1;
              p.particles.push({
                x: p.x, y: p.y,
                vx: Math.cos(angleVal) * speed,
                vy: Math.sin(angleVal) * speed,
                alpha: 1
              });
            }
          }
        } else {
          for (let j = p.particles.length - 1; j >= 0; j--) {
            const sp = p.particles[j];
            ctx.beginPath();
            ctx.fillStyle = p.color.replace(')', `, ${sp.alpha})`).replace('hsl', 'hsla');
            ctx.arc(sp.x, sp.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.vy += 0.05; // gravity
            sp.alpha -= 0.02;
            if (sp.alpha <= 0) p.particles.splice(j, 1);
          }
          if (p.particles.length === 0) {
            particles[i] = {
              x: Math.random() * width,
              y: height + Math.random() * 100,
              targetY: Math.random() * (height / 2),
              color: `hsl(${Math.random() * 360}, 100%, 60%)`,
              exploded: false,
              particles: []
            };
          }
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  if (particleCount > 0) {
    draw();
  }
});
