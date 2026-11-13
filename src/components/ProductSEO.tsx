import Head from 'next/head';
import { urlFor } from '@/sanity/lib/imageUrl';
import { Product } from '@/interfaces/product';
import { Locale } from '@/types/locale';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

interface ProductSEOProps {
  product: Product;
  locale: Locale;
}

export default function ProductSEO({ product, locale = 'en' }: ProductSEOProps) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    sku: product.productNumber,
    name: product.metaTitle?.[locale] || product.title[locale],
    image: [...(product.thumbnail ? [urlFor(product.thumbnail).url()] : []), ...product.images.map((img) => urlFor(img).url())],
    description: product.metaDescription?.[locale] || product.description[locale],
    brand: {
      '@type': 'Brand',
      name: 'Purla',
    },
    ...(siteUrl ? { url: `${siteUrl}/gallery/${product.slug.current}` } : {}),
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
