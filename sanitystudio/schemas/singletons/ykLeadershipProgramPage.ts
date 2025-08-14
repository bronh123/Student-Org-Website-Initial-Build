export default {
    name: 'ykLeadershipProgramPage',
    title: 'Yuri Kochiyama Leadership Program Page',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Yuri Kochiyama Leadership Program Page Header',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Yuri Kochiyama Leadership Program Page Subtitle',
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
  