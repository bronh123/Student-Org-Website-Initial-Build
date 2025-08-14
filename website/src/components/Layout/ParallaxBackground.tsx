/**
 * Inspired by
 * https://github.com/creativetimofficial/material-kit-react/blob/master/src/components/Parallax/Parallax.js
 */

import React from "react"
import { Grid } from "@mui/material"
import { useSpring, animated, config } from "react-spring"

import { BackgroundImage, BackgroundImageProps } from "@components/Image"
import useParallax from "@hooks/useParallax"

const AnimatedGrid = animated(Grid)

type Props = BackgroundImageProps

function ParallaxBackground({ children, ...rest }: Props) {
    const { transform } = useParallax()
    const springStyle = useSpring({
        from: { opacity: 0, transform: "translate(-30px)" },
        to: { opacity: 1, transform: "translate(0px)" },
        config: { clamp: true, ...config.molasses },
    })

    return (
        <BackgroundImage
            {...rest}
            style={{transform: transform }}
            loading="eager"       
        >
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    textAlign: "center",
                }}
            >
                <AnimatedGrid item xs={12} style={springStyle}>
                    {children}
                </AnimatedGrid>
            </Grid>
        </BackgroundImage>
    )
}

export default ParallaxBackground
