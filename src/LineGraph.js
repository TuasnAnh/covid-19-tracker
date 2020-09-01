import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { options } from "./LineGraphConfig";

const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

function LineGraph({ casesType, ...props }) {
  const [data, setData] = useState([]);

  const buildDataChard = (data) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildDataChard(data);
        setData(chartData);
      });
  }, [casesType]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
