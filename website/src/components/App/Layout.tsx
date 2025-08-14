/**
 * Our component that handles UI elements that stay consistent throughout the site.
 * 
 * Used in wrapPageElement in gatsby-browser.js and gatsby-ssr.js
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import { CssBaseline } from "@mui/material"

import AnimatedHeader from "./Header/AnimatedHeader"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => (
    <>
        <CssBaseline />
        <AnimatedHeader />
        <main>{children}</main>
    </>
)

export default Layout
