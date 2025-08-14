export default {
  name: "buttonLink",
  title: "Button Link",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "href",
      title: "URL",
      type: "url",
    },
  ],
}
