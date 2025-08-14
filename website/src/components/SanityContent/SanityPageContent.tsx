import React from "react"
import SanitySection from "./SanitySection"

type Props = {
    content: GatsbyTypes.PageContentFragment[]
}

function SanityPageContent({ content }: Props) {
    return (
        <>
            {content.map((section) => (
                <SanitySection section={section} key={section._key} />
            ))}
        </>
    )
}

export default SanityPageContent
