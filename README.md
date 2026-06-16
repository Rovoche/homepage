# ROVOCHÉ Studio — Homepage

**Built on Rock.**

Premium web design studio — Lagos · London · New York.

---

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo auto-deploys via GitHub Actions on every push to `main`.

**One-time setup:**

1. Go to your repo → **Settings → Pages**
2. Under *Source*, select **GitHub Actions**
3. Push to `main` — the site builds and deploys automatically

**Repo name matters:**  
The `base` in `vite.config.ts` is set to `/homepage/` — matching `rovoche.github.io/homepage`.  
If your repo has a different name, update that value accordingly.

## Media files

Place your video and image assets directly in the `public/` folder:

```
public/
  Rov-Intro.mp4
  rov-2.mp4
  ROV-1.mp4
  ROV-rock.mp4
  ROVOCHE-FAVICON.png
  SBL-SCC.png
  KIKI-SCC.png
  TSH-SCC.png
  PEASIS-SCC.png
```

These are not included in this repo due to file size. Upload them manually or via Git LFS.
