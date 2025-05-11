import { LocalizedNumber, LocalizedString } from '@/types/locale';

export type Product = {
  _id: string;
  slug: { current: string };
  title: LocalizedString;
  description: LocalizedString;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  images: { asset: { _ref: string } }[];
  thumbnail: { asset: { _ref: string } };
  price: LocalizedNumber;
  productNumber: string;
  availability: 'in_stock' | 'preorder' | 'out_of_stock';
  category: { title: LocalizedString };
  size: string;
};
