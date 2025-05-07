# Submodule Setup and Customization for PaperMod Theme

## Overview

This document outlines the steps taken to successfully integrate the PaperMod theme as a submodule in the `thedataplaybook` repository, customize it, and maintain the submodule moving forward. The goal is to ensure a smooth process for updating the theme in the future while keeping customizations intact.

## Step 1: Initial Setup

* The PaperMod theme was initially added as a submodule.
* The submodule was added from the custom fork repository `https://github.com/k10sj02/hugo-PaperMod.git` (a fork of the original PaperMod theme by `adityatelange`).

### Submodule Add Command

```bash
git submodule add https://github.com/k10sj02/hugo-PaperMod.git themes/PaperMod
```

## Step 2: Customizing the Theme

### Layout Overriding

* Customizations were made by overriding specific layouts from the PaperMod theme, rather than directly modifying files within the submodule.
* The `footer.html` layout was copied into the main repository to allow easy editing without modifying the submodule directly.

### Steps to Override Layout:

1. Create the `layouts/partials/` directory:

   ```bash
   mkdir -p layouts/partials/
   ```

2. Copy the desired layout file (e.g., `footer.html`) from the submodule:

   ```bash
   cp themes/PaperMod/layouts/partials/footer.html layouts/partials/
   ```

3. Edit the copied layout file as needed in the `layouts/partials/` directory.

4. Reset changes within the submodule to return to a clean state:

   ```bash
   cd themes/PaperMod
   git restore .
   ```

5. Commit and push the changes to the main repository:

   ```bash
   git add layouts/partials/footer.html
   git commit -m "Override footer layout with custom version"
   git push origin main
   ```

## Step 3: Managing the Submodule

### Ensuring the Submodule is Clean

* The submodule was re-added after removing a broken version.
* The `.gitmodules` file was updated to link to the correct submodule URL (`https://github.com/k10sj02/hugo-PaperMod.git`).
* The submodule status was verified to ensure that everything is correctly set up.

### Pushing Submodule Changes

* Changes to the submodule, including adding and updating files, are committed and pushed to the main repository with the following steps:

  ```bash
  git add .gitmodules themes/PaperMod
  git commit -m "Re-add PaperMod submodule"
  git push origin main
  ```

### Updating the Submodule (for future changes)

To update the submodule in the future, you can pull the latest changes from the theme repository with the following commands:

```bash
git submodule update --remote themes/PaperMod
git add themes/PaperMod
git commit -m "Update PaperMod theme to latest version"
git push origin main
```

## Step 4: Clean Workflow for the Future

### Future Customizations

For long-term maintainability, it's recommended to continue overriding layouts and other theme elements directly within the main repository (outside of the submodule), to avoid modifying the submodule itself.

1. If you want to customize a new layout, repeat the process of copying the layout from `themes/PaperMod` into the `layouts/` directory in your repo and edit it there.
2. Ensure that you restore the original theme state in the submodule to avoid unwanted changes:

   ```bash
   cd themes/PaperMod
   git restore .
   ```

### Future Submodule Management

To update the submodule, you can follow these steps:

1. Pull the latest changes from the PaperMod theme:

   ```bash
   git submodule update --remote themes/PaperMod
   ```
2. Add and commit the submodule changes:

   ```bash
   git add themes/PaperMod
   git commit -m "Update PaperMod submodule"
   git push origin main
   ```

### Notes on the Custom Fork

* The submodule points to your custom fork of the PaperMod theme at `https://github.com/k10sj02/hugo-PaperMod.git`. This allows you to maintain a separate version of the theme and make custom changes without affecting the original theme repository.
* If the original theme repository (adityatelange/hugo-PaperMod) receives updates that you want to incorporate, you can use the above update process to sync your fork with the latest changes.

## Branch Naming Convention

### Transition from `master` to `main`

* **Default Branch Change**: As of 2025, the default branch for this repository has been switched from `master` to `main`. All future development should take place on the `main` branch.
* **Submodule Update**: The PaperMod submodule also follows the new naming convention and points to the `main` branch instead of `master` for both the custom fork (`https://github.com/k10sj02/hugo-PaperMod.git`) and the original repository (`https://github.com/adityatelange/hugo-PaperMod.git`).

When interacting with the repository and its submodule in the future, be sure to use `main` as the default branch name for consistency and clarity.