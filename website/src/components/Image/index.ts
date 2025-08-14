export { default as GatsbyImageIfExists, RaisedImage } from "./GatsbyImageIfExist"
export { default as BackgroundImage } from "./BackgroundImage"
export { default as ColoredShadowImage } from "./ColoredShadowImage"

export type { BackgroundImageProps } from "./BackgroundImage"
export type { GatsbyImageIfExistsProps } from "./GatsbyImageIfExist"

export type SanityImageWithAltText = GatsbyTypes.Maybe<{
    readonly asset: GatsbyTypes.Maybe<
        Pick<GatsbyTypes.SanityImageAsset, "gatsbyImageData" | "altText">
    >
}>
