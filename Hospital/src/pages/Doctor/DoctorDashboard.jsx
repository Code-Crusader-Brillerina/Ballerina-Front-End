import React, { useState, useEffect } from "react";
import { FaUserInjured, FaUserCheck, FaUserClock } from "react-icons/fa";
import ChartCard from "../../components/Doctor/DoctorDashboard/ChartCard";
import MetricCard from "../../components/Doctor/DoctorDashboard/MetricCard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // State for API data
  const [appointments, setAppointments] = useState([]);
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queueLoading, setQueueLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queueError, setQueueError] = useState(null);
  const [authError, setAuthError] = useState(false);

  // State for dashboard metrics
  const [dashboardData, setDashboardData] = useState({
    totalPatientsThisWeek: 0,
    patientsToday: 0,
    patientsInQueue: 0,
    dailyPatients: [0, 0, 0, 0, 0, 0, 0],
    dailyLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    todaysQueue: [],
  });

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Function to get day name
  const getDayName = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  // Function to format date for display
  const formatDateOfBirth = (dobString) => {
    if (!dobString) return "N/A";
    
    try {
      const date = new Date(dobString);
      if (isNaN(date.getTime())) return "N/A";
      
      // Format as MM/DD/YYYY or DD/MM/YYYY based on your preference
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return "N/A";
    }
  };

  // Function to calculate age from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return "N/A";
    
    try {
      const dob = new Date(dobString);
      if (isNaN(dob.getTime())) return "N/A";
      
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age.toString();
    } catch {
      return "N/A";
    }
  };

  // Function to get auth headers
  const getAuthHeaders = () => {
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("token");

    const headers = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  };

  // Fetch appointments data
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const headers = getAuthHeaders();
      console.log("Making appointments request with headers:", headers);

      const response = await fetch(
        "http://localhost:8080/doctor/getAllAppoinments",
        {
          method: "GET",
          headers: headers,
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError(true);
          throw new Error(
            "Authentication required. Please check your login credentials."
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received appointments data:", data);
      setAppointments(data);
      processAppointmentData(data);
      setError(null);
      setAuthError(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message);

      // Fallback data for appointments with correct day alignment
      const fallbackData = generateFallbackWeekData();
      setDashboardData(prev => ({
        ...prev,
        totalPatientsThisWeek: 122,
        patientsToday: 18,
        dailyPatients: fallbackData.dailyPatients,
        dailyLabels: fallbackData.dailyLabels,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Generate fallback data with correct day alignment
  const generateFallbackWeekData = () => {
    const today = new Date();
    const dailyLabels = [];
    const dailyPatients = [];
    
    // Generate last 7 days including today
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      dailyLabels.push(getDayName(date));
      // Generate some sample data
      dailyPatients.push(Math.floor(Math.random() * 20) + 10);
    }
    
    return { dailyLabels, dailyPatients };
  };

  // Fetch queue data
  const fetchQueueData = async () => {
    try {
      setQueueLoading(true);

      const headers = getAuthHeaders();
      console.log("Making queue request with headers:", headers);

      const response = await fetch("http://localhost:8080/doctor/getQueue", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ 
          date: getTodayDate(),
          time: "morning"
        }),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError(true);
          throw new Error(
            "Authentication required for queue data. Please check your login credentials."
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received queue data:", data);
      setQueueData(data);
      processQueueData(data);
      setQueueError(null);
    } catch (err) {
      console.error("Error fetching queue data:", err);
      setQueueError(err.message);

      // Fallback queue data for demonstration
      const fallbackQueue = [
        {
          id: 1,
          patientName: "John Doe",
          dateOfBirth: "1990-05-15",
          gender: "Male",
          appointmentTime: "09:00 AM"
        }
      ];
      
      setDashboardData(prev => ({
        ...prev,
        patientsInQueue: fallbackQueue.length,
        todaysQueue: fallbackQueue.map((patient, index) => {
          const colors = ["blue", "green", "red", "yellow", "purple", "orange"];
          return {
            id: patient.id,
            name: patient.patientName,
            dob: formatDateOfBirth(patient.dateOfBirth),
            age: calculateAge(patient.dateOfBirth),
            gender: patient.gender,
            color: colors[index % colors.length],
            time: patient.appointmentTime,
          };
        }),
      }));
    } finally {
      setQueueLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchQueueData();
  }, []);

  const processAppointmentData = (data) => {
    console.log("Processing appointment data:", data);

    let appointmentsData;

    if (Array.isArray(data)) {
      appointmentsData = data;
    } else if (data && Array.isArray(data.appointments)) {
      appointmentsData = data.appointments;
    } else if (data && Array.isArray(data.data)) {
      appointmentsData = data.data;
    } else if (data && Array.isArray(data.results)) {
      appointmentsData = data.results;
    } else {
      console.warn("Unexpected appointment data structure:", data);
      appointmentsData = [];
    }

    if (!Array.isArray(appointmentsData) || appointmentsData.length === 0) {
      const fallbackData = generateFallbackWeekData();
      setDashboardData(prev => ({
        ...prev,
        totalPatientsThisWeek: 0,
        patientsToday: 0,
        dailyPatients: fallbackData.dailyPatients,
        dailyLabels: fallbackData.dailyLabels,
      }));
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const todayAppointments = appointmentsData.filter((appointment) => {
      const dateString =
        appointment.appointmentDate ||
        appointment.date ||
        appointment.appointmentDateTime ||
        appointment.createdAt ||
        appointment.scheduled_date;

      if (!dateString) return false;

      try {
        const appointmentDate = new Date(dateString);
        return appointmentDate.toDateString() === today.toDateString();
      } catch {
        return false;
      }
    });

    const thisWeekAppointments = appointmentsData.filter((appointment) => {
      const dateString =
        appointment.appointmentDate ||
        appointment.date ||
        appointment.appointmentDateTime ||
        appointment.createdAt ||
        appointment.scheduled_date;

      if (!dateString) return false;

      try {
        const appointmentDate = new Date(dateString);
        return appointmentDate >= oneWeekAgo && appointmentDate <= now;
      } catch {
        return false;
      }
    });

    // Create arrays for the last 7 days including today
    const dailyPatients = [];
    const dailyLabels = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      dailyLabels.push(getDayName(date));
      
      const dayAppointments = appointmentsData.filter((appointment) => {
        const dateString =
          appointment.appointmentDate ||
          appointment.date ||
          appointment.appointmentDateTime ||
          appointment.createdAt ||
          appointment.scheduled_date;

        if (!dateString) return false;

        try {
          const appointmentDate = new Date(dateString);
          return appointmentDate.toDateString() === date.toDateString();
        } catch {
          return false;
        }
      });
      dailyPatients.push(dayAppointments.length);
    }

    setDashboardData(prev => ({
      ...prev,
      totalPatientsThisWeek: thisWeekAppointments.length,
      patientsToday: todayAppointments.length,
      dailyPatients,
      dailyLabels,
    }));
  };

  const processQueueData = (data) => {
    console.log("Processing queue data:", data);

    let queueArray;

    // Handle different possible data structures
    if (Array.isArray(data)) {
      queueArray = data;
    } else if (data && Array.isArray(data.queue)) {
      queueArray = data.queue;
    } else if (data && Array.isArray(data.data)) {
      queueArray = data.data;
    } else if (data && Array.isArray(data.patients)) {
      queueArray = data.patients;
    } else if (data && Array.isArray(data.results)) {
      queueArray = data.results;
    } else {
      console.warn("Unexpected queue data structure:", data);
      queueArray = [];
    }

    if (!Array.isArray(queueArray)) {
      queueArray = [];
    }

    const todaysQueue = queueArray.slice(0, 6).map((item, index) => {
      const colors = ["blue", "green", "red", "yellow", "purple", "orange"];
      
      // Extract data from nested structure
      const appointment = item.appointment || {};
      const patient = item.patient || {};
      const user = item.user || {};
      
      // Handle DOB - your API uses "DOB" in patient object with format "YYYY.MM.DD"
      const dobString = patient.DOB || 
                       patient.dateOfBirth || 
                       patient.dob || 
                       patient.birth_date || 
                       patient.birthDate ||
                       patient.patient_dob ||
                       patient.date_of_birth;

      // Convert DOB format from "YYYY.MM.DD" to standard date format
      const formatDobForCalculation = (dob) => {
        if (!dob) return null;
        if (dob.includes('.')) {
          return dob.replace(/\./g, '-'); // Convert "2003.05.19" to "2003-05-19"
        }
        return dob;
      };

      const standardDob = formatDobForCalculation(dobString);

      // Extract name - prioritize user.username, then create fallback
      const patientName = user.username || 
                         patient.patientName ||
                         patient.name ||
                         patient.patient_name ||
                         (patient.firstName ? `${patient.firstName} ${patient.lastName || ''}`.trim() : '') ||
                         `Patient ${index + 1}`;

      // Calculate age from DOB
      const calculatedAge = standardDob ? calculateAge(standardDob) : (patient.age || patient.patient_age || "N/A");

      // Extract appointment time and format it
      const appointmentTime = appointment.time || 
                             patient.appointmentTime ||
                             patient.time ||
                             patient.scheduled_time ||
                             patient.queueTime ||
                             "N/A";

      // Format time for display
      const formatTime = (timeStr) => {
        if (!timeStr || timeStr === "N/A") return "N/A";
        if (timeStr === "morning") return "Morning Session";
        if (timeStr === "evening") return "Evening Session";
        return timeStr;
      };

      return {
        id: appointment.aid || patient.pid || user.uid || index + 1,
        name: patientName,
        dob: formatDateOfBirth(standardDob),
        age: calculatedAge,
        gender: patient.gender || patient.sex || "N/A",
        color: colors[index % colors.length],
        time: formatTime(appointmentTime),
        appointmentNumber: appointment.number || index + 1,
        status: appointment.status || "pending",
        email: user.email || "N/A",
        phone: user.phoneNumber || "N/A",
      };
    });

    console.log("Processed queue data:", todaysQueue);

    setDashboardData(prev => ({
      ...prev,
      patientsInQueue: queueArray.length,
      todaysQueue,
    }));
  };

  const dailyPatientsData = {
    labels: dashboardData.dailyLabels,
    datasets: [
      {
        label: "Patients This Week",
        data: dashboardData.dailyPatients,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  if (loading && queueLoading) {
    return (
      <div className="space-y-8 p-4">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>

      {/* Error messages */}
      {(error || queueError) && (
        <div className="space-y-2">
          {error && (
            <div
              className={`border px-4 py-3 rounded ${
                authError
                  ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                  : "bg-red-100 border-red-400 text-red-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <strong>
                    {authError ? "Authentication Required (Appointments):" : "Warning (Appointments):"}
                  </strong>
                  {authError ? (
                    <div>
                      <p>Unable to authenticate with the server. Please:</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        <li>Check if you're logged in</li>
                        <li>Verify your authentication token</li>
                        <li>Contact your system administrator if the problem persists</li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      Could not fetch live appointment data. Showing sample data.
                      <br />
                      <small>Error: {error}</small>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {queueError && (
            <div className="bg-orange-100 border-orange-400 text-orange-700 border px-4 py-3 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <strong>Warning (Queue Data):</strong>
                  Could not fetch live queue data. Showing sample data.
                  <br />
                  <small>Error: {queueError}</small>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={FaUserInjured}
          title="Total Patients This Week"
          value={dashboardData.totalPatientsThisWeek.toString()}
          percentage={error ? "+8% from last week" : ""}
          color="green"
          onClick={() => window.location.assign("/patients/this-week")}
        />
        <MetricCard
          icon={FaUserCheck}
          title="Patients Today"
          value={dashboardData.patientsToday.toString()}
          percentage={error ? "+5% from yesterday" : ""}
          color="blue"
          onClick={() => window.location.assign("/patients/today")}
        />
        <MetricCard
          icon={FaUserClock}
          title="Patients in Queue"
          value={dashboardData.patientsInQueue.toString()}
          percentage=""
          color="red"
          onClick={() => window.location.assign("/patients/queue")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Daily Patients This Week"
          value={dashboardData.totalPatientsThisWeek.toString()}
          percentage={error ? "+8%" : ""}
          subtitle="Day-by-day trend"
          color="blue"
          chart={<Line data={dailyPatientsData} />}
          navigateTo="/patients/this-week"
          showMenu={false}
        />
      </div>

      <div className="relative mt-8 p-6 border-2 border-gray-300 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Today's Queue ({dashboardData.todaysQueue.length} patients)
            {queueLoading && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
          </h2>
          <button
            aria-label="Open queue details"
            onClick={() => navigate("/doctor/today-que")}
            className="p-1 rounded hover:bg-gray-200"
          >
            <svg
              className="w-6 h-6 text-gray-600 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.todaysQueue.length > 0 ? (
            dashboardData.todaysQueue.map(
              ({ id, name, dob, gender, age, color, time, appointmentNumber, status, email, phone }) => (
                <div key={id} className={`bg-white rounded-lg shadow-md p-4 border-l-4 border-${color}-500 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          #{appointmentNumber}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span className="font-medium">DOB:</span>
                          <span>{dob}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Age:</span>
                          <span>{age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Gender:</span>
                          <span className="capitalize">{gender}</span>
                        </div>
                        {time && time !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="font-medium">Session:</span>
                            <span className="text-blue-600 font-medium">{time}</span>
                          </div>
                        )}
                        {email && email !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span className="text-xs text-gray-500 truncate" title={email}>{email}</span>
                          </div>
                        )}
                        {phone && phone !== "N/A" && (
                          <div className="flex justify-between">
                            <span className="font-medium">Phone:</span>
                            <span className="text-xs text-gray-500">{phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-8">
              {queueLoading ? "Loading queue data..." : queueError ? "Unable to load queue data" : "No patients in queue today"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;