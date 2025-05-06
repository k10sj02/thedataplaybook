````markdown
# Developer Notes – Hugo + NPM Setup

This file documents the custom dev setup for this Hugo project using npm scripts.

---

## 🧪 Local Development

Running:

```bash
npm run dev
````

* Launches a local Hugo server with live reload at: [http://localhost:1313](http://localhost:1313)
* Watches for content, layout, and config changes
* This is the main workflow used while writing or editing posts

---

## 🚀 Production Build

Running:

```bash
npm run build
```

* Generates the static site into the `public/` folder
* Used when preparing the site for deployment (e.g. GitHub Pages)

---

## 🔍 Draft/Preview Mode

Running:

```bash
npm run preview
```

* Includes draft and future-dated posts in the local build
* Helpful for testing unpublished or scheduled content

---

## 🧼 Clean Build Folder

Running:

```bash
npm run clean
```

* Deletes the `public/` folder
* Useful before a fresh production build

---

## ⚙️ Scripts in `package.json`

These scripts are defined:

```json
"scripts": {
  "dev": "hugo server",
  "build": "hugo",
  "preview": "hugo --buildDrafts --buildFuture",
  "clean": "rm -rf public"
}
```

---

## ⚠️ Suppressed Warnings

To suppress `Raw HTML omitted` warnings from Hugo, this line was added to `hugo.yaml`:

```yaml
ignoreLogs: ['warning-goldmark-raw-html']
```

---

*Last updated: May 2025 by Stann*