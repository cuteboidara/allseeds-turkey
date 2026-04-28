import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'people',
  title: 'People Page',
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
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Full Name', type: 'string' }),
            defineField({ name: 'title', title: 'Job Title', type: 'string' }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  description: 'Person\'s name for screen readers',
                }),
              ],
            }),
            defineField({ name: 'email', title: 'Email', type: 'string' }),
            defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'title', media: 'photo' },
          },
        },
      ],
    }),
    defineField({
      name: 'cultureText',
      title: 'Company Culture Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
