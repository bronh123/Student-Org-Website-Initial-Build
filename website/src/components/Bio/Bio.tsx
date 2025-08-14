import React from "react"
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Chip,
    Grid,
    Typography,
} from "@mui/material"

// Components
import { RaisedImage } from "@components/Image"
import { SanityContent } from "@components/SanityContent"

type Props = {
    bio: GatsbyTypes.BioFragment
}

export default function Bio({ bio }: Props) {
    const {
        name,
        position,
        propic,
        isImageBio,
        major = [],
        _rawDescription,
    } = bio
    return (
        <Card raised={true}>
            <Box>
                <RaisedImage imageAsset={propic} />
                {isImageBio ? (
                    <></>
                ) : (
                    <CardContent>
                        <Typography variant="h5" color="textSecondary">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1">{position}</Typography>
                        <SanityContent blocks={_rawDescription} />
                    </CardContent>
                )}
            </Box>
            {isImageBio ? (
                <></>
            ) : (
                <CardActions>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        {major.map((m: string) => (
                            <Grid item key={name + m}>
                                <Chip label={m} color="primary" />
                            </Grid>
                        ))}
                    </Grid>
                </CardActions>
            )}
        </Card>
    )
}
