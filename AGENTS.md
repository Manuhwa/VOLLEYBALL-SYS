# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Static HTML/CSS/vanilla-JS web app — **Bulldogs Volleyball Club Player Evaluation System**. No build step, no package manager, no framework. Three pages: `index.html` (player self-eval form), `view.html` (read-only submissions), `coach.html` (coach login + comment editing).

### Running the dev server

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/index.html` in Chrome. All three pages are served from the project root.

### Backend (Google Apps Script)

Data persistence requires a deployed Google Apps Script web app (see `SETUP.md`). Without it, form submission shows an alert and view/coach pages display a config message. The frontend is fully functional for UI development without the backend.

### Coach login

The coach password is hardcoded in `coach.html` as `bulldogs2025`.

### Key files

| File | Purpose |
|------|---------|
| `config.js` | Runtime config — `SUBMIT_URL`, `VIEW_URL`, `FORM_URL` |
| `script.js` | Form submission + WhatsApp share logic |
| `styles.css` | All styles |
| `Code.gs` | Google Apps Script backend (not run locally) |
| `SETUP.md` | Full setup guide for Google Sheets backend + hosting |

### Lint / Test / Build

- **No linter configured** — pure HTML/CSS/JS with no tooling.
- **No automated tests** — manual browser testing only.
- **No build step** — `netlify.toml` confirms: `command = "echo 'Static site — no build required'"`.

### Gotchas

- The `LOGO.jpg` filename is referenced as `logo.jpg` (lowercase) in `index.html`. On case-sensitive filesystems, the logo won't render. The actual file is `LOGO.jpg`.
- The application source lives on the `master` branch. The `main` branch originally only contained `README.md` and the GitHub Pages workflow.
