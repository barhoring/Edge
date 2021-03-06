import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const time = label;
    const grade = payload[0].value;
    const { type } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{type}</p>
        <p>{`(${time},${grade})`}</p>
      </div>
    );
  }

  return null;
};

const Chart = ({ data, title, score }) => {
  const fixedScore = score.toFixed(2);
  return (
    <>
      <div className="Chart-container">
        <h2>{title}</h2>
        <h4>Skill Score: {fixedScore}</h4>
        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{
              value: "Time {Ms}",
              offset: 0,
              position: "bottom",
            }}
          />
          <YAxis
            label={{ offset: 15, value: "Grade", angle: 0, position: "top" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="grade"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Chart;
