import { LocalizedNumber, LocalizedString } from '@/types/locale';

export type Product = {
  _id: string;
  slug: { current: string };
  title: LocalizedString;
  description: LocalizedString;
  images: { asset: { _ref: string } }[];
  price: LocalizedNumber;
};
