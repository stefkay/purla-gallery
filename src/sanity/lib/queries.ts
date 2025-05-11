export const productsQuery = /* groq */ `
 *[_type == "product"]{
    _id,
    name,
    slug,
    productNumber,
    title,
    metaTitle,
    metaDescription,
    description,
    price,
    size,
    materials,
    availability,
    tags,
    category->{
      title,
      slug
    },
    images[]{asset->{url}, alt}
  }
`;

export const productQuery = `
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      slug,
      title,
      description,
      metaTitle,
      metaDescription,
      price,
      size,
      productNumber,
      availability,
      images[]{asset->{url}, alt},
      thumbnail{asset->{url}, alt},
      category->{
        title
      }
    }
  `;

export const pathsQuery = `
    *[_type == "product" && defined(slug.current)][]{
      slug
    }
  `;
