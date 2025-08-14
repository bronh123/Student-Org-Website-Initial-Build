import { graphql } from "gatsby"

export const fluidImageFragment = graphql`
    fragment FluidImage on SanityImage {
        asset {
            gatsbyImageData(formats: WEBP, placeholder: BLURRED)
            altText
        }
    }
`

export const backgroundImageFragment = graphql`
    fragment BackgroundImage on SanityImage {
        asset {
            gatsbyImageData(
                formats: WEBP
                placeholder: BLURRED
                layout: FULL_WIDTH
                fit: CROP
            )
            altText
        }
    }
`

export const eventFragment = graphql`
    fragment Event on SanityEvent {
        _id
        _key
        _updatedAt
        title
        datetime(formatString: "MMM D, YYYY")
        boardYear {
            year
            _id
        }
        facebookLink
        tags {
            _key
            label
            value
        }
        image {
            ...FluidImage
        }
        _rawDescription(resolveReferences: { maxDepth: 2 })
        slug {
            current
            _key
            _type
        }
    }
`

export const bioFragment = graphql`
    fragment Bio on SanityBio {
        _id
        name
        position
        boardYear {
            year
            _id
        }
        propic {
            ...FluidImage
        }
        isImageBio
        major
        _rawDescription
        order
    }
`

export const contentFragment = graphql`
    fragment PageContent on SanitySection {
        _key
        title
        isImageSection
        backgroundImage {
          ...BackgroundImage
        }
        _rawBody
        button {
          href
          title
        }
        images {
          _key
          ...FluidImage
        }
    }
`
