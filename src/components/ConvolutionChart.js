import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { ContinuousConvolver } from "../calculations/convolution";
import { CSF } from "../calculations/singularity";
import { evalExpression, functionChoices } from "../calculations/parser";

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import LinearProgress from "@mui/material/LinearProgress"

import ChartPlotter from "./ChartPlotter";

Chart.register(...registerables, zoomPlugin);



export function ConvolutionChart() {
	const [loading, setLoading] = useState(false);

	const [fInput, setFInput] = useState("rect(t)");
	const [hInput, setHInput] = useState("tri(t)");
	const [chartData, setChartData] = useState(null);
	const chartRef = useRef(null);

	function updateChart() {
		setLoading(true);
		setTimeout(() => {
			let f = evalExpression(fInput);
			let h = evalExpression(hInput);
			let convolveCalc = new ContinuousConvolver(f, h);
			const { xValues, yValues, fValues, hValues } = convolveCalc.continuousConvolution({ increment: 0.01 });

			setChartData({
				labels: xValues,
				datasets: [
					{
						label: "y(t)",
						data: yValues,
						borderColor: "black",
						borderWidth: 2,
						fill: false,
						pointRadius: 0,
					},
					{
						label: "f(t)",
						data: fValues,
						borderColor: "blue",
						borderWidth: 2,
						fill: false,
						pointRadius: 0,
					},
					{
						label: "h(t)",
						data: hValues,
						borderColor: "red",
						borderWidth: 2,
						fill: false,
						pointRadius: 0,
					},
				],
			});
			setLoading(false);
		}, 10000);
	};

	function resetGridZoom() {
		if (chartRef && chartRef.current) {
			chartRef.current.resetZoom();
		}
	}

	return (
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
			</Box>
			
			<Box style={{marginLeft: "4%"}}>
				<Box style={{ marginTop: "1.5rem" }}>
					<Box>
						<h3>Input two functions</h3>
						<h3>Example function: 2*rect(-(t+2)/2) + tri(t-0.5)*us(t)</h3>
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

					<Box style={{ marginTop: "1.5rem" }}>
						<TextField size="small" id="htInput" label="h(t)" variant="standard" value={hInput} onChange={(e) => setHInput(e.target.value)}/>
						<FormControl size="small">
							<Select
								labelId="select-ht-label"
								id="select-ht"
								value={hInput}
								// label="h(t)"
								onChange={(e) => setHInput(e.target.value)}
								style={{marginLeft: "1rem"}}
							>
								{functionChoices.map((fn) => (
									<MenuItem key={fn} value={fn}>
										{fn}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Button variant="outlined" onClick={updateChart} style={{ marginTop: "1rem", width: "100%" }}>
						{loading ? "Computing..." : "Compute Convolution"}
					</Button>
					{loading && <LinearProgress/>}
					
					<Button variant="outlined" onClick={resetGridZoom} style={{ marginTop: "1rem", width: "100%" }}>
						Reset Zoom
					</Button>
				</Box>
			</Box>
		</Box>
	);
};