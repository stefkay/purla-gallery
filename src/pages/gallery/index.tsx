import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { useRouter } from 'next/router';
import { isLocale, useTranslation } from '@/utils/translation';
import { Locale } from '@/types/locale';
import ProductCard from '@/components/ProductCard';
import { productsQuery } from '@/sanity/lib/queries';

export async function getStaticProps() {
  const products: Product[] = await sanityClient.fetch(productsQuery);
  return { props: { products } };
}

const Gallery = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const rawLocale = router.locale ?? 'en';
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = useTranslation();

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mb-8 flex items-end justify-between border-b editorial-rule pb-5 sm:mb-10">
        <h1 className="font-heading text-5xl leading-none sm:text-6xl">{t.gallery}</h1>
      </div>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

