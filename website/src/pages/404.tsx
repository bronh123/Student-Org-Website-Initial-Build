import React from "react"
import { graphql, PageProps } from "gatsby"
import { Typography } from "@mui/material"

import SEO from "@components/SEO"
import { ParallaxBackground } from "@components/Layout"

export const query = graphql`
    query NotFoundPageQuery {
        sanityHomePage {
            image {
                ...BackgroundImage
            }
        }
    }
`

function NotFoundPage({ data }: PageProps<GatsbyTypes.NotFoundPageQuery>) {
    return (
        <>
            <SEO title={"404 Not Found"} />
            <ParallaxBackground
                imageAsset={data.sanityHomePage?.image}
                imageHeight="100vh"
            >
                <Typography variant="h3" color="white">
                    The page you're looking for doesn't exist!
                </Typography>
            </ParallaxBackground>
        </>
    )
}

export default NotFoundPage
