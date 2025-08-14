export default {
  name: 'taskForcePage',
  title: 'Task Force Page',
  type: 'document',
  fields: [
      {
          name: 'header',
          title: 'Task Force Page Header',
          type: 'string',
      },
      {
          name: 'subtitle',
          title: 'Task Force Page Subtitle',
          type: 'string'
      },
      {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          validation: (Rule) => Rule.required(),
      },
      {
          name: 'content',
          title: 'Page Content',
          type: 'array',
          of: [{ type: 'section' }],
      }
  ],
}
