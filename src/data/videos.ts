/**
 * Vidéos Cloudinary (`.env`) ou fichiers locaux `public/videos/` en secours.
 */

const cloud = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined;

/** Réduit le poids des MP4 Cloudinary sans changer l’URL locale. */
function optimizeCloudinaryVideoUrl(url: string): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/video/upload/')) {
    return url;
  }
  const marker = '/video/upload/';
  const i = url.indexOf(marker);
  const after = url.slice(i + marker.length);
  if (/^(q_|w_|c_|f_|sp_|fl_)/.test(after)) return url;
  const base = url.slice(0, i + marker.length);
  return `${base}q_auto:eco,w_1280,c_limit,f_mp4/${after}`;
}

function cloudinaryUrl(publicIdOrUrl: string | undefined, localFallback: string): string {
  if (!publicIdOrUrl?.trim()) return localFallback;
  if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
    return optimizeCloudinaryVideoUrl(publicIdOrUrl);
  }
  if (!cloud?.trim()) return localFallback;
  const id = publicIdOrUrl.replace(/^\//, '').replace(/\.mp4$/i, '');
  return `https://res.cloudinary.com/${cloud}/video/upload/q_auto:eco,w_1280,c_limit,f_mp4/${id}.mp4`;
}

export const VIDEOS = {
  hero: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_HERO, '/videos/hero.mp4'),
  /** Mécanique / diagnostic (garage mécanicien) */
  pourquoi: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_POURQUOI, '/videos/pourquoi.mp4'),
  carrosserie: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_CARROSSERIE, '/videos/carrosserie.mp4'),
  achat: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_ACHAT, '/videos/achat.mp4'),
  apropos: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_APROPOS, '/videos/apropos.mp4'),
  atelier: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_GARAGE_ATELIER, '/videos/garage-atelier.mp4'),
  pneus: cloudinaryUrl(import.meta.env.PUBLIC_CLOUDINARY_VIDEO_GARAGE_PNEUS, '/videos/garage-pneus.mp4'),
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
