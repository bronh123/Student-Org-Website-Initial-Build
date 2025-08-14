import React from "react"
import { Typography } from "@mui/material"

// Components
import Event from "./Event"
import { GridWithItems, GridWithItemsProps } from "@components/Layout"

type Props = GridWithItemsProps & {
    events: GatsbyTypes.EventFragment[]
    showDescription?: boolean
    showFullDescription?: boolean
}

/**
 * Component that displays the events in a grid.
 * @param props
 */
function EventsGrid(props: Props) {
    const {
        showDescription = true,
        showFullDescription = false,
        events,
        ...rest
    } = props

    return (
        <GridWithItems {...rest}>
            {events.length <= 0
                ? [
                      <Typography variant="h5" align="center" key={1}>
                          No events to show
                      </Typography>,
                  ]
                : events.map((event) => (
                      <Event event={event} key={event._id} />
                  ))}
        </GridWithItems>
    )
}

export default EventsGrid
