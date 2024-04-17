import React, { useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";

const ShowData = () => {
  const fetchDataAndGroupByDate = async () => {
    try {
      const todosCollection = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCollection);
      const todosData = [];
  
      todosSnapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() });
      });
  
      // Group todos by date
      const groupedTodos = {};
      todosData.forEach((todo) => {
        const dateKey = todo.date.toDate().toDateString(); 
        if (!groupedTodos[dateKey]) {
          groupedTodos[dateKey] = [];
        }
        groupedTodos[dateKey].push(todo);
      });
  
      // Log grouped data
      console.log("Grouped Todos:");
      // console.log(groupedTodos);
    } catch (error) {
      console.error("Error fetching and grouping todos:", error);
    }
  };
  useEffect(() => {
    fetchDataAndGroupByDate();
  }, []);

  return <div>Show data in console</div>;
};

export default ShowData;
