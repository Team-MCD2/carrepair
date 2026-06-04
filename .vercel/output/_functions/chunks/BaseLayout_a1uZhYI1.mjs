import { a1 as createAstro, a2 as createComponent, aa as maybeRenderHead, _ as addAttribute, al as renderTemplate, ai as renderScript, ad as renderComponent, aj as renderSlot, af as renderHead, ap as unescapeHTML } from './astro/server_B3hFyNMH.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

const logoImg = new Proxy({"src":"/_astro/logo.C_1xwKkd.png","width":200,"height":200,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/PC/Desktop/car_repare/carrepair/src/assets/logo.png";
							}
							
							return target[name];
						}
					});

const SITE = {
  url: "https://www.car-repair-france.fr",
  name: "Car Repair",
  legalName: "CAR REPAIR",
  email: "info@car-repair.fr",
  phone: "05 62 83 74 29",
  phoneTel: "0562837429",
  phoneSecondaryTel: "0749924436",
  address: {
    street: "34 Rue Adolphe Coll",
    city: "Toulouse",
    postalCode: "31300",
    region: "Occitanie",
    country: "FR"
  },
  geo: {
    latitude: 43.598285,
    longitude: 1.423026
  }};
function absoluteUrl(path) {
  return new URL(path, SITE.url).href;
}

