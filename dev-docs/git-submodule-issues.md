date: 2025-05-07

### Submodule Reference Issue: Fixing Nested Submodule Paths

1. **Issue Description**:
   The submodule reference for `themes/PaperMod` was incorrect, which led to nested submodule paths like `themes/PaperMod/themes/PaperMod/themes/PaperMod`. This caused the repository to behave unexpectedly when trying to commit changes.

2. **Steps Taken**:

   * Run `git submodule update --checkout themes/PaperMod` to reset the submodule.
   * Add the submodule changes with `git add themes/PaperMod`.
   * Commit the changes with the message "Update PaperMod submodule reference".
   * Push the changes to the remote with `git push origin main`.
   * Verify the repository status with `git status` to ensure everything is clean.

3. **Final Outcome**:
   The submodule reference was successfully fixed, and the repository is now clean with no further changes pending.

4. **Lessons Learned**:
   It's important to manage submodule references carefully, especially when they get updated or changed. Always verify submodule paths and ensure references are up to date to avoid nested submodule issues like this.
