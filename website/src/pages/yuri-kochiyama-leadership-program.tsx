import React from "react"
import { graphql, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"

import SEO from "@components/SEO"
import { ParallaxBackground, RaisedPageContent } from "@components/Layout"
import { SanityPageContent } from "@components/SanityContent"

export const query = graphql`
    query YkLeadershipProgramPage {
        sanityYkLeadershipProgramPage {
            header
            subtitle
            image {
                ...BackgroundImage
            }
            content {
                ...PageContent
            }
        }
    }
`

export default function YkLeadershipProgramPage({
    data,
}: PageProps<GatsbyTypes.TaskForcePageQuery>) {
    return (
        <>
            <SEO title={"Yuri Kochiyama Leadership Program"} />
            <ParallaxBackground
                imageAsset={data.sanityYkLeadershipProgramPage?.image}
                imageHeight="65vh"
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" color="white">
                        {data.sanityYkLeadershipProgramPage?.header}
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        {data.sanityYkLeadershipProgramPage?.subtitle}
                    </Typography>
                </Container>
            </ParallaxBackground>
            <RaisedPageContent>
                <SanityPageContent
                    content={data.sanityYkLeadershipProgramPage?.content}
                />
            </RaisedPageContent>
        </>
    )
}
