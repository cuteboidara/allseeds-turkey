import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'activities',
  title: 'Activities Page',
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
      name: 'items',
      title: 'Activity Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'slug', title: 'Slug (ID)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'icon', title: 'Icon Name', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
