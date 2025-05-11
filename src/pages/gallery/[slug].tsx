import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/imageUrl';
import Image from 'next/image';
import { Locale } from '@/types/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import ProductSEO from '@/components/ProductSEO';
import { useTranslation } from '@/utils/translation';
import { Product } from '@/interfaces/product';
import { productQuery, pathsQuery } from '@/sanity/lib/queries';
import Tag from '@/components/ui/Tag';

type Props = {
  product: Product;
  locale: Locale;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: { slug: { current: string } }[] = await sanityClient.fetch(pathsQuery);

  const paths = slugs.flatMap(({ slug }) => [
    { params: { slug: slug.current }, locale: 'en' },
    { params: { slug: slug.current }, locale: 'bg' },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { slug } = params as { slug: string };

  const product: Product = await sanityClient.fetch(productQuery, { slug });

  return {
    props: {
      product,
      locale,
    },
    revalidate: 60,
  };
};

export default function ProductPage({ product, locale }: Props) {
  const t = useTranslation();
  const title = product.title[locale];
  const description = product.description[locale];
  const price = product.price[locale];
  const currency = locale === 'bg' ? 'лв.' : '€';
  const image = product.images?.[0];
  const size = product.size;
  const category = product.category.title[locale];

  return (
    <>
      <ProductSEO product={product} locale={locale} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {image && (
            <Image
              src={urlFor(image).width(800).height(800).url()}
              alt={title}
              width={800}
              height={800}
              className="rounded"
            />
          )}
          <div>
            <div className="flex items-center gap-2 justify-between mb-6">
              <h3 className="text-3xl font-thin">{title}</h3>
              <span className="text-4xl items-center whitespace-nowrap">
                {price} {currency}
              </span>
            </div>
            <p className="text-md mb-4">
              <Tag variant="accent" size="lg">
                {category.toLowerCase()}
              </Tag>
            </p>
            <p className="text-md mb-4">{description}</p>

            <div className="flex gap-2 justify-start mb-6">
              <p className="text-thin text-md">{t.size.toLowerCase()}:</p>
              <p className="text-md">{size}</p>
            </div>

            <div className="flex items-center gap-2 justify-start">
              <p className="text-sm">{t.productNumber}:</p>
              <p className="text-sm font-medium whitespace-nowrap">{product.productNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
