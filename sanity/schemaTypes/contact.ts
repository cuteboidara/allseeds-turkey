import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Page',
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
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
    }),
    defineField({
      name: 'locations',
      title: 'Contact Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'city', title: 'City', type: 'string' },
            { name: 'country', title: 'Country', type: 'string' },
            { name: 'address', title: 'Address', type: 'text', rows: 3 },
            { name: 'phone', title: 'Phone', type: 'string' },
            { name: 'email', title: 'Email', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
