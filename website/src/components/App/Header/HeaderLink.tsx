import React, { useState } from "react"
import { Link } from "gatsby"
import { Box, useTheme, styled } from "@mui/material"
import { animated, useTransition } from "react-spring"

const UnderlinedLink = styled(Link)(({ theme }) => ({
    margin: theme.spacing(2),
    textDecoration: "none",
    textTransform: "uppercase",
    display: "inline-block",
    position: "relative",
}))

type Props = {
    scrollTrigger?: boolean
    to: string
    text: string
}

const AnimatedBox = animated(Box)

/**
 * You can add additional links here. Icons and the such also go here
 * @param props
 */
function HeaderLink(props: Props) {
    const { scrollTrigger = true, to, text } = props
    const theme = useTheme()

    const [show, setShow] = useState(false)
    const transition = useTransition(show, {
        from: { width: "0%", left: "0%" },
        enter: { width: "100%", left: "0%" },
        leave: { width: "0%", left: "100%" },
    })

    return (
        <UnderlinedLink
            to={to}
            sx={{
                color: scrollTrigger
                    ? theme.palette.text.secondary
                    : theme.palette.neutral.light,
            }}
            activeStyle={{
                "& #linkHighlight": {
                    backgroundColor: (props: Props) =>
                        props.scrollTrigger
                            ? theme.palette.text.secondary
                            : theme.palette.neutral.light,
                    position: "absolute",
                    bottom: -theme.spacing(0.5),
                    width: "100%",
                    height: "3px",
                },
            }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <b>{text}</b>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",
                    },
                }}
            >
                {transition(
                    (styles, item) =>
                        item && (
                            <AnimatedBox
                                sx={{
                                    backgroundColor: scrollTrigger
                                        ? theme.palette.text.secondary
                                        : theme.palette.neutral.light,
                                    position: "absolute",
                                    bottom: -theme.spacing(0.5),
                                    height: "3px",
                                }}
                                style={styles}
                            />
                        )
                )}
                <div id="link-highlight" />
            </Box>
        </UnderlinedLink>
    )
}

export default HeaderLink
