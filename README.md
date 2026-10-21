# Kavin Eksith — Full-Stack Developer, Cybersecurity & Automation Expert

🔗 **Live site:** [kavineksith.github.io](https://kavineksith.github.io)

A premium, light "liquid glass" themed personal portfolio showcasing full-stack web development, cybersecurity, and cloud infrastructure experience — complete with a technology grid, project showcase, credentials/certifications section, and a searchable multi-page project catalog spanning live web projects, CLI/sysadmin tools, and GitHub-only repositories.

---

## ✨ Features

- **Liquid glass UI** — soft white/blue background with blurred gradient accents and frosted glassmorphism panels (cards, tabs, nav) throughout
- **Animated Canvas background** for the hero section, with time-of-day and festival-aware color themes
- **Project showcase** on the homepage with hover-interactive, glass-tinted cards, plus a dedicated multi-page catalog for the full project list (no popup modal)
- **Four project divisions**, each with its own searchable, filterable page under `pages/`:
  - **Live Web Projects** — real-world client sites, dummy/concept landing pages, personal templates
  - **CLI & Sysadmin Tools** — networking, sysadmin, privacy-focused, and daily task management tools built with Python and Shell scripting
  - **GitHub Projects** — Java/Spring Boot services, testing & QA demos, static sites, and other repositories without a live deployment
  - **Portfolio Projects** — featured work with role, year, tech stack and highlights (`pages/portfolio-projects.html`, `data/portfolio/`)
- **Search & filter** on every catalog page — filter by category, language, and live-preview/source-code availability, with input validation and XSS-safe rendering
- **JSON-driven content** — each division's projects, the technology grid, technical skills, and the credentials section all live in JSON files under `data/`, loaded at runtime (no HTML edits to update them)
- **Technology grid** with hover-animated, liquid-glass tech icons — JSON-driven (`data/site/technologies.json`)
- **Technical Skills & Capabilities** and **Professional Experience** in the About section — skills are JSON-driven (`data/site/skills.json`)
- **Credentials & certifications** section with 5 swipe/drag-scrollable tabs (touch swipe on mobile, click-and-drag with the mouse), academic history and languages — JSON-driven (`data/site/credentials.json`)
- **Readable text selection** — dark brand-blue highlight with white text (≈10:1 contrast) across all pages
- **Connect section** — social links rendered as glass cards from `data/site/socials.json`, with the first few mirrored in the footer
- **One shared footer on every page** — `partials/footer.html` is loaded into the homepage and all `pages/*.html` by `assets/js/footer.js`, so it is edited in a single place
- **About sidebar** — profile card, core-strengths chips (`data/site/about.json`) and a call-to-action card that stretches so both columns end level
- **Home button & consistent navigation** across every page, with a responsive navbar that adapts cleanly from mobile through shrunk desktop windows up to full width
- **Scroll-reveal animations** and sticky header with scroll-aware styling
- **Security-hardened by default** — ships with `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` meta tags
- **SEO-ready** — Open Graph & Twitter Card meta tags, canonical URL, JSON-LD structured data, descriptive keywords
- Built with **Tailwind CSS**, **custom SCSS**, and **jQuery**

## 🗂️ Project Structure

```
.
├── index.html                     # Main portfolio page (Hero, About, Tech, Projects, Credentials, Connect)
├── pages/                         # Multi-page project catalog
│   ├── projects.html                # Hub page linking the three project divisions
│   ├── web-projects.html            # Division 1: live web projects (searchable/filterable)
│   ├── cli-projects.html            # Division 2: CLI & sysadmin tools (searchable/filterable)
│   ├── github-projects.html         # Division 3: GitHub-only repositories (searchable/filterable)
│   └── portfolio-projects.html      # Division 4: featured portfolio projects (searchable/filterable)
├── data/                          # JSON data consumed by the homepage and catalog pages
│   ├── site/                        # technologies.json, skills.json, credentials.json, about.json (strength chips), socials.json (social links)
│   ├── web/                         # real-world.json, personal.json, templates.json, dummy.json, manifest.json
│   ├── portfolio/                   # portfolio.json, manifest.json
│   ├── cli/                         # networking.json, sysadmin.json, privacy.json,
│   │                                 # task-management.json, it-support.json, manifest.json
│   └── github/                      # java-spring.json, testing-qa.json, static-site.json,
│                                     # misc.json, manifest.json
├── partials/
│   └── footer.html                # Shared footer, injected on every page by assets/js/footer.js
├── assets/
│   ├── css/styles.css             # Compiled CSS (sass assets/scss/styles.scss assets/css/styles.css)
│   ├── scss/styles.scss           # Source SCSS
│   └── js/
│       ├── main.js                  # Homepage interactivity: nav, reveal animations, canvas
│       │                             # background, dynamic project/social/technology/skills/credentials rendering
│       ├── footer.js                # Loads partials/footer.html + socials into <div id="site-footer"> on every page
│       ├── project-core.js          # Shared: JSON loading, status model, GitHub language detection
│       └── project-catalog.js       # Shared search/filter/render logic for all pages/*.html
├── scripts/update_languages.py    # Optional: bake GitHub languages into the JSON files
├── images/                        # OG/social share images & favicons
├── LICENSE
└── README.md
```

Each `data/<division>/manifest.json` lists that division's category files by filename only; `project-catalog.js` resolves each one relative to the manifest's own location, so the data folder stays portable regardless of how deeply a page is nested.

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) + custom SCSS |
| Interactivity | jQuery, Canvas API |
| Data | Static JSON, fetched client-side (projects per division, plus technologies & credentials) |
| Fonts | Sora, DM Serif Display, Raleway (Google Fonts) |
| Hosting | GitHub Pages |

## 🚀 Getting Started

Clone the repo and serve it locally (the catalog pages fetch JSON via `fetch`/`$.getJSON`, which requires `http://` rather than `file://`):

```bash
git clone https://github.com/kavineksith/kavineksith.github.io.git
cd kavineksith.github.io
python3 -m http.server 8000
# then open http://localhost:8000/
```

If you edit `assets/scss/styles.scss`, recompile it to CSS:

```bash
sass assets/scss/styles.scss assets/css/styles.css
```

### Adding or editing a project

1. Open the relevant category file under `data/web/`, `data/cli/`, or `data/github/`.
2. Add a project object with `id`, `title`, `category`, `tags`, `lang`, `description`, `source_code`, and `live_preview` (use `""` for either link if it doesn't apply — the UI hides that button automatically).
3. No HTML or JS changes are needed; the corresponding `pages/*.html` page picks it up automatically via its manifest.

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-3B82F6.svg)](LICENSE)

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for the full text. You're free to use, modify, and distribute this code (including as a starting point for your own portfolio), with attribution appreciated but not required.

## 📬 Contact

**Kavin Eksith**
Full-Stack Developer · Cybersecurity & Automation Enthusiast

Feel free to reach out about collaborations, freelance work, or just to talk shop on any of the platforms below.

| Platform | Link |
|---|---|
| 💼 LinkedIn | [linkedin.com/in/kavin-eksith](https://linkedin.com/in/kavin-eksith) |
| 💻 GitHub | [github.com/kavineksith](https://github.com/kavineksith) |
| 🌐 Portfolio | [kavineksith.github.io](https://kavineksith.github.io) |
| ✍️ Medium | [kavineksith.medium.com](https://kavineksith.medium.com) |

---

<p align="center">
  <sub>Built with care by Kavin Eksith — if this project helped you, consider leaving a ⭐</sub>
</p>
