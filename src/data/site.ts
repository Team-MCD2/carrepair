export const SITE = {
  url: 'https://www.car-repair-france.fr',
  name: 'Car Repair',
  legalName: 'CAR REPAIR',
  email: 'info@car-repair.fr',
  phone: '05 62 83 74 29',
  phoneTel: '0562837429',
  phoneSecondary: '07 49 92 44 36',
  phoneSecondaryTel: '0749924436',
  address: {
    street: '34 Rue Adolphe Coll',
    city: 'Toulouse',
    postalCode: '31300',
    region: 'Occitanie',
    country: 'FR',
  },
  geo: {
    latitude: 43.598285,
    longitude: 1.423026,
  },
  siret: '907 944 821 00012',
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
