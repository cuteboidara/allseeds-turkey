import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sustainability',
  title: 'Sustainability Page',
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
      name: 'pillars',
      title: 'Sustainability Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'slug', title: 'Slug (e.g. environmental)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'image',
              title: 'Pillar Image',
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
    defineField({
      name: 'commitmentText',
      title: 'Our Commitment Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
