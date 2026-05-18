type JsonValue = unknown;

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blacknel',
  url: baseUrl,
  logo: `${baseUrl}/icon.svg`,
  sameAs: [
    'https://twitter.com/blacknel',
    'https://linkedin.com/company/blacknel',
    'https://github.com/blacknel',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'sales@blacknel.com',
    availableLanguage: ['English', 'Spanish'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Insurgentes Sur 1234, Piso 6',
    addressLocality: 'Mexico City',
    addressRegion: 'CDMX',
    postalCode: '03100',
    addressCountry: 'MX',
  },
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Blacknel',
  description: 'AI-native platform for managing digital presence across channels.',
  brand: { '@type': 'Brand', name: 'Blacknel' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Standard',
      price: '69',
      priceCurrency: 'USD',
      url: `${baseUrl}/pricing`,
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '299',
      priceCurrency: 'USD',
      url: `${baseUrl}/pricing`,
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      price: '1099',
      priceCurrency: 'USD',
      url: `${baseUrl}/pricing`,
      availability: 'https://schema.org/InStock',
    },
  ],
};

export function articleSchema({
  title,
  description,
  author,
  date,
  url,
  image,
}: {
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: author },
    datePublished: date,
    dateModified: date,
    publisher: {
      '@type': 'Organization',
      name: 'Blacknel',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/icon.svg` },
    },
    image: image ?? `${baseUrl}/api/og?title=${encodeURIComponent(title)}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  };
}
