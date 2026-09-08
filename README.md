# Ali Awwad — Portfolio

Single-page personal portfolio. Plain HTML/CSS/JS — no framework, no build step.
Fonts load from Google Fonts; everything else is in this repo.

## Structure

```
index.html            markup only + <link>/<script> tags
assets/
  styles.css          all styles (design tokens, layout, light/dark themes)
  Ali-Awwad-CV.pdf     the CV the "Download CV" button links to
js/
  nav.js              mobile hamburger menu
  theme.js            light/dark toggle
.nojekyll             tells GitHub Pages to serve files as-is
```

A tiny inline script in `<head>` applies a saved light/dark choice before the
first paint (avoids a flash); `js/theme.js` handles the toggle button after load.

## Run locally

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

(Opening `index.html` directly with `file://` also works, but a local server
matches how GitHub Pages serves it.)

## Deploy to GitHub Pages

1. Create an empty repo on GitHub (e.g. `ali-awwad-portfolio`) — no README/license.
2. Push:

   ```bash
   git remote add origin https://github.com/<your-username>/ali-awwad-portfolio.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Source: "Deploy from a branch"**, branch
   `main`, folder `/ (root)`. Save.
4. Live at `https://<your-username>.github.io/ali-awwad-portfolio/` in ~1 minute.

To serve it at the bare `https://<your-username>.github.io/`, name the repo
`<your-username>.github.io`.

Custom domain: Settings → Pages → Custom domain, then point a DNS `CNAME` record
at `<your-username>.github.io`.

## Editing

| Change | Where |
|---|---|
| Hero text, links, section copy | `index.html` |
| Colors, spacing, fonts, animations | `assets/styles.css` |
| Swap the CV | replace `assets/Ali-Awwad-CV.pdf` (keep the name, or update the `href` in `index.html`) |
| Toggle / menu behavior | `js/theme.js`, `js/nav.js` |
