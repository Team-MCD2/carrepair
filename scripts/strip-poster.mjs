import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages', 'a-propos.astro');
let t = fs.readFileSync(file, 'utf8');
t = t.replace(/\s*poster=\{POSTERS\.equipe\}/g, '');
fs.writeFileSync(file, t, 'utf8');
