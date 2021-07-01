// import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    time: 40,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    time: 40,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    time: 100,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    time: 120,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    time: 140,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    time: 10080,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    time: 900,
  },
];

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
        <h1>{title}</h1>
        <h3>Skill Score: {fixedScore}</h3>
        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: "Time {Ms}", offset: 0, position: "insideBottom" }}
          />
          <YAxis label={{ value: "Grade", angle: 0, position: "top" }} />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
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
