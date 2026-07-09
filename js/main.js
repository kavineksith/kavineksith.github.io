/**
 * KAVIN EKSITH — FREELANCE PORTFOLIO MAIN JS (jQuery + Canvas background + AI Assistant)
 */
$(function () {
  'use strict';

  // ==========================================
  // CONFIGURATION DATA (Ported from React)
  // ==========================================
  const siteData = {
    company: {
      name: "Kavin Eksith | Portfolio",
      person: "Kavin Eksith",
      since: "May 2025"
    },
    services: [
      {
        icon: "fa-solid fa-laptop-code",
        title: "Web Development",
        description: "High-converting landing pages and modern web applications tailored to bridge your social media reach to active engagements."
      },
      {
        icon: "fa-solid fa-robot",
        title: "IT Automation",
        description: "Automating daily tasks with scripts, data entry, and seamless transformations across various file formats (Excel, CSV, JSON, Word, PDF)."
      },
      {
        icon: "fa-solid fa-shield-halved",
        title: "Cyber Security",
        description: "Consulting on modern cyber threats to educate and protect your business, empowering your team with critical security knowledge."
      },
      {
        icon: "fa-solid fa-pen-nib",
        title: "Professional Design",
        description: "Crafting premium, high-converting email templates, professional resumes, and cohesive letterhead designs to elevate your brand identity."
      }
    ],
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
        title: "Freelance Developer Page",
        category: "Dummy Project",
        url: "https://freelance-developer-landing-page.netlify.app/",
        description: "Professional landing page for IT services and freelance solutions.",
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
    packages: [
      {
        name: "Basic Package",
        price: "5,000",
        description: "Essential requirements for a professional landing page at an accessible price point.",
        highlighted: false,
        features: [
          "Icon Libraries included",
          "Tailwind CSS + Custom CSS",
          "AI-Generated Content & Images",
          "React Development",
          "SEO Meta Tag Implementation",
          "Fully Responsive Design",
          "2 Revision Rounds"
        ],
        missing: [
          "Google Analytics Implementation",
          "Security Configuration",
          "Hosting & Deployment Support"
        ]
      },
      {
        name: "Standard Package",
        price: "10,000",
        description: "Custom GA4 implementation, advanced security features, and professional SEO/Social optimization.",
        highlighted: true,
        features: [
          "Everything in Basic Package",
          "Google Analytics Implementation",
          "Security Features Implementation",
          "SEO, Favicons & Social Share Features",
          "5 Revision Rounds",
          "Hosting Account Setup Assistance"
        ],
        missing: []
      },
      {
        name: "Custom Package",
        price: "Custom",
        description: "Tailored solutions for complex requirements, enterprise features, automation scripts, and data transformations.",
        highlighted: false,
        features: [
          "Everything in Standard Package",
          "Custom Feature Development",
          "Future Solution Consulting",
          "Unlimited Revision Rounds",
          "Custom Solution Design"
        ],
        missing: []
      }
    ],
    comparisonFeatures: [
      { name: "Icon Libraries", basic: true, standard: true, custom: true },
      { name: "Tailwind CSS + Custom CSS", basic: true, standard: true, custom: true },
      { name: "AI-Generated Content & Images", basic: true, standard: true, custom: true },
      { name: "React Development", basic: true, standard: true, custom: true },
      { name: "Responsive Design", basic: true, standard: true, custom: true },
      { name: "Google Analytics Implementation", basic: false, standard: "Custom", custom: "Custom" },
      { name: "Security Features Implementation", basic: false, standard: "Custom", custom: "Advanced" },
      { name: "SEO & Social Share Features", basic: "Meta Tags", standard: "Full (Custom)", custom: "Advanced" },
      { name: "Favicon & App Icon Package", basic: false, standard: true, custom: true },
      { name: "Revision Rounds", basic: "2", standard: "5", custom: "Unlimited" },
      { name: "Hosting & Deployment Support", basic: false, standard: true, custom: true },
      { name: "Custom Feature Development", basic: false, standard: false, custom: true },
      { name: "Data Automation/Scripting", basic: false, standard: false, custom: true },
      { name: "Custom Solution Design", basic: false, standard: false, custom: true }
    ],
    socials: [
      { platform: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://linkedin.com/in/kavin-eksith" },
      { platform: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/kavineksith" },
      { platform: "Medium", icon: "fa-brands fa-medium", url: "https://kavineksith.medium.com" }
    ]
  };

  const GRADIENTS = [
    "from-gold-400/20 via-gold-500/10 to-transparent",
    "from-blue-500/20 via-indigo-500/10 to-transparent",
    "from-rose-500/20 via-pink-500/10 to-transparent",
    "from-emerald-500/20 via-teal-500/10 to-transparent",
    "from-amber-400/20 via-orange-500/10 to-transparent",
    "from-violet-500/20 via-purple-500/10 to-transparent",
    "from-cyan-500/20 via-blue-500/10 to-transparent",
    "from-lime-400/20 via-green-500/10 to-transparent",
    "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    "from-sky-400/20 via-blue-400/10 to-transparent"
  ];

  // ==========================================
  // DYNAMIC COMPONENT RENDERING
  // ==========================================
  
  // Render Services
  const $servicesGrid = $('#services-grid');
  siteData.services.forEach(function (service) {
    const cardHtml = `
      <div class="glass-panel p-8 rounded-2xl transition-colors duration-500 group relative overflow-hidden service-card reveal">
        <div class="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="w-14 h-14 rounded-xl bg-slate-800/50 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-500">
          <i class="${service.icon} text-2xl"></i>
        </div>
        <h3 class="text-xl font-semibold mb-3 text-slate-200 group-hover:text-gold-400 transition-colors duration-500">${service.title}</h3>
        <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
          ${service.description}
        </p>
      </div>
    `;
    $servicesGrid.append(cardHtml);
  });

  // Render Projects (Main page first 6, Modal all 14)
  const $projectsGrid = $('#projects-grid');
  const $modalProjectsGrid = $('#modal-projects-grid');

  function getProjectHtml(project, index) {
    const gradient = GRADIENTS[index % GRADIENTS.length];
    return `
      <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer block border border-slate-800 hover:border-gold-500/50 transition-all duration-500 bg-slate-900 project-card-link">
        <div class="absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-9xl text-white opacity-15 group-hover:opacity-40 group-hover:scale-110 group-hover:text-gold-500 transition-all duration-700">
            <i class="${project.icon}"></i>
          </div>
        </div>
        <div class="absolute top-0 right-0 p-8">
          <div class="w-12 h-1 bg-gold-500/20 rounded-full group-hover:bg-gold-500/40 transition-colors"></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span class="text-gold-400 text-sm font-medium tracking-widest uppercase mb-2 block">${project.category}</span>
          <h3 class="text-xl md:text-2xl font-serif font-bold text-white mb-2 leading-tight">${project.title}</h3>
          <p class="text-slate-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            ${project.description}
          </p>
        </div>
      </a>
    `;
  }

  // Populate first 6 projects
  siteData.projects.slice(0, 6).forEach(function (project, index) {
    $projectsGrid.append(getProjectHtml(project, index));
  });

  // Populate all projects for the Modal
  siteData.projects.forEach(function (project, index) {
    $modalProjectsGrid.append(getProjectHtml(project, index));
  });

  // Append a customized contact CTA card in the modal grid
  const modalCtaCard = `
    <div class="relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-8 text-center border border-dashed border-gold-500/30 hover:border-gold-500/60 bg-slate-900/50 transition-colors group">
      <h3 class="text-2xl font-serif font-bold text-slate-200 mb-3 group-hover:text-gold-400 transition-colors">Have a vision?</h3>
      <p class="text-slate-400 text-sm mb-6">Let's collaborate on your next big project.</p>
      <a href="#contact" id="modalConnectBtn" class="px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 font-bold tracking-wide shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-shadow">
        Connect with Me
      </a>
    </div>
  `;
  $modalProjectsGrid.append(modalCtaCard);

  // Render Packages Grid
  const $packagesGrid = $('#packages-grid');
  siteData.packages.forEach(function (pkg) {
    const featuresHtml = pkg.features.map(f => `
      <div class="flex items-start gap-3">
        <div class="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full shrink-0 ${pkg.highlighted ? 'bg-gold-500/20 text-gold-400' : 'bg-slate-800 text-slate-300'}">
          <i class="fa-solid fa-check text-[10px]"></i>
        </div>
        <span class="text-slate-300 text-sm">${f}</span>
      </div>
    `).join('');

    const missingHtml = pkg.missing.map(m => `
      <div class="flex items-start gap-3 opacity-50">
        <div class="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full shrink-0 bg-slate-800/50 text-slate-500">
          <i class="fa-solid fa-minus text-[10px]"></i>
        </div>
        <span class="text-slate-500 text-sm line-through">${m}</span>
      </div>
    `).join('');

    const cardHtml = `
      <div class="relative rounded-3xl p-6 lg:p-10 flex flex-col h-full ${pkg.highlighted ? 'bg-gradient-to-b from-slate-900 to-slate-950 border border-gold-500/50 shadow-[0_0_40px_rgba(234,179,8,0.15)]' : 'glass-panel'}">
        ${pkg.highlighted ? `
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full flex items-center gap-1 shadow-lg shadow-gold-500/20">
            <i class="fa-solid fa-star text-xs"></i> Recommended
          </div>
        ` : ''}
        <div class="mb-6">
          <h3 class="text-2xl font-serif font-bold text-slate-200 mb-2">${pkg.name}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">${pkg.description}</p>
        </div>
        <div class="mb-8 flex items-baseline gap-2 flex-wrap">
          ${pkg.price !== 'Custom' ? '<span class="text-slate-400 font-medium">Rs.</span>' : ''}
          <span class="text-4xl lg:text-5xl font-bold tracking-tight ${pkg.highlighted ? 'text-gold-400' : 'text-slate-200'}">${pkg.price}</span>
        </div>
        <div class="flex-1 space-y-4 mb-8">
          ${featuresHtml}
          ${missingHtml}
        </div>
        <a href="#contact" class="w-full py-4 rounded-xl font-bold tracking-wide transition-all text-center ${pkg.highlighted ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}">Get Started</a>
      </div>
    `;
    $packagesGrid.append(cardHtml);
  });

  // Render Comparison Feature Table
  const $comparisonBody = $('#comparison-table-body');
  siteData.comparisonFeatures.forEach(function (feat) {
    function getCellHtml(val, highlighted) {
      if (typeof val === 'boolean') {
        return val 
          ? `<div class="w-6 h-6 rounded-full ${highlighted ? 'bg-gold-500/20 text-gold-400' : 'bg-slate-800 text-slate-300'} flex items-center justify-center mx-auto"><i class="fa-solid fa-check text-xs"></i></div>` 
          : `<div class="w-6 h-6 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto text-slate-600"><i class="fa-solid fa-minus text-xs"></i></div>`;
      }
      return `<span class="text-sm ${highlighted ? 'text-gold-400' : 'text-slate-300'} font-medium">${val}</span>`;
    }

    const rowHtml = `
      <tr class="hover:bg-slate-800/20 transition-colors">
        <td class="p-6 text-sm text-slate-300 border-b border-slate-800/50">${feat.name}</td>
        <td class="p-6 text-center border-b border-slate-800/50">${getCellHtml(feat.basic, false)}</td>
        <td class="p-6 text-center border-b border-slate-800/50 bg-gold-900/5">${getCellHtml(feat.standard, true)}</td>
        <td class="p-6 text-center border-b border-slate-800/50">${getCellHtml(feat.custom, false)}</td>
      </tr>
    `;
    $comparisonBody.append(rowHtml);
  });

  // Render Footer Social Handles & current year
  const $footerSocials = $('#footer-socials');
  siteData.socials.forEach(function (social) {
    const handleHtml = `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:bg-slate-800 transition-colors shadow-lg" aria-label="${social.platform}">
        <i class="${social.icon}"></i>
      </a>
    `;
    $footerSocials.append(handleHtml);
  });
  $('#currentYear').text(new Date().getFullYear());


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


  // ==========================================
  // PROJECTS OVERLAY MODAL HANDLERS
  // ==========================================
  const $projectsModal = $('#projectsModal');
  const $modalContentBox = $('.modal-content-box');

  $('#viewAllProjectsBtn').on('click', function () {
    $projectsModal.removeClass('hidden');
    setTimeout(() => {
      $modalContentBox.addClass('show');
    }, 50);
  });

  function hideProjectsModal() {
    $modalContentBox.removeClass('show');
    setTimeout(() => {
      $projectsModal.addClass('hidden');
    }, 300);
  }

  $('#closeProjectsModal, #modalOverlay').on('click', hideProjectsModal);
  $(document).on('click', '#modalConnectBtn', function () {
    hideProjectsModal();
  });


  // ==========================================
  // PRICING TAB TOGGLES
  // ==========================================
  const $viewPackagesTab = $('#viewPackagesTab');
  const $compareFeaturesTab = $('#compareFeaturesTab');
  const $packagesContainer = $('#packagesContainer');
  const $comparisonContainer = $('#comparisonContainer');

  $viewPackagesTab.on('click', function () {
    $compareFeaturesTab.removeClass('bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 shadow-md').addClass('text-slate-400 hover:text-slate-200');
    $(this).addClass('bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 shadow-md').removeClass('text-slate-400 hover:text-slate-200');
    $comparisonContainer.addClass('hidden');
    $packagesContainer.removeClass('hidden');
  });

  $compareFeaturesTab.on('click', function () {
    $viewPackagesTab.removeClass('bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 shadow-md').addClass('text-slate-400 hover:text-slate-200');
    $(this).addClass('bg-gradient-to-r from-gold-400 to-gold-600 text-slate-950 shadow-md').removeClass('text-slate-400 hover:text-slate-200');
    $packagesContainer.addClass('hidden');
    $comparisonContainer.removeClass('hidden');
  });


  // ==========================================
  // LEGAL MODALS (Privacy / Terms)
  // ==========================================
  const $legalModal = $('#legalModal');
  const $legalModalBox = $('.legal-modal-box');
  const $legalModalTitle = $('#legalModalTitle');
  const $legalModalContent = $('#legalModalContent');

  const legalDocuments = {
    privacy: {
      title: "Privacy Policy",
      content: `
        <p>Last updated: April 2026</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">1. Information I Collect</h4>
        <p>I collect information you provide directly to me when you fill out a form, request customer support, or otherwise communicate with me. The types of information I may collect include your name, email address, phone number, and any other information you choose to provide.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">2. Use of Information</h4>
        <p>I use the information I collect to provide, maintain, and improve my services, to process your requests, and to communicate with you about products, services, offers, and events.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">3. Sharing of Information</h4>
        <p>I do not share your personal information with third parties except as necessary to provide my services or as required by law. I do not sell your personal data.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">4. Security</h4>
        <p>I take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      content: `
        <p>Last updated: April 2026</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">1. Source Code Ownership &amp; Delivery</h4>
        <p>Upon full settlement of the agreed project fee, the complete source code shall be delivered exclusively to the client. All intellectual property rights pertaining to the delivered source code are fully and irrevocably transferred to the client upon delivery. The developer retains no copies, rights, or claims over the delivered source code following project completion.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">2. Disclaimer of Liability</h4>
        <p>The developer bears no responsibility, liability, or obligation for the website, its functionality, or its content following delivery. The client accepts the delivered product in its delivered state. Any subsequent issues, defects, or failures are solely the responsibility of the client.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">3. Maintenance, Updates &amp; Ongoing Support</h4>
        <p>No maintenance, security updates, bug fixes, or technical support is included within either package upon project delivery. Any post-delivery maintenance, updates, or support services requested by the client shall be provided exclusively on a chargeable basis at an agreed hourly rate.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">4. Hosting, Infrastructure &amp; Performance</h4>
        <p>Initial hosting onboarding assistance may involve guidance on free-tier hosting solutions. The client is solely responsible for evaluating their traffic volume, usage requirements, and customer base, and for upgrading to a paid hosting plan should their requirements exceed free-tier limitations.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">5. Revision &amp; Change Request Policy</h4>
        <p>Revisions are limited to the number specified in the selected package (2 for Basic; 5 for Standard). A revision round constitutes changes to existing design elements or content. Requests for new features, additional pages, or scope changes outside the original brief are not covered under revision rounds and will be quoted separately.</p>
        <h4 class="text-lg font-medium text-slate-200 mt-4">6. Payment Terms</h4>
        <p>A non-refundable advance payment of 50% of the total package fee is required prior to commencement of any development work. The remaining 50% balance is due upon project completion, prior to the delivery of source code.</p>
      `
    }
  };

  function openLegalModal(type) {
    const doc = legalDocuments[type];
    if (!doc) return;
    $legalModalTitle.text(doc.title);
    $legalModalContent.html(doc.content);
    $legalModal.removeClass('hidden');
    setTimeout(() => {
      $legalModalBox.addClass('show');
    }, 50);
  }

  function hideLegalModal() {
    $legalModalBox.removeClass('show');
    setTimeout(() => {
      $legalModal.addClass('hidden');
    }, 300);
  }

  $('#privacyPolicyBtn').on('click', function () { openLegalModal('privacy'); });
  $('#termsOfServiceBtn').on('click', function () { openLegalModal('terms'); });
  $('#closeLegalModal, #legalModalOverlay').on('click', hideLegalModal);


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
    morning: 'bg-gradient-to-br from-sky-400/20 via-slate-950 to-amber-200/10',
    afternoon: 'bg-gradient-to-br from-blue-500/10 via-slate-950 to-sky-300/10',
    evening: 'bg-gradient-to-br from-orange-500/20 via-slate-950 to-purple-900/20',
    night: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/30',
    newyear: 'bg-gradient-to-br from-red-900/20 via-slate-950 to-green-900/20',
    vesak: 'bg-gradient-to-br from-orange-900/20 via-slate-950 to-yellow-900/20',
    poson: 'bg-gradient-to-br from-orange-900/20 via-slate-950 to-yellow-900/20',
    christmas: 'bg-gradient-to-br from-red-900/20 via-slate-950 to-emerald-900/20',
    easter: 'bg-gradient-to-br from-purple-900/20 via-slate-950 to-pink-900/20',
    goodfriday: 'bg-gradient-to-br from-purple-900/20 via-slate-950 to-pink-900/20',
    ramadan: 'bg-gradient-to-br from-emerald-900/20 via-slate-950 to-teal-900/20',
    independence: 'bg-gradient-to-br from-orange-900/20 via-slate-950 to-green-900/20'
  };
  $dynamicBg.addClass(gradientClasses[theme] || 'bg-slate-950');

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
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
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
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
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


  // ==========================================
  // ONLINE FAQ ASSISTANT MODULE (regex engine)
  // ==========================================
  const SUGGESTIONS = [
    "What are your packages?",
    "Do you provide hosting?",
    "How many revisions do I get?",
    "I need a custom feature"
  ];

  const assistantKnowledge = {
    intents: [
      {
        patterns: ["\\b(hi|hello|hey|greetings|morning|afternoon|evening)\\b"],
        responses: ["Hello! I am your personal AI assistant. How can I help you today?"]
      },
      {
        patterns: ["\\b(package|packages|pricing|cost|price|how much|fee|fees)\\b"],
        responses: ["I offer three main packages:\n\n• The Essential (Basic) for Rs. 5,000: Includes Tailwind CSS, Custom CSS, SEO, Responsive Design, and 2 Revisions.\n• The Prestige (Standard) for Rs. 10,000: Includes everything in Basic, plus Google Analytics, Security Configuration, 5 Revisions, Hosting Setup Assistance, and Deployment Guidance.\n• The Custom Package: Tailored pricing for complex requirements, enterprise features, advanced automation scripts, and unlimited revisions. Please contact me for a quote."]
      },
      {
        patterns: ["\\b(hosting|host|domain|deploy|deployment|server)\\b"],
        responses: ["For hosting, the client is responsible for platform costs. However, my Standard Package (Rs. 10,000) includes hosting account setup assistance and deployment guidance."]
      },
      {
        patterns: ["\\b(revision|revisions|changes|modify|edit)\\b"],
        responses: ["My Basic package includes 2 revision rounds, while the Standard package includes 5 revision rounds. Custom packages offer negotiated/unlimited revisions."]
      },
      {
        patterns: ["\\b(terms|conditions|policy|privacy|rules|legal)\\b"],
        responses: ["You can view my Privacy Policy and Terms of Service by clicking the links in the footer of my website. They cover information collection, source code ownership, liability, and payment terms."]
      },
      {
        patterns: ["\\b(contact|email|phone|whatsapp|reach|call|message)\\b"],
        responses: ["You can reach me via my LinkedIn profile (https://linkedin.com/in/kavin-eksith) for any inquiries or project discussions."]
      },
      {
        patterns: ["\\b(service|services|what do you do|offer|features)\\b"],
        responses: ["I craft bespoke, high-converting landing pages. My services also include the design of professional email templates, resumes, and business letterheads, alongside IT automation and cyber security consulting."]
      },
      {
        patterns: ["\\b(payment|pay|advance|deposit|money)\\b"],
        responses: ["I require a non-refundable advance payment of 50% of the total package fee before starting development. The remaining 50% is due upon project completion."]
      },
      {
        patterns: ["\\b(custom|feature|complex|enterprise)\\b"],
        responses: ["For custom features or enterprise solutions not listed in my standard packages, please contact me directly for a personalized consultation."]
      },
      {
        patterns: ["\\b(thank you|thanks|thx)\\b"],
        responses: ["You're very welcome! Let me know if you have any other questions."]
      },
      {
        patterns: ["\\b(bye|goodbye|see you)\\b"],
        responses: ["Goodbye! Have a great day. Feel free to reach out if you need anything else."]
      }
    ],
    fallback: "I'm sorry, I don't have the answer to that specific question. Please contact me directly via LinkedIn (https://linkedin.com/in/kavin-eksith) for more personalized assistance."
  };

  const $chatPanel = $('#chatPanel');
  const $chatMessages = $('#chatMessages');
  const $chatSuggestions = $('#chatSuggestions');
  const $chatInput = $('#chatInput');
  const $chatForm = $('#chatForm');

  // Load Suggestion Chips initially
  function renderSuggestions() {
    $chatSuggestions.empty();
    SUGGESTIONS.forEach(function (sug) {
      $chatSuggestions.append(`
        <button type="button" class="suggestion-chip text-xs px-3 py-1.5 rounded-full border border-gold-500/30 text-gold-300 hover:bg-gold-500/10 transition-colors">
          ${sug}
        </button>
      `);
    });
  }
  renderSuggestions();

  // Show/Hide Panel triggers
  $('#openChatBtn').on('click', function () {
    $(this).addClass('hidden');
    $chatPanel.removeClass('hidden');
    setTimeout(() => {
      $chatPanel.addClass('show').css('opacity', '1').removeClass('translate-y-4');
    }, 50);
  });

  $('#closeChatBtn').on('click', function () {
    $chatPanel.removeClass('show').addClass('translate-y-4').css('opacity', '0');
    setTimeout(() => {
      $chatPanel.addClass('hidden');
      $('#openChatBtn').removeClass('hidden');
    }, 300);
  });

  // Intent parsing logic matching React getBotResponse
  function getBotResponse(text) {
    const lowerText = text.toLowerCase();
    for (let i = 0; i < assistantKnowledge.intents.length; i++) {
      const intent = assistantKnowledge.intents[i];
      for (let j = 0; j < intent.patterns.length; j++) {
        const regex = new RegExp(intent.patterns[j], 'i');
        if (regex.test(lowerText)) {
          const responses = intent.responses;
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
    return assistantKnowledge.fallback;
  }

  // Handle messages output
  function sendMessage(text) {
    const sanitized = text.trim();
    if (!sanitized) return;

    if (sanitized.length > 500) {
      appendChatMessage('bot', "Your message is too long. Please try to be more concise.");
      return;
    }

    appendChatMessage('user', sanitized);
    $chatInput.val('');
    $chatSuggestions.addClass('hidden');

    // Simulate typing spinner delay
    const typingId = 'typing-' + Date.now();
    $chatMessages.append(`
      <div id="${typingId}" class="flex justify-start">
        <div class="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-tl-sm border border-slate-700 flex items-center gap-2">
          <i class="fa-solid fa-spinner animate-spin"></i>
          <span class="text-xs">Typing...</span>
        </div>
      </div>
    `);
    scrollMessagesBottom();

    setTimeout(function () {
      $(`#${typingId}`).remove();
      const botResponse = getBotResponse(sanitized);
      appendChatMessage('bot', botResponse);
    }, 600 + Math.random() * 400);
  }

  function appendChatMessage(type, text) {
    const isUser = (type === 'user');
    const bubbleClass = isUser 
      ? 'bg-gold-500 text-slate-950 rounded-tr-sm' 
      : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700';
    const wrapClass = isUser ? 'justify-end' : 'justify-start';

    $chatMessages.append(`
      <div class="flex ${wrapClass}">
        <div class="max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${bubbleClass}">
          ${text}
        </div>
      </div>
    `);
    scrollMessagesBottom();
  }

  function scrollMessagesBottom() {
    $chatMessages.animate({ scrollTop: $chatMessages[0].scrollHeight }, 200);
  }

  // Form submission & Suggestion Chip clicks
  $chatForm.on('submit', function (e) {
    e.preventDefault();
    sendMessage($chatInput.val());
  });

  $(document).on('click', '.suggestion-chip', function () {
    sendMessage($(this).text().trim());
  });
});
