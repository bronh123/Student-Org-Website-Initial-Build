import React, { useState } from "react"
// import addToMailchimp from "gatsby-plugin-mailchimp"
import {
    Box,
    Button,
    Container,
    ContainerProps,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"

type Props = {
    maxWidth?: ContainerProps["maxWidth"]
}

function Newsletter(props: Props) {
    const { maxWidth = "sm" } = props
    const [email, setEmail] = useState<string>("")
    const [msg, setMsg] = useState<React.ReactNode>()
    const [disabled, setDisabled] = useState<boolean>(false)

    const handleChange = (event: React.FormEvent<EventTarget>) =>
        setEmail((event.target as HTMLInputElement).value)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setDisabled(true)
        setMsg(
            <Typography align="center">
                Sending... <CircularProgress size={20} />
            </Typography>
        )

        const response = await addToMailchimp(email)
        if (response.result === "error") {
            if (response.msg.toLowerCase().includes("already subscribed")) {
                setMsg(
                    <Typography color="error" align="center">
                        You are already on this list!
                    </Typography>
                )
            } else {
                setMsg(
                    <Typography color="error" align="center">
                        Some error occured while subscribing to list.
                    </Typography>
                )
            }
            setDisabled(false)
        } else {
            setMsg(
                <Typography color="success" align="center">
                    Successfully added to list! Please check your email and
                    confirm registration.
                </Typography>
            )
        }
    }

    return (
        <Container
            maxWidth={maxWidth}
            sx={{
                marginTop: 2, /// theme.spacing(2)
                backgroundColor: "white",
                padding: 2, // theme.spacing(2)
                paddingLeft: 3, // theme.spacing(3)
                width: "100%",
                borderRadius: 1, // theme.shape.borderRadius
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    alignContent="center"
                    justifyContent="center"
                >
                    <Grid item xs={12} sm={8}>
                        <Box sx={{display: "flex", alignItems: "flex-end"}}>
                        <EmailIcon sx={{ color: "action.avtive", mr: 1, my: 0.5}} />
                        <TextField
                            required
                            label="Email"
                            name="email"
                            fullWidth
                            value={email}
                            onChange={handleChange}
                            variant="standard"
                        />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            disabled={disabled}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                        >
                            Subscribe
                        </Button>
                    </Grid>
                    {msg !== undefined ? (
                        <Grid item xs={12}>
                            {msg}
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
            </form>
        </Container>
    )
}

export default Newsletter
