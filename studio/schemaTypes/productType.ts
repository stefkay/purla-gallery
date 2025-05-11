import {defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'Title (English)',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'bg',
          type: 'string',
          title: 'Title (Bulgarian)',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'Meta Title (English)'},
        {name: 'bg', type: 'string', title: 'Meta Title (Bulgarian)'},
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'Meta Description (English)'},
        {name: 'bg', type: 'text', title: 'Meta Description (Bulgarian)'},
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'Description (English)'},
        {name: 'bg', type: 'text', title: 'Description (Bulgarian)'},
      ],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {name: 'en', type: 'number', title: 'Price (EUR)', validation: (Rule) => Rule.required()},
        {name: 'bg', type: 'number', title: 'Price (BGN)', validation: (Rule) => Rule.required()},
      ],
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'In Stock', value: 'in_stock'},
          {title: 'Pre-order', value: 'preorder'},
          {title: 'Out of Stock', value: 'out_of_stock'},
        ],
        layout: 'radio',
      },
      initialValue: 'in_stock',
    },
    {
      name: 'productNumber',
      title: 'Product Number (PRL)',
      type: 'string',
      description: 'Human-readable unique identifier for labeling products (e.g., PRL-001)',
      validation: (Rule) =>
        Rule.required().regex(/^PRL-\d+$/, {
          name: 'prl-format',
          invert: false,
          message: 'Format must be PRL- followed by numbers (e.g., PRL-001)',
        }),
    },
  ],
})
