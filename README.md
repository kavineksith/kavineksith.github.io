# Kavin Eksith — Full-Stack Developer, Cybersecurity & Automation Expert

🔗 **Live site:** [kavineksith.github.io](https://kavineksith.github.io)

A premium, light "liquid glass" themed personal portfolio showcasing full-stack web development, cybersecurity, and cloud infrastructure experience — complete with a technology grid, project showcase, and credentials/certifications section.

---

## ✨ Features

- **Liquid glass UI** — soft white/blue background with blurred gradient accents and frosted glassmorphism panels (cards, tabs, modals, nav) throughout
- **Animated Canvas background** for the hero section, with time-of-day and festival-aware color themes
- **Project showcase** with hover-interactive, glass-tinted cards and a "View All Projects" modal
- **Technology grid** with hover-animated, liquid-glass tech icons
- **Credentials & certifications** section with tabbed categories
- **Connect section** — social links (LinkedIn, GitHub, Portfolio, Medium) rendered as glass cards, plus matching footer icons
- **Scroll-reveal animations** and sticky header with scroll-aware styling
- **Security-hardened by default** — ships with `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` meta tags
- **SEO-ready** — Open Graph & Twitter Card meta tags, canonical URL, JSON-LD structured data, descriptive keywords
- Built with **Tailwind CSS**, **custom SCSS**, and **jQuery**

## 🗂️ Project Structure

```
.
├── index.html                  # Main portfolio page (Hero, About, Tech, Projects, Credentials, Connect)
├── assets/
│   ├── css/styles.css            # Compiled CSS (sass assets/scss/styles.scss assets/css/styles.css)
│   ├── scss/styles.scss          # Source SCSS
│   └── js/main.js                # Site interactivity: nav, reveal animations, canvas background, dynamic content rendering
├── images/                      # OG/social share images & favicons (see seo-and-repo-notes.md)
├── LICENSE
└── README.md
```

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) + custom SCSS |
| Interactivity | jQuery, Canvas API |
| Fonts | Sora, DM Serif Display, Raleway (Google Fonts) |
| Hosting | GitHub Pages |

## 🚀 Getting Started

Clone the repo and open `index.html` directly, or serve locally:

```bash
git clone https://github.com/kavineksith/kavineksith.github.io.git
cd kavineksith.github.io
# open index.html in your browser, or use a simple local server:
python3 -m http.server 8000
```

If you edit `assets/scss/styles.scss`, recompile it to CSS:

```bash
sass assets/scss/styles.scss assets/css/styles.css
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

**Kavin Eksith**
[LinkedIn](https://linkedin.com/in/kavin-eksith)
