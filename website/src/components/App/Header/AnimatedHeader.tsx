import React from "react"
import { Link } from "gatsby"
import { animated, useSpring } from "react-spring"
import {
    Box,
    AppBar,
    Container,
    Grid,
    Hidden,
    Theme,
    Toolbar,
    useScrollTrigger,
    styled,
} from "@mui/material"

// Page Components
import Logo from "@components/Logo"
import HeaderLinks from "./HeaderLinks"
import HeaderMenu from "./HeaderMenu"

type Props = {
    scrollTrigger?: boolean
}

const AnimatedAppBar = animated(AppBar)
const InLineLink = styled(Link)(({ theme }) => ({
    margin: theme.spacing(1),
    textDecoration: "none",
    display: "inline-block",
}))

/* Note, the header currently stays at the top of the page instead of the top of the screen
 * This can be changed by setting AppBar position="fixed".
 * Also, we can make the header respond to scrolling by utilizing the scrollTrigger prop
 * as shown in the commented out opacity example
 */
function Header(props: Props) {
    const scrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    })
    const animatedStyles = useSpring({
        background: scrollTrigger ? "#ffffffff" : "#ffffff00",
        from: {
            background: "#ffffffff",
        },
    })

    return (
        <AnimatedAppBar
            position={"fixed"}
            elevation={scrollTrigger ? 10 : 0}
            sx={{
                flexGrow: 1,
            }}
            style={animatedStyles}
        >
            <Toolbar>
                <Container>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <InLineLink to="/">
                                <Logo />
                            </InLineLink>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "block",
                                    },
                                }}
                            >
                                <HeaderLinks scrollTrigger={scrollTrigger} />
                            </Box>
                            <Box
                                sx={{
                                    display: {
                                        xs: "block",
                                        sm: "none",
                                    },
                                }}
                            >
                                <HeaderMenu scrollTrigger={scrollTrigger} />
                            </Box>
                        </Grid>
                    </Grid>
                    {/* This is here to make sure everything else is right-aligned*/}
                </Container>
            </Toolbar>
        </AnimatedAppBar>
    )
}

export default Header
