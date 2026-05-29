import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const legacy = fs.readFileSync(path.join(root, '..', 'legacy', 'contact.html'), 'utf8');
const file = path.join(root, '..', 'src', 'pages', 'contact.astro');
let t = fs.readFileSync(file, 'utf8');
const desc = legacy.match(/<p class="subpage-desc">([^<]+)<\/p>/)?.[1];
if (desc) t = t.replace(/<p class="subpage-desc">[^<]*<\/p>/, `<p class="subpage-desc">${desc}</p>`);
fs.writeFileSync(file, t, 'utf8');
