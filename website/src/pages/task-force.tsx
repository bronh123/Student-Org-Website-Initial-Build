import React from "react"
import { graphql, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"

import SEO from "@components/SEO"
import { ParallaxBackground, RaisedPageContent } from "@components/Layout"
import { SanityPageContent } from "@components/SanityContent"

export const query = graphql`
    query TaskForcePage {
        sanityTaskForcePage {
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

export default function TaskForcePage({
    data,
}: PageProps<GatsbyTypes.TaskForcePageQuery>) {
    return (
        <>
            <SEO title={"Task Force"} />
            <ParallaxBackground
                imageAsset={data.sanityTaskForcePage?.image}
                imageHeight="65vh"
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" color="white">
                        {data.sanityTaskForcePage?.header}
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        {data.sanityTaskForcePage?.subtitle}
                    </Typography>
                </Container>
            </ParallaxBackground>
            <RaisedPageContent>
                <SanityPageContent
                    content={data.sanityTaskForcePage?.content}
                />
            </RaisedPageContent>
        </>
    )
}
