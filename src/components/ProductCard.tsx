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
    <article className={`group min-w-0 ${wide ? 'lg:col-span-2' : ''}`}>
      <Link
        href={`/gallery/${slug.current}`}
        className={`relative isolate block aspect-[4/5] overflow-hidden bg-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text ${wide ? 'lg:aspect-[8/5]' : ''}`}
        aria-label={`${productTitle} — ${t.viewDetails}`}
      >
        {image && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(image).width(wide ? 1400 : 900).url()}
              alt={image.alt || productTitle}
              fill
              sizes={wide ? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 50vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] group-focus-within:scale-[1.025] motion-reduce:transform-none"
            />
          </div>
        )}

        <div className="gallery-caption pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 border-t border-border bg-bg/80 p-3 text-text opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-4 motion-reduce:transform-none">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              {categoryTitle && (
                <p className="mb-2 text-[9px] uppercase tracking-[0.16em] text-text-secondary sm:text-[10px]">{categoryTitle}</p>
              )}
              <h2 className="break-words font-heading text-xl leading-[1.1] sm:text-2xl">{productTitle}</h2>
              <span className="mt-2 block text-[10px] tracking-[0.08em] text-text-secondary">{t.viewDetails}</span>
            </div>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="mb-0.5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none">
              <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
