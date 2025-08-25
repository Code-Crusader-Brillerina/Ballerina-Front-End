import React, { useState, useEffect } from "react";
import { FaUserInjured, FaNotesMedical, FaClock } from "react-icons/fa";

const StatsSection = ({ totalPatients, completed }) => {
  const [currentTimeSlot, setCurrentTimeSlot] = useState("morning");

  // Helper function to determine current time slot
  const getCurrentTimeSlot = () => {
    const now = new Date();
    const hour = now.getHours();
    
    // You can adjust these time ranges based on your clinic's schedule
    if (hour >= 3 && hour < 12) {
      return "morning";
    } else {
      return "evening";
    }
  };

  // Update current time slot when component mounts and every minute
  useEffect(() => {
    const updateTimeSlot = () => {
      const timeSlot = getCurrentTimeSlot();
      setCurrentTimeSlot(timeSlot);
    };

    // Update immediately
    updateTimeSlot();

    // Update every minute to keep it current
    const interval = setInterval(updateTimeSlot, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get time slot display text with proper capitalization
  const getTimeSlotDisplay = () => {
    return currentTimeSlot.charAt(0).toUpperCase() + currentTimeSlot.slice(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {/* Total Patients Today */}
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Total Patients Today</h3>
            <div className="flex items-center gap-2 mt-1 mb-2">
              <FaClock className="text-sm opacity-80" />
              <span className="text-sm font-medium opacity-90">
                {getTimeSlotDisplay()} Session
              </span>
            </div>
            <p className="text-4xl font-bold">{totalPatients}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <FaUserInjured className="text-2xl" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm opacity-80">
            {currentTimeSlot === "morning" ? "Morning" : "Evening"} appointments: {" "}
            <span className="font-semibold">{totalPatients}</span>
          </p>
        </div>
      </div>

      {/* Appointments Completed */}
      
    </div>
  );
};

export default StatsSection;