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
    todaysQueue: [],
  });

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
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

      // Fallback data for appointments
      setDashboardData(prev => ({
        ...prev,
        totalPatientsThisWeek: 122,
        patientsToday: 18,
        dailyPatients: [12, 18, 10, 15, 20, 25, 22],
      }));
    } finally {
      setLoading(false);
    }
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
          date: getTodayDate() 
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

      // Fallback queue data
      const fallbackQueue = [
        { id: 1, name: "John Doe", gender: "Male", age: 28, color: "blue", time: "9:00 AM" },
        { id: 2, name: "Jane Smith", gender: "Female", age: 34, color: "green", time: "9:30 AM" },
        { id: 3, name: "Mike Johnson", gender: "Male", age: 45, color: "red", time: "10:00 AM" },
      ];
      
      setDashboardData(prev => ({
        ...prev,
        patientsInQueue: fallbackQueue.length,
        todaysQueue: fallbackQueue,
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
      setDashboardData(prev => ({
        ...prev,
        totalPatientsThisWeek: 0,
        patientsToday: 0,
        dailyPatients: [0, 0, 0, 0, 0, 0, 0],
      }));
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

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

    const dailyPatients = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
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

    const todaysQueue = queueArray.slice(0, 6).map((patient, index) => {
      const colors = ["blue", "green", "red", "yellow", "purple", "orange"];
      return {
        id: patient.id || patient._id || patient.patientId || index + 1,
        name:
          patient.patientName ||
          patient.name ||
          patient.patient_name ||
          patient.firstName + " " + (patient.lastName || "") ||
          `Patient ${index + 1}`,
        gender: patient.gender || patient.sex || "N/A",
        age: patient.age || patient.patient_age || "N/A",
        color: colors[index % colors.length],
        time:
          patient.appointmentTime ||
          patient.time ||
          patient.scheduled_time ||
          patient.queueTime ||
          "N/A",
      };
    });

    setDashboardData(prev => ({
      ...prev,
      patientsInQueue: queueArray.length,
      todaysQueue,
    }));
  };

  const dailyPatientsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardData.todaysQueue.length > 0 ? (
            dashboardData.todaysQueue.map(
              ({ id, name, gender, age, color, time }) => (
                <MetricCard
                  key={id}
                  icon={null}
                  title={name}
                  value={`${gender}, Age: ${age}`}
                  percentage={time && time !== "N/A" ? `Time: ${time}` : ""}
                  color={color}
                />
              )
            )
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-8">
              {queueLoading ? "Loading queue data..." : "No patients in queue today"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;