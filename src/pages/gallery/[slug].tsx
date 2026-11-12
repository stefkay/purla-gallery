import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/imageUrl';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import ProductSEO from '@/components/ProductSEO';
import { useRouter } from 'next/router';
import { isLocale, useTranslation } from '@/utils/translation';
import { Product } from '@/interfaces/product';
import { productQuery, pathsQuery } from '@/sanity/lib/queries';
import ImageLightbox from '@/components/ImageLightbox';

type Props = {
  product: Product;
  locale: Locale;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: { slug: { current: string } }[] = await sanityClient.fetch(pathsQuery);

  return {
    paths: slugs.flatMap(({ slug }) => [
      { params: { slug: slug.current }, locale: 'en' },
      { params: { slug: slug.current }, locale: 'bg' },
    ]),
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

export default function ProductPage({ product }: Props) {
  const router = useRouter();
  const rawLocale = router.locale ?? 'en';
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = useTranslation();
  const title = product.title[locale];
  const description = product.description?.[locale];
  const category = product.category?.title?.[locale];
  const image = product.images?.[0];
  const metadata = [
    product.size ? `${t.size}: ${product.size}` : null,
    product.materials?.length ? product.materials.join(' · ') : null,
  ].filter(Boolean);

  return (
    <>
      <ProductSEO product={product} locale={locale} />

      <article className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pt-16">
        <div className="mb-8 flex items-center justify-between border-b editorial-rule pb-5">
          <Link href="/gallery" className="text-xs tracking-[0.14em] text-text-secondary transition-colors hover:text-text">
            ← {t.gallery}
          </Link>
          <span className="eyebrow">{category || 'Purla Gallery'}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] lg:gap-20">
          <div className="lg:max-w-[760px]">
            {image && (
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={urlFor(image).width(1600).height(2000).url()}
                  alt={image.alt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between lg:py-3">
            <div>
              <p className="eyebrow mb-5">{product.productNumber}</p>
              <h1 className="max-w-xl font-heading text-6xl leading-[0.88] sm:text-7xl lg:text-8xl">{title}</h1>
              {description && <p className="mt-8 max-w-md text-base leading-7 text-text-secondary">{description}</p>}
            </div>

            {metadata.length > 0 && (
              <dl className="mt-12 border-y editorial-rule text-sm">
                {metadata.map((item) => (
                  <div key={item} className="border-b editorial-rule py-4 last:border-b-0">
                    <dd className="text-text-secondary">{item}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {product.images?.length > 0 && (
          <section className="mt-20 border-t editorial-rule pt-8 sm:mt-32" aria-labelledby="image-story-title">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 id="image-story-title" className="font-heading text-4xl sm:text-5xl">
                {t.gallery}
              </h2>
              <p className="hidden max-w-xs text-right text-sm text-text-secondary sm:block">Select an image to view it full screen.</p>
            </div>
            <ImageLightbox images={product.images} title={title} />
          </section>
        )}
      </article>
    </>
  );
}
