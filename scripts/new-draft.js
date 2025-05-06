const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise((res) => rl.question(q, res));

(async () => {
  const title = await ask("📝 Title: ");
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const filename = `${slug}.md`;
  const filePath = path.join("content", "posts", filename);

  if (fs.existsSync(filePath)) {
    console.log("⚠️  A post with this slug already exists.");
    rl.close();
    return;
  }

  const date = new Date().toISOString();
  const frontMatter = `---
title: "${title}"
date: ${date}
draft: true
tags: []
description: ""
---\n\n`;

  fs.writeFileSync(filePath, frontMatter);
  console.log(`✅ Draft created: content/posts/${filename}`);
  rl.close();
})();