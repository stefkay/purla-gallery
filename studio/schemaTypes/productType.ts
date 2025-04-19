import {defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'Title (English)'},
        {name: 'bg', type: 'string', title: 'Title (Bulgarian)'},
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
        {name: 'en', type: 'number', title: 'Price (EUR)'},
        {name: 'bg', type: 'number', title: 'Price (BGN)'},
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
})
