export default {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Contact Page Header',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Contact Page Subtitle',
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