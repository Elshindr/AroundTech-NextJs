import React from "react";
import { format } from "date-fns";

const CustomToolbar = ({ date, onNavigate }) => {

  const handleNavigate = (action) => {
    if (action === "PREV_MONTH") {
      let lastMonth = date.getMonth() -1;
      onNavigate(date.getFullYear(), lastMonth , date.getDate());
    } else if (action === "NEXT_MONTH") {
      let nextMonth = date.getMonth() +1;
      onNavigate(date.getFullYear(), nextMonth , date.getDate());
    } else if (action === "PREV_YEAR") {
      let lastYear = date.getFullYear() -1;
      onNavigate(lastYear,  date.getMonth() , date.getDate());
    } else if (action === "NEXT_YEAR") {
      let nextYear = date.getFullYear() +1;
      onNavigate(nextYear,  date.getMonth() , date.getDate());
    }
  };


  return (
    <div>
      <div className="my-3">
        <button onClick={() => handleNavigate("PREV_YEAR")}>&#8249;&#8249;</button>
        <button onClick={() => handleNavigate("PREV_MONTH")}>&#8249;</button>
        <label className="px-5">
          <span>
            <b>{format(date, "MMMM")}</b> <span>{format(date, "yyyy")}</span>
          </span>
        </label>
        <button onClick={() => handleNavigate("NEXT_MONTH")}>&#8250;</button>
        <button onClick={() => handleNavigate("NEXT_YEAR")}>&#8250;&#8250;</button>
      </div>
    </div>
  );
};

export default CustomToolbar;
