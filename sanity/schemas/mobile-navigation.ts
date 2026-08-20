import { defineArrayMember, defineField, defineType } from 'sanity'

const linkFields = [
  defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
  defineField({ name: 'href', title: 'URL', type: 'string', validation: (rule) => rule.required() }),
]

const imageCard = defineArrayMember({
  type: 'object',
  name: 'featuredCard',
  title: 'Featured card',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'href', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
  ],
})

export default defineType({
  name: 'mobileNavigation',
  title: 'Mobile Navigation',
  type: 'document',
  fields: [
    defineField({ name: 'primaryLinks', title: 'Primary links', type: 'array', of: [defineArrayMember({ type: 'object', name: 'link', fields: linkFields })] }),
    defineField({ name: 'featuredCards', title: 'Featured image cards', type: 'array', of: [imageCard] }),
    defineField({
      name: 'groups',
      title: 'Expandable groups',
      type: 'array',
      of: [defineArrayMember({
        type: 'object', name: 'navigationGroup', fields: [
          defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
          defineField({ name: 'links', type: 'array', of: [defineArrayMember({ type: 'object', name: 'link', fields: linkFields })] }),
        ],
      })],
    }),
    defineField({ name: 'utilityLinks', title: 'Utility links', type: 'array', of: [defineArrayMember({ type: 'object', name: 'link', fields: linkFields })] }),
  ],
})
