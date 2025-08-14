import React from "react"
import { Grid, GridProps } from "@mui/material"
import { AnimateOnVisible } from "./index"
export interface GridWithItemsProps extends GridProps {
    animated?: boolean
    itemMargins?: boolean
}

type Props = GridWithItemsProps & {
    children: React.ReactNode | React.ReactNode[]
}

/**
 * Component that displays items in a grid.
 * @param props
 */
function GridWithItems(props: Props) {
    const {
        classes,
        children,
        xs = 12,
        sm = 4,
        md = false,
        lg = false,
        xl = false,
        spacing = 3,
        alignItems = "stretch",
        alignContent = "stretch",
        justifyContent = "center",
        animated = true,
        itemMargins = true,
        ...rest
    } = props

    return (
        <Grid
            container
            spacing={spacing}
            alignItems={alignItems}
            alignContent={alignContent}
            justifyContent={justifyContent}
            {...rest}
        >
            {children.map((child, index) => (
                <Grid
                    item
                    sx={
                        itemMargins
                            ? {
                                  marginTop: 2, // theme.spacing(2)
                                  marginBottom: 2, // theme.spacing(2)
                              }
                            : {}
                    }
                    xs={xs}
                    sm={sm}
                    md={md}
                    lg={lg}
                    xl={xl}
                    key={`animated-grid-${index}`}
                >
                    <AnimateOnVisible
                        animated={animated}
                        partialVisibility
                        once
                    >
                        {child}
                    </AnimateOnVisible>
                </Grid>
            ))}
        </Grid>
    )
}

export default GridWithItems
