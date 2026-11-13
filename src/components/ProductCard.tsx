import { Product } from '@/interfaces/product';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/imageUrl';
import Link from 'next/link';
import { Locale } from '@/types/locale';
import { useTranslation } from '@/utils/translation';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  wide?: boolean;
}

export default function ProductCard({ product, locale, wide = false }: ProductCardProps) {
  const { images, title, slug, category } = product;
  const t = useTranslation();
  const image = images?.[0];
  const productTitle = title[locale] || title.en;
  const categoryTitle = category?.title?.[locale] || category?.title?.en;

  return (
    <article className={`group product-card ${wide ? 'product-card--wide' : ''}`}>
      <Link
        href={`/gallery/${slug.current}`}
        className="product-card-link"
        aria-label={`${productTitle} — ${t.viewDetails}`}
      >
          <div className={`product-card-image ${wide ? 'product-card-image--wide' : ''}`}>
            {image && (
            <Image
              src={urlFor(image).width(wide ? 1400 : 900).url()}
              alt={image.alt || productTitle}
              fill
              sizes={wide ? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 50vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'}
              className="editorial-image"
            />
            )}
          </div>

        <div className="gallery-caption">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              {categoryTitle && (
                <p className="gallery-caption-category">{categoryTitle}</p>
              )}
              <h2 className="gallery-caption-title">{productTitle}</h2>
              <span className="gallery-caption-details">{t.viewDetails}</span>
            </div>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="gallery-caption-arrow">
              <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
