import React, { useState } from "react"
import { useSpring, animated as a } from "react-spring"
import { Box, Grid, Chip, Typography } from "@mui/material"

// Components
import { GatsbyImageIfExists } from "@components/Image"
import { SanityContent } from "@components/SanityContent"

const AnimatedBox = a(Box)

type Props = {
    bio: GatsbyTypes.BioFragment
}

function FlippableBio({ bio }: Props) {
    const { name, position, major = [], propic, _rawDescription, order } = bio
    const [flipped, setFlipped] = useState(false)
    const { transform, opacity, zIndex } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        zIndex: flipped ? 10 : 50,
    })

    return (
        <>
            <Box
                onMouseOver={() => setFlipped(true)}
                onMouseOut={() => setFlipped(false)}
                sx={{
                    position: "relative",
                }}
            >
                <AnimatedBox
                    style={{
                        transform,
                        zIndex,
                    }}
                >
                    <GatsbyImageIfExists
                        imageAsset={propic}
                        sx={{
                            borderRadius: 1, // theme.shape.borderRadius
                            width: "100%",
                            height: "100%",
                            backgroundSize: "cover",
                            boxShadow: 9, // theme.shadows[9]
                        }}
                    />
                </AnimatedBox>
                <AnimatedBox
                    sx={{
                        position: "absolute",
                        top: "0px",
                        width: "100%",
                        height: "100%",
                        zIndex: 20,
                    }}
                    style={{
                        opacity,
                        transform: transform.to(
                            (t) => `${t} rotateY(180deg)`
                        ),
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: 1, // theme.shape.borderRadius * 1
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "0px",
                            background: "rgba(0, 0, 0, 0.5)",
                            zIndex: 20,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: "0px",
                            width: "100%",
                            height: "100%",
                            padding: 2, // theme.spacing(2)
                            display: "grid",
                            placeItems: "center",
                            textAlign: "center",
                            zIndex: 30,
                        }}
                    >
                        <Box>
                            <SanityContent blocks={_rawDescription} />
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={1}
                            >
                                {major.map((m) => (
                                    <Grid item key={name + m}>
                                        <Chip label={m} color="primary" />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </AnimatedBox>
            </Box>

            <Typography
                variant="h4"
                color="textSecondary"
                align="center"
                sx={{
                    margin: 2, // theme.spacing(2)
                }}
            >
                {position}
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                sx={{
                    margin: 2, // theme.spacing(2)
                }}
            >
                {name}
            </Typography>
        </>
    )
}

export default FlippableBio
