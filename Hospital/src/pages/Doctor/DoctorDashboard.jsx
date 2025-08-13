import React from "react";
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

  const dailyPatientsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Patients This Week",
        data: [12, 18, 10, 15, 20, 25, 22],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const todaysQueue = [
    { id: 1, name: "John Doe", gender: "Male", age: 28, color: "blue" },
    { id: 2, name: "Jane Smith", gender: "Female", age: 34, color: "green" },
    { id: 3, name: "Mike Johnson", gender: "Male", age: 45, color: "red" },
  ];

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>

      {/* Weekly Stats: 3 cards (Pending Patients card removed) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={FaUserInjured}
          title="Total Patients This Week"
          value="122"
          percentage="+8% from last week"
          color="green"
          onClick={() => window.location.assign("/patients/this-week")}
        />
        <MetricCard
          icon={FaUserCheck}
          title="Patients Today"
          value="18"
          percentage="+5% from yesterday"
          color="blue"
          onClick={() => window.location.assign("/patients/today")}
        />
        <MetricCard
          icon={FaUserClock}
          title="Patients in Queue"
          value="6"
          percentage=""
          color="red"
          onClick={() => window.location.assign("/patients/queue")}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Daily Patients This Week"
          value="122"
          percentage="+8%"
          subtitle="Day-by-day trend"
          color="blue"
          chart={<Line data={dailyPatientsData} />}
          navigateTo="/patients/this-week"
          showMenu={false} // Hide 3-dot menu here
        />
      </div>

      {/* Today's Queue Frame with 3-dot menu */}
      <div className="relative mt-8 p-6 border-2 border-gray-300 rounded-lg bg-gray-50">
        {/* Title and 3-dot menu */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Today's Queue</h2>
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
          {todaysQueue.map(({ id, name, gender, age, color }) => (
            <MetricCard
              key={id}
              icon={null}
              title={name}
              value={`${gender}, Age: ${age}`}
              percentage=""
              color={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
