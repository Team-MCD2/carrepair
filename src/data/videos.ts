/** IDs YouTube  lecture des 30 premi�res secondes en boucle (sans t�l�chargement) */
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
  { id: YOUTUBE.pourquoi, poster: POSTERS.prestations, tag: 'Diagnostic', title: 'Contr�le sous v�hicule' },
  { id: YOUTUBE.carrosserie, poster: POSTERS.carrosserie, tag: 'Carrosserie', title: 'Peinture de pr�cision' },
  { id: YOUTUBE.achat, poster: POSTERS.hero, tag: 'V�hicules', title: 'Achat & vente' },
] as const;
