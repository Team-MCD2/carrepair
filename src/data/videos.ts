/** Vidéos hébergées localement dans public/videos/ */
export const VIDEOS = {
  hero: '/videos/hero.mp4',
  pourquoi: '/videos/pourquoi.mp4',
  carrosserie: '/videos/carrosserie.mp4',
  achatVehicule: '/videos/achat-vehicule.mp4',
  aPropos: '/videos/a-propos.mp4',
  pneus: '/videos/garage-pneus.mp4',
  mecanique: '/videos/garage-mecanicien.mp4',
} as const;

export const POSTERS = {
  hero: '/assets/vehicules.png',
  prestations: '/assets/prestations.jpeg',
  equipe: '/assets/qui-somme-nous.jpeg',
  carrosserie: '/assets/logo-carrepair-carrosserie.png',
} as const;

export const showcaseVideos = [
  {
    src: VIDEOS.mecanique,
    poster: POSTERS.prestations,
    tag: 'Mécanique',
    title: 'Entretien moteur',
  },
  {
    src: VIDEOS.pneus,
    poster: POSTERS.hero,
    tag: 'Pneumatique',
    title: 'Montage & serrage pro',
  },
  {
    src: VIDEOS.carrosserie,
    poster: POSTERS.carrosserie,
    tag: 'Carrosserie',
    title: 'Peinture & finitions',
  },
] as const;
