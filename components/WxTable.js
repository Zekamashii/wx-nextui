import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Divider } from "@nextui-org/react";

export default function Result({ props }) {
  const [xData, setXData] = useState(0);
  const [yData, setYData] = useState(0);

  useEffect(() => {
    const times = props?.weather[0].hourly.map((data) => data.time);
    const temperatures = props?.weather[0].hourly.map((data) => data.tempC);

    setXData(times);
    setYData(temperatures);
  }, [props]);

  console.log(xData, yData);

  return (
    props && (
      <div className='flex flex-col items-center justify-center'>
        <Divider className='my-4' />
        <Plot
          data={[
            {
              x: xData,
              y: yData,
              type: "scatter",
              marker: { color: "red" },
            },
          ]}
          layout={{
            width: 1000,
            height: 500,
            title: "Hourly Temperature Forecast",
            xaxis: {
              title: "Time",
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
