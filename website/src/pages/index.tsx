import React from "react"
import { graphql, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"

import SEO from "@components/SEO"
import {
    ParallaxBackground,
    RaisedPageContent,
    Section,
    GridWithItems,
    AnimateOnVisible,
} from "@components/Layout"
import { EventsGrid } from "@components/Events"
import { BioPreview } from "@components/Bio"
import { AnimatedButton } from "@components/Button"
import { BackgroundImage } from "@components/Image"
import SanityContent from "@components/SanityContent"
import Newsletter from "@components/Newsletter"

export const query = graphql`
    query HomePage {
        sanityHomePage {
            header
            subtitle
            aboutTitle
            _rawAboutDescription
            image {
                ...BackgroundImage
            }
            boardSectionImage {
                ...BackgroundImage
            }
            subscribeSectionImage {
                ...BackgroundImage
            }
        }
        events: allSanityEvent(
            limit: 3
            sort: { fields: datetime, order: DESC }
        ) {
            nodes {
                ...Event
            }
        }
        presidents: allSanityBio(
            filter: { position: { eq: "Co-President" } }
            limit: 2
            sort: { fields: boardYear___year, order: DESC }
        ) {
            nodes {
                ...Bio
            }
        }
    }
`

function IndexPage({ data }: PageProps<GatsbyTypes.HomePageQuery>) {
    const { sanityHomePage, events, presidents } = data
    return (
        <>
            <SEO title={"Home"} />
            <ParallaxBackground
                imageAsset={sanityHomePage?.image}
                imageHeight="100vh"
                filterProps={{
                    display: {
                        xs: "block",
                        sm: "none",
                    }
                }}
            >       
                <Container
                    maxWidth="lg"
                    sx={{
                        padding: 1,
                        textAlign: {
                            xs: "center",
                            sm: "left"
                        },
                        "& > *": {
                            padding: 1,
                            margin: 1, // theme.spacing(2)
                        },
                        display: {
                            xs: "block",
                            sm: "none",
                        }
                    }}
                >
                    <Typography variant="h3" color="white">
                        University of Maryland College Park
                    </Typography>
                    <Typography variant="h3" color="white">
                        {sanityHomePage?.header}
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        {sanityHomePage?.subtitle}
                    </Typography>
                    <AnimatedButton
                        to="events"
                        variant="contained"
                        color="primary"
                        boopProps={{
                            scale: 1.05,
                        }}
                        sx={{
                            marginTop: 2
                        }}
                    >
                        Upcoming Events
                    </AnimatedButton>
                </Container> 
            </ParallaxBackground>
            <RaisedPageContent>
                <Section title={sanityHomePage?.aboutTitle}>
                    <SanityContent
                        blocks={sanityHomePage?._rawAboutDescription}
                    />
                </Section>
                <Section title="Events" maxWidth="lg">
                    <EventsGrid events={events.nodes} />

                    <AnimatedButton
                        to="events"
                        variant="contained"
                        color="primary"
                        boopProps={{
                            scale: 1.05,
                        }}
                    >
                        Upcoming and Past Events
                    </AnimatedButton>
                </Section>
                <BackgroundImage
                    imageAsset={sanityHomePage?.boardSectionImage}
                    imageHeight="auto"
                >
                    <Section
                        title="Want to see who makes it all happen?"
                        variant="h4"
                        color="white"
                    >
                        <Typography
                            variant="subtitle1"
                            color="white"
                            align="center"
                        >
                            Meet our co-presidents!
                        </Typography>
                    </Section>
                    <Section
                        sx={{
                            color: "white"
                        }}
                    >
                        <GridWithItems
                            alignItems="stretch"
                            spacing={3}
                            xs={12}
                            sm={false}
                            lg={6}
                            sx={{
                                padding: 2,
                            }}
                        >
                            {presidents.nodes.map((bio) => (
                                <AnimateOnVisible
                                    once
                                    partialVisibility
                                    key={bio._id}
                                >
                                    <BioPreview bio={bio} />
                                </AnimateOnVisible>
                            ))}
                        </GridWithItems>
                    </Section>
                    <Section
                        title="Check out the others"
                        variant="h5"
                        color="white"
                    >
                        <AnimatedButton
                            to="board"
                            variant="contained"
                            color="primary"
                            boopProps={{
                                scale: 1.05,
                            }}
                        >
                            Board
                        </AnimatedButton>
                    </Section>
                </BackgroundImage>
                <BackgroundImage
                    imageAsset={sanityHomePage?.subscribeSectionImage}
                    imageHeight="auto"
                >
                    <Section
                        title="Subscribe to our Newsletter"
                        variant="h5"
                        color="white"
                        sx={{
                            padding: 10, // theme.spacing(10)
                        }}
                    >
                        <Newsletter />
                    </Section>
                </BackgroundImage>
            </RaisedPageContent>
        </>
    )
}

export default IndexPage
