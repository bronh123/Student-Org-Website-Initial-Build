import React from "react"
import { Box } from "@mui/material"
import { GatsbyImageIfExists, GatsbyImageIfExistsProps } from "./index"

function ColoredShadowImage({ imageAsset, ...rest }: GatsbyImageIfExistsProps) {
    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <GatsbyImageIfExists
                sx={{
                    borderRadius: 1, // theme.shape.borderRadius * 1
                    zIndex: 20,
                }}
                imageAsset={imageAsset}
                {...rest}
            />
            <GatsbyImageIfExists
                sx={{
                    borderRadius: 1, // theme.shape.borderRadius * 1
                    top: "12px",
                    left: "12px",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    zIndex: 10,
                    overflow: "visible",

                    transform: "scale(.92)",
                    filter: "blur(12px)",
                    transition: "opacity .45s",
                }}
                imageAsset={imageAsset}
                {...rest}
            />
        </Box>
    )
}

export default ColoredShadowImage
