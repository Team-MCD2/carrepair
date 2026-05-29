import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(root, '..', 'src', 'pages', 'a-propos.astro');
let t = fs.readFileSync(file, 'utf8');

t = t.replace(/<YouTubeLoop[\s\S]*?\/>/g, '<LocalVideo src={VIDEOS.apropos} poster={POSTERS.equipe} cover={true} />');
t = t.replace(/<li class="active">[^<]*Propos<\/li>/, '<li class="active">À Propos</li>');

const legacy = fs.readFileSync(path.join(root, '..', 'legacy', 'a-propos.html'), 'utf8');
const heroDesc = legacy.match(/<p class="subpage-desc">([^<]+)<\/p>/)?.[1];
if (heroDesc) {
  t = t.replace(/<p class="subpage-desc">[^<]*<\/p>/, `<p class="subpage-desc">${heroDesc}</p>`);
}

const aboutHtml = legacy.match(/<div class="about-text">([\s\S]*?)<\/div>\s*<div class="about-media">/)?.[1];
if (aboutHtml) {
  t = t.replace(/<div class="about-text">[\s\S]*?<\/div>\s*<div class="about-media media-video">/, `<div class="about-text">${aboutHtml}</div>\n                <div class="about-media media-video">`);
}

fs.writeFileSync(file, t, 'utf8');
console.log('patched a-propos');
