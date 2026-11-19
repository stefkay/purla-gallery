import { LocalizedNumber, LocalizedString } from '@/types/locale';
import { SanityImage } from '@/types/image';

export type Product = {
  _id: string;
  slug: { current: string };
  title: LocalizedString;
  description: LocalizedString;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  images: SanityImage[];
  thumbnail?: SanityImage;
  price: LocalizedNumber;
  productNumber: string;
  availability: 'in_stock' | 'preorder' | 'out_of_stock';
  category: { title: LocalizedString; slug?: { current: string } };
  size?: string;
  materials?: string[];
  tags?: string[];
};
