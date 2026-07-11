import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Community',
      description: 'Badge title shown above main heading',
    }),
    
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'text',
      rows: 3,
      initialValue: 'We make it easy for companies and their employees to contribute and manage compensation',
      description: 'Main headline text. Use [IMG] tags to mark where interactive images should appear',
    }),

    defineField({
      name: 'testimonialImages',
      title: 'Testimonial Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'quote',
              title: 'Tooltip Quote',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'attribution',
              title: 'Attribution',
              type: 'string',
              description: 'Name or title for this testimonial',
            }),
          ],
        }),
      ],
      initialValue: [
        {
          quote: "It's great to have a good sense of where my money is going and be able to adjust as necessary. I love the transparency.",
          attribution: 'John Doe',
        },
        {
          quote: "It's great to have a good sense of where my money is going and be able to adjust as necessary. I love the transparency.",
          attribution: 'John Doe',
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'percentage',
              title: 'Percentage/Metric',
              type: 'string',
              description: 'e.g., "80%", "$100K"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "manual payment tasks", "saved per year"',
            }),
            defineField({
              name: 'isIncrease',
              title: 'Is Increase?',
              type: 'boolean',
              initialValue: false,
              description: 'Shows green up arrow if true, gray down arrow if false',
            }),
            defineField({
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image',
              options: { hotspot: true },
              description: 'Logo to display for this stat (shown on hover)',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(3).max(4),
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'bg-gray-50',
      description: 'Tailwind class for background (e.g., bg-gray-50, bg-white)',
    }),
  ],
})
