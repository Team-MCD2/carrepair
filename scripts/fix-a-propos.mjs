import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const legacy = path.join(root, '..', 'legacy', 'a-propos.html');
const target = path.join(root, '..', 'src', 'pages', 'a-propos.astro');
const contactLegacy = path.join(root, '..', 'legacy', 'contact.html');
const contactTarget = path.join(root, '..', 'src', 'pages', 'contact.astro');

function extract(html, start, end) {
  const i = html.indexOf(start);
  const j = html.indexOf(end, i);
  return html.slice(i, j + end.length);
}

const legacyHtml = fs.readFileSync(legacy, 'utf8');
let astro = fs.readFileSync(target, 'utf8');

const heroDesc = 'Découvrez l\'équipe et les valeurs fondamentales qui guident notre garage au quotidien pour l\'entretien de votre voiture à Toulouse.';
const aboutBlock = extract(legacyHtml, '<h2>Un garage local', '</section>\n\n    <!-- Key Commitments');

astro = astro.replace(
  /<ul class="breadcrumbs">[\s\S]*?<\/ul>\s*<h1 class="subpage-title[\s\S]*?<\/p>/,
  `<ul class="breadcrumbs">
                <li><a href="/">Accueil</a></li>
                <li class="active">À Propos</li>
            </ul>
            <h1 class="subpage-title text-gradient">Notre Histoire &amp; Engagements</h1>
            <p class="subpage-desc">${heroDesc}</p>`
);

astro = astro.replace(
  /<div class="about-text">[\s\S]*?<\/div>\s*<div class="about-media media-video">[\s\S]*?<\/div>/,
  `<div class="about-text">
                    ${aboutBlock.match(/<h2>[\s\S]*<\/p>\s*<p>[\s\S]*<\/p>\s*<p>[\s\S]*<\/p>/)[0]}
                </div>
                <div class="about-media media-video">
                    <LocalVideo src={VIDEOS.apropos} poster={POSTERS.equipe} cover={true} />
                </div>`
);

astro = astro.replace(/YouTubeLoop[\s\S]*?\/>/g, '');
fs.writeFileSync(target, astro, 'utf8');

const contactHtml = fs.readFileSync(contactLegacy, 'utf8');
let contact = fs.readFileSync(contactTarget, 'utf8');
const contactDesc = contactHtml.match(/<p class="subpage-desc">([^<]+)<\/p>/)?.[1];
if (contactDesc) {
  contact = contact.replace(/<p class="subpage-desc">[^<]*<\/p>/, `<p class="subpage-desc">${contactDesc}</p>`);
}
contact = contact.replace(/rparation/g, 'réparation').replace(/personnalise/g, 'personnalisée');
fs.writeFileSync(contactTarget, contact, 'utf8');
console.log('fixed a-propos and contact');
