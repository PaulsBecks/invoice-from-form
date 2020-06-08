import React from "react";
import { PieChart, Pie } from "recharts";

export default function Stats() {
  return (
    <div>
      <PieChart width={730} height={250}>
        <Pie
          data={[
            {
              name: "Group A",
              value: 400,
            },
          ]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label
          legendType="line"
        />
      </PieChart>
    </div>
  );
}
