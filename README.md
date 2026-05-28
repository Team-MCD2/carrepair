# Car Repair — Site Astro

Site vitrine du garage Car Repair (Toulouse), construit avec [Astro](https://astro.build).

## Commandes

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère le dossier dist/
npm run preview  # prévisualiser la version build
```

## Structure

- `src/pages/` — pages du site (HTML statique généré)
- `src/components/` — en-tête, pied de page, vidéos
- `src/styles/global.css` — styles
- `public/assets/` — images
- `public/videos/` — vidéos garage (hébergées localement)
- `legacy/` — anciennes pages HTML (référence)

## Déploiement

Après `npm run build`, déployer le contenu du dossier `dist/` sur votre hébergeur.
