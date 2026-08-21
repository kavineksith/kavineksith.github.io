# Kavin Eksith — Freelance Full-Stack Developer, Cybersecurity & Automation Expert

🔗 **Live site:** [kavineksith.github.io](https://kavineksith.github.io)

A premium, gold-and-slate themed freelance portfolio showcasing full-stack web development, IT automation, cybersecurity consulting, and cloud infrastructure services — complete with a service catalog, package pricing, credentials, project showcase, and an on-site rule-based AI assistant that answers visitor questions.

---

## ✨ Features

- **Premium dark UI** — deep slate background with animated gold/purple gradient blobs and glassmorphism panels
- **Built-in AI chat assistant** — a lightweight, rule-based Q&A widget (`assistantKnowledge` in `main.js`) that answers questions about skills, services, certifications, projects, and pricing packages without any external API calls
- **Animated Canvas background** for the hero section
- **Service catalog** with detailed package/pricing comparison tables and feature checklists
- **Project showcase** with hover-interactive cards
- **Technology grid** with hover-animated tech icons
- **Credentials & certifications** section
- **Scroll-reveal animations** and sticky header with scroll-aware styling
- **Contact form section**
- **Security-hardened by default** — ships with `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` meta tags
- **SEO-ready** — Open Graph & Twitter Card meta tags, canonical URL, descriptive keywords
- Built with **Tailwind CSS**, **custom SCSS**, and **jQuery**

## 🗂️ Project Structure

```
.
├── index.html                  # Main portfolio page (Hero, About, Tech, Services, Projects, Packages, Credentials, Contact)
├── assets/
│   ├── css/styles.css            # Compiled CSS (sass assets/scss/styles.scss assets/css/styles.css)
│   ├── scss/styles.scss          # Source SCSS
│   └── js/main.js                # Site interactivity: nav, reveal animations, canvas background, AI assistant
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
| Chat Assistant | Vanilla JS pattern-matching (`main.js`), no external API |
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
