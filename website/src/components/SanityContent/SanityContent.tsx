import React from "react"
import BlockContent, { BlockContentProps } from "@sanity/block-content-to-react"
import { Box, Typography, TypographyVariant, SxProps } from "@mui/material"

type TypeNode = {
    children: React.ReactNode
    style: string
}

type MarkNode = {
    children: React.ReactNode
}

type ListNode = {
    children: React.ReactNode
    type: string
}

type ExternalLinkNode = MarkNode & {
    mark: {
        blank: boolean
        href: string
    }
}

type BlockRendererProps = {
    children: React.ReactNode
    node: {
        style?:
            | "normal"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "blockquote"
    }
}

const BlockRenderer = ({ node, children }: BlockRendererProps) => {
    const { style = "normal" } = node

    let variant: TypographyVariant = "body1"
    switch (style) {
        case "normal":
            variant = "body1"
            break
        case "blockquote":
            variant = "caption"
            break
        case "h6":
            variant = "subtitle1"
            break
        default:
            variant = style
    }

    return <Typography variant={variant}>{children}</Typography>
}

const serializers = {
    list: ({ children, type }: ListNode) =>
        type === "bullet" ? <ul>{children}</ul> : <ol>{children}</ol>,
    listItem: ({ children }: MarkNode) => <li>{children}</li>,
    types: {
        block: BlockRenderer,
    },
    marks: {
        strong: ({ children }: MarkNode) => <b>{children}</b>,
        em: ({ children }: MarkNode) => <em>{children}</em>,
        underline: ({ children }: MarkNode) => (
            <span style={{ textDecoration: "underline" }}>{children}</span>
        ),
        externalLink: ({ children, mark }: ExternalLinkNode) => (
            <a href={mark.href} target={mark.blank ? "_blank" : "_self"}>
                {children}
            </a>
        ),
    },
}

type Blocks = GatsbyTypes.Maybe<
    readonly GatsbyTypes.Maybe<GatsbyTypes.SanityBlock>[]
>

const limitBlockContent = (blocks: Blocks, characterLimit?: number): Blocks => {
    if (!blocks || !blocks[0] || !characterLimit) return blocks

    const { children, ...blocksRest } = blocks[0] as GatsbyTypes.SanityBlock
    let newBlocksChildren = []
    let charLeft = characterLimit
    let blockLimit = 0
    while (charLeft > 0 && blockLimit < children.length) {
        const { text, ...rest } = (children as GatsbyTypes.SanitySpan[])[
            blockLimit
        ]
        const textLength = (text as String).length

        newBlocksChildren.push({
            text:
                charLeft - textLength > 0
                    ? text
                    : text?.substring(0, charLeft) + "...",
            ...rest,
        })
        charLeft -= textLength
        blockLimit++
    }

    return [
        {
            children: newBlocksChildren,
            ...blocksRest,
        },
    ]
}

type Props = Omit<BlockContentProps, "blocks"> & {
    blocks: Blocks
    characterLimit?: number
    sx?: SxProps
}

const SanityContent = ({ blocks, characterLimit, sx, ...rest }: Props) =>
    blocks ? (
        <Box sx={sx}>
            <BlockContent
                blocks={limitBlockContent(blocks, characterLimit)}
                serializers={serializers}
                sx={sx}
                {...rest}
            />
        </Box>
    ) : (
        <></>
    )

export default SanityContent
