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
- **JSON-driven content** — each division's projects, the technology grid, and the credentials section all live in JSON files under `data/`, loaded at runtime (no HTML edits to update them)
- **Technology grid** with hover-animated, liquid-glass tech icons — JSON-driven (`data/site/technologies.json`)
- **Credentials & certifications** section with tabbed categories, academic history and languages — JSON-driven (`data/site/credentials.json`)
- **Connect section** — social links (LinkedIn, GitHub, Portfolio, Medium) rendered as glass cards, with the first row mirrored in the footer
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
│   ├── site/                        # technologies.json (tech grid), credentials.json (certs, education, languages)
│   ├── web/                         # real-world.json, personal.json, templates.json, dummy.json, manifest.json
│   ├── portfolio/                   # portfolio.json, manifest.json
│   ├── cli/                         # networking.json, sysadmin.json, privacy.json,
│   │                                 # task-management.json, it-support.json, manifest.json
│   └── github/                      # java-spring.json, testing-qa.json, static-site.json,
│                                     # misc.json, manifest.json
├── assets/
│   ├── css/styles.css             # Compiled CSS (sass assets/scss/styles.scss assets/css/styles.css)
│   ├── scss/styles.scss           # Source SCSS
│   └── js/
│       ├── main.js                  # Homepage interactivity: nav, reveal animations, canvas
│       │                             # background, dynamic project/social/technology/credentials rendering
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

## ➕ Adding & Managing Projects

Everything on the homepage and the catalog pages comes from `data/**/*.json`. Add an object to the `projects` array of the right file and it appears everywhere — no HTML or JS edits.

| What you're adding | File |
| --- | --- |
| Client / real-world work | `data/web/real-world.json` |
| **Your own personal projects** | `data/web/personal.json` |
| Reusable templates | `data/web/templates.json` |
| Concept / dummy sites | `data/web/dummy.json` |
| Featured portfolio work | `data/portfolio/portfolio.json` |

```json
{
  "id": "my-project",
  "title": "My Project",
  "category": "personal",
  "tags": ["Tool", "Automation"],
  "lang": "TypeScript",
  "status": "ongoing",
  "description": "One or two sentences.",
  "live_preview": "https://example.com/",
  "source_code": "https://github.com/kavineksith/my-project"
}
```

- **`status`** — `pending`, `ongoing`, `hold` (freeze / on hold) or `completed`. Missing = `completed`. Aliases such as `in-progress`, `frozen`, `paused` and `done` are understood.
- **Languages** — read from the `source_code` GitHub link (top languages, ≥5% of the repo). `lang` is only a fallback when there is no GitHub link or the API is unavailable.
- **Optional fields** — `icon` (Font Awesome class), `featured: true` (pins to the top of the homepage), `languages` (manual override). Portfolio entries also support `year`, `role`, `stack[]` and `highlights[]`.
- **New category file?** Create `data/<division>/<name>.json` and list it in that division's `manifest.json`. Empty files are fine.
- The homepage shows up to 6 projects from `data/web/` (featured first, then real-world → personal → templates → dummy) and its status chips filter the whole set.

### Language detection & GitHub rate limits

By default the browser calls the GitHub API once per repo and caches the result for 24 hours. Anonymous API access is limited to 60 requests/hour per IP, so for zero runtime calls bake the languages into the JSON instead:

```bash
GITHUB_TOKEN=ghp_xxx python3 scripts/update_languages.py
```

Projects with a baked `languages` array are never fetched at runtime.

## 🧩 Managing Technologies & Credentials

The **Technologies** grid and the **Credentials** section on `index.html` are rendered from two JSON files in `data/site/`. To update either one, edit the JSON only — `index.html` just contains empty containers (`#tech-grid`, `#cred-tabs`, `#cred-tab-contents`, `#academic-list`, `#languages-list`) that `assets/js/main.js` fills in on page load.

| What you're changing | File |
| --- | --- |
| Technology icons in the grid | `data/site/technologies.json` |
| Certifications, academic history, languages | `data/site/credentials.json` |

### `data/site/technologies.json`

```json
{
  "groups": [
    {
      "id": "programming-languages",
      "label": "Programming Languages",
      "items": [
        { "name": "Python", "icon": "py" }
      ]
    }
  ]
}
```

- **`groups`** — organizational only (keeps the file easy to scan). The page renders every item as one continuous grid, in file order, and tags each card with `data-group`.
- **`name`** — shown as the hover tooltip and the image `alt` text.
- **`icon`** — the [skillicons.dev](https://skillicons.dev) icon ID (e.g. `py`, `js`, `docker`, `githubactions`). Only letters, numbers, `-` and `_` are accepted.
- **Add a technology:** append `{ "name": "...", "icon": "..." }` to the right group's `items`. **Add a group:** add a new object with `id`, `label` and `items`.

### `data/site/credentials.json`

```json
{
  "tabs": [
    {
      "id": "security-gov",
      "label": "Cybersecurity & Governance",
      "heading": "Cybersecurity & Governance Certification Track",
      "items": ["Cisco CyberOps Associate"]
    }
  ],
  "academic": [
    {
      "title": "Pearson BTEC Level 5 HND in Computing",
      "institution": "ESOFT Metro Campus",
      "period": "2021 – 2023",
      "grade": "Merit"
    }
  ],
  "languages": [
    { "name": "English", "proficiency": "Full Working Proficiency" }
  ]
}
```

- **`tabs`** — one object per certification tab, shown in file order; the first tab is active by default.
  - `id` — unique slug (letters, numbers, `-`, `_`), used to link the tab button to its panel.
  - `label` — text on the tab button. `heading` — title inside the panel (falls back to `label`).
  - `items` — plain-text certification names, one per line item. Add a new certification by appending a string.
- **`academic`** — `title`, `institution`, `period` are shown on every entry; `grade` is optional and renders as a badge.
- **`languages`** — `name` and `proficiency`.

### Notes

- All values are inserted as escaped text, so plain characters like `&` and `<` are safe to type directly in the JSON (no `&amp;` needed).
- The JSON is loaded with `fetch`, so test locally through `python3 -m http.server`, not `file://`.
- If a file is missing or invalid JSON, that section shows a short "could not be loaded" message and the error is logged to the browser console.
- Validate edits quickly with `python3 -m json.tool data/site/technologies.json` (and the same for `credentials.json`).
