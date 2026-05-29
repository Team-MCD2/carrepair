/** IDs YouTube — lecture des 30 premières secondes en boucle (sans téléchargement) */
export const YOUTUBE = {
  hero: 'CI8aM-MMI0E',
  pourquoi: 'PVRqLIgtZ5o',
  carrosserie: 'FQaYkfmLEUU',
  achat: 'mYMVqLfj3T4',
  apropos: 'eMBlkjCA298',
} as const;

export const LOOP_SECONDS = 30;

export const POSTERS = {
  hero: '/assets/vehicules.png',
  prestations: '/assets/prestations.jpeg',
  equipe: '/assets/qui-somme-nous.jpeg',
  carrosserie: '/assets/logo-carrepair-carrosserie.png',
} as const;

export const showcaseVideos = [
  { id: YOUTUBE.pourquoi, tag: 'Diagnostic', title: 'Contrôle sous véhicule' },
  { id: YOUTUBE.carrosserie, tag: 'Carrosserie', title: 'Peinture de précision' },
  { id: YOUTUBE.achat, tag: 'Véhicules', title: 'Achat & vente' },
] as const;
