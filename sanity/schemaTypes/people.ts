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
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Full Name', type: 'string' },
            { name: 'title', title: 'Job Title', type: 'string' },
            { name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] },
            { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
            { name: 'email', title: 'Email', type: 'string' },
            { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
          ],
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
