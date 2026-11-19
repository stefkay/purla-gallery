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
import { productQuery, pathsQuery, homeProductsQuery } from '@/sanity/lib/queries';
import ProductCard from '@/components/ProductCard';
import ImageLightbox from '@/components/ImageLightbox';

type Props = {
  product: Product;
  locale: Locale;
  previous: Product | null;
  next: Product | null;
  related: Product[];
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
  if (!product) return { notFound: true };
  const pieces: Product[] = await sanityClient.fetch(homeProductsQuery);
  const index = pieces.findIndex((piece) => piece._id === product._id);
  const categorySlug = product.category?.slug?.current;
  const related = categorySlug
    ? pieces
        .filter(
          (piece) => piece._id !== product._id && piece.category?.slug?.current === categorySlug
        )
        .slice(0, 3)
    : [];

  return {
    props: {
      product,
      locale,
      previous: index > 0 ? pieces[index - 1] : null,
      next: index >= 0 && index < pieces.length - 1 ? pieces[index + 1] : null,
      related,
    },
    revalidate: 60,
  };
};

export default function ProductPage({ product, previous, next, related }: Props) {
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

      <article className="detail-page">
        <div className="detail-breadcrumb">
          <Link href="/gallery" className="detail-back-link">
            ← {t.gallery}
          </Link>
          <span className="eyebrow">{category || 'Purla Gallery'}</span>
        </div>

        <div className="detail-hero">
          <div className="lg:max-w-[760px]">
            {image && (
              <div className="detail-hero-frame">
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

          <div className="detail-information">
            <div>
              <p className="eyebrow mb-5">{product.productNumber}</p>
              <h1 className="detail-title">{title}</h1>
              {description && <p className="detail-description">{description}</p>}
            </div>

            {metadata.length > 0 && (
              <dl className="detail-metadata">
                {metadata.map((item) => (
                  <div key={item} className="detail-metadata-row">
                    <dd className="text-text-secondary">{item}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {product.images?.length > 0 && (
          <section className="detail-story" aria-labelledby="image-story-title">
            <div className="detail-story-heading">
              <h2 id="image-story-title" className="section-title">
                {t.gallery}
              </h2>
              <p className="detail-story-hint">Select an image to view it full screen.</p>
            </div>
            <ImageLightbox images={product.images} title={title} />
          </section>
        )}
        {(previous || next) && (
          <nav aria-label={t.pieceNavigation} className="detail-navigation">
            <div>
              {previous && (
                <Link href={`/gallery/${previous.slug.current}`} className="detail-navigation-link">
                  <span className="eyebrow">← {t.previousPiece}</span>
                  <span>{previous.title[locale] || previous.title.en}</span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/gallery/${next.slug.current}`} className="detail-navigation-link">
                  <span className="eyebrow">{t.nextPiece} →</span>
                  <span>{next.title[locale] || next.title.en}</span>
                </Link>
              )}
            </div>
          </nav>
        )}
        {related.length > 0 && (
          <section className="detail-related" aria-labelledby="related-title">
            <h2 id="related-title" className="mb-8 font-heading text-3xl">
              {t.relatedPieces}
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {related.map((piece) => (
                <ProductCard key={piece._id} product={piece} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
