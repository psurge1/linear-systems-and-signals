import { Box, TextField, Button } from "@mui/material";
import { DiscreteConvolver } from "../calculations/convolution";
import DisplayMatrix from "../components/DisplayMatrix";
import { useState } from "react";

export default function DiscreteConvolutionPage() {
    const [xSequence, setXSequence] = useState("");
    const [hSequence, setHSequence] = useState("");

    const [xSeqNumbers, setXSequenceNumbers] = useState([]);
    const [hSeqNumbers, setHSequenceNumbers] = useState([]);

    const [showSolution, setShowSolution] = useState(false);
    const [matrix, setMatrix] = useState([]);
    const [convolutionSolution, setConvolutionSolution] = useState([]);

    const handleCompute = () => {
        const processedX = processInputSequence(xSequence);
        const processedH = processInputSequence(hSequence);

        if (!processedX || !processedH) {
            alert("Invalid Input! Use only numbers and spaces.");
            return;
        }

        setXSequenceNumbers(processedX);
        setHSequenceNumbers(processedH);

        let dc = new DiscreteConvolver(processedX, processedH);
        const { convolutionSolution, table } = dc.discreteConvolution();

        setMatrix(table);
        setConvolutionSolution(convolutionSolution);
        setShowSolution(true);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <h3>Input sequences of integers with spaces in between (no commas or any other characters, just numbers and spaces)</h3>
                <Box>
                    <TextField
                        label="x[n] sequence"
                        variant="outlined"
                        size="small"
                        sx={{ width: "40rem" }}
                        value={xSequence}
                        onChange={(e) => setXSequence(e.target.value)}
                    />
                </Box>
                <Box>
                    <TextField
                        label="h[n] sequence"
                        variant="outlined"
                        size="small"
                        sx={{ width: "40rem" }}
                        value={hSequence}
                        onChange={(e) => setHSequence(e.target.value)}
                    />
                </Box>
                <Box>
                    <Button variant="outlined" size="large" onClick={handleCompute}>
                        Compute Convolution
                    </Button>
                </Box>
            </Box>

            {showSolution && (
                <Box>
                    <h3>Convolution Result</h3>
                    <p>{convolutionSolution.join(", ")}</p>
                    
                    <h3>Convolution Table</h3>
                    <DisplayMatrix table={matrix} rowHeaders={hSeqNumbers} colHeaders={xSeqNumbers} />
                </Box>
            )}
        </Box>
    );
}


function processInputSequence(input) {
    if (/^[0-9 ]+$/.test(input.trim())) {
        return input.trim().split(/\s+/).map(Number);
    }
    return null;
}
