import Head from 'next/head';
import { urlFor } from '@/sanity/lib/imageUrl';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function ProductSEO({ product, locale = 'en' }) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    sku: product.productNumber,
    name: product.metaTitle?.[locale] || product.title[locale],
    image: [urlFor(product.thumbnail).url(), ...product.images.map((img) => urlFor(img).url())],
    description: product.metaDescription?.[locale] || product.description[locale],
    brand: {
      '@type': 'Brand',
      name: 'Purla',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: locale === 'en' ? 'EUR' : 'BGN',
      price: product.price[locale],
      availability:
        product.availability === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/gallery/${product.slug.current}`,
    },
  };

  return (
    <Head>
      <title>{product.metaTitle?.[locale] || product.title[locale]}</title>
      <meta
        name="description"
        content={product.metaDescription?.[locale] || product.description[locale]}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Head>
  );
}
