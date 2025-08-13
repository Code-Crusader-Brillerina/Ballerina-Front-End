import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarSection = ({ date, setDate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-teal-800 flex items-center">
          <FaCalendarAlt className="mr-2 text-teal-500" />
          Appointment Calendar
        </h2>
        <div className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
          Today:{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <Calendar
        onChange={setDate}
        value={date}
        className="rounded-xl border-teal-200 overflow-hidden"
      />
    </div>
  );
};

export default CalendarSection;
