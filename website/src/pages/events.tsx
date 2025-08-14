import React from "react"
import { graphql, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"
import { parse, isBefore, isAfter } from "date-fns"

import SEO from "@components/SEO"
import {
    ParallaxBackground,
    RaisedPageContent,
    Section,
} from "@components/Layout"
import { EventsGrid } from "@components/Events"
import { BoardYearSelect } from "@components/BoardYear"

import useBoardYear from "@hooks/useBoardYear"

export const query = graphql`
    query EventsPageQuery {
        sanityEventsPage {
            header
            subtitle
            image {
                ...BackgroundImage
            }
        }
        allSanityEvent {
            nodes {
                ...Event
            }
        }
    }
`
const dateFormat = "MMM d, yyyy"

function EventsPage({ data }: PageProps<GatsbyTypes.EventsPageQuery>) {
    const { sanityEventsPage, allSanityEvent } = data
    const [boardYear, setBoardYear] = useBoardYear()
    const allEvents = allSanityEvent.nodes
    const currentDate = new Date()
    const futureEvents = allEvents.filter(
        (event) =>
            event.boardYear.year == boardYear &&
            isAfter(parse(event.datetime, dateFormat, new Date()), currentDate)
    )
    const pastEvents = allEvents.filter(
        (event) =>
            event.boardYear.year == boardYear &&
            isBefore(parse(event.datetime, dateFormat, new Date()), currentDate)
    )
    return (
        <>
            <SEO title={"Events"} />
            <ParallaxBackground
                imageAsset={sanityEventsPage?.image}
                imageHeight="65vh"
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" color="white">
                        {sanityEventsPage?.header}
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        {sanityEventsPage?.subtitle}
                    </Typography>
                </Container>
            </ParallaxBackground>
            <RaisedPageContent>
                <Section
                    sx={{
                        paddingTop: 5, // theme.spacing(0)
                    }}
                >
                    <BoardYearSelect
                        boardYear={boardYear}
                        setBoardYear={setBoardYear}
                    />
                </Section>

                {futureEvents.length > 0 ? (
                    <Section title="Upcoming Events" maxWidth="lg" sx={{
                        padding: 3,
                    }}>
                        <EventsGrid events={futureEvents} />
                    </Section>
                ) : (
                    <></>
                )}
                {pastEvents.length > 0 ? (
                    <Section title="Past Events" maxWidth="lg" sx={{
                        padding: 3
                    }}>
                        <EventsGrid events={pastEvents} />
                    </Section>
                ) : (
                    <></>
                )}
            </RaisedPageContent>
        </>
    )
}

export default EventsPage
