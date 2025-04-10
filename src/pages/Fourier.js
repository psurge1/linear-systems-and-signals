import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { ContinuousConvolver } from "../calculations/convolution";
import { CSF } from "../calculations/singularity";

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import LinearProgress from "@mui/material/LinearProgress"

Chart.register(...registerables, zoomPlugin);

// const functionChoices = [
//   "t",
//   "pow(t, 2)",
//   "sin(t)",
//   "cos(t)",
//   "exp(t)",
//   // "imp(t)",
//   "us(t)",
//   "sign(t)",
//   "rect(t)",
//   "ramp(t)",
//   "tri(t)",
//   "saw(t)",
// ];

// export function FourierChart() {
//   const [loading, setLoading] = useState(false);

//   const [fInput, setFInput] = useState("rect(t)");
//   const [hInput, setHInput] = useState("tri(t)");
//   const [chartData, setChartData] = useState(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     updateChart();
//   }, []);

//   const evalExpression = (exp) => {
//     const functionMapping = {
//       sin: Math.sin,
//       cos: Math.cos,
//       exp: Math.exp,
//       pow: Math.pow,
//       // imp: CSF.impulse,
//       us: CSF.unitStep,
//       sign: CSF.signum,
//       rect: CSF.rect,
//       ramp: CSF.ramp,
//       tri: CSF.triangle,
//       saw: CSF.sawtooth,
//     };

//     try {
//       let func = new Function("t", ...Object.keys(functionMapping), `return ${exp}`);
//       return (t) => func(t, ...Object.values(functionMapping));
//     } catch (e) {
//       console.error("Error creating function:", e);
//     }
//   };

//   function updateChart() {
//     setLoading(true);
//     setTimeout(() => {
//       let f = evalExpression(fInput);
//       let h = evalExpression(hInput);
//       let convolveCalc = new ContinuousConvolver(f, h);
//       const { xValues, yValues, fValues, hValues } = convolveCalc.continuousConvolution({ increment: 0.01 });

//       setChartData({
//         labels: xValues,
//         datasets: [
//           {
//             label: "y(t)",
//             data: yValues,
//             borderColor: "black",
//             borderWidth: 2,
//             fill: false,
//             pointRadius: 0,
//           },
//           {
//             label: "f(t)",
//             data: fValues,
//             borderColor: "blue",
//             borderWidth: 2,
//             fill: false,
//             pointRadius: 0,
//           },
//           {
//             label: "h(t)",
//             data: hValues,
//             borderColor: "red",
//             borderWidth: 2,
//             fill: false,
//             pointRadius: 0,
//           },
//         ],
//       });
//       setLoading(false);
//     }, 10000);
//   };

//   function resetGrid() {
//     if (chartRef && chartRef.current) {
//       chartRef.current.resetZoom();
//     }
//   }

//   return (
//     <>
//       {chartData && (
//         <Line
//           ref={chartRef}
//           data={chartData}
//           options={{
//             responsive: true,
//             scales: {
//               x: {
//                 title: { display: true, text: 't' },
//                 ticks: {
//                     callback: function(value, index) {
//                         return (this.getLabelForValue(value)).toFixed(2);
//                     }
//                 }
//             },
//               y: { title: { display: true, text: "Amplitude" } },
//             },
//             plugins: {
//               zoom: {
//                 pan: { enabled: true, mode: "xy" },
//                 zoom: {
//                   wheel: { enabled: true },
//                   pinch: { enabled: true },
//                   mode: "xy",
//                 },
//               },
//             },
//           }}
//         />
//       )}
//     </>
//   );
// };