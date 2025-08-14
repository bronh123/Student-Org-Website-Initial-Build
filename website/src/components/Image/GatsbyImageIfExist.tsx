import React from "react"
import { styled } from "@mui/material"
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image"
import { SanityImageWithAltText } from "./index"

// Defined with GatsbyTypes.Maybe so that we know image and alt are required fields
// but sometimes the values passed in are undefined
export type GatsbyImageIfExistsProps = Omit<
    GatsbyImageProps,
    "image" | "alt"
> & {
    imageAsset: SanityImageWithAltText
}

const GatsbyImageIfExists = ({
    imageAsset,
    ...rest
}: GatsbyImageIfExistsProps) => {
    if (!imageAsset || !imageAsset?.asset?.gatsbyImageData) {
        return <></>
    }

    const { gatsbyImageData, altText } = imageAsset?.asset
    return (
        <GatsbyImage
            image={gatsbyImageData}
            alt={altText ? altText : ""}
            {...rest}
        />
    )
}

export default styled(GatsbyImageIfExists)({})
export const RaisedImage = styled(GatsbyImageIfExists)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[6],
}))
