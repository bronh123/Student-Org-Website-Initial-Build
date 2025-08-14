import React from "react"

import HeaderLink from "./HeaderLink"

type Props = {
    scrollTrigger?: boolean
}

/**
 * You can add additional links here. Icons and the such also go here
 * @param props
 */
function HeaderLinks(props: Props) {
    const { scrollTrigger = true } = props
    return (
        <>
            <HeaderLink to="/" text="Home" scrollTrigger={scrollTrigger} />
            <HeaderLink
                to="/about"
                text="About"
                scrollTrigger={scrollTrigger}
            />
            <HeaderLink
                to="/events"
                text="Events"
                scrollTrigger={scrollTrigger}
            />
            <HeaderLink
                to="/board"
                text="Board"
                scrollTrigger={scrollTrigger}
            />
            <HeaderLink
                to="/task-force"
                text="Task Force"
                scrollTrigger={scrollTrigger}
            />
            <HeaderLink
                to="/yuri-kochiyama-leadership-program"
                text="YKLP"
                scrollTrigger={scrollTrigger}
            />
        </>
    )
}

export default HeaderLinks
