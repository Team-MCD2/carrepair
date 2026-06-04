import 'piccolore';
import { a4 as decodeKey } from './chunks/astro/server_B3hFyNMH.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Dkgd8Mfq.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/PC/Desktop/car_repare/carrepair/","cacheDir":"file:///C:/Users/PC/Desktop/car_repare/carrepair/node_modules/.astro/","outDir":"file:///C:/Users/PC/Desktop/car_repare/carrepair/dist/","srcDir":"file:///C:/Users/PC/Desktop/car_repare/carrepair/src/","publicDir":"file:///C:/Users/PC/Desktop/car_repare/carrepair/public/","buildClientDir":"file:///C:/Users/PC/Desktop/car_repare/carrepair/dist/client/","buildServerDir":"file:///C:/Users/PC/Desktop/car_repare/carrepair/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/a-propos.BiN6WmXf.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/a-propos.BiN6WmXf.css"}],"routeData":{"route":"/a-propos","isIndex":false,"type":"page","pattern":"^\\/a-propos\\/?$","segments":[[{"content":"a-propos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/a-propos.astro","pathname":"/a-propos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/a-propos.BiN6WmXf.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/a-propos.BiN6WmXf.css"}],"routeData":{"route":"/mentions-legales","isIndex":false,"type":"page","pattern":"^\\/mentions-legales\\/?$","segments":[[{"content":"mentions-legales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mentions-legales.astro","pathname":"/mentions-legales","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/a-propos.BiN6WmXf.css"}],"routeData":{"route":"/prestations","isIndex":false,"type":"page","pattern":"^\\/prestations\\/?$","segments":[[{"content":"prestations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/prestations.astro","pathname":"/prestations","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/a-propos.BiN6WmXf.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.car-repair-france.fr","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/PC/Desktop/car_repare/carrepair/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Desktop/car_repare/carrepair/src/pages/a-propos.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Desktop/car_repare/carrepair/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Desktop/car_repare/carrepair/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Desktop/car_repare/carrepair/src/pages/mentions-legales.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Desktop/car_repare/carrepair/src/pages/prestations.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/a-propos@_@astro":"pages/a-propos.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/mentions-legales@_@astro":"pages/mentions-legales.astro.mjs","\u0000@astro-page:src/pages/prestations@_@astro":"pages/prestations.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DyjhWbUj.mjs","C:/Users/PC/Desktop/car_repare/carrepair/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CXQ21cuo.mjs","C:/Users/PC/Desktop/car_repare/carrepair/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.CKQhqB2m.js","C:/Users/PC/Desktop/car_repare/carrepair/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.Bv3Ufec4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/logo.C_1xwKkd.png","/_astro/a-propos.BiN6WmXf.css","/favicon.png","/robots.txt","/assets/google-g.svg","/assets/hero.mp4","/assets/logo-carrepair-carrosserie.png","/assets/logo.png","/assets/vehicules.png","/assets/véhicules.png","/videos/a-propos.mp4","/videos/achat.mp4","/videos/apropos.mp4","/videos/carrosserie.mp4","/videos/garage-atelier.mp4","/videos/garage-mecanicien.mp4","/videos/garage-pneus.mp4","/videos/hero.mp4","/videos/pourquoi.mp4","/_astro/BaseLayout.astro_astro_type_script_index_0_lang.Bv3Ufec4.js","/_astro/contact.astro_astro_type_script_index_0_lang.CKQhqB2m.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"0PJ4x33BMsK/NbY8BQqYuAvRUYkug99QW0S1YLXWMe0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
