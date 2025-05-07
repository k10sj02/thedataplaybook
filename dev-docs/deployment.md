# 🚀 Deploying Hugo to GitHub Pages with GitHub Actions

This project uses **GitHub Actions** to build and deploy a [Hugo](https://gohugo.io/) site directly from the `main` branch. No need for a separate `gh-pages` branch — everything is automated using GitHub's modern Pages deployment infrastructure.

## ✅ Summary

- Builds the Hugo site on every push to `main`
- Uses a GitHub Actions workflow defined in `.github/workflows/deploy.yml`
- Deploys to GitHub Pages via the `github-pages` environment
- Serves site at custom domain: [https://stannomarjones.com](https://stannomarjones.com)

## 🛠️ Deployment Workflow

Key points about the workflow:

- Triggered by pushes to `main`
- Uses latest Hugo CLI and Dart Sass
- Builds site into the `./public` directory
- Deploys via `actions/deploy-pages@v4`

### Workflow file: `.github/workflows/deploy.yml`

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.147.2
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo --gc --minify --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
````

## 🌐 GitHub Pages Settings

* **Pages source**: GitHub Actions
* **Custom domain**: `stannomarjones.com`
* **Enforce HTTPS**: ✅ Enabled
* **Last deployed by**: `@k10sj02`

## 🧹 Cleanup: Removed Legacy Branch

To fully transition to the modern workflow, the legacy `gh-pages` branch was removed:

```bash
# Fetch all refs
git fetch --all

# Delete remote branch
git push origin --delete gh-pages
```

This branch is no longer necessary because deployments are handled via the `github-pages` environment.

## ✅ Final Notes

* Hugo builds and deploys automatically on `main` updates.
* Monitor deployments via the **Actions → Deploy Hugo site to Pages** tab on GitHub.
* For troubleshooting custom domain setup, visit [Pages Docs](https://docs.github.com/en/pages).`# 🚀 Deploying Hugo to GitHub Pages with GitHub Actions

This project uses **GitHub Actions** to build and deploy a [Hugo](https://gohugo.io/) site directly from the `main` branch. No need for a separate `gh-pages` branch — everything is automated using GitHub's modern Pages deployment infrastructure.

## ✅ Summary

- Builds the Hugo site on every push to `main`
- Uses a GitHub Actions workflow defined in `.github/workflows/deploy.yml`
- Deploys to GitHub Pages via the `github-pages` environment
- Serves site at custom domain: [https://stannomarjones.com](https://stannomarjones.com)

## 🛠️ Deployment Workflow

Key points about the workflow:

- Triggered by pushes to `main`
- Uses latest Hugo CLI and Dart Sass
- Builds site into the `./public` directory
- Deploys via `actions/deploy-pages@v4`

### Workflow file: `.github/workflows/deploy.yml`

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.147.2
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo --gc --minify --baseURL "${{ steps.pages.outputs.base_url }}/"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
````

## 🌐 GitHub Pages Settings

* **Pages source**: GitHub Actions
* **Custom domain**: `stannomarjones.com`
* **Enforce HTTPS**: ✅ Enabled
* **Last deployed by**: `@k10sj02`

## 🧹 Cleanup: Removed Legacy Branch

To fully transition to the modern workflow, the legacy `gh-pages` branch was removed:

```bash
# Fetch all refs
git fetch --all

# Delete remote branch
git push origin --delete gh-pages
```

This branch is no longer necessary because deployments are handled via the `github-pages` environment.

## ✅ Final Notes

* Hugo builds and deploys automatically on `main` updates.
* Monitor deployments via the **Actions → Deploy Hugo site to Pages** tab on GitHub.
* For troubleshooting custom domain setup, visit [Pages Docs](https://docs.github.com/en/pages).`