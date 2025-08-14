/**
 * Our component that handles globals and provide theme to the entire website.
 *
 * Used in wrapRootElement in gatsby-browser.js and gatsby-ssr.js
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material"
import { Globals } from "react-spring"

import usePrefersReducedMotion from "@hooks/usePrefersReducedMotion"

type Props = {
    children: React.ReactNode
}

const Providers = ({ children }: Props) => {
    const data = useStaticQuery<GatsbyTypes.ThemeColorQuery>(graphql`
        query ThemeColor {
            sanitySiteSettings(_id: { eq: "siteSettings" }) {
                primaryColor
                secondaryColor
            }
        }
    `)
    const prefersReducedMotion = usePrefersReducedMotion()
    React.useEffect(() => {
        Globals.assign({
            skipAnimation: prefersReducedMotion,
        })
    }, [prefersReducedMotion])

    // A custom theme for this app
    const theme = createTheme({
        palette: {
            primary: {
                main: data.sanitySiteSettings?.primaryColor ?? "#822a2a",
                contrastText: "#ffffff",
            },
            secondary: {
                main: data.sanitySiteSettings?.secondaryColor ?? "#a1887f",
            },
            neutral: {
                // Custom color defined in declarations.d.ts
                main: "#ffffff",
                dark: "#555",
                light: "#ffffff",
            },
            text: {
                primary: "#999",
                secondary: "#555",
            },
        },
        shape: {
            borderRadius: 8,
        },
        typography: {
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(
                ","
            ),
        },
    })

    const responsiveTheme = responsiveFontSizes(theme)

    return (
        <ThemeProvider theme={responsiveTheme}>
            <Helmet>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>

            {children}
        </ThemeProvider>
    )
}

export default Providers
