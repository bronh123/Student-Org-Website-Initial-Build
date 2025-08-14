import React, { useState } from "react"
import { Link } from "gatsby"
import { Button, Card, CardActions, Typography } from "@mui/material"
import { useSpring, animated as a } from "react-spring"

// Components
import SanityContent from "@components/SanityContent"
import { ColoredShadowImage } from "@components/Image"
import { AnimatedButton } from "@components/Button"
import { GridWithItems } from "@components/Layout"

type Props = {
    event: GatsbyTypes.EventFragment
    showDescription?: boolean
    preview?: boolean
}

function Event({ event, showDescription = true, preview = false }: Props) {
    const {
        title,
        datetime,
        facebookLink,
        tags = [],
        image,
        _rawDescription,
        slug,
    } = event

    const [isHover, setHover] = useState(false)
    const springStyle = useSpring({
        to: {
            transform: isHover ? "scale(1.1)" : "scale(1.0)",
        },
    })

    return (
        <>
            <Link
                to={"/"}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <a.div style={springStyle}>
                    <ColoredShadowImage imageAsset={image} />
                </a.div>
            </Link>
            <Card elevation={0}>
                <GridWithItems
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    xs={false}
                    sm={false}
                    itemMargins={false}
                    sx={{
                        marginTop: 2, // theme.spacing(2)
                    }}
                >
                    {preview ? (
                        <></>
                    ) : (
                        <Typography variant="subtitle2" color="textSecondary">
                            {datetime}
                        </Typography>
                    )}

                    <Typography
                        variant="h6"
                        color="textSecondary"
                        align="center"
                    >
                        <b>{title}</b>
                    </Typography>

                    {showDescription ? (
                        <SanityContent
                            blocks={_rawDescription}
                            characterLimit={100}
                        />
                    ) : (
                        <></>
                    )}
                </GridWithItems>

                <CardActions>
                    <GridWithItems
                        container
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                        xs={false}
                        sm={false}
                        itemMargins={false}
                    >
                        <AnimatedButton
                            size="small"
                            href={facebookLink}
                            variant="contained"
                            boopProps={{
                                scale: 1.05,
                            }}
                        >
                            FB
                        </AnimatedButton>

                        <AnimatedButton
                            size="small"
                            to={"/"}
                            variant="contained"
                            boopProps={{
                                scale: 1.05,
                            }}
                        >
                            Event Details
                        </AnimatedButton>
                    </GridWithItems>
                </CardActions>
            </Card>
        </>
    )
}

export default Event