const $$Astro$1 = createAstro("https://www.car-repair-france.fr");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const { active } = Astro2.props;
  const links = [
    { id: "index", href: "/", label: "Accueil" },
    { id: "prestations", href: "/prestations/", label: "Prestations" },
    { id: "a-propos", href: "/a-propos/", label: "\xC0 Propos" },
    { id: "contact", href: "/contact/", label: "Contact" }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="site-header"> <div class="container header-container"> <a href="/" class="logo-wrapper"> <img${addAttribute(logoImg.src, "src")} alt="Car Repair Toulouse" class="logo-img" width="48" height="48" loading="eager" decoding="async"> <div class="logo-text">Car<span>Repair</span></div> </a> <nav> <ul class="nav-links"> ${links.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")}${addAttribute(["nav-link", { active: active === link.id }], "class:list")}>${link.label}</a> </li>`)} </ul> <button class="menu-toggle" aria-label="Menu de navigation" aria-expanded="false"> <span></span> <span></span> <span></span> </button> </nav> <a${addAttribute(`tel:${SITE.phoneTel}`, "href")} class="btn-header"${addAttribute(`Appeler Car Repair au ${SITE.phone}`, "aria-label")}> ${SITE.phone} </a> </div> </header>`;
}, "C:/Users/PC/Desktop/car_repare/carrepair/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer> <div class="container"> <div class="footer-grid"> <div class="footer-col footer-brand"> <a href="/" class="logo-wrapper"> <img${addAttribute(logoImg.src, "src")} alt="Car Repair Toulouse" class="logo-img" width="48" height="48" loading="lazy" decoding="async"> <div class="logo-text">Car<span>Repair</span></div> </a> <p>Réparateur automobile multimarque et spécialiste pneumatique de référence à Toulouse (31300). Qualité, expérience et transparence des prix.</p> </div> <div class="footer-col"> <h3>Plan du site</h3> <ul class="footer-links"> <li><a href="/">Accueil</a></li> <li><a href="/prestations/">Prestations &amp; Tarifs</a></li> <li><a href="/a-propos/">À Propos du garage</a></li> <li><a href="/contact/">Contact &amp; Devis</a></li> <li><a href="/mentions-legales/">Mentions Légales</a></li> </ul> </div> <div class="footer-col"> <h3>Contact</h3> <div class="footer-contact-items"> <div class="footer-contact-item"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <p> <a href="tel:0562837429">05 62 83 74 29</a><br> <a href="tel:0749924436">07 49 92 44 36</a> </p> </div> <div class="footer-contact-item"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <p><a href="mailto:info@car-repair.fr">info@car-repair.fr</a></p> </div> <div class="footer-contact-item"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <p>34 Rue Adolphe Coll<br>31300 Toulouse</p> </div> </div> </div> <div class="footer-col"> <h3>Horaires</h3> <ul class="footer-hours-list"> <li data-day="Monday"><span class="day-label">Lundi</span> <span>09:00 - 18:00</span></li> <li data-day="Tuesday"><span class="day-label">Mardi</span> <span>09:00 - 18:00</span></li> <li data-day="Wednesday"><span class="day-label">Mercredi</span> <span>09:00 - 18:00</span></li> <li data-day="Thursday"><span class="day-label">Jeudi</span> <span>09:00 - 18:00</span></li> <li data-day="Friday"><span class="day-label">Vendredi</span> <span>09:00 - 18:00</span></li> <li data-day="Saturday"><span class="day-label">Samedi</span> <span>10:00 - 17:00</span></li> <li data-day="Sunday"><span class="day-label">Dimanche</span> <span class="text-rouge">Fermé</span></li> </ul> </div> </div> <div class="footer-bottom"> <div class="footer-bottom-info">
&copy; 2026 Car Repair. Tous droits réservés. SIRET : 907 944 821 00012.
</div> <div class="footer-rating"> <span class="stars">★ ★ ★ ★ ★</span> <span>4.5/5 Google</span> </div> <ul class="footer-bottom-links"> <li><a href="/mentions-legales/">Mentions Légales</a></li> <li><a href="/mentions-legales/#rgpd">Données Personnelles</a></li> <li><a href="/mentions-legales/#cookies">Cookies</a></li> </ul> </div> </div> </footer>`;
}, "C:/Users/PC/Desktop/car_repare/carrepair/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://www.car-repair-france.fr");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const cloudName = undefined                                            ;
  const {
    title,
    description,
    active,
    ogImage = absoluteUrl("/assets/vehicules.png"),
    noindex = false,
    jsonLd,
    preloadHeroImage
  } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, SITE.url).href;
  const { geo, address } = SITE;
  const jsonLdItems = jsonLd ? Array.isArray(jsonLd) ? jsonLd : [jsonLd] : [];
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE.url}/#business` }
  };
  return renderTemplate(_b || (_b = __template(['<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', '><meta name="robots"', '><link rel="canonical"', '><link rel="alternate" hreflang="fr"', '><link rel="alternate" hreflang="x-default"', '><link rel="sitemap" type="application/xml" href="/sitemap-index.xml"><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/favicon.png"><meta name="theme-color" content="#0b0b0b"><meta name="author"', '><meta name="geo.region" content="FR-31"><meta name="geo.placename"', '><meta name="geo.position"', '><meta name="ICBM"', '><meta property="og:type" content="website"><meta property="og:locale" content="fr_FR"><meta property="og:site_name"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:alt"', '><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', ">", "", `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Kanit:wght@600;700&family=Montserrat:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" media="print" onload="this.media='all'">`, '<noscript><link href="https://fonts.googleapis.com/css2?family=Kanit:wght@600;700&family=Montserrat:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet"></noscript><script type="application/ld+json">', "</script>", "", '</head> <body class="site-ready hero-ready"> ', " <main> ", " </main> ", " ", " </body> </html>"])), title, addAttribute(description, "content"), addAttribute(noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "content"), addAttribute(canonical, "href"), addAttribute(canonical, "href"), addAttribute(canonical, "href"), addAttribute(SITE.legalName, "content"), addAttribute(address.city, "content"), addAttribute(`${geo.latitude};${geo.longitude}`, "content"), addAttribute(`${geo.latitude}, ${geo.longitude}`, "content"), addAttribute(SITE.name, "content"), addAttribute(canonical, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(`${SITE.name} — Garage automobile à Toulouse`, "content"), addAttribute(canonical, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), preloadHeroImage && renderTemplate`<link rel="preload" as="image"${addAttribute(preloadHeroImage, "href")} fetchpriority="high">`, cloudName, maybeRenderHead(), unescapeHTML(JSON.stringify(websiteJsonLd)), jsonLdItems.map((schema) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(schema)))), renderHead(), renderComponent($$result, "Header", $$Header, { "active": active }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "C:/Users/PC/Desktop/car_repare/carrepair/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/PC/Desktop/car_repare/carrepair/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, SITE as S, absoluteUrl as a };
