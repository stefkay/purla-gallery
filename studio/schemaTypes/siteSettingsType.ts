import {defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [{
    name: 'announcement', title: 'Announcement', type: 'object',
    fields: [
      {name: 'enabled', type: 'boolean', initialValue: false},
      {name: 'message', type: 'object', fields: [{name: 'en', type: 'string'}, {name: 'bg', type: 'string'}]},
      {name: 'linkText', type: 'object', fields: [{name: 'en', type: 'string'}, {name: 'bg', type: 'string'}]},
      {name: 'linkUrl', type: 'url', validation: rule => rule.uri({scheme: ['https', 'http'], allowRelative: true})},
      {name: 'startDate', type: 'datetime'},
      {name: 'endDate', type: 'datetime', validation: rule => rule.custom((value, context) => {
        const start = (context.parent as {startDate?: string})?.startDate
        return !value || !start || (typeof value === 'string' && Date.parse(value) > Date.parse(start)) || 'End must be after start'
      })},
    ],
  }],
})
