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
      if (!t.includes('\uFFFD') && !t.includes('')) continue;
      const buf = Buffer.from(t, 'latin1');
      const fixed = buf.toString('utf8');
      if (fixed !== t) {
        fs.writeFileSync(full, fixed, 'utf8');
        console.log('fixed', path.relative(src, full));
      }
    }
  }
}

walk(src);
