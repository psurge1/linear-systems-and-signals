import { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Box } from "@mui/material";

Chart.register(...registerables, zoomPlugin);

export default function ChartPlotter({ xValues, datasets, title = "Chart", xLabel = "X-Axis", yLabel = "Y-Axis", chartRef = null}) {
  return (
    <Box>
      <Box style={{ width: "70%", margin: "auto", border: "2px solid lightgrey", borderRadius: "1%" }}>
        <Line
          ref={chartRef}
          data={{
            labels: xValues,
            datasets: datasets.map(({ label, data, borderColor, borderWidth, fill, pointRadius }) => ({
              label,
              data,
              borderColor: borderColor || "black",
              borderWidth: borderWidth || 2,
              fill: fill || false,
              pointRadius: pointRadius || 0,
            })),
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: xLabel },
                ticks: {
                  callback: function (value) {
                    return this.getLabelForValue(value).toFixed(2);
                  },
                },
              },
              y: { title: { display: true, text: yLabel } },
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
      </Box>
    </Box>
  );
};