import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const ContributionGraph = () => {
  const [activity, setActivity] = useState(null);

  const data = [
    { date: "2023-04-01", count: 1 },
    { date: "2023-04-02", count: 4 },
    { date: "2023-07-30", count: 44 },
    { date: "2023-07-30", count: 6 },
    { date: "2023-07-20", count: 69 },
    { date: "2023-07-10", count: 9 },
    { date: "2023-07-07", count: 2 },
    { date: "2024-04-01", count: 2 }
  ];

  const startDate = new Date("2023-04-01");
  const endDate = new Date("2024-04-01");

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>Static Contribution Graph: {activity?.count}</h1>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        onMouseOver={(event,value) => setActivity(value)}
        onMouseLeave={() => setActivity(null)}
        titleForValue={(value) => {
          return value ? `${value.date}: ${value.count} contributions` : null;
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value ? `${value.date}: ${value.count} contributions` : null
          };
        }}
        monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        gutterSize={1}
        showOutOfRangeDays={true}
      />
    </div>
  );
};

export default ContributionGraph;
