import { defineField, defineType } from 'sanity'

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
    ],
  })

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: ['en', 'tr'] },
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3 }),
    imageField('heroImage', 'Hero Image', 'Full-bleed background image for the hero section'),

    // ── About ─────────────────────────────────────────────────────────────────
    defineField({ name: 'aboutTitle', title: 'About Section Title', type: 'string' }),
    defineField({ name: 'aboutText', title: 'About Section Text', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'aboutCards',
      title: 'About Grid Cards (2×2)',
      description: '4 photo cards shown next to the About text. Upload one image per card.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Card Label', type: 'string' }),
            imageField('image', 'Card Photo'),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),

    // ── Key Figures ───────────────────────────────────────────────────────────
    defineField({
      name: 'statsItems',
      title: 'Key Figures / Stats',
      description: 'Each stat card shows a value, a label, and an optional icon image in the green circle.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g. >2,000)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            imageField('icon', 'Icon Image', 'Small image shown inside the green circle. Square crop recommended.'),
          ],
          preview: { select: { title: 'value', subtitle: 'label', media: 'icon' } },
        },
      ],
    }),

    // ── Activity teaser cards ─────────────────────────────────────────────────
    defineField({
      name: 'activityCards',
      title: 'Activity Cards (2×2 grid)',
      description: '4 cards shown in the "From Field to Customer" teaser section.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Number Badge (e.g. 01)', type: 'string' }),
            defineField({ name: 'title', title: 'Card Title', type: 'string' }),
            imageField('image', 'Card Background Image'),
          ],
          preview: { select: { title: 'title', subtitle: 'num', media: 'image' } },
        },
      ],
    }),

    // ── Sustainability cards ───────────────────────────────────────────────────
    defineField({
      name: 'sustainabilityCards',
      title: 'Sustainability Pillar Cards',
      description: '3 cards in the Sustainability section. Each can have a photo, title, and description.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pillar Title', type: 'string' }),
            defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2 }),
            imageField('image', 'Pillar Image'),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),

    // ── Team member portraits ─────────────────────────────────────────────────
    defineField({
      name: 'homeTeamMembers',
      title: 'Team Member Photos (home grid)',
      description: 'Up to 6 portrait photos shown in the "Experience Meets Innovation" section.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
            imageField('photo', 'Portrait Photo', 'Square crop (1:1) recommended'),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
        },
      ],
    }),
  ],
})
