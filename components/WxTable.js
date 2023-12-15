import React, { useState, useEffect } from "react";
import { Divider } from "@nextui-org/react";
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

  return (
    props && (
      <div className='flex flex-col items-center justify-center'>
        <Divider className='my-4' />
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
            width: 1000,
            height: 500,
            title: "Hourly Temperature Forecast",
            xaxis: {
              title: "Hours from Now",
            },
            yaxis: {
              title: "Temperature (°C)",
            },
          }}
          className='w-full h-full items-center justify-center'
        />
      </div>
    )
  );
}
