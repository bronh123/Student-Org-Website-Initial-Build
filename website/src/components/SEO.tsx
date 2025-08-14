/**
 * SEO stands for Search Engine Optimization
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

 import React from "react"
 import { Helmet } from "react-helmet"
 import { useStaticQuery, graphql } from "gatsby"
 
 type MetaType = {
     name: string
     content: string
 }
 
 type SEOProps = {
     lang?: string
     meta?: MetaType[]
     description?: string
     title: string
 }
 
 const SEO = ({ lang = "en", meta = [], description = "", title }: SEOProps) => {
     const { site } = useStaticQuery<GatsbyTypes.SEOQuery>(
         graphql`
             query SEO {
                 site {
                     siteMetadata {
                         title
                     }
                 }
             }
         `
     )
 
     const metaDescription = description
 
     return (
         <Helmet
             htmlAttributes={{
                 lang,
             }}
             title={title}
             titleTemplate={`%s | ${site.siteMetadata.title}`}
             meta={[
                 {
                     name: `description`,
                     content: metaDescription,
                 },
                 {
                     property: `og:title`,
                     content: title,
                 },
                 {
                     property: `og:description`,
                     content: metaDescription,
                 },
                 {
                     property: `og:type`,
                     content: `website`,
                 },
             ].concat(meta)}
         />
     )
 }
 
 export default SEO