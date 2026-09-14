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
    },
    projects: [
      {
        id: 0,
        title: "INSOPHINIA Web Based Point of Sale System",
        category: "Real-world Project",
        url: "https://insophinia-pos.vercel.app/",
        description: "A comprehensive web-based POS system for retail businesses, featuring inventory management, sales tracking, and customer insights.",
        icon: "fa-solid fa-cash-register",
        type: "real-world"
      },
      {
        id: 1,
        title: "LUCKY Book Shop & Communication",
        category: "Real-world Project",
        url: "https://lucky-bookshop.netlify.app/",
        description: "Top-rated book store offering premium stationery, printing, and communication services.",
        icon: "fa-solid fa-book",
        type: "real-world"
      },
      {
        id: 2,
        title: "Navodaa - Unified Elegance",
        category: "Real-world Project",
        url: "https://navodaa.netlify.app/",
        description: "Beauty, Fashion & Lifestyle brand portfolio including Saloon Navodaa and more.",
        icon: "fa-solid fa-palette",
        type: "real-world"
      },
      {
        id: 3,
        title: "Soundup Music Box",
        category: "Real-world Project",
        url: "https://soundupmusicbox.netlify.app/",
        description: "Premium destination for high-fidelity speakers and professional audio equipment.",
        icon: "fa-solid fa-music",
        type: "real-world"
      },
      {
        id: 4,
        title: "Salon Navodaa",
        category: "Real-world Project",
        url: "https://salonnavodaa.netlify.app/",
        description: "Professional herbal beauty & wellness salon for women in Gampaha.",
        icon: "fa-solid fa-cut",
        type: "real-world"
      },
      {
        id: 5,
        title: "Dream Art Creations",
        category: "Real-world Project",
        url: "https://dreamartcreation.netlify.app/",
        description: "Professional graphic design services including photo editing and branding.",
        icon: "fa-solid fa-pen-nib",
        type: "real-world"
      },
      {
        id: 6,
        title: "Lumina Luxe Spa",
        category: "Dummy Project",
        url: "https://lumina-luxe-spa-landing-page.netlify.app/",
        description: "A premium spa landing page concept with a focus on luxury and relaxation.",
        icon: "fa-solid fa-spa",
        type: "dummy"
      },
      {
        id: 7,
        title: "Ink Rose Tattoo Studio",
        category: "Dummy Project",
        url: "https://ink-rose-tattoo-studio.netlify.app/",
        description: "Bespoke tattoo studio showcase with a modern, feminine aesthetic.",
        icon: "fa-solid fa-palette",
        type: "dummy"
      },
      {
        id: 8,
        title: "Developer Services Page",
        category: "Dummy Project",
        url: "https://freelance-developer-landing-page.netlify.app/",
        description: "Professional landing page for IT services and digital solutions.",
        icon: "fa-solid fa-laptop-code",
        type: "dummy"
      },
      {
        id: 9,
        title: "VibeFlow Music App",
        category: "Dummy Project",
        url: "https://vibeflow-music-app.netlify.app/",
        description: "Modern music player interface with a focus on flow and user experience.",
        icon: "fa-solid fa-play",
        type: "dummy"
      },
      {
        id: 10,
        title: "Project Report Template",
        category: "Personal Project",
        url: "https://kavineksith.github.io/Software-Project-Report-Template/",
        description: "A professional template for software engineering project reports.",
        icon: "fa-solid fa-file-lines",
        type: "personal"
      },
      {
        id: 11,
        title: "Portfolio Template V2",
        category: "Personal Project",
        url: "https://kavineksith.github.io/Free-Personal-Portfolio-Website-Template-V2/",
        description: "The second version of my free personal portfolio website template.",
        icon: "fa-solid fa-id-card",
        type: "personal"
      },
      {
        id: 12,
        title: "Personal Portfolio Template",
        category: "Personal Project",
        url: "https://kavineksith.github.io/Free-Personal-Portfolio-Website-Template/",
        description: "A clean and modern website template for personal portfolios.",
        icon: "fa-solid fa-user-tie",
        type: "personal"
      },
      {
        id: 13,
        title: "DigitalCraft Landing Page",
        category: "Personal Project",
        url: "https://kavineksith.github.io/DigitalCraft-Solutions-Landing-Page-Dummy-Project/",
        description: "A landing page concept for automated data processing services.",
        icon: "fa-solid fa-project-diagram",
        type: "personal"
      }
    ],
    socials: [
      {
        platform: "LinkedIn",
        icon: "fa-brands fa-linkedin",
        url: "https://linkedin.com/in/kavin-eksith"
      },
      {
        platform: "GitHub",
        icon: "fa-brands fa-github",
        url: "https://github.com/kavineksith"
      },
      {
        platform: "Portfolio",
        icon: "fa-solid fa-globe",
        url: "https://kavineksith.github.io"
      },
      {
        platform: "Medium",
        icon: "fa-brands fa-medium",
        url: "https://kavineksith.medium.com"
      },
      {
        platform: "freeCodeCamp",
        icon: "fa-brands fa-free-code-camp",
        url: "https://www.freecodecamp.org/kavin-eksith"
      },
      {
        platform: "CodePen",
        icon: "fa-brands fa-codepen",
        url: "https://codepen.io/kavineksith"
      },
      {
        platform: "Frontend Mentor",
        icon: "fa-solid fa-code",
        url: "https://www.frontendmentor.io/profile/kavineksith"
      },
    ]
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

  // Render Projects (Main page first 6 only — full catalog now lives on cli-projects.html)
  const $projectsGrid = $('#projects-grid');

  // Basic HTML-escaping helper — defense in depth even though this data is
  // author-controlled, so any future dynamic/user-supplied field stays safe.
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
    if (!url || typeof url !== 'string') return '#';
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') return parsed.href;
    } catch (e) { /* fall through */ }
    return '#';
  }

  function getProjectHtml(project, index) {
    const gradient = GRADIENTS[index % GRADIENTS.length];
    const url = sanitizeUrl(project.url);
    const icon = escapeHtml(project.icon);
    const category = escapeHtml(project.category);
    const title = escapeHtml(project.title);
    const description = escapeHtml(project.description);
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer block border border-white/60 hover:border-brand-400/60 transition-all duration-500 bg-gradient-to-br ${gradient} backdrop-blur-xl project-card-link shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.3)]">
        <!-- Glossy glass sheen -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent pointer-events-none"></div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-9xl text-white/50 group-hover:scale-110 group-hover:text-white/70 transition-all duration-700 drop-shadow-sm">
            <i class="${icon}"></i>
          </div>
        </div>
        <div class="absolute top-0 right-0 p-8">
          <div class="w-12 h-1 bg-white/60 rounded-full group-hover:bg-white/90 transition-colors"></div>
        </div>
        <!-- Frosted glass text panel -->
        <div class="absolute bottom-0 left-0 right-0 p-6 bg-white/70 backdrop-blur-md border-t border-white/60 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span class="text-brand-700 text-xs font-semibold tracking-widest uppercase mb-1 block">${category}</span>
          <h3 class="text-lg md:text-xl font-serif font-bold text-slate-900 mb-1 leading-tight">${title}</h3>
          <p class="text-slate-600 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            ${description}
          </p>
        </div>
      </a>
    `;
  }

  // Populate first 6 projects on the main page; the rest live on cli-projects.html
  siteData.projects.slice(0, 6).forEach(function (project, index) {
    $projectsGrid.append(getProjectHtml(project, index));
  });

  // Render Footer Social Handles (first row only) & current year
  const $footerSocials = $('#footer-socials');
  siteData.socials.slice(0, 3).forEach(function (social) {
    const handleHtml = `
      <a href="${sanitizeUrl(social.url)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-brand-600 transition-colors shadow-sm" aria-label="${escapeHtml(social.platform)}">
        <i class="${escapeHtml(social.icon)}"></i>
      </a>
    `;
    $footerSocials.append(handleHtml);
  });
  $('#currentYear').text(new Date().getFullYear());

  // Render "Let's Connect" social grid (same source list as footer)
  const $connectSocialsGrid = $('#connect-socials-grid');
  siteData.socials.forEach(function (social) {
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
  // CREDENTIALS CATEGORIES TAB SWITCHING
  // ==========================================
  $('.cred-tab-btn').on('click', function () {
    $('.cred-tab-btn').removeClass('active bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-md').addClass('text-slate-500 hover:text-slate-900');
    $(this).addClass('active bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-md').removeClass('text-slate-500 hover:text-slate-900');

    const targetPaneId = $(this).data('target');
    $('.cred-content-pane').addClass('hidden');
    $('#' + targetPaneId).removeClass('hidden');
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
