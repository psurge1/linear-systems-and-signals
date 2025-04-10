import {useState, useEffect} from "react";

import { Box, Button, ButtonGroup } from "@mui/material";

export default function FourierPage() {
    const [page, setPage] = useState("CTFS");

    return (
        <Box>
            <h1 style={{ textAlign: "center" }}>Convolution</h1>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" marginBottom={2}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button
                        onClick={() => {setPage("CTFS")}}
                    >
                        CTFS
                    </Button>
                    <Button
                        onClick={() => {setPage("CTFT")}}
                    >
                        CTFT
                    </Button>
                    <Button
                        onClick={() => {setPage("DTFS")}}
                    >
                        DTFS
                    </Button>
                    <Button
                        onClick={() => {setPage("DTFT")}}
                    >
                        DTFT
                    </Button>
                </ButtonGroup>
            </Box>
            <Box style={{ marginTop: "1.5rem" }}>
                {page === "CTFS" && <Box>CTFS</Box>}
                {page === "CTFT" && <Box>CTFT</Box>}
                {page === "DTFS" && <Box>DTFS</Box>}
                {page === "DTFT" && <Box>DTFT</Box>}
            </Box>
        </Box>
    );
}