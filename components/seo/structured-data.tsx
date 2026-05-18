type JsonValue = unknown;

export function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blacknel.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blacknel',
  legalName: 'Blacknel S.A.P.I. de C.V.',
  url: baseUrl,
  logo: `${baseUrl}/icon.svg`,
  foundingDate: '2026-01-15',
  foundingLocation: {
    '@type': 'Place',
    name: 'Mexico City, Mexico',
  },
  founder: {
    '@type': 'Person',
    name: 'Carlos Anaya Ruiz',
    jobTitle: 'Founder & CEO',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@blacknel.com',
      availableLanguage: ['English', 'Spanish'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@blacknel.com',
      availableLanguage: ['English', 'Spanish'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'press',
      email: 'press@blacknel.com',
      availableLanguage: ['English', 'Spanish'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Insurgentes Sur 1234, Piso 6',
    addressLocality: 'Mexico City',
    addressRegion: 'CDMX',
    postalCode: '03100',
    addressCountry: 'MX',
  },
};

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blacknel',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'AI-native platform for managing digital presence across channels — unified inbox, publishing, reviews, ads, and analytics.',
  offers: {
    '@type': 'Offer',
    price: '69',
    priceCurrency: 'USD',
  },
  publisher: { '@type': 'Organization', name: 'Blacknel' },
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

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
      eligibleRegion: 'WORLDWIDE',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '299',
      priceCurrency: 'USD',
      url: `${baseUrl}/pricing`,
      availability: 'https://schema.org/InStock',
      eligibleRegion: 'WORLDWIDE',
    },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      price: '1099',
      priceCurrency: 'USD',
      url: `${baseUrl}/pricing`,
      availability: 'https://schema.org/InStock',
      eligibleRegion: 'WORLDWIDE',
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
