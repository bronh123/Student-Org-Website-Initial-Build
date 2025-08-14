export default {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Home Page Header',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Home Page Subtitle',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Background Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'aboutTitle',
            title: 'About Us Blurb Title',
            type: 'string'
        },
        {
            name: 'aboutDescription',
            title: 'About Us Blurb',
            type: 'portableText'
        },
        {
            name: 'boardSectionImage',
            title: 'Board Section Background Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'subscribeSectionImage',
            title: 'Subscribe Section Background Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        },
    ],
}
