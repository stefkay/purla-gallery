export type Product = {
  _id: string
  slug: { current: string }
  title: {
    en: string
    bg: string
  }
  description: {
    en: string
    bg: string
  }
  images: { asset: { _ref: string } }[]
  price: {
    en: number
    bg: number
  }
}
