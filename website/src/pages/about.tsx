import React from "react"
import { graphql, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"

import SEO from "@components/SEO"
import {
    ParallaxBackground,
    RaisedPageContent,
    Section,
} from "@components/Layout"
import { SanityPageContent } from "@components/SanityContent"

export const query = graphql`
    query AboutPageQuery {
        sanityAboutPage {
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

function AboutPage({ data }: PageProps<GatsbyTypes.AboutPageQuery>) {
    return (
        <>
            <SEO title={"About"} />
            <ParallaxBackground
                imageAsset={data.sanityAboutPage?.image}
                imageHeight="65vh"
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" color="white">
                        {data.sanityAboutPage?.header}
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        {data.sanityAboutPage?.subtitle}
                    </Typography>
                </Container>
            </ParallaxBackground>
            <RaisedPageContent>
                <SanityPageContent content={data.sanityAboutPage?.content} />
            </RaisedPageContent>
        </>
    )
}

export default AboutPage
