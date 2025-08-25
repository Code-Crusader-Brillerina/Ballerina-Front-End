import React, { useState, useEffect } from "react";
import { FaUserInjured, FaUser, FaRedo } from "react-icons/fa";
import CalendarSection from "../../components/Doctor/DoctorQue/CalendarSection";
import StatsSection from "../../components/Doctor/DoctorQue/StatsSection";
import PatientFilters from "../../components/Doctor/DoctorQue/PatientFilters";
import PatientCard from "../../components/Doctor/DoctorQue/PatientCard";

const TodayQue = () => {
  const [date, setDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("all");
  const [patients, setPatients] = useState([]);
  const [singlePatient, setSinglePatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singlePatientLoading, setSinglePatientLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to map API status to display status
  const mapApiStatusToDisplay = (apiStatus) => {
    switch(apiStatus) {
      case 'pending': return 'waiting';
      case 'in-progress': return 'in-progress';
      case 'completed': return 'completed';
      default: return 'waiting';
    }
  };

  // Function to fetch single patient data
  const fetchSinglePatient = async () => {
    try {
      setSinglePatientLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:8080/patient/getPatient", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      console.log("Single Patient API Response:", apiData);

      if (apiData.success && apiData.data) {
        // Transform the single patient data using same pattern
        const transformedPatient = {
          // Spread the original item
          ...apiData.data,
          
          // Map user data for easier access
          name: apiData.data.user?.username || 'Unknown Patient',
          username: apiData.data.user?.username || 'Unknown',
          phoneNumber: apiData.data.user?.phoneNumber || 'No phone',
          address: `${apiData.data.user?.city || 'Unknown city'}, ${apiData.data.user?.district || 'Unknown district'}`,
          patientId: apiData.data.user?.uid || 'No ID',
          image: apiData.data.user?.profilepic || "https://via.placeholder.com/64x64/20B2AA/FFFFFF?text=Patient",
          university: apiData.data.user?.email || 'No email',
          
          // Additional patient-specific data from the 'partient' object
          pid: apiData.data.partient?.pid || 'No PID',
          dateOfBirth: apiData.data.partient?.DOB || 'No DOB',
          gender: apiData.data.partient?.gender || 'Unknown',
          
          // Keep original nested structure for reference
          user: apiData.data.user,
          partient: apiData.data.partient
        };

        console.log("Transformed single patient:", transformedPatient);
        setSinglePatient(transformedPatient);
      } else {
        throw new Error(apiData.message || 'Failed to fetch patient data');
      }
    } catch (error) {
      console.error("Error fetching single patient data:", error);
      setError(error.message);
      setSinglePatient(null);
    } finally {
      setSinglePatientLoading(false);
    }
  };

  // Original queue fetching function
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const formattedDate = formatDate(date);
        
        const response = await fetch("http://localhost:8080/doctor/getQueue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: formattedDate, time: "morning" }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData = await response.json();
        console.log("Queue API Response:", apiData);

        // Ensure we have data and it's an array
        const patientList = Array.isArray(apiData.data) ? apiData.data : [];
        
        // Transform the data to match what the component expects
        const transformedPatients = patientList.map((item, index) => {
          // Create appointment ID from available data
          const appointmentId = item.queData?.aid || 
                               item.queData?.appointmentId || 
                               item.queData?.id ||
                               item.aid ||
                               item.appointmentId ||
                               item.id ||
                               item.user?.uid ||
                               `temp_id_${index}`;

          console.log(`Patient ${index} - appointmentId: ${appointmentId}`, item);

          return {
            // Flatten the structure and add computed properties
            ...item,
            // Add explicit appointment ID
            appointmentId: appointmentId,
            // Map user data for easier access
            name: item.user?.username || 'Unknown Patient',
            username: item.user?.username || 'Unknown',
            phoneNumber: item.user?.phoneNumber || 'No phone',
            address: `${item.user?.city || 'Unknown city'}, ${item.user?.district || 'Unknown district'}`,
            patientId: item.user?.uid || 'No ID',
            image: item.user?.profilepic || "https://via.placeholder.com/64x64/20B2AA/FFFFFF?text=Patient",
            university: item.user?.email || 'No email',
            // Map appointment data
            time: item.queData?.time || 'No time set',
            status: mapApiStatusToDisplay(item.queData?.status),
            // Ensure queData exists even if null from API
            queData: item.queData || {
              aid: appointmentId,
              status: 'pending',
              time: 'No time set'
            },
            // Keep original nested structure for navigation
            user: item.user
          };
        });
        
        // Debug log to check transformed data structure
        if (transformedPatients.length > 0) {
          console.log("First transformed queue patient:", transformedPatients[0]);
          console.log("First patient queData:", transformedPatients[0].queData);
        }
        
        setPatients(transformedPatients);
      } catch (error) {
        console.error("Error fetching patient queue:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [date]);

  // Update filtering to work with both original API status and display status
  const filteredPatients = activeFilter === "all"
    ? patients
    : Array.isArray(patients)
    ? patients.filter((p) => {
        // Filter by display status for UI filters
        return p.status === activeFilter;
      })
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-teal-700">Loading patient queue...</p>
        </div>
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
          Today's Queue
        </h2>
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.map((patient, index) => (
              <PatientCard 
                key={patient.appointmentId || patient.queData?.aid || patient.user?.uid || index} 
                patient={patient} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-teal-700 text-lg">
              {patients.length === 0 
                ? "No patients scheduled for this date." 
                : "No patients found for this filter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayQue;