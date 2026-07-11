import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Client Role/Title",
      type: "string",
      description: "e.g., 'Premium D2C brand', 'Luxury brand'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category/Industry",
      type: "string",
      description: "e.g., 'Travel & carry', 'Luxury jewellery'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "headline",
      title: "Headline Quote",
      type: "string",
      description: "The main quote/headline for this testimonial",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "description",
      title: "Full Testimonial Text",
      type: "text",
      rows: 4,
      description: "The complete testimonial message",
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: "image",
      title: "Client Logo/Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "metric1Label",
      title: "Metric 1 Label",
      type: "string",
      description: "e.g., 'ROAS Improvement'",
    }),

    defineField({
      name: "metric1Value",
      title: "Metric 1 Value",
      type: "string",
      description: "e.g., '240%'",
    }),

    defineField({
      name: "metric2Label",
      title: "Metric 2 Label",
      type: "string",
      description: "e.g., 'Time Saved'",
    }),

    defineField({
      name: "metric2Value",
      title: "Metric 2 Value",
      type: "string",
      description: "e.g., '60%'",
    }),

    defineField({
      name: "rating",
      title: "Star Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),

    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Toggle to show/hide this testimonial",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
})
