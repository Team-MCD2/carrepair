import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const legacy = fs.readFileSync(path.join(root, '..', 'legacy', 'a-propos.html'), 'utf8');
const file = path.join(root, '..', 'src', 'pages', 'a-propos.astro');
let t = fs.readFileSync(file, 'utf8');

const section = legacy.match(
  /<!-- Key Commitments section -->[\s\S]*?<!-- Location & Maps Section -->/
)?.[0];
if (section) {
  const astroSection = section
    .replace(/<!-- Key Commitments section -->/, '<!-- Key Commitments section -->')
    .replace(/<!-- Location & Maps Section -->/, '<!-- Location & Maps Section -->');
  t = t.replace(
    /<!-- Key Commitments section -->[\s\S]*?<!-- Location & Maps Section -->/,
    astroSection
  );
}

const mapSection = legacy.match(/<!-- Location & Maps Section -->[\s\S]*?<!-- Call To Action Banner -->/)?.[0];
if (mapSection) {
  t = t.replace(
    /<!-- Location & Maps Section -->[\s\S]*?<!-- Call To Action Banner -->/,
    mapSection
  );
}

const cta = legacy.match(/<!-- Call To Action Banner -->[\s\S]*?<!-- Footer -->/)?.[0];
if (cta) {
  const fixed = cta
    .replace(/href="contact\.html"/g, 'href="/contact/"')
    .replace(/href="index\.html"/g, 'href="/"');
  t = t.replace(/<!-- Call To Action Banner -->[\s\S]*?<!-- Footer -->/, fixed);
}

fs.writeFileSync(file, t, 'utf8');
console.log('engagements patched');
