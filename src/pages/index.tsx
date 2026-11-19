import { isLocale, useTranslation } from '@/utils/translation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { homeProductsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/imageUrl';

export async function getStaticProps() {
  const products: Product[] = await sanityClient.fetch(homeProductsQuery);
  return { props: { products }, revalidate: 60 };
}

export default function Home({ products }: { products: Product[] }) {
  const t = useTranslation();
  const { locale: rawLocale } = useRouter();
  const locale = isLocale(rawLocale || '') ? (rawLocale as 'en' | 'bg') : 'en';
  const pieces = products.filter((piece) => piece.slug?.current && piece.images?.length);
  const hero = pieces[0];
  const featured = pieces.slice(1, 4);
  const title = (piece: Product) => piece.title[locale] || piece.title.en;
  return (
    <div className="home-page">
      <Head>
        <title>Purla — {t.gallery}</title>
      </Head>
      <section className="home-hero">
        <div className="gallery-results">
          <p className="eyebrow mb-6">Purla Gallery</p>
          <h1 className="home-title">{t.welcomeToPurla}</h1>
          <Link href="/gallery" className="editorial-cta">
            {t.gallery} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {hero && (
          <Link
            href={`/gallery/${hero.slug.current}`}
            className="group home-hero-image"
            aria-label={title(hero)}
          >
            <Image
              src={urlFor(hero.images[0]).width(1600).url()}
              alt={hero.images[0].alt || title(hero)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="home-photo"
            />
            <span className="home-image-caption">{title(hero)}</span>
          </Link>
        )}
      </section>
      {featured.length > 0 && (
        <section className="home-featured" aria-labelledby="featured-title">
          <div className="section-heading">
            <h2 id="featured-title" className="section-title">
              {t.gallery}
            </h2>
            <Link href="/gallery" className="section-link">
              {t.allPieces} ↗
            </Link>
          </div>
          <div className="home-featured-grid">
            {featured.map((piece, index) => (
              <Link
                key={piece._id}
                href={`/gallery/${piece.slug.current}`}
                className={`group home-feature-link ${[
                  'home-feature-primary',
                  'home-feature-secondary',
                  'home-feature-tertiary',
                ][index]}`}
              >
                <div
                  className={`home-feature-image ${index === 1 ? 'aspect-square' : 'aspect-[4/5]'}`}
                >
                  <Image
                    src={urlFor(piece.images[0]).width(1000).url()}
                    alt={piece.images[0].alt || title(piece)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                    className="home-photo"
                  />
                </div>
                <div className="piece-summary">
                  <h3 className="font-heading text-2xl">{title(piece)}</h3>
                  <span aria-hidden="true">↗</span>
                </div>
                {piece.materials?.length ? (
                  <p className="piece-materials">{piece.materials.join(' · ')}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
