import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/imageUrl';
import Image from 'next/image';
import Head from 'next/head';
import { Locale } from '@/types/locale';
import { getProductQuery } from '@/sanity/lib/queries';
import { GetStaticPaths, GetStaticProps } from 'next';

type LocalizedText = { en: string; bg: string };
type LocalizedPrice = { en: number; bg: number };

type Product = {
  _id: string;
  slug: { current: string };
  title: LocalizedText;
  description: LocalizedText;
  price: LocalizedPrice;
  images: { asset: { _ref: string } }[];
};

type Props = {
  product: Product;
  locale: Locale;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: { slug: { current: string } }[] = await sanityClient.fetch(getProductQuery);

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

  const product: Product = await sanityClient.fetch(
    `
    *[_type == "product" && slug.current == $slug][0]
  `,
    { slug }
  );

  return {
    props: {
      product,
      locale,
    },
    revalidate: 60,
  };
};

export default function ProductPage({ product, locale }: Props) {
  const title = product.title[locale];
  const description = product.description[locale];
  const price = product.price[locale];
  const currency = locale === 'bg' ? 'лв.' : '€';
  const image = product.images?.[0];

  return (
    <>
      <Head>
        <title>{title} – Purla</title>
        <meta name="description" content={description} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
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
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-700 text-lg mb-6">{description}</p>
            <p className="text-2xl font-semibold">
              {price} {currency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
