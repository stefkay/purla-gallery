import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { allProductsQuery } from '@/sanity/lib/queries';
import { useRouter } from 'next/router';
import { isLocale, useTranslation } from '@/utils/translation';
import { Locale } from '@/types/locale';
import ProductCard from '@/components/ProductCard';

export async function getStaticProps() {
  const products: Product[] = await sanityClient.fetch(allProductsQuery);
  return { props: { products } };
}

const Gallery = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const rawLocale = router.locale ?? 'en';
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading mb-8">{t.gallery}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
