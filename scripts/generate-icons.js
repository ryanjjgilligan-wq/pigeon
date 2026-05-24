// Run with: node scripts/generate-icons.js
// Generates simple placeholder PWA icons

const fs = require("fs");
const path = require("path");

// Simple SVG-based icon
function makeIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#1a0a2e"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="${size * 0.55}" font-family="serif">🎰</text>
  <text x="50%" y="88%" dominant-baseline="central" text-anchor="middle" font-size="${size * 0.12}" font-family="sans-serif" fill="#f59e0b" font-weight="bold">FORAGE</text>
</svg>`;
}

const iconsDir = path.join(__dirname, "../public/icons");
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

// Write SVG versions (browsers can use SVGs for PWA icons in many cases)
fs.writeFileSync(path.join(iconsDir, "icon.svg"), makeIcon(512));

// Write minimal PNG placeholders — real app would use sharp/canvas
// For now, use SVG as the icon source
const sizes = [192, 512];
for (const size of sizes) {
  // Write as SVG with .png extension as fallback — the manifest references these
  // In production, convert these SVGs to real PNGs using sharp
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.svg`), makeIcon(size));
  console.log(`Generated icon-${size}.svg`);
}

console.log("Icons generated. In production, convert SVGs to PNGs using: npx sharp-cli");
