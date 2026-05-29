import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const src = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(astro|ts)$/.test(name)) {
      let t = fs.readFileSync(full, 'utf8');
      const orig = t;
      t = t.replace(/^\uFEFF?\uFFFD---/, '---');
      t = t.replace(/\uFFFD\u001d/g, '—');
      t = t.replace(/\uFFFD\uFFFD\}/g, '☎');
      t = t.replace(/\uFFFD\uFFFD/g, '☎');
      if (t !== orig) {
        fs.writeFileSync(full, t, 'utf8');
        console.log('patched', path.relative(src, full));
      }
    }
  }
}

walk(src);
