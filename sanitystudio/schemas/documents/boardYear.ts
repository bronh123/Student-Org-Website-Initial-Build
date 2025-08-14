export default {
    name: 'boardYear',
    title: 'Board Year',
    type: 'document',
    fields: [
        {
            name: 'year',
            title: 'Board Year',
            type: 'string',
            description:
                "For example: 2019-2020",
            validation: (Rule) =>
                Rule.required()
                    .regex(/\d{4}-\d{4}/, {
                        name: "board year"
                    })
                    .error("Years should be in the format XXXX-XXXX"),
        },
    ],
}