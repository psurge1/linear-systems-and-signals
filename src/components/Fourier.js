import {useState, useEffect, useRef} from "react";

import { Box, Button, TextField, FormControl, MenuItem, Select, LinearProgress } from "@mui/material";
import { periodicFunctionChoices } from "../calculations/parser";
import ChartPlotter from "./ChartPlotter";

import { ContinuousTimeFourierSeries } from "../calculations/ctfs";

import { evalExpression } from "../calculations/parser";

export function CTFS() {
    // for chart
    const [loading, setLoading] = useState(false);
    const [fInput, setFInput] = useState("rect(t)");
    const [period, setPeriod] = useState(2);
    const [periodStart, setPeriodStart] = useState(-0.5);
    const [chartData, setChartData] = useState(null);
    const [numTerms, setNumTerms] = useState(5);
    const chartRef = useRef(null);

    const [series, setSeries] = useState("");
    const [cosSeries, setCosSeries] = useState("");

    const [timeStart, setTimeStart] = useState(-5);
    const [timeEnd, setTimeEnd] = useState(5);
    const [increment, setIncrement] = useState(0.001);

    function updateChart() {
        if (Number(period) <= 0)
            alert("Invalid Period!");
        else if (Number(numTerms > 9000))
            alert("This calculator supports <= 9000 CTFS terms!");
        else if (Number(timeEnd) <= Number(timeStart))
            alert("Time Start must be before Time End!");
        else {
            setLoading(true);
            setTimeout(() => {
                let f = evalExpression(fInput);
                let CTFSCalc = new ContinuousTimeFourierSeries(f, Number(period), Number(periodStart), 10000);
                const {approximation, as, bs} = CTFSCalc.computeCTFS(Number(numTerms));
                let tVals = []
                let fVals = []
                let approxVals = []
                for (let t = Number(timeStart); t <= Number(timeEnd); t += Number(increment)) {
                    tVals.push(t);
                    fVals.push(f(t));
                    approxVals.push(approximation(t));
                }

                const numDecimalPlaces = 3;
                let fseries = `${as[0].toFixed(numDecimalPlaces)}`;
                for (let i = 1; i < as.length; ++i) {
                    if (Math.abs(as[i]) > 0.001)
                        fseries += ` + ${as[i].toFixed(numDecimalPlaces)}cos(${(2*i/period).toFixed(numDecimalPlaces)}πt)`;
                    if (Math.abs(bs[i]) > 0.001)
                        fseries += ` + ${bs[i].toFixed(numDecimalPlaces)}sin(${(2*i/period).toFixed(numDecimalPlaces)}πt)`;
                }
                setSeries(fseries);

                let fcosseries = `${as[0].toFixed(numDecimalPlaces)}`;
                for (let i = 1; i < as.length; ++i) {
                    const magnitude = Math.sqrt(Math.pow(as[i], 2) + Math.pow(bs[i], 2));
                    if (Math.abs(magnitude) > 0.001)
                        fcosseries += ` + ${magnitude.toFixed(numDecimalPlaces)}cos(${(2*i/period).toFixed(numDecimalPlaces)}πt - ${Math.atan2(bs[i], as[i]).toFixed(numDecimalPlaces)})`;
                }
                setCosSeries(fcosseries);

                // console.log(approximation);
                // console.log("F: " + fVals);
                // console.log("APPROX: " + approxVals);
                // console.log("TEST: " + approximation(-5));;

                setChartData({
                    labels: tVals,
                    datasets: [
                    {
                        label: "f(t)",
                        data: fVals,
                        borderColor: "black",
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0,
                    },
                    {
                        label: "approximate(t)",
                        data: approxVals,
                        borderColor: "orange",
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0,
                    },
                    ],
                });
                setLoading(false);
            }, 10000);
        }
    };

    // for chart
    function resetGridZoom() {
        if (chartRef && chartRef.current) {
        chartRef.current.resetZoom();
        }
    }

    return (
        <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h3 style={{marginTop: "1rem", margin: "0.2rem"}}>Input a periodic function, its period, and the number of CTFS terms</h3>
            <h4 style={{margin: "0.2rem"}}>Example function: 2*rect(-(t+2)/2), Period: 4, Period Start: -3, Number of Terms: 5</h4>
            <Box
                sx={{
                    width: "35rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2
                }}
            >
                <FormControl sx={{ width: "100%" }} size="small">
                    <TextField
                        id="ftInput"
                        label="f(t)"
                        variant="standard"
                        value={fInput}
                        onChange={(e) => setFInput(e.target.value)}
                        sx={{ width: "100%" }}
                    />
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 2 }}>
                    <FormControl size="small">
                        <Select
                            labelId="select-ft-label"
                            id="select-ft"
                            value={fInput}
                            onChange={(e) => setFInput(e.target.value)}
                            >
                            {periodicFunctionChoices.map((fn) => (
                                <MenuItem key={fn} value={fn}>
                                {fn}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Time Start"
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Time End"
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 2 }}>
                    <TextField
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Period Start"
                        value={periodStart}
                        onChange={(e) => setPeriodStart(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        variant="outlined"
                        type="number"
                        size="small"
                        label="Number of Terms"
                        value={numTerms}
                        onChange={(e) => setNumTerms(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                </Box>

                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
                    <Button variant="outlined" onClick={updateChart} sx={{ width: "100%" }}>
                        {loading ? "Computing..." : "Compute CTFS"}
                    </Button>
                    {loading && <LinearProgress sx={{ width: "100%" }} />}
                    <Button variant="outlined" onClick={resetGridZoom} sx={{ width: "100%" }}>
                        Reset Zoom
                    </Button>
                </Box>
            </Box>

            <Box style={{ width: "60rem" }}>
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
            </Box>

            <Box>
                <h3 style={{ textAlign: "center" }}>CTFS Series:</h3>
                <p style={{ textAlign: "center" }}>{series}</p>
            </Box>
            <Box>
                <h3 style={{ textAlign: "center" }}>CTFS Cosine Series:</h3>
                <p style={{ textAlign: "center" }}>{cosSeries}</p>
            </Box>
        </Box>
    );
}

export function CTFT() {
    return (
        <Box justifyContent="center" style={{display: "flex"}}>
            <h1>CTFT under construction</h1>
        </Box>
    );
}

export function DTFS() {
    return (
        <Box justifyContent="center" style={{display: "flex"}}>
            <h1>DTFS under construction</h1>
        </Box>
    );
}

export function DTFT() {
    return (
        <Box justifyContent="center" style={{display: "flex"}}>
            <h1>DTFT under construction</h1>
        </Box>
    );
}