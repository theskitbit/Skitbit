import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "hero",
      title: "Hero Media",
    },
    {
      name: "sidebar",
      title: "Sidebar",
    },
    {
      name: "author",
      title: "Author",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Post Title",
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
      description:
        "This appears under the blog title and on the blog listing card.",
      validation: (Rule) => Rule.required().max(260),
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      group: "content",
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      options: {
        layout: "tags",
      },
      initialValue: ["3D Rendering"],
    }),

    defineField({
      name: "readTime",
      title: "Read Time",
      type: "number",
      group: "content",
      initialValue: 7,
      description: "Only enter the number. Example: 7 = 7 min read.",
    }),

    defineField({
      name: "heroMediaType",
      title: "Hero Media Type",
      type: "string",
      group: "hero",
      initialValue: "image",
      options: {
        layout: "radio",
        list: [
          {
            title: "Image",
            value: "image",
          },
          {
            title: "YouTube Video",
            value: "youtube",
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Hero / Blog Listing Image",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.heroMediaType === "youtube",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for SEO and accessibility.",
        }),
      ],
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      group: "hero",
      hidden: ({ document }) => document?.heroMediaType !== "youtube",
      description:
        "Paste normal YouTube URL. Example: https://www.youtube.com/watch?v=xxxxx",
    }),

    defineField({
      name: "imageCaption",
      title: "Hero Image Caption",
      type: "string",
      group: "hero",
      hidden: ({ document }) => document?.heroMediaType === "youtube",
      description: "Small text shown on the bottom-left of the hero image.",
    }),

    defineField({
      name: "imageCredit",
      title: "Hero Image Credit",
      type: "string",
      group: "hero",
      hidden: ({ document }) => document?.heroMediaType === "youtube",
      description:
        "Small text shown on the bottom-right of the hero image. Example: Render by Skitbit",
    }),

    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            {
              title: "Normal",
              value: "normal",
            },
            {
              title: "Heading 2",
              value: "h2",
            },
            {
              title: "Heading 3",
              value: "h3",
            },
            {
              title: "Heading 4",
              value: "h4",
            },
            {
              title: "Quote",
              value: "blockquote",
            },
          ],
          lists: [
            {
              title: "Bullet",
              value: "bullet",
            },
            {
              title: "Number",
              value: "number",
            },
          ],
          marks: {
            decorators: [
              {
                title: "Bold",
                value: "strong",
              },
              {
                title: "Italic",
                value: "em",
              },
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

        defineArrayMember({
          name: "callout",
          title: "Callout Box",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Callout Title",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Callout Body",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "body",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "overviewItems",
      title: "Sticky Overview Items",
      type: "array",
      group: "sidebar",
      description:
        "Optional. If empty, the frontend automatically uses H2/H3 headings from the article body.",
      of: [
        defineArrayMember({
          name: "overviewItem",
          title: "Overview Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "anchor",
              title: "Anchor",
              type: "string",
              description:
                "Use lowercase with hyphens. Must match a heading ID. Example: product-rendering-cost",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "anchor",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "newsletterTitle",
      title: "Newsletter Card Title",
      type: "text",
      rows: 3,
      group: "sidebar",
      initialValue:
        "Join 1,000,000+ subscribers receiving expert creative and growth insights.",
    }),

    defineField({
      name: "newsletterDescription",
      title: "Newsletter Card Description",
      type: "text",
      rows: 3,
      group: "sidebar",
    }),

    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter Email Placeholder",
      type: "string",
      group: "sidebar",
      initialValue: "name@email.com",
    }),

    defineField({
      name: "newsletterButtonLabel",
      title: "Newsletter Button Label",
      type: "string",
      group: "sidebar",
      initialValue: "Subscribe",
    }),

    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      group: "author",
      initialValue: "Skitbit Team",
    }),

    defineField({
      name: "authorRole",
      title: "Author Role",
      type: "string",
      group: "author",
      initialValue: "Creative Strategy Team",
    }),

    defineField({
      name: "authorImage",
      title: "Author Image",
      type: "image",
      group: "author",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "authorBio",
      title: "Author Bio",
      type: "text",
      rows: 4,
      group: "author",
      initialValue:
        "Skitbit creates premium product visuals, 3D renders, product animations, and performance creatives for D2C brands.",
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
      media: "image",
    },
  },
})