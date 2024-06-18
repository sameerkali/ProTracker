// import React, { useState } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";

// const ContributionGraph = () => {
//   const [activity, setActivity] = useState(null);

//   const data = [
//     { date: "2023-04-01", count: 1 },
//     { date: "2023-04-02", count: 4 },
//     { date: "2023-07-30", count: 44 },
//     { date: "2023-07-30", count: 6 },
//     { date: "2023-07-20", count: 69 },
//     { date: "2023-07-10", count: 9 },
//     { date: "2023-07-07", count: 2 },
//     { date: "2024-04-01", count: 2 }
//   ];

//   const startDate = new Date("2023-04-01");
//   const endDate = new Date("2024-04-01");

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto" }}>
//       <h1>Static Contribution Graph: {activity?.count}</h1>
//       <CalendarHeatmap
//         startDate={startDate}
//         endDate={endDate}
//         values={data}
//         onMouseOver={(event,value) => setActivity(value)}
//         onMouseLeave={() => setActivity(null)}
//         titleForValue={(value) => {
//           return value ? `${value.date}: ${value.count} contributions` : null;
//         }}
//         tooltipDataAttrs={(value) => {
//           return {
//             "data-tip": value ? `${value.date}: ${value.count} contributions` : null
//           };
//         }}
//         monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
//         weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
//         gutterSize={1}
//         showOutOfRangeDays={true}
//       />
//     </div>
//   );
// };

// export default ContributionGraph;




import React, { useState, useEffect } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { db } from "../firebase";
import Sidebar from "../Pages/Home/Sidebar";

const ContributionGraph = () => {
  const [activity, setActivity] = useState(null);
  const [data, setData] = useState([]);
  console.log("data==================::",data)
    const dataa = [
    { date: "2023-04-01", count: 1 },
    { date: "2023-04-02", count: 4 },
    { date: "2023-07-30", count: 44 },
    { date: "2023-07-30", count: 6 },
    { date: "2023-07-20", count: 69 },
    { date: "2023-07-10", count: 9 },
    { date: "2023-07-07", count: 2 },
    { date: "2024-04-01", count: 2 }
  ];

  const fetchData = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (user && user.uid) {
      const q = query(
        collection(db, "todos"),
        where("userUID", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const activityData = [];
        snapshot.docs.forEach((doc) => {
          const { date, isCompleted } = doc.data();
          const dateKey = date.toDate().toISOString().split("T")[0];
          const existingData = activityData.find(
            (item) => item.date === dateKey
          );
          if (existingData) {
            existingData.count++;
            if (isCompleted) {
              existingData.completedCount++;
            }
          } else {
            activityData.push({
              date: dateKey,
              count: 1,
              completedCount: isCompleted ? 1 : 0,
            });
          }
        });

        // Convert activityData to the required format
        const formattedData = activityData.map((item) => ({
          date: item.date,
          count: item.count,
        }));

        setData(formattedData);
      });

      return () => unsubscribe();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startDate = new Date("2023-04-01");
  const endDate = new Date("2024-04-01");

  const classForValue = (value) => {
    if (!value) {
      return "color-empty";
    }
    return `color-scale-${value.count}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
    <Sidebar/>
      <h1>Dynamic Contribution Graph: {activity?.count}</h1>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={dataa} // working with static data
        // values={data } // not working
        classForValue={classForValue}
        onMouseOver={(event, value) => setActivity(value)}
        onMouseLeave={() => setActivity(null)}
        titleForValue={(value) => {
          return value
            ? `${value.date}: ${value.count} contributions`
            : null;
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value ? `${value.date}: ${value.count} contributions` : null,
          };
        }}
        monthLabels={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        gutterSize={1}
        showOutOfRangeDays={true}
      />
    </div>
  );
};

export default ContributionGraph;