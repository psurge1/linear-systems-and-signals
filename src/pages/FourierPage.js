import {useState} from "react";

import { Box, Button, ButtonGroup } from "@mui/material";

import {CTFS, CTFT, DTFS, DTFT} from "../components/Fourier";

export default function FourierPage() {
    const [page, setPage] = useState("CTFS");
    return (
        <Box>
            <Box>
                {(page === "CTFS") && <h1 style={{ textAlign: "center" }}>Continuous Time Fourier Series</h1>}
                {(page === "CTFT") && <h1 style={{ textAlign: "center" }}>Continuous Time Fourier Transform</h1>}
                {(page === "DTFS") && <h1 style={{ textAlign: "center" }}>Discrete Time Fourier Series</h1>}
                {(page === "DTFT") && <h1 style={{ textAlign: "center" }}>Discrete Time Fourier Transform</h1>}
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
            </Box>
            <Box>
                {page === "CTFS" && <CTFS></CTFS>}
                {page === "CTFT" && <CTFT></CTFT>}
                {page === "DTFS" && <DTFS></DTFS>}
                {page === "DTFT" && <DTFT></DTFT>}
            </Box>
            
        </Box>
    );
}
