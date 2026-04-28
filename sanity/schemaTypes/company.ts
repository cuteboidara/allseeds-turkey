import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: ['en', 'tr'] },
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'founded',
      title: 'Founded Year',
      type: 'string',
    }),
    defineField({
      name: 'keyFigures',
      title: 'Key Figures',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'city', title: 'City', type: 'string' },
            { name: 'country', title: 'Country', type: 'string' },
            { name: 'address', title: 'Address', type: 'text', rows: 3 },
            { name: 'isPrimary', title: 'Primary Office', type: 'boolean' },
          ],
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
