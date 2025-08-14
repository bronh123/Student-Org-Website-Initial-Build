import React from "react"
import { Box, styled, SxProps } from "@mui/material"
import { BgImage } from "gbimage-bridge"
import { SanityImageWithAltText } from "./index"
import { GatsbyImageProps } from "gatsby-plugin-image"

const StyledBackgroundImage = styled(BgImage)({
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    width: "100%",
})

export type BackgroundImageProps = Omit<GatsbyImageProps, "image" | "alt"> & {
    imageAsset: SanityImageWithAltText
    imageHeight?: string,
    hasFilter?: boolean,
    filterProps?: SxProps<Theme>,
    children: React.ReactNode
}

function BackgroundImage({
    imageAsset,
    imageHeight = "80vh",
    hasFilter = true,
    filterProps = {},
    children,
    ...rest
}: BackgroundImageProps) {
    if (!imageAsset || !imageAsset?.asset?.gatsbyImageData) {
        console.log("Background unavailable")
        return <Box>{children}</Box>
    }

    const { gatsbyImageData, altText } = imageAsset?.asset
    return (
        <StyledBackgroundImage
            sx={{
                height: imageHeight,
            }}
            image={gatsbyImageData}
            alt={altText}
            {...rest}
        >
            {hasFilter ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        background: "rgba(0, 0, 0, 0.5)",
                        zIndex: -1,
                        ...filterProps
                    }}
                />
            ) : (
                <></>
            )}
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >
                {children}
            </Box>
        </StyledBackgroundImage>
    )
}

export default BackgroundImage
