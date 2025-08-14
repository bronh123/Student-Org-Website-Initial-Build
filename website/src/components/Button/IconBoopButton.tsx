import React from "react"
import { animated } from "react-spring"
import { IconButton, IconButtonProps } from "@mui/material"

import useBoop, { BoopProps } from "@hooks/useBoop"

const AnimatedIconButton = animated(IconButton)

type Props = IconButtonProps & {
    boopProps: BoopProps
}

export default function IconBoopButton({
    boopProps,
    disabled,
    ...rest
}: Props) {
    const [boopStyles, trigger] = useBoop({ ...boopProps, disabled })

    return (
        <span onMouseEnter={trigger}>
            <AnimatedIconButton
                style={boopStyles}
                disabled={disabled}
                {...rest}
            />
        </span>
    )
}
