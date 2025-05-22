# Developer Notes – Hugo + NPM Setup

This file documents the custom dev setup for this Hugo project using npm scripts.

---

## 🧪 Local Development

Running:

```bash
npm run dev
```

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
* Runs Hugo in production mode
* Used when preparing the site for deployment (e.g. GitHub Pages)

---

## 🔍 Draft/Preview Mode

Running:

```bash
npm run preview
```

* Starts a local server that includes draft and future-dated posts
* Disables fast render to ensure all changes are captured
* Ideal for testing unpublished or scheduled content

---

## 🆕 Create New Draft Post

Running:

```bash
npm run new:draft -- "post-title-here"
```

* Creates a new markdown file under `content/posts/` with frontmatter set to `draft: true`
* Uses the Hugo `new` command to initialize the file
* Replace `"post-title-here"` with your desired slug (no spaces)

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
  "build": "hugo",
  "dev": "hugo server",
  "preview": "hugo server --buildDrafts --buildFuture --disableFastRender",
  "clean": "rm -rf public",
  "new:draft": "hugo new content/posts/$npm_config_slug.md"
}
```

To use `new:draft`, pass `--slug=your-title`:

```bash
npm run new:draft --slug="my-new-post"
```

---

## ⚠️ Suppressed Warnings

To suppress `Raw HTML omitted` warnings from Hugo, this line was added to `hugo.yaml`:

```yaml
ignoreLogs: ['warning-goldmark-raw-html']
```

Here’s a concise note you can add to your dev notes:

---

### 📝 Working with Unfinished Posts

To keep a post unpublished while it's still in progress, use the `draft: true` flag in the front matter of your Markdown file:

```yaml
---
title: "My Post Title"
date: 2025-05-22
draft: true
---
```

This prevents Hugo from publishing the post when you build or deploy the site.
✅ Use `--buildDrafts` when running `hugo` locally to preview these draft posts:

```bash
hugo server --buildDrafts
```

Once you're ready to publish, just remove or change `draft: true` to `draft: false` or delete the line entirely.


---

*Last updated: May 22, 2025 by Stann*