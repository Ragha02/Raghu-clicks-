# Raghu's Clicks — Digital Adobe

A personal photography portfolio showcasing clouds, skies, and moments at **KL University, Vijayawada** — captured by **Raghu** over 4+ years (2022–2026).

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub repo
1. Go to [github.com](https://github.com) → **New repository**
2. Name it `raghus-clicks` (or anything you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Upload files
In the repo, click **"uploading an existing file"** and drag-drop:
- `index.html`
- `style.css`
- `script.js`
- All `.webp` images from this folder

Or use Git:
```bash
cd "/Users/raghu/Desktop/Clouds & KLu"
git init
git add index.html style.css script.js *.webp PANO*.webp dji_mimo*.webp Untitled.webp image.webp
git commit -m "Initial deploy: Raghu's Clicks"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/raghus-clicks.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to repo → **Settings** → **Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)`
3. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/raghus-clicks/
```
(Takes ~2 minutes to go live)

---

## Local Preview
Just open `index.html` in any browser — no server needed.
