/**
 * Vidéos garage (sources Pexels, libres de droits — sans mention sur le site).
 * Fichiers hébergés localement dans public/videos/
 */
export const VIDEOS = {
  /** Mécanicien sous véhicule — hero & diagnostic */
  hero: '/videos/garage-mecanicien.mp4',
  mecanicien: '/videos/garage-mecanicien.mp4',
  /** Clé à chocs / pneumatique */
  pneus: '/videos/garage-pneus.mp4',
  /** Atelier automobile */
  atelier: '/videos/garage-atelier.mp4',
} as const;

export const POSTERS = {
  hero: '/assets/vehicules.png',
  prestations: '/assets/prestations.jpeg',
  equipe: '/assets/qui-somme-nous.jpeg',
  carrosserie: '/assets/logo-carrepair-carrosserie.png',
} as const;

export const showcaseVideos = [
  {
    src: VIDEOS.mecanicien,
    poster: POSTERS.prestations,
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
