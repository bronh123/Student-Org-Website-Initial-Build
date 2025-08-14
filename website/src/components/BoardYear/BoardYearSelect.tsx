import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

type Props = {
    boardYear: String
    setBoardYear: React.Dispatch<React.SetStateAction<String>>
}
function BoardYearSelect({ boardYear, setBoardYear }: Props) {
    const { allSanityBoardYear } =
        useStaticQuery<GatsbyTypes.AllBoardYearQuery>(graphql`
            query AllBoardYear {
                allSanityBoardYear(sort: { fields: year, order: DESC }) {
                    nodes {
                        year
                    }
                }
            }
        `)
    return (
        <FormControl
            sx={{
                padding: 1, // theme.spacing(1)
            }}
        >
            <InputLabel id="board-select-year-label">Board Year</InputLabel>
            <Select
                labelId="board-select-year-label"
                id="board-select-year"
                value={boardYear}
                label="Board Year"
                onChange={(event) => {
                    setBoardYear(event.target.value)
                }}
            >
                {allSanityBoardYear.nodes.map((boardYear) => (
                    <MenuItem value={boardYear.year} key={boardYear.year}>{boardYear.year}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default BoardYearSelect
