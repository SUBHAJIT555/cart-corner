/**
 * Transforms minimal-*.css files to Cart Corner dark brutalist theme
 */
const fs = require("fs");
const path = require("path");

const cssDir = path.join(__dirname, "..", "src/app/css");
const files = fs.readdirSync(cssDir).filter((f) => f.startsWith("minimal-") && f.endsWith(".css"));

const replacements = [
  [/--background:\s*#fafafa/g, "--background: var(--cc-bg)"],
  [/--card-surface:\s*#fafafa/g, "--card-surface: var(--cc-card)"],
  [/--card-surface:\s*#ffffff/g, "--card-surface: var(--cc-card)"],
  [/--primary:\s*#9ca3af/g, "--primary: var(--cc-border)"],
  [/background:\s*#fafafa/g, "background: var(--cc-bg)"],
  [/background:\s*#fff\b/g, "background: var(--cc-card)"],
  [/background:\s*#ffffff\b/g, "background: var(--cc-card)"],
  [/background:\s*rgba\(255,\s*255,\s*255[^)]*\)/g, "background: var(--cc-card)"],
  [/background:\s*rgb\(255\s+255\s+255[^)]*\)/g, "background: var(--cc-card)"],
  [/background:\s*#111827/g, "background: var(--cc-surface)"],
  [/background:\s*#1f2937/g, "background: var(--cc-surface)"],
  [/color:\s*#111827/g, "color: var(--cc-text)"],
  [/color:\s*#1f2937/g, "color: var(--cc-text)"],
  [/color:\s*#374151/g, "color: var(--cc-text-secondary)"],
  [/color:\s*#4b5563/g, "color: var(--cc-text-secondary)"],
  [/color:\s*#6b7280/g, "color: var(--cc-muted)"],
  [/color:\s*#9ca3af/g, "color: var(--cc-muted)"],
  [/border:\s*1px solid/g, "border: 2px solid"],
  [/border-bottom:\s*1px solid/g, "border-bottom: 2px solid"],
  [/border-top:\s*1px solid/g, "border-top: 2px solid"],
  [/border-right:\s*1px solid/g, "border-right: 2px solid"],
  [/border-left:\s*1px solid/g, "border-left: 2px solid"],
  [/border-color:\s*#e5e7eb/g, "border-color: var(--cc-border)"],
  [/border-color:\s*#d1d5db/g, "border-color: var(--cc-border)"],
  [/border:\s*1px solid #e5e7eb/g, "border: 2px solid var(--cc-border)"],
  [/border:\s*1px solid rgb\(229 231 235[^)]*\)/g, "border: 2px solid var(--cc-border)"],
  [/border-bottom:\s*1px solid rgb\(229 231 235[^)]*\)/g, "border-bottom: 2px solid var(--cc-border)"],
  [/border-top:\s*1px solid rgb\(229 231 235[^)]*\)/g, "border-top: 2px solid var(--cc-border)"],
  [/border-radius:\s*1rem/g, "border-radius: var(--cc-radius-card)"],
  [/border-radius:\s*0\.75rem/g, "border-radius: var(--cc-radius-card)"],
  [/border-radius:\s*0\.5rem/g, "border-radius: var(--cc-radius-btn)"],
  [/border-radius:\s*9999px/g, "border-radius: var(--cc-radius-btn)"],
  [/color:\s*#209bff/g, "color: var(--cc-accent)"],
  [/color:\s*#ef4444/g, "color: var(--cc-danger)"],
  [/color:\s*#b91c1c/g, "color: var(--cc-danger)"],
  [/background:\s*#fef2f2/g, "background: rgba(244, 67, 54, 0.12)"],
  [/background:\s*#f8fbff/g, "background: rgba(255, 213, 79, 0.1)"],
  [/border-color:\s*#54a1fd/g, "border-color: var(--cc-accent)"],
  [/border-color:\s*#fca5a5/g, "border-color: var(--cc-danger)"],
  [/\.dark\s+\.minimal-[^\{]+\{[^}]*\}/g, ""],
  [/\.dark\s+\.new-arrival-card[^\{]*\{[^}]*\}/g, ""],
];

for (const file of files) {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  // Remove dark mode overrides (always dark now)
  content = content.replace(/\.dark\s+[^{]+\{[^}]+\}\n?/g, "");

  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

  // Fix double borders from replacement
  content = content.replace(/border: 2px solid 2px solid/g, "border: 2px solid");

  fs.writeFileSync(filePath, content);
  console.log("Updated:", file);
}

console.log("Done! Transformed", files.length, "files.");
