import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default function useBoardYear() {
    const { sanitySiteSettings } =
        useStaticQuery<GatsbyTypes.BoardYearQuery>(graphql`
            query BoardYear {
                sanitySiteSettings {
                    primaryBoardYear {
                        year
                    }
                }
            }
        `)

    const primaryBoardYear = sanitySiteSettings.primaryBoardYear.year as String
    return React.useState<String>(primaryBoardYear)
}
