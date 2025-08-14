import React, { useState } from "react"
import { Drawer, IconButton } from "@mui/material"
import { Menu } from "@mui/icons-material"

import HeaderLinks from "./HeaderLinks"

type Props = {
    scrollTrigger?: boolean
}

/**
 * You can add additional links here. Icons and the such also go here
 * @param props
 */
function HeaderMenu(props: Props) {
    const { scrollTrigger = true } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <>
            <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                    marginRight: 2, // theme.spacing(2)
                    color: scrollTrigger ? "inherit" : "white",
                }}
            >
                <Menu />
            </IconButton>

            {/* A drawer is the side-bar that opens. Here, it opens from the right */}
            <Drawer
                variant="temporary"
                PaperProps={{
                    sx: {
                        color: "white",
                    },
                }}
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <HeaderLinks />
            </Drawer>
        </>
    )
}

export default HeaderMenu
