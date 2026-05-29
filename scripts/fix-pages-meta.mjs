import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages');

const patches = {
  'a-propos.astro': {
    from: /title="[^"]*"\s*\n\s*description="[^"]*"\s*\n\s*active="a-propos"\s*\n\s*ogImage="[^"]*"\s*\n\s*jsonLd=\{jsonLd\}/s,
    to: `title="À Propos — Garage Car Repair à Toulouse depuis 2021"
  description="Découvrez l'histoire de Car Repair, réparateur auto multimarque et spécialiste pneumatique à Toulouse (31300). Nos engagements : qualité, prix, et professionnalisme."
  active="a-propos"
  ogImage="https://www.car-repair.fr/assets/qui-somme-nous.jpeg"`,
  },
  'contact.astro': {
    from: /title="[^"]*"\s*\n\s*description="[^"]*"\s*\n\s*active="contact"\s*\n\s*ogImage="[^"]*"\s*\n\s*jsonLd=\{jsonLd\}/s,
    to: `title="Contact — Garage Car Repair Toulouse | Devis Gratuit"
  description="Contactez le garage Car Repair à Toulouse. Prenez RDV ou demandez un devis gratuit en ligne pour réparation mécanique, parallélisme ou carrosserie. ☎ 05 62 83 74 29."
  active="contact"
  ogImage="https://www.car-repair.fr/assets/logo.png"`,
  },
};

for (const [file, { from, to }] of Object.entries(patches)) {
  const full = path.join(root, file);
  let t = fs.readFileSync(full, 'utf8');
  t = t.replace(/^\uFEFF?\uFFFD---\n---\n/, '---\n');
  t = t.replace(from, to);
  fs.writeFileSync(full, t, 'utf8');
  console.log('updated', file);
}
