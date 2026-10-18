// Builds Tailwind CSS from www/index.html and inlines it, replacing the CDN script so the app works offline.
const { execSync } = require('child_process');
const fs = require('fs');
execSync('npx tailwindcss -c tailwind.config.js -i scripts/in.css -o scripts/out.css --minify', { stdio: 'inherit' });
const css = fs.readFileSync('scripts/out.css', 'utf8');
let html = fs.readFileSync('www/index.html', 'utf8');
const tag = '<script src="https://cdn.tailwindcss.com/3.4.17"></script>';
if (!html.includes(tag)) { console.log('CDN tag not found; already inlined.'); process.exit(0); }
fs.writeFileSync('www/index.html', html.replace(tag, '<style>' + css + '</style>'));
console.log('Inlined', css.length, 'bytes of CSS.');
