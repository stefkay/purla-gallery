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
  const categoryKey = (product: Product) =>
    product.category?.slug?.current || product.category?.title?.en;
  const categories = Array.from(
    new Map(
      products.flatMap((product) => {
        const key = categoryKey(product);
        return key ? [[key, product.category] as const] : [];
      })
    ).entries()
  );
  const filteredProducts = products.filter(
    (product) => !selectedCategory || categoryKey(product) === selectedCategory
  );

  return (
    <div className="gallery-page">
      <div className="gallery-heading">
        <h1 className="mobile-menu-link sm:text-6xl">{t.gallery}</h1>
      </div>
      <div className="gallery-toolbar">
        <div role="group" aria-label={t.galleryFilters} className="gallery-filters">
          {[
            [null, t.allPieces],
            ...categories.map(([key, category]) => [
              key,
              category.title[locale] || category.title.en,
            ]),
          ].map(([key, label]) => (
            <button
              key={key || 'all'}
              type="button"
              aria-pressed={selectedCategory === key}
              onClick={() => setSelectedCategory(key)}
              className={`gallery-filter-button ${selectedCategory === key ? 'gallery-filter-active' : 'gallery-filter-inactive'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div role="group" aria-label={t.galleryView} className="gallery-view-toggle">
          {(['grid', 'list'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
              className={`gallery-view-button ${view === mode ? 'gallery-filter-active' : 'gallery-view-inactive'}`}
            >
              {mode === 'grid' ? t.gridView : t.listView}
            </button>
          ))}
        </div>
      </div>
      <p role="status" className="gallery-count">
        {filteredProducts.length} {t.pieceCount}
      </p>
      <div
        key={`${view}-${selectedCategory}`}
        className={
          view === 'grid'
            ? 'gallery-results gallery-grid'
            : 'gallery-results border-t editorial-rule'
        }
      >
        {filteredProducts.map((product, index) =>
          view === 'grid' ? (
            <ProductCard
              key={product._id}
              product={product}
              locale={locale}
              wide={filteredProducts.length >= 6 && index % 6 === 0}
            />
          ) : (
            <Link
              key={product._id}
              href={`/gallery/${product.slug.current}`}
              className="group gallery-index-row"
            >
              <div className="gallery-index-image">
                {product.images?.[0] && (
                  <Image
                    src={urlFor(product.images[0]).width(240).height(300).url()}
                    alt={product.images[0].alt || product.title[locale] || product.title.en}
                    fill
                    sizes="96px"
                    className="gallery-index-photo"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="gallery-index-title">{product.title[locale] || product.title.en}</h2>
                <p className="piece-materials">
                  {product.category?.title?.[locale] || product.category?.title?.en}
                </p>
                {product.materials?.length ? (
                  <p className="mt-2 text-xs text-text-secondary">
                    {product.materials.join(' · ')}
                  </p>
                ) : null}
              </div>
              <span aria-hidden="true" className="text-xl">
                ↗
              </span>
            </Link>
          )
        )}
      </div>
      {!filteredProducts.length && <p className="py-16 text-text-secondary">{t.noPieces}</p>}
    </div>
  );
};

export default Gallery;
