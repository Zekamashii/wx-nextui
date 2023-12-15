import React, { useState, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Result({ props }) {
  const [timeData, setTimeData] = useState(0);
  const [tempData, setTempData] = useState(0);
  const [feelLikeData, setFeelLikeData] = useState(0);

  useEffect(() => {
    const times = props?.weather[0].hourly.map((data) => data.time);
    const temperatures = props?.weather[0].hourly.map((data) => data.tempC);
    const feelsLike = props?.weather[0].hourly.map((data) => data.FeelsLikeC);

    setTimeData(times);
    setTempData(temperatures);
    setFeelLikeData(feelsLike);
  }, [props]);

  const { width, height, ref } = useResizeDetector({});

  return (
    props && (
      <>
        <Plot
          data={[
            {
              x: timeData,
              y: tempData,
              type: "scatter",
              marker: { color: "red" },
              name: "Temperature (°C)",
            },
            {
              x: timeData,
              y: feelLikeData,
              type: "scatter",
              marker: { color: "blue" },
              name: "Feels like (°C)",
            },
          ]}
          layout={{
            width: width,
            height: height,
            title: "Hourly Temperature Forecast",
            xaxis: {
              title: "Hours from Now",
            },
            yaxis: {
              title: "Temperature (°C)",
            },
          }}
          className='items-center justify-center'
        />
      </>
    )
  );
}
