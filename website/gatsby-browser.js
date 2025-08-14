/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from "react"

import { Providers, Layout } from "@components/App"

export const wrapRootElement = ({ element }) => <Providers>{element}</Providers>
export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>