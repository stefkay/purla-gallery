import { Product } from '@/interfaces/product';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/imageUrl';
import Link from 'next/link';
import { Locale } from '@/types/locale';
import { first } from 'lodash';
import { useTranslation } from '@/utils/translation';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export default function ProductCard(props: ProductCardProps) {
  const {
    product: { _id, images, title, slug, price },
    locale,
  } = props;
  const t = useTranslation();
  const currency = locale === ('bg' as Locale) ? 'лв.' : '€';
  const image = first(images);

  return (
    <div key={_id} className="flex flex-col h-full bg-card rounded-md overflow-hidden shadow-card transition-transform duration-300 hover:scale-[1.02]">
      <Link href={`/gallery/${slug.current}`} className="block overflow-hidden">
        {image && (
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={urlFor(image).width(600).height(600).url()}
              alt={title[locale]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base">{title[locale]}</h3>
          <span className="font-bold text-accent">
            {price[locale]} {currency}
          </span>
        </div>
        <div className="mt-auto pt-2">
          <Link
            href={`/gallery/${slug.current}`}
            className="inline-block w-full text-center py-2 px-4 bg-btn text-btn-text rounded-md hover:opacity-90 transition-opacity"
          >
            {t.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}
