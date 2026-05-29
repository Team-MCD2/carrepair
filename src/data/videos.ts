/** Vidéos locales — 30 premières secondes (public/videos/) */
export const VIDEOS = {
  hero: '/videos/hero.mp4',
  pourquoi: '/videos/pourquoi.mp4',
  carrosserie: '/videos/carrosserie.mp4',
  achat: '/videos/achat.mp4',
  apropos: '/videos/apropos.mp4',
} as const;

export const POSTERS = {
  hero: '/assets/vehicules.png',
  prestations: '/assets/vehicules.png',
  equipe: '/assets/vehicules.png',
  carrosserie: '/assets/logo-carrepair-carrosserie.png',
} as const;

export const showcaseVideos = [
  { src: VIDEOS.pourquoi, poster: POSTERS.prestations, tag: 'Diagnostic', title: 'Contrôle sous véhicule' },
  { src: VIDEOS.carrosserie, poster: POSTERS.carrosserie, tag: 'Carrosserie', title: 'Peinture de précision' },
  { src: VIDEOS.achat, poster: POSTERS.hero, tag: 'Véhicules', title: 'Achat & vente' },
] as const;
