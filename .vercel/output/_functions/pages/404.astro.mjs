import { a2 as createComponent, ad as renderComponent, al as renderTemplate, aa as maybeRenderHead } from '../chunks/astro/server_B3hFyNMH.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_a1uZhYI1.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Page introuvable \u2014 Car Repair Toulouse", "description": "La page demand\xE9e est introuvable. Retournez \xE0 l'accueil du garage Car Repair \xE0 Toulouse.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-padding"> <div class="container" style="text-align: center; max-width: 640px;"> <h1 class="section-title" style="display: block;">Page introuvable</h1> <p style="color: var(--gris); margin-bottom: 2rem;">
Désolé, cette page n'existe pas ou a été déplacée.
</p> <a href="/" class="btn btn-primary">Retour à l'accueil</a> </div> </section> ` })}`;
}, "C:/Users/PC/Desktop/car_repare/carrepair/src/pages/404.astro", void 0);

const $$file = "C:/Users/PC/Desktop/car_repare/carrepair/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
