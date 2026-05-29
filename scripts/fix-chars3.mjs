import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

const replacements = [
  [/\uFFFD`/g, 'Ê'],
  [/ì Propos/g, 'À Propos'],
];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.astro$/.test(name)) {
      let t = fs.readFileSync(full, 'utf8');
      const orig = t;
      for (const [re, rep] of replacements) t = t.replace(re, rep);
      if (t !== orig) {
        fs.writeFileSync(full, t, 'utf8');
        console.log('patched', path.relative(src, full));
      }
    }
  }
}

walk(src);
