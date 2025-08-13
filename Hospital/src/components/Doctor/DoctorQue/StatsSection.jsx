import React from "react";
import { FaUserInjured, FaNotesMedical } from "react-icons/fa";

const StatsSection = ({ totalPatients, completed }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {/* Total Patients Today */}
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Total Patients Today</h3>
            <p className="text-4xl font-bold mt-2">{totalPatients}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <FaUserInjured className="text-2xl" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm opacity-80">
            Compared to yesterday: <span className="font-semibold">+2</span>
          </p>
        </div>
      </div>

      {/* Appointments Completed */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Appointments Completed</h3>
            <p className="text-4xl font-bold mt-2">{completed}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <FaNotesMedical className="text-2xl" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm opacity-80">On track for daily target</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
