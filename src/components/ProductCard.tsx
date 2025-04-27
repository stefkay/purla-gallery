import { Product } from '@/interfaces/product';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/imageUrl';
import Link from 'next/link';
import { Locale } from '@/types/locale';
import { first } from 'lodash';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export default function ProductCard(props: ProductCardProps) {
  const {
    product: { _id, images, title, slug, price },
    locale,
  } = props;
  const currency = locale === ('bg' as Locale) ? 'лв.' : '€';
  const image = first(images);

  return (
    <div key={_id}>
      <Link href={`/gallery/${slug.current}`} className="hover:opacity-80">
        {image && (
          <Image
            src={urlFor(image).width(600).height(600).url()}
            alt={title[locale]}
            width={300}
            height={300}
            className="aspect-square"
          />
        )}
      </Link>
      <div className="flex justify-between items-center">
        <h4 className="text-sm">{title[locale]}</h4>
        <span className="text-md">
          {price[locale]} {currency}
        </span>
      </div>
    </div>
  );
}
