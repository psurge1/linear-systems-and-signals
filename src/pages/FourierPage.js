import {useState, useEffect, useRef} from "react";

import { Box, Button, ButtonGroup, TextField, FormControl, MenuItem, Select } from "@mui/material";
import { functionChoices } from "../calculations/parser";
import ChartPlotter from "./ChartPlotter";

export default function FourierPage() {
    const [page, setPage] = useState("CTFS");

    // for chart
    const [loading, setLoading] = useState(false);
    const [fInput, setFInput] = useState("rect(t)");
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    function updateChart() {
        // setLoading(true);
        // setTimeout(() => {
        // let f = evalExpression(fInput);
        // let convolveCalc = new ContinuousConvolver(f, h);
        // const { xValues, yValues, fValues, hValues } = convolveCalc.continuousConvolution({ increment: 0.01 });

        // setChartData({
        //     labels: xValues,
        //     datasets: [
        //     {
        //         label: "y(t)",
        //         data: yValues,
        //         borderColor: "black",
        //         borderWidth: 2,
        //         fill: false,
        //         pointRadius: 0,
        //     },
        //     {
        //         label: "f(t)",
        //         data: fValues,
        //         borderColor: "blue",
        //         borderWidth: 2,
        //         fill: false,
        //         pointRadius: 0,
        //     },
        //     {
        //         label: "h(t)",
        //         data: hValues,
        //         borderColor: "red",
        //         borderWidth: 2,
        //         fill: false,
        //         pointRadius: 0,
        //     },
        //     ],
        // });
        // setLoading(false);
        // }, 10000);
    };

    // for chart
    function resetGrid() {
        if (chartRef && chartRef.current) {
        chartRef.current.resetZoom();
        }
    }

    return (
        <Box>
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
            <Box style={{display: "flex"}}>
                <Box style={{ width: "60%", marginLeft: "5%", borderWidth: "1rem", border: "2px solid lightgrey", borderRadius: "1%" }}>
                {(chartData && chartData.labels && chartData.datasets) && (
                    <ChartPlotter
                        xValues={chartData.labels || []}
                        datasets={chartData.datasets || []}
                        title="Convolution"
                        xLabel="t"
                        yLabel="Amplitude"
                        chartRef={chartRef}
                    ></ChartPlotter>
                )}
                {/* {chartData && (
                    <Line
                    ref={chartRef}
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                        x: {
                            title: { display: true, text: 't' },
                            ticks: {
                                callback: function(value, index) {
                                    return (this.getLabelForValue(value)).toFixed(2);
                                }
                            }
                        },
                        y: { title: { display: true, text: "Amplitude" } },
                        },
                        plugins: {
                        zoom: {
                            pan: { enabled: true, mode: "xy" },
                            zoom: {
                            wheel: { enabled: true },
                            pinch: { enabled: true },
                            mode: "xy",
                            },
                        },
                        },
                    }}
                    />
                )} */}
                </Box>
            </Box>
        
            <Box style={{marginLeft: "4%"}}>
                <Box style={{ marginTop: "1.5rem" }}>
                    <Box>
                        <TextField size="small" id="ftInput" label="f(t)" variant="standard" value={fInput} onChange={(e) => setFInput(e.target.value)}/>
                        <FormControl size="small">
                            <Select
                                labelId="select-ft-label"
                                id="select-ft"
                                value={fInput}
                                // label="f(t)"
                                onChange={(e) => setFInput(e.target.value)}
                                style={{marginLeft: "1rem"}}
                            >
                                {functionChoices.map((fn) => (
                                    <MenuItem sx={{size: 'small'}} key={fn} value={fn}>
                                    {fn}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
