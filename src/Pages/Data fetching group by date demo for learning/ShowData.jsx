import React, { useEffect } from "react";
import fetchDataAndGroupByDate from "./fetchDataAndGroupByDate";

const ShowData = () => {
  useEffect(() => {
    fetchDataAndGroupByDate();
  }, []);

  return <div>Show data in console</div>;
};

export default ShowData;
