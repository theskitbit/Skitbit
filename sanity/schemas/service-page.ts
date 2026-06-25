import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "servicePage",
  title: "Service Page",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "sections",
      title: "Sections",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Short Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(260),
    }),

    defineField({
      name: "eyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
      initialValue: "Skitbit Service",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroMediaType",
      title: "Hero Media Type",
      type: "string",
      group: "hero",
      initialValue: "default",
      options: {
        list: [
          { title: "Default Design Card", value: "default" },
          { title: "Image", value: "image" },
          { title: "Direct Video / MP4", value: "video" },
          { title: "YouTube Embed", value: "youtube" },
        ],
        layout: "radio",
      },
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image / Video Poster",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.heroMediaType === "default",
      description:
        "Used as hero image or as poster image for video. Recommended: 1400x1200 or 1600x1200.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "string",
      group: "hero",
      hidden: ({ document }) =>
        document?.heroMediaType !== "video" &&
        document?.heroMediaType !== "youtube",
      description:
        "Use a direct MP4/Cloudinary video URL for Video, or a YouTube URL for YouTube Embed.",
    }),

    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      group: "hero",
      initialValue: "Start a project",
    }),

    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Link",
      type: "string",
      group: "hero",
      initialValue: "/contact-form",
    }),

    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Link",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "serviceHighlights",
      title: "Service Highlights",
      type: "array",
      group: "sections",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "body",
      title: "Page Body",
      type: "array",
      group: "sections",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                  }),
                ],
              },
            ],
          },
        }),

        defineArrayMember({
          type: "image",
          title: "Inline Image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "sections",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
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
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "heroImage",
    },
  },
})