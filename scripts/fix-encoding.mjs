import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

function fixMojibake(text) {
  return Buffer.from(text, 'latin1').toString('utf8');
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(astro|ts|css)$/.test(name)) {
      const raw = fs.readFileSync(full, 'utf8');
      const fixed = fixMojibake(raw);
      if (fixed !== raw) {
        fs.writeFileSync(full, fixed, 'utf8');
        console.log('fixed:', path.relative(root, full));
      }
    }
  }
}

walk(root);
