/** Vidéos garage hébergées localement (optimisation perf, pas de CDN externe) */
export const VIDEOS = {
  hero: '/videos/hero.mp4',
  pneus: '/videos/garage-pneus.mp4',
  atelier: '/videos/garage-atelier.mp4',
} as const;

export const POSTERS = {
  hero: '/assets/vehicules.png',
  prestations: '/assets/prestations.jpeg',
  equipe: '/assets/qui-somme-nous.jpeg',
} as const;

export const showcaseVideos = [
  {
    src: VIDEOS.hero,
    poster: POSTERS.hero,
    tag: 'Diagnostic',
    title: 'Contrôle sous véhicule',
  },
  {
    src: VIDEOS.pneus,
    poster: POSTERS.hero,
    tag: 'Pneumatique',
    title: 'Montage & serrage pro',
  },
  {
    src: VIDEOS.atelier,
    poster: POSTERS.equipe,
    tag: 'Atelier',
    title: 'Réparation en garage',
  },
] as const;
