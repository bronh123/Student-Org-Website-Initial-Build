export default {
    name: "bio",
    title: "Bio",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "position",
            title: "Position",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "boardYear",
            title: "Board Year",
            type: "reference",
            to: [{ type: "boardYear" }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "propic",
            title: "Profile Picture",
            type: "image",
            validation: (Rule) => Rule.required()
        },
        {
            name: "isImageBio",
            title: "Is Image Bio",
            description: "Whether the information for the bio is all in the image provided",
            type: "boolean",
            default: false,
        },
        {
            name: "major",
            title: "Major(s)",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
            hidden: ({ parent }) => parent?.isImageBio,
        },
        {
            // see https://www.sanity.io/docs/block-type
            name: "description",
            title: "Description",
            type: "portableText",
            hidden: ({ parent }) => parent?.isImageBio,
        },
        {
            name: "order",
            title: "Order",
            type: "number",
            hidden: true,
        },
    ],
}
