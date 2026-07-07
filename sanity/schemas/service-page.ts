import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description (Mobile Card)',
      type: 'text',
      description: 'Short description shown on mobile cards. Keep under 120 characters for optimal display.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: '3D Animation (9:16)', value: 'animation'},
          {title: '3D Render (4:5)', value: 'render'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaUrl',
      title: 'Media URL (Blob Link)',
      type: 'url',
      description: 'Paste your Vercel Blob link here',
      validation: (Rule) => Rule.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'posterUrl',
      title: 'Poster Image (Blob Link - Animations Only)',
      type: 'url',
      validation: (Rule) => {
        return Rule.custom((value, context) => {
          if (context.document?.type === 'animation' && !value) {
            return 'Poster image is required for animations'
          }
          return true
        })
      },
    }),
    defineField({
      name: 'formatTag',
      title: 'Format Tag',
      type: 'string',
      description: 'e.g., "3D PRODUCT ANIMATION", "STILL LIFE"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Jewelry', value: 'Jewelry'},
              {title: 'Wellness & Health', value: 'Wellness & Health'},
              {title: 'Skincare & Cosmetics', value: 'Skincare & Cosmetics'},
              {title: 'Beauty', value: 'Beauty'},
              {title: 'Fashion', value: 'Fashion'},
              {title: 'Luxury Goods', value: 'Luxury Goods'},
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'fidelityTag',
      title: 'Fidelity Tag',
      type: 'string',
      description: 'e.g., "4K PRODUCTION", "2K PRODUCTION"',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})