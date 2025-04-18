export const allProductsQuery = /* groq */ `
  *[_type == "product"]{
    _id,
    slug,
    title,
    description,
    images,
    price
  }
`
