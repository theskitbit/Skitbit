import { defineField, defineType } from "sanity"

export default defineType({
  name: "location",
  title: "Location Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "pageTitle",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "locationName",
      title: "Location Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "serviceName",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainContent",
      title: "Main Content",
      type: "blockContent",
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      initialValue: "Start Your 3D Rendering Project",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: "pageTitle",
      subtitle: "serviceName",
    },
  },
})