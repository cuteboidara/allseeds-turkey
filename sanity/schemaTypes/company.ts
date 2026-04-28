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
      validation: (Rule) => Rule.required(),
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
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'aboutText',
      title: 'About / Our Story Text',
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
            defineField({ name: 'value', title: 'Value (e.g. 725,000 MT)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
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
            defineField({ name: 'city', title: 'City', type: 'string' }),
            defineField({ name: 'country', title: 'Country', type: 'string' }),
            defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
            defineField({ name: 'isPrimary', title: 'Primary Office', type: 'boolean' }),
          ],
          preview: {
            select: { title: 'city', subtitle: 'country' },
          },
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      description: 'Optional photo gallery shown on the company page',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Describe the image for accessibility',
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})
