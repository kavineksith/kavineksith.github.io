/**
 * SHARED FOOTER LOADER
 * Injects partials/footer.html into <div id="site-footer" data-root="..."> so every
 * page shows the same footer, edited in ONE place.
 *   data-root=""    on index.html
 *   data-root="../" on pages/*.html
 * Socials come from data/site/socials.json (first `footerLimit` entries).
 * Plain JS (no jQuery) so it works on every page.
 */
(function () {
  'use strict';

  var mount = document.getElementById('site-footer');
  if (!mount) return;
  var root = mount.getAttribute('data-root') || '';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safeUrl(url) {
    try {
      var u = new URL(url, window.location.href);
      return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '#';
    } catch (e) { return '#'; }
  }

  function safeIcon(cls) {
    // Font Awesome classes only: letters, digits, dashes and spaces
    return /^[a-z0-9 -]+$/i.test(cls || '') ? cls : 'fa-solid fa-link';
  }

  function getText(url) {
    return window.fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
      return res.text();
    });
  }

  // Partial links are written from the site root; re-base them for sub-pages.
  function rebaseLinks(scope) {
    if (!root) return;
    Array.prototype.forEach.call(scope.querySelectorAll('a[href]'), function (a) {
      var href = a.getAttribute('href');
      if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return; // absolute URL
      a.setAttribute('href', href.charAt(0) === '#' ? root + 'index.html' + href : root + href);
    });
  }

  function renderSocials(scope, config) {
    var holder = scope.querySelector('#footer-socials');
    if (!holder) return;
    var list = Array.isArray(config && config.socials) ? config.socials : [];
    var limit = Number(config && config.footerLimit) || 3;
    holder.innerHTML = list.slice(0, limit).map(function (s) {
      return '<a href="' + esc(safeUrl(s.url)) + '" target="_blank" rel="noopener noreferrer" ' +
        'class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-brand-600 transition-colors shadow-sm" ' +
        'aria-label="' + esc(s.platform) + '"><i class="' + esc(safeIcon(s.icon)) + '"></i></a>';
    }).join('');
  }

  function fallback() {
    mount.innerHTML =
      '<footer class="bg-slate-50 pt-10 pb-8 border-t border-slate-200 relative z-10">' +
      '<p class="text-slate-400 text-sm text-center">&copy; ' + new Date().getFullYear() +
      ' Kavin Eksith. All rights reserved.</p></footer>';
  }

  Promise.all([
    getText(root + 'partials/footer.html'),
    window.fetch(root + 'data/site/socials.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
  ]).then(function (res) {
    mount.innerHTML = res[0];
    rebaseLinks(mount);
    renderSocials(mount, res[1]);
    var year = mount.querySelector('#currentYear');
    if (year) year.textContent = new Date().getFullYear();
    document.dispatchEvent(new CustomEvent('site-footer:ready'));
  }).catch(function (err) {
    console.error('Could not load the shared footer:', err);
    fallback();
  });
})();
