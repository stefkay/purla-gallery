import '@/styles/globals.scss';
import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/imageUrl';
import { allProductsQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isLocale } from '@/utils/translation';
import { Locale } from '@/types/locale';

export async function getStaticProps() {
  const products: Product[] = await sanityClient.fetch(allProductsQuery);
  return { props: { products } };
}

const Gallery = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  console.log(router.locale);
  const rawLocale = router.locale ?? 'en';
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const currency = locale === ('bg' as Locale) ? 'лв.' : '€';

  return (
    <div>
      {products.map(({ title, _id, images, slug, price }) => (
        <div key={_id}>
          {images?.[0] && (
            <Image
              src={urlFor(images[0]).width(600).height(600).url()}
              alt={title[locale]}
              width={200}
              height={200}
              className="rounded"
            />
          )}
          <Link href={`/gallery/${slug.current}`}>
            <h2 className="text-xl mt-2">{title[locale]}</h2>
          </Link>
          <p className="text-gray-500">
            {price[locale]} {currency}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
