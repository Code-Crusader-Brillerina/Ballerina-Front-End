import React, { useState, useEffect } from "react";
import AppointmentCard from "../../components/Doctor/DoctorAppointment/AppointmentCard";

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);
  
  // Today's date
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock data that matches your API structure
  const getMockData = () => ({
    success: true,
    data: [
      {
        aid: "001",
        did: "003",
        patient: {
          pid: "004",
          name: "Kavindha Perera",
          phoneNumber: "0765890788",
          city: "kurunegala", 
          profilepic: "http://",
          DOB: "1990.05.19",
          gender: "male"
        },
        date: "2025-08-10",
        time: "morning",
        status: "completed",
        description: "Annual Checkup",
        reports: ["report1.pdf"],
        paymentState: "paid"
      },
      {
        aid: "002",
        did: "003", 
        patient: {
          pid: "005",
          name: "Nethmi Fernando",
          phoneNumber: "0765890789",
          city: "colombo",
          profilepic: "http://",
          DOB: "1995.03.12", 
          gender: "female"
        },
        date: todayString,
        time: "afternoon", 
        status: "pending",
        description: "Flu Symptoms",
        reports: [],
        paymentState: "notPaid"
      },
      {
        aid: "003",
        did: "003",
        patient: {
          pid: "006", 
          name: "Sahan Wickramasinghe",
          phoneNumber: "0765890790",
          city: "galle",
          profilepic: "http://",
          DOB: "1983.11.25",
          gender: "male"
        },
        date: "2025-08-18",
        time: "evening",
        status: "scheduled", 
        description: "Cardiology Consultation",
        reports: ["ecg_report.jpg"],
        paymentState: "paid"
      },
      {
        aid: "004",
        did: "003",
        patient: {
          pid: "007",
          name: "Amaya Bandara", 
          phoneNumber: "0765890791",
          city: "kandy",
          profilepic: "http://",
          DOB: "1972.08.30",
          gender: "female"  
        },
        date: "2025-08-05",
        time: "morning",
        status: "completed",
        description: "Vaccination", 
        reports: [],
        paymentState: "paid"
      },
      {
        aid: "005",
        did: "003",
        patient: {
          pid: "008",
          name: "Chamari Atapattu",
          phoneNumber: "0765890792", 
          city: "negombo",
          profilepic: "http://",
          DOB: "1987.12.15",
          gender: "female"
        },
        date: todayString,
        time: "evening", 
        status: "scheduled",
        description: "Physical Therapy",
        reports: [],
        paymentState: "pending"
      }
    ]
  });

  // Data transformation function
  const transformApiDataToAppointmentFormat = (apiData) => {
    return apiData.map(appointment => {
      // Calculate age from DOB if available
      const calculateAge = (dob) => {
        if (!dob || dob === "") return "N/A";
        const birthDate = new Date(dob.replace(/\./g, '-'));
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age > 0 ? age : "N/A";
      };

      // Status mapping
      const statusMapping = {
        "pending": "scheduled",
        "completed": "completed",
        "compeleted": "completed", // Handle typo in API
        "scheduled": "scheduled",
        "canceled": "canceled"
      };

      // Time mapping
      const timeMapping = {
        "morning": "9:00 AM",
        "afternoon": "2:00 PM", 
        "evening": "6:00 PM"
      };

      // Generate avatar colors
      const avatarColors = [
        "bg-gradient-to-r from-purple-500 to-indigo-600",
        "bg-gradient-to-r from-pink-500 to-rose-500",
        "bg-gradient-to-r from-blue-500 to-cyan-500",
        "bg-gradient-to-r from-amber-500 to-orange-500",
        "bg-gradient-to-r from-emerald-500 to-teal-600",
        "bg-gradient-to-r from-violet-500 to-fuchsia-500"
      ];

      return {
        id: appointment.aid,
        patientName: appointment.patient.name || "Unknown Patient",
        gender: appointment.patient.gender || "Not specified",
        age: calculateAge(appointment.patient.DOB),
        date: appointment.date,
        time: timeMapping[appointment.time] || appointment.time,
        status: statusMapping[appointment.status] || "scheduled",
        reason: appointment.description || "General Consultation",
        avatarColor: avatarColors[Math.abs(appointment.aid.toString().charCodeAt(0)) % avatarColors.length],
        // Additional fields from API
        patientId: appointment.patient.pid,
        doctorId: appointment.did,
        phoneNumber: appointment.patient.phoneNumber,
        city: appointment.patient.city,
        profilePic: appointment.patient.profilepic,
        reports: appointment.reports || [],
        paymentState: appointment.paymentState
      };
    });
  };

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get token from localStorage
        const possibleTokenKeys = ['authToken', 'token', 'doctorToken', 'accessToken', 'jwt', 'bearerToken'];
        let token = null;
        
        for (const key of possibleTokenKeys) {
          const storedToken = localStorage.getItem(key);
          if (storedToken && storedToken !== 'null' && storedToken !== 'undefined') {
            token = storedToken;
            break;
          }
        }

        // Try API call with different authentication methods
        const authMethods = token ? [
          { headers: { 'Authorization': `Bearer ${token}` } },
          { headers: { 'Authorization': token } },
          { headers: { 'token': token } },
          { headers: { 'x-auth-token': token } }
        ] : [{ headers: {} }]; // Try without auth first

        let apiSuccess = false;

        for (const method of authMethods) {
          try {
            const response = await fetch('http://localhost:8080/doctor/getAllAppoinments', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                ...method.headers
              },
              credentials: 'include'
            });

            if (response.ok) {
              const result = await response.json();
              if (result.success && result.data) {
                const transformedData = transformApiDataToAppointmentFormat(result.data);
                setAppointments(transformedData);
                setUsingMockData(false);
                apiSuccess = true;
                break;
              }
            }
          } catch (apiError) {
            // Continue to next auth method
            continue;
          }
        }

        // If API failed, use mock data
        if (!apiSuccess) {
          console.warn('API call failed, using mock data for development');
          const mockResponse = getMockData();
          const transformedData = transformApiDataToAppointmentFormat(mockResponse.data);
          setAppointments(transformedData);
          setUsingMockData(true);
        }

      } catch (err) {
        console.error('Error in fetchAppointments:', err);
        // Fallback to mock data on any error
        const mockResponse = getMockData();
        const transformedData = transformApiDataToAppointmentFormat(mockResponse.data);
        setAppointments(transformedData);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [todayString]);

  // Separate appointments by date
  const pastAppointments = appointments.filter((a) => a.date < todayString);
  const presentAppointments = appointments.filter((a) => a.date === todayString);
  const futureAppointments = appointments.filter((a) => a.date > todayString);

  const [activeTab, setActiveTab] = useState("today");

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Mock Data Warning */}
        {usingMockData && (
          <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-yellow-800 font-medium">Using Demo Data</p>
                <p className="text-yellow-700 text-sm">API authentication required. To get real data: login and refresh, or add token to localStorage.</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              Appointment Management
            </h1>
            <div className="bg-white rounded-xl shadow-lg py-2 px-6 inline-block">
              <p className="text-gray-600 font-medium">{formattedToday}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Total Appointments</h3>
            <p className="text-3xl font-bold mt-2">{appointments.length}</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Completed</h3>
            <p className="text-3xl font-bold mt-2">
              {appointments.filter(a => a.status === 'completed').length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Scheduled</h3>
            <p className="text-3xl font-bold mt-2">
              {appointments.filter(a => a.status === 'scheduled').length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Today</h3>
            <p className="text-3xl font-bold mt-2">{presentAppointments.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab("today")} 
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "today" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Today's Appointments ({presentAppointments.length})
            </button>
            <button 
              onClick={() => setActiveTab("upcoming")} 
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "upcoming" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Upcoming ({futureAppointments.length})
            </button>
            <button 
              onClick={() => setActiveTab("past")} 
              className={`px-6 py-4 font-medium text-sm transition-colors ${activeTab === "past" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              History ({pastAppointments.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "today" && (
              presentAppointments.length > 0
                ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {presentAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
                  </div>
                : <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v4M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No appointments scheduled for today</p>
                  </div>
            )}
            {activeTab === "upcoming" && (
              futureAppointments.length > 0
                ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {futureAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
                  </div>
                : <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No upcoming appointments</p>
                  </div>
            )}
            {activeTab === "past" && (
              pastAppointments.length > 0
                ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
                  </div>
                : <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No appointment history</p>
                  </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© 2025 MediCare Clinic. All appointments are confidential.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;