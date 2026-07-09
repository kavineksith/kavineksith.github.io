$(function () {
  'use strict';

  // ---------------------------------------------------------
  // 1. Mobile navigation toggle
  // ---------------------------------------------------------
  $('#navToggle').on('click', function () {
    $('#mobileMenu').slideToggle(200);
    $(this).find('i').toggleClass('fa-bars fa-xmark');
  });

  $('#mobileMenu a').on('click', function () {
    $('#mobileMenu').slideUp(200);
    $('#navToggle i').removeClass('fa-xmark').addClass('fa-bars');
  });

  // ---------------------------------------------------------
  // 2. Smooth scroll for in-page anchors
  // ---------------------------------------------------------
  $('a[href^="#"]').on('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = $(targetId);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 72 }, 500);
    }
  });

  // ---------------------------------------------------------
  // 3. Scrollspy + navbar shadow + back-to-top visibility
  // ---------------------------------------------------------
  const sections = $('section[id]');
  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop() + 120;
    sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');
      if (scrollPos >= top && scrollPos < bottom) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });

    if ($(window).scrollTop() > 400) {
      $('#backToTop').addClass('show');
      $('#mainNav').addClass('shadow-lg');
    } else {
      $('#backToTop').removeClass('show');
      $('#mainNav').removeClass('shadow-lg');
    }
  });

  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // ---------------------------------------------------------
  // 4. Scroll-reveal animation
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // 5. Pricing view toggle (Packages / Compare Features)
  // ---------------------------------------------------------
  $('.pricing-toggle-btn').on('click', function () {
    const view = $(this).data('view');
    $('.pricing-toggle-btn').removeClass('active');
    $(this).addClass('active');
    if (view === 'packages') {
      $('#packagesView').removeClass('hidden');
      $('#compareView').addClass('hidden');
    } else {
      $('#compareView').removeClass('hidden');
      $('#packagesView').addClass('hidden');
    }
  });

  // ---------------------------------------------------------
  // 6. Contact form (mailto handoff — no backend)
  // ---------------------------------------------------------
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#cf-name').val().trim();
    const email = $('#cf-email').val().trim();
    const message = $('#cf-message').val().trim();
    if (!name || !email || !message) {
      $('#cf-status').text('Please fill in all fields.').removeClass('text-gold-400').addClass('text-red-400');
      return;
    }
    const subject = encodeURIComponent('Project inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    $('#cf-status').text('Opening your email client…').removeClass('text-red-400').addClass('text-gold-400');
  });

  // ---------------------------------------------------------
  // 8. Current year in footer
  // ---------------------------------------------------------
  $('#year').text(new Date().getFullYear());

  // ---------------------------------------------------------
  // Optional: deter casual right-click / DevTools inspection
  // (ported from your original React build — left OFF by default
  // since it blocks legitimate accessibility tools and browser
  // extensions, and doesn't meaningfully protect client-side code.
  // Uncomment below to re-enable it.)
  // ---------------------------------------------------------
  // $(document).on('contextmenu', function (e) { e.preventDefault(); });
  // $(document).on('keydown', function (e) {
  //   const k = e.key.toUpperCase();
  //   if (k === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(k)) || (e.ctrlKey && k === 'U')) {
  //     e.preventDefault();
  //   }
  // });
});
