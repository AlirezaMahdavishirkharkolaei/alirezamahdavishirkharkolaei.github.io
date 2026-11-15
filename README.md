# alirezamahdavishirkharkolaei.github.io

Personal academic website of **Alireza Mahdavishirkharkolaei**, LL.M.: legal researcher in international trade law, tax havens and legal technology.

**Live:** https://alirezamahdavishirkharkolaei.github.io/

A static site with no build step: `index.html`, `assets/site.css` and `assets/site.js`. It is served by GitHub Pages from the `main` branch.

## Editing

- **Content** lives in `index.html`, one `<section>` per part of the page.
- **Contact form:** without configuration, it opens the visitor's e-mail app with the message filled in. To receive messages directly, create a free form at [formspree.io](https://formspree.io) and put its id in `FORMSPREE_ID` at the top of `assets/site.js`.
- **Photo:** `assets/alireza-mahdavishirkharkolaei.jpg` and `.webp` (640×800). `assets/og-image.jpg` (1200×630) is the preview image shown when the link is shared.

Run it locally with `python3 -m http.server`, then open http://localhost:8000.
