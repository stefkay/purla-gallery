import { isLocale, useTranslation } from '@/utils/translation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { productsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/imageUrl';

export async function getStaticProps() {
  const products: Product[] = await sanityClient.fetch(productsQuery);
  return { props: { products }, revalidate: 60 };
}

export default function Home({ products }: { products: Product[] }) {
  const t = useTranslation();
  const { locale: rawLocale } = useRouter();
  const locale = isLocale(rawLocale || '') ? rawLocale as 'en' | 'bg' : 'en';
  const pieces = products.filter((piece) => piece.slug?.current && piece.images?.length);
  const hero = pieces[0];
  const featured = pieces.slice(1, 4);
  const title = (piece: Product) => piece.title[locale] || piece.title.en;
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
      <Head><title>Purla — {t.gallery}</title></Head>
      <section className="grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-20 lg:py-16">
        <div className="gallery-results">
          <p className="eyebrow mb-6">Purla Gallery</p>
          <h1 className="font-heading text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">{t.welcomeToPurla}</h1>
          {hero?.description?.[locale] && <p className="mt-8 max-w-md leading-7 text-text-secondary">{hero.description[locale]}</p>}
          <Link href="/gallery" className="mt-10 inline-flex min-h-11 items-center gap-8 border-b border-text pb-2 text-sm tracking-wide focus-visible:outline focus-visible:outline-offset-4">{t.gallery} <span aria-hidden="true">↗</span></Link>
        </div>
        {hero && <Link href={`/gallery/${hero.slug.current}`} className="group relative block aspect-[4/5] max-h-[640px] overflow-hidden bg-secondary" aria-label={title(hero)}>
          <Image src={urlFor(hero.images[0]).width(1200).url()} alt={hero.images[0].alt || title(hero)} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none" />
          <span className="absolute bottom-4 left-4 bg-[#F8F6F2]/85 px-3 py-2 text-sm text-[#262522]">{title(hero)}</span>
        </Link>}
      </section>
      {featured.length > 0 && <section className="mt-12 border-t editorial-rule pt-8 sm:mt-20" aria-labelledby="featured-title">
        <div className="mb-10 flex items-end justify-between gap-6"><h2 id="featured-title" className="font-heading text-4xl sm:text-5xl">{t.gallery}</h2><Link href="/gallery" className="text-xs tracking-wide underline underline-offset-4">{t.allPieces} ↗</Link></div>
        <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {featured.map((piece, index) => <Link key={piece._id} href={`/gallery/${piece.slug.current}`} className={`group block ${index === 1 ? 'sm:mt-20' : ''}`}>
            <div className={`relative overflow-hidden bg-secondary ${index === 1 ? 'aspect-square' : 'aspect-[4/5]'}`}><Image src={urlFor(piece.images[0]).width(800).url()} alt={piece.images[0].alt || title(piece)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none" /></div>
            <div className="mt-4 flex items-start justify-between gap-4"><h3 className="font-heading text-2xl">{title(piece)}</h3><span aria-hidden="true">↗</span></div>
            {piece.materials?.length ? <p className="mt-1 text-xs text-text-secondary">{piece.materials.join(' · ')}</p> : null}
          </Link>)}
        </div>
      </section>}
    </div>
  );
}
