import { a as absoluteUrl, S as SITE } from './BaseLayout_a1uZhYI1.mjs';

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
function webPageJsonLd({
  title,
  description,
  path
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#business` }
  };
}
function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: `${SITE.legalName} Toulouse`,
    image: absoluteUrl("/assets/logo.png"),
    logo: absoluteUrl("/assets/logo.png"),
    url: SITE.url,
    telephone: [`+33${SITE.phoneTel.slice(1)}`, `+33${SITE.phoneSecondaryTel.slice(1)}`],
    email: SITE.email,
    priceRange: "$$",
    description: "Garage automobile multimarque à Toulouse (31300) : mécanique, carrosserie, peinture, pneumatique et vente de véhicules.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude
    },
    areaServed: [
      { "@type": "City", name: "Toulouse" },
      { "@type": "AdministrativeArea", name: "Haute-Garonne" },
      { "@type": "AdministrativeArea", name: "Occitanie" }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "500"
    }
  };
}
function mergeJsonLd(...schemas) {
  return schemas;
}

export { breadcrumbJsonLd as b, localBusinessJsonLd as l, mergeJsonLd as m, webPageJsonLd as w };
