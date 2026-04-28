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
      name: 'email',
      title: 'Primary Contact Email',
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
      name: 'contactCategories',
      title: 'Enquiry Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Category Title', type: 'string' }),
            defineField({ name: 'description', title: 'Short Description', type: 'string' }),
            defineField({ name: 'email', title: 'Routing Email', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'email' },
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
            defineField({ name: 'phone', title: 'Phone', type: 'string' }),
            defineField({ name: 'email', title: 'Email', type: 'string' }),
          ],
          preview: {
            select: { title: 'city', subtitle: 'country' },
          },
        },
      ],
    }),
  ],
})
