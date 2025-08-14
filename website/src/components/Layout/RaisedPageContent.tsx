import React from "react"
import { Box } from "@mui/material"

type Props = {
    children: React.ReactNode
}

function RaisedPageContent({ children }: Props) {
    return (
        <Box
            sx={{
                background: "white",
                position: "relative",
                paddingBottom: 2, // theme.spacing(2)
                zIndex: 10,
                margin: {
                    sm: "-60px 30px 0px",
                },
                borderRadius: {
                    sm: "6px",
                },
                boxShadow: {
                    sm: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            {children}
        </Box>
    )
}

export default RaisedPageContent
