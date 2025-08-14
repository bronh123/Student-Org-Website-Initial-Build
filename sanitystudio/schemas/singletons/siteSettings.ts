export default {
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Site Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "primaryBoardYear",
            title: "Primary Board Year",
            description: "The default board year to use for the events and board pages",
            type: "reference",
            to: [{ type: "boardYear" }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'primaryColor',
            title: 'Site Primary Color',
            type: 'colorPicker',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'secondaryColor',
            title: 'Site Secondary Color',
            type: 'colorPicker',
            validation: (Rule) => Rule.required(),
        }
    ],
}
