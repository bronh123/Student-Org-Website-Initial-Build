export default {
    name: 'eventsPage',
    title: 'Events Page',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Events Page Header',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Events Page Subtitle',
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