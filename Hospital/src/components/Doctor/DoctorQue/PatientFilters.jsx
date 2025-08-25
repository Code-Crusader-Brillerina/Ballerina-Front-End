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
      
    </div>
  );
};

export default PatientFilters;
