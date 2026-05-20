// Shared JSON-LD builders. Every page that mounts BaseLayout gets a canonical
// LocalBusiness graph; pages can add Service / FAQPage / BreadcrumbList nodes
// via the `schema` prop. Keep all schema generation here so output stays
// consistent across page types.

import { site } from '~/data/site';

const businessId = `${site.url}/#business`;

export const localBusinessSchema = () => ({
  '@type': ['LocalBusiness', 'ComputerRepairService'],
  '@id': businessId,
  name: site.name,
  url: site.url,
  telephone: site.phone.tel,
  email: site.email.display,
  priceRange: site.priceRange,
  foundingDate: String(site.yearFounded),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.address.lat,
    longitude: site.address.lng,
  },
  openingHoursSpecification: site.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
  paymentAccepted: site.paymentAccepted.join(', '),
  sameAs: [site.social.facebook],
});

export const webPageSchema = (opts: { url: string; title: string; description: string }) => ({
  '@type': 'WebPage',
  '@id': `${opts.url}#webpage`,
  url: opts.url,
  name: opts.title,
  description: opts.description,
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': businessId },
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { '@id': businessId },
});

export const serviceSchema = (opts: {
  name: string;
  description: string;
  serviceType?: string;
  url?: string;
}) => ({
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  serviceType: opts.serviceType ?? opts.name,
  provider: { '@id': businessId },
  areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
  ...(opts.url ? { url: opts.url } : {}),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export type FaqItem = { question: string; answer: string };

export const faqPageSchema = (items: FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
});

// Wrap any combination of nodes into a single @graph document so each page
// emits exactly one <script type="application/ld+json"> block.
export const graphDocument = (nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
