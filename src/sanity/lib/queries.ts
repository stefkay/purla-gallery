const imageFields = /* groq */ `
  _key,
  alt,
  crop,
  hotspot,
  asset {
    _type,
    _ref,
    "url": @->url,
    "metadata": @->metadata { dimensions { width, height, aspectRatio } }
  }
`;

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
    images[]{${imageFields}}
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
      images[]{${imageFields}},
      thumbnail{${imageFields}},
      materials,
      tags,
      category->{
        title,
        slug
      }
    }
  `;

// Stable selection until explicit editorial curation is added to the CMS.
export const homeProductsQuery = productsQuery.replace(
  '*[_type == "product"]',
  '*[_type == "product" && defined(slug.current)] | order(_createdAt desc, _id asc)',
);

export const pathsQuery = `
    *[_type == "product" && defined(slug.current)][]{
      slug
    }
  `;
