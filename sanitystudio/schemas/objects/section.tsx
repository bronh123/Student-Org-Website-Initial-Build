export default {
    name: "section",
    title: "Section",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "isImageSection",
            title: "Is Image Section",
            type: "boolean",
        },
        {
            name: "backgroundImage",
            title: "Background Image",
            type: "image",
            hidden: ({ parent }) => !parent?.isImageSection,
        },
        {
            name: "body",
            title: "Body",
            type: "portableText",
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image" }],
        },

        {
            name: "button",
            title: "Button",
            description: "Optional link to another page",
            type: "buttonLink"
        }
    ],
}
