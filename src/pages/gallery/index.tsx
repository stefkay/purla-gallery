import { Product } from '@/interfaces/product';
import { sanityClient } from '@/sanity/lib/client';
import { useRouter } from 'next/router';
import { isLocale, useTranslation } from '@/utils/translation';
import { Locale } from '@/types/locale';
import ProductCard from '@/components/ProductCard';
import { productsQuery } from '@/sanity/lib/queries';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/imageUrl';

export async function getStaticProps() {
  const products: Product[] = await sanityClient.fetch(productsQuery);
  return { props: { products }, revalidate: 60 };
}

const Gallery = ({ products }: { products: Product[] }) => {
  const router = useRouter();
  const rawLocale = router.locale ?? 'en';
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const categoryKey = (product: Product) => product.category?.slug?.current || product.category?.title?.en;
  const categories = Array.from(
    new Map(products.flatMap((product) => {
      const key = categoryKey(product);
      return key ? [[key, product.category] as const] : [];
    })).entries(),
  );
  const filteredProducts = products.filter((product) => !selectedCategory || categoryKey(product) === selectedCategory);

  return (
    <div className="px-[var(--page-gutter)] py-10 lg:py-16">
      <div className="mb-8 flex items-end justify-between border-b editorial-rule pb-5 sm:mb-10">
        <h1 className="font-heading text-5xl leading-none sm:text-6xl">{t.gallery}</h1>
      </div>
      <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div role="group" aria-label={t.galleryFilters} className="flex flex-wrap gap-x-5 gap-y-3">
          {[[null, t.allPieces], ...categories.map(([key, category]) => [key, category.title[locale] || category.title.en])].map(([key, label]) => (
            <button key={key || 'all'} type="button" aria-pressed={selectedCategory === key} onClick={() => setSelectedCategory(key)} className={`border-b py-1 text-xs tracking-wide transition-colors focus-visible:outline focus-visible:outline-offset-4 ${selectedCategory === key ? 'border-text text-text' : 'border-transparent text-text-secondary hover:border-border hover:text-text'}`}>
              {label}
            </button>
          ))}
        </div>
        <div role="group" aria-label={t.galleryView} className="flex shrink-0 gap-4">
          {(['grid', 'list'] as const).map((mode) => (
            <button key={mode} type="button" aria-pressed={view === mode} onClick={() => setView(mode)} className={`border-b py-1 text-xs tracking-wide focus-visible:outline focus-visible:outline-offset-4 ${view === mode ? 'border-text text-text' : 'border-transparent text-text-secondary'}`}>
              {mode === 'grid' ? t.gridView : t.listView}
            </button>
          ))}
        </div>
      </div>
      <p role="status" className="mb-4 text-xs text-text-secondary">{filteredProducts.length} {t.pieceCount}</p>
      <div key={`${view}-${selectedCategory}`} className={view === 'grid' ? 'gallery-results grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4' : 'gallery-results border-t editorial-rule'}>
        {filteredProducts.map((product, index) => view === 'grid' ? (
          <ProductCard key={product._id} product={product} locale={locale} wide={filteredProducts.length >= 6 && index % 6 === 0} />
        ) : (
          <Link key={product._id} href={`/gallery/${product.slug.current}`} className="group flex items-center gap-4 border-b editorial-rule py-4 focus-visible:outline focus-visible:outline-offset-4 sm:gap-8 sm:py-6">
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-secondary sm:h-28 sm:w-24">
              {product.images?.[0] && <Image src={urlFor(product.images[0]).width(240).height(300).url()} alt={product.images[0].alt || product.title[locale] || product.title.en} fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="break-words font-heading text-xl leading-tight sm:text-2xl">{product.title[locale] || product.title.en}</h2>
              <p className="mt-1 text-xs text-text-secondary">{product.category?.title?.[locale] || product.category?.title?.en}</p>
              {product.materials?.length ? <p className="mt-2 text-xs text-text-secondary">{product.materials.join(' · ')}</p> : null}
            </div>
            <span aria-hidden="true" className="text-xl">↗</span>
          </Link>
        ))}
      </div>
      {!filteredProducts.length && <p className="py-16 text-text-secondary">{t.noPieces}</p>}
    </div>
  );
};

export default Gallery;

