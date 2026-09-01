import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroStills',
      title: 'Hero Stills',
      type: 'array',
      description: 'Select and reorder work items shown in the homepage Hero Stills section. The selected work item hero image is used automatically.',
      of: [{
        type: 'reference',
        to: [{type: 'workItem'}],
      }],
      validation: (Rule) => Rule.unique().max(12),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Homepage Settings'}),
  },
})
