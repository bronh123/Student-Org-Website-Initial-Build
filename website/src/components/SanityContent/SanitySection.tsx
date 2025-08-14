import React from "react"
import { Box } from "@mui/material"

import { AnimatedButton } from "@components/Button"
import { BackgroundImage, RaisedImage } from "@components/Image"
import { GridWithItems, Section } from "@components/Layout"
import SanityContent from "./SanityContent"

type Props = {
    section: GatsbyTypes.PageContentFragment
}

const SITE_ADDRESS = "https://umcpaasu.gatsbyjs.io"
const getButtonProps = (href: string) =>
    href && href.startsWith(SITE_ADDRESS)
        ? {
              to: href.replace(SITE_ADDRESS, ""),
              href: undefined,
          }
        : {
              to: undefined,
              href: href,
          }

export default function SanitySection({ section }: Props) {
    const { title, _rawBody, button, images, isImageSection, backgroundImage } =
        section

    const mainContent = (
        <Section title={title} color={isImageSection ? "white" : "textSecondary"}>
            <SanityContent blocks={_rawBody} sx={{
              paddingBottom: 2, // theme.spacing(1)
              color: isImageSection ? "white" : "inherit"
            }}/>
            {button?.href ? (
                <AnimatedButton
                    {...getButtonProps(button.href)}
                    variant="contained"
                    color="primary"
                    boopProps={{ scale: 1.05 }}
                >
                    {button.title}
                </AnimatedButton>
            ) : (
                <></>
            )}
            {images ? (
                <GridWithItems
                    alignItems="center"
                    spacing={3}
                    xs={12}
                    sm={false}
                    lg={4}
                >
                    {images.map((image) => (
                        <RaisedImage imageAsset={image} key={image._key}/>
                    ))}
                </GridWithItems>
            ) : (
                <></>
            )}
        </Section>
    )

    return isImageSection ? (
        <BackgroundImage imageAsset={backgroundImage} imageHeight="auto">
          <Box sx={{
            padding: 3
          }}>
          {mainContent}
          </Box>

        </BackgroundImage>
    ) : (
        mainContent
    )
}
