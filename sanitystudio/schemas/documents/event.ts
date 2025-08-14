// Continuing to use the deprecated moment because sanity.io still has it as a dependency anyways
import moment from "moment"
import SlugInput from "sanity-plugin-better-slug"

import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments"

export default {
    name: "event",
    title: "Event",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "datetime",
            title: "Event Date and Time",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            description:
                "The URL for the event on the website. Click generate once you've filled out the title and event date.",
            type: "slug",
            inputComponent: SlugInput,
            options: {
                source: (doc) =>
                    `${doc.title}-${moment(doc.datetime).year()}`,
                basePath: "https://umcpaasu.com",
                slugify: (input) =>
                    input
                        .replace(/[^\w\d\s-]/g, "") // remove any character that isn't a word, digit, or whitespace
                        .replace(/\s+/g, "-")
                        .toLowerCase()
                        .slice(0, 200),
                isUnique: isUniqueAcrossAllDocuments,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "boardYear",
            title: "Board Year",
            type: "reference",
            weak: false,
            to: [{ type: "boardYear" }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "facebookLink",
            title: "Facebook Event Link",
            type: "url",
        },
        {
            name: "tags",
            title: "Tags",
            type: "tags",
        },
        {
            name: "image",
            title: "Event Cover Photo",
            type: "image",
        },
        {
            // see https://www.sanity.io/docs/block-type
            name: "description",
            title: "Event Description",
            type: "portableText",
        },
    ],
}
