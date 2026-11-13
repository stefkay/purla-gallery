import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Purla Gallery',

  projectId: '7moce2gk',
  dataset: 'production',

  plugins: [structureTool({structure: S => S.list().title('Content').items([
    S.listItem().title('Site settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ...S.documentTypeListItems().filter(item => item.getId() !== 'siteSettings'),
  ])}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
