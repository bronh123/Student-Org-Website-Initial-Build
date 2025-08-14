export default {
    name: 'boardPage',
    title: 'Board Page',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Board Page Header',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Board Page Subtitle',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Background Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
    ],
}