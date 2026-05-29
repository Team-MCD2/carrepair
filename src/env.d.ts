/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_HERO?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_POURQUOI?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_CARROSSERIE?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_ACHAT?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_APROPOS?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_GARAGE_ATELIER?: string;
  readonly PUBLIC_CLOUDINARY_VIDEO_GARAGE_PNEUS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
