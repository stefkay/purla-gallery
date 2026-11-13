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
  const locale = isLocale(rawLocale || '') ? rawLocale as 'en' | 'bg' : 'en';
  const pieces = products.filter((piece) => piece.slug?.current && piece.images?.length);
  const hero = pieces[0];
  const featured = pieces.slice(1, 4);
  const title = (piece: Product) => piece.title[locale] || piece.title.en;
  return (
    <div className="px-[var(--page-gutter)] pb-20">
      <Head><title>Purla — {t.gallery}</title></Head>
      <section className="grid items-center gap-8 py-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:py-10">
        <div className="gallery-results">
          <p className="eyebrow mb-6">Purla Gallery</p>
          <h1 className="max-w-lg font-heading text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">{t.welcomeToPurla}</h1>
          <Link href="/gallery" className="mt-10 inline-flex min-h-11 items-center gap-8 border-b border-text pb-2 text-sm tracking-wide focus-visible:outline focus-visible:outline-offset-4">{t.gallery} <span aria-hidden="true">↗</span></Link>
        </div>
        {hero && <Link href={`/gallery/${hero.slug.current}`} className="group relative block aspect-[4/5] overflow-hidden bg-bg-secondary focus-visible:outline focus-visible:outline-offset-4 lg:aspect-[6/5]" aria-label={title(hero)}>
          <Image src={urlFor(hero.images[0]).width(1600).url()} alt={hero.images[0].alt || title(hero)} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none" />
          <span className="absolute bottom-4 left-4 bg-bg/85 px-3 py-2 text-sm text-text">{title(hero)}</span>
        </Link>}
      </section>
      {featured.length > 0 && <section className="mt-12 border-t editorial-rule pt-8 sm:mt-20" aria-labelledby="featured-title">
        <div className="mb-10 flex items-end justify-between gap-6"><h2 id="featured-title" className="font-heading text-4xl sm:text-5xl">{t.gallery}</h2><Link href="/gallery" className="text-xs tracking-wide underline underline-offset-4">{t.allPieces} ↗</Link></div>
        <div className="grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          {featured.map((piece, index) => <Link key={piece._id} href={`/gallery/${piece.slug.current}`} className={`group block focus-visible:outline focus-visible:outline-offset-4 ${index === 0 ? 'lg:col-span-5' : index === 1 ? 'sm:mt-20 lg:col-span-3 lg:mt-36' : 'lg:col-span-4 lg:mt-12'}`}>
            <div className={`relative overflow-hidden bg-bg-secondary ${index === 1 ? 'aspect-square' : 'aspect-[4/5]'}`}><Image src={urlFor(piece.images[0]).width(1000).url()} alt={piece.images[0].alt || title(piece)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none" /></div>
            <div className="mt-4 flex items-start justify-between gap-4"><h3 className="font-heading text-2xl">{title(piece)}</h3><span aria-hidden="true">↗</span></div>
            {piece.materials?.length ? <p className="mt-1 text-xs text-text-secondary">{piece.materials.join(' · ')}</p> : null}
          </Link>)}
        </div>
      </section>}
    </div>
  );
}
