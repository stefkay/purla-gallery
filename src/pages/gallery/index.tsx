import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { allProductsQuery } from '@/sanity/lib/queries';
import { useRouter } from 'next/router';
import { isLocale } from '@/utils/translation';
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

  return (
    <div className="flex items-start gap-2 justify-start">
      {products.map((product) => (
        <ProductCard product={product} locale={locale} />
      ))}
    </div>
  );
};

export default Gallery;
