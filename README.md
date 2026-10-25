# TEEMCHASE Links

Official creator links website for TeemChase, with a responsive gold-and-black design.

**Live site:** https://pauzedevs.github.io/teemchase/

## Pages

- `index.html` — main creator link hub
- `music.html` — streaming links and GREEN single artwork
- `youtube.html` — latest upload card and official YouTube channel link
- `style.css` — shared responsive styling
- `reveal.js` — scroll reveals, respecting reduced-motion settings
- `data/latest-video.json` — metadata for the latest YouTube upload
- `.github/workflows/update-latest-video.yml` — scheduled metadata updater

## Latest YouTube upload

GitHub Actions checks the `@teemchase` channel every six hours and updates `data/latest-video.json` using yt-dlp. The website reads this static JSON file; visitors do not trigger a YouTube metadata request or an Actions run.

A workflow can also be started manually from the Actions tab. GitHub Pages may take a short time to publish committed updates.

## Run locally

Serve the repository with a local static HTTP server (rather than opening files directly) so the latest-video JSON can be fetched. For example:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/.
