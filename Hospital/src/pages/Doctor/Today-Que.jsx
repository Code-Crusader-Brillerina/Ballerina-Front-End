import React, { useState, useEffect } from "react";
import { FaUserInjured } from "react-icons/fa";
import CalendarSection from "../../components/Doctor/DoctorQue/CalendarSection";
import StatsSection from "../../components/Doctor/DoctorQue/StatsSection";
import PatientFilters from "../../components/Doctor/DoctorQue/PatientFilters";
import PatientCard from "../../components/Doctor/DoctorQue/PatientCard";

const TodayQue = () => {
  const [date, setDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("all");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const formattedDate = formatDate(date); // Use the current date state
        
        const response = await fetch("http://localhost:8080/doctor/getQueue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: formattedDate }), // Dynamic date
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const apiData = await response.json();
        console.log("API Response:", apiData);

        const patientList = Array.isArray(apiData.data) ? apiData.data : [];
        setPatients(patientList);
      } catch (error) {
        console.error("Error fetching patient queue:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [date]); // Add date as dependency so it refetches when date changes

  const filteredPatients =
    activeFilter === "all"
      ? patients
      : Array.isArray(patients)
      ? patients.filter((p) => p.status === activeFilter)
      : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-teal-700">Loading patient queue...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-900 flex items-center">
          <FaUserInjured className="mr-3 text-teal-600" />
          Doctor Dashboard
        </h1>
        <p className="text-teal-700 mt-2">
          Welcome, Dr. Perera. You have{" "}
          {Array.isArray(patients)
            ? patients.filter((p) => p.status === "waiting").length
            : 0}{" "}
          patients waiting today.
        </p>
      </div>

      <PatientFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CalendarSection date={date} setDate={setDate} />
        <StatsSection
          totalPatients={Array.isArray(patients) ? patients.length : 0}
          completed={
            Array.isArray(patients)
              ? patients.filter((p) => p.status === "completed").length
              : 0
          }
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">
          Today's Patients
        </h2>
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.map((p, index) => (
              <PatientCard key={index} patient={p} />
            ))}
          </div>
        ) : (
          <p className="text-teal-700">No patients found for this filter.</p>
        )}
      </div>
    </div>
  );
};

export default TodayQue;