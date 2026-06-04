import { a1 as createAstro, a2 as createComponent, aa as maybeRenderHead, _ as addAttribute, an as spreadAttributes, al as renderTemplate } from './astro/server_B3hFyNMH.mjs';
import 'clsx';

const $$Astro = createAstro("https://www.car-repair-france.fr");
const $$LocalVideo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LocalVideo;
  const {
    src,
    poster,
    class: className = "",
    cover = false,
    eager = false
  } = Astro2.props;
  const videoClass = ["bg-video", className, cover ? "bg-video--cover" : ""].filter(Boolean).join(" ");
  return renderTemplate`${maybeRenderHead()}<video${addAttribute(videoClass, "class")} muted loop playsinline disablepictureinpicture disableremoteplayback${addAttribute(poster, "poster")}${addAttribute(eager ? "metadata" : "none", "preload")} data-bg-video${spreadAttributes(!eager ? { "data-lazy": "" } : {})}> ${eager ? renderTemplate`<source${addAttribute(src, "src")} type="video/mp4">` : renderTemplate`<source${addAttribute(src, "data-src")} type="video/mp4">`} </video>`;
}, "C:/Users/PC/Desktop/car_repare/carrepair/src/components/LocalVideo.astro", void 0);

function cloudinaryUrl(publicIdOrUrl, localFallback) {
  return localFallback;
}
const VIDEOS = {
  /** Mécanique / diagnostic (garage mécanicien) */
  pourquoi: cloudinaryUrl(undefined                                                , "/videos/pourquoi.mp4"),
  carrosserie: cloudinaryUrl(undefined                                                   , "/videos/carrosserie.mp4"),
  achat: cloudinaryUrl(undefined                                             , "/videos/achat.mp4"),
  apropos: cloudinaryUrl(undefined                                               , "/videos/apropos.mp4"),
  atelier: cloudinaryUrl(undefined                                                      , "/videos/garage-atelier.mp4"),
  pneus: cloudinaryUrl(undefined                                                    , "/videos/garage-pneus.mp4")
};
const POSTERS = {
  hero: "/assets/vehicules.png",
  prestations: "/assets/vehicules.png",
  equipe: "/assets/vehicules.png",
  carrosserie: "/assets/vehicules.png"
};
const showcaseVideos = [
  { src: VIDEOS.pourquoi, poster: POSTERS.prestations, tag: "Diagnostic", title: "Contrôle sous véhicule" },
  { src: VIDEOS.carrosserie, poster: POSTERS.carrosserie, tag: "Carrosserie", title: "Peinture de précision" },
  { src: VIDEOS.achat, poster: POSTERS.hero, tag: "Véhicules", title: "Achat & vente" }
];

export { $$LocalVideo as $, POSTERS as P, VIDEOS as V, showcaseVideos as s };
