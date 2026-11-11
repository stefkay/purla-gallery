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
    product: { _id, images, title, slug },
    locale,
  } = props;
  const t = useTranslation();
  const image = first(images);

  return (
    <div
      key={_id}
      className="group flex flex-col h-full bg-card rounded-sm overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 backdrop-filter backdrop-blur-sm"
    >
      <Link href={`/gallery/${slug.current}`} className="block overflow-hidden">
        {image && (
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={urlFor(image).width(600).height(600).url()}
              alt={title[locale]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-base text-text line-clamp-2">{title[locale]}</h3>
        </div>
        <div className="mt-auto pt-3">
          <Link
            href={`/gallery/${slug.current}`}
            className="inline-block w-full text-center py-2.5 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 font-medium"
          >
            {t.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}
