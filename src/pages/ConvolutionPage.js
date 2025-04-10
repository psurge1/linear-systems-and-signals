import { ConvolutionChart } from '../components/ConvolutionChart'
import DiscreteConvolutionPage from '../components/DiscreteConvolution'

import { Button, ButtonGroup, Box } from '@mui/material';

import { useState } from 'react';

export default function ConvolutionPage() {
    const [isContinuous, setIsContinuous] = useState(true);
    return (
        <Box>
            <h1 style={{ textAlign: "center" }}>{((isContinuous) ? ("Continuous") : ("Discrete")) + " Convolution"}</h1>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" marginBottom={2}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button
                        onClick={() => {setIsContinuous(true)}}
                    >
                        Continuous
                    </Button>
                    <Button
                        onClick={() => {setIsContinuous(false)}}
                    >
                        Discrete
                    </Button>
                </ButtonGroup>
            </Box>
            {/* {isContinuous && <ConvolutionChart/>}
            {!isContinuous && <DiscreteConvolutionPage/>} */}
            <Box style={{ display: isContinuous ? "block" : "none" }}>
                <ConvolutionChart/>
            </Box>

            <Box style={{ display: isContinuous ? "none" : "block" }}>
                <DiscreteConvolutionPage/>
            </Box>
        </Box>
    );
}