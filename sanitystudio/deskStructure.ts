// Created following https://youtu.be/YMX2TX3vIAc
import S from "@sanity/desk-tool/structure-builder"

export default () =>
    S.list()
        .title("Content")
        .items([
            S.listItem().title("Site Settings").child(
                // Display the editor
                S.editor()
                    .id("siteSettings")
                    .schemaType("siteSettings")
                    // Create a document with the ID siteSettings
                    .documentId("siteSettings")
            ),
            S.divider(),
            S.listItem()
                .title("Website Pages")
                .child(
                    S.list()
                        .title("Pages")
                        .items([
                            S.listItem().title("Home Page").child(
                                S.document()
                                    .schemaType("homePage")
                                    .documentId("homePage")
                            ),
                            S.listItem().title("About Page").child(
                                S.document()
                                    .schemaType("aboutPage")
                                    .documentId("aboutPage")
                            ),
                            S.listItem().title("Events Page").child(
                                S.document()
                                    .schemaType("eventsPage")
                                    .documentId("eventsPage")
                            ),
                            S.listItem().title("Board Page").child(
                                S.document()
                                    .schemaType("boardPage")
                                    .documentId("boardPage")
                            ),
                            S.listItem().title("Contact Page").child(
                                S.document()
                                    .schemaType("contactPage")
                                    .documentId("contactPage")
                            ),
                            S.listItem().title("Task Force Page").child(
                                S.document()
                                    .schemaType("taskForcePage")
                                    .documentId("taskForcePage")
                            ),
                            S.listItem().title("Yuri Kochiyama Leadership Program Page").child(
                                S.document()
                                    .schemaType("ykLeadershipProgramPage")
                                    .documentId("ykLeadershipProgramPage")
                            ),
                        ])
                ),
            S.listItem()
                .title("Board Years")
                .child(S.documentTypeList("boardYear")),
            S.divider(),
            // Filtering bios by Board year
            S.listItem()
                .title("Bios by Board Year")
                .child(
                    S.documentTypeList("boardYear")
                        .title("Bios by Board Year")
                        .child((boardYear) =>
                            S.documentList()
                                .title("Bios")
                                .filter(
                                    "_type == 'bio' && $boardYear == boardYear._ref"
                                )
                                .params({ boardYear })
                        )
                ),
            S.listItem()
                .title("Events by Board Year")
                .child(
                    S.documentTypeList("boardYear")
                        .title("Events by Board Year")
                        .child((boardYear) =>
                            S.documentList()
                                .title("Events")
                                .filter(
                                    "_type == 'event' && $boardYear == boardYear._ref"
                                )
                                .params({ boardYear })
                        )
                ),
            // The rest of the documents
            ...S.documentTypeListItems().filter(
                (item) =>
                    ![
                        "siteSettings",
                        "homePage",
                        "aboutPage",
                        "eventsPage",
                        "boardPage",
                        "contactPage",
                        "taskForcePage",
                        "ykLeadershipProgramPage",
                        "boardYear",
                        "media.tag",
                        "event",
                        "bio",
                    ].includes(item.getId())
            ),
        ])
