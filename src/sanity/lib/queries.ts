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
export const getProductQuery =  `
    *[_type == "product" && defined(slug.current)][]{
      slug
    }
  `