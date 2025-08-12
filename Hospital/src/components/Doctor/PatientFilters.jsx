import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const PatientFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search Patient by name or ID..."
          className="border-2 border-teal-200 rounded-full px-6 py-3 w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
        <FaSearch className="absolute right-5 top-3.5 text-teal-400" />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            activeFilter === "all"
              ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
              : "bg-white text-teal-700 border border-teal-200"
          }`}
        >
          <FaFilter className="text-sm" /> All Patients
        </button>

        <button
          onClick={() => setActiveFilter("waiting")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            activeFilter === "waiting"
              ? "bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-lg"
              : "bg-white text-amber-700 border border-amber-200"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-amber-500"></div> Waiting
        </button>

        <button
          onClick={() => setActiveFilter("in-progress")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            activeFilter === "in-progress"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
              : "bg-white text-blue-700 border border-blue-200"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500"></div> In Progress
        </button>

        <button
          onClick={() => setActiveFilter("completed")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            activeFilter === "completed"
              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
              : "bg-white text-emerald-700 border border-emerald-200"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Completed
        </button>
      </div>
    </div>
  );
};

export default PatientFilters;
