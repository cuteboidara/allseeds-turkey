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
      name: 'items',
      title: 'Activity Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'slug', title: 'Slug / ID (e.g. procurement)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'image',
              title: 'Section Image',
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
            defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'slug', media: 'image' },
          },
        },
      ],
    }),
  ],
})
