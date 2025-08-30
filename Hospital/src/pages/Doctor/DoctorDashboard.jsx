import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from "chart.js";
import { 
  Users, 
  UserCheck, 
  Clock,
  DollarSign,
  TrendingUp,
  MoreVertical,
  Activity,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// API Client for Doctor routes
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/doctor',
  withCredentials: true,
});

// ===================================================================================
//  REUSABLE COMPONENTS (Styled like PharmacyDashboard)
// ===================================================================================

const MetricCard = ({ icon: Icon, title, value, percentage, color, trends }) => {
  const isPositive = percentage >= 0;
  const textColorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColorClass = isPositive ? 'bg-green-100' : 'bg-red-100';
  const iconBgClass = `bg-${color}-100`;
  const iconColorClass = `text-${color}-600`;
  
  const maxValue = trends && trends.length > 0 ? Math.max(...trends, 1) : 1;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
          {percentage !== null && (
            <div className="flex items-center mt-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${bgColorClass} ${textColorClass} flex items-center`}>
                {isPositive ? <ArrowUp size={10} className="mr-1" /> : <ArrowDown size={10} className="mr-1" />}
                {Math.abs(percentage)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgClass} ${iconColorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {trends && trends.length > 0 && (
        <div className="mt-6">
          <div className="h-[50px] flex items-end space-x-1">
            {trends.map((value, index) => (
              <div 
                key={index}
                className={`flex-1 bg-gradient-to-t from-${color}-500 to-${color}-400 rounded-t transition-all duration-300 hover:opacity-80`}
                style={{ height: `${Math.max(10, (value / maxValue) * 100)}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>7d ago</span>
            <span>Today</span>
          </div>
        </div>
      )}
    </div>
  );
};

const LineChartCard = ({ chartData, title }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={18} />
      </button>
    </div>
    <div className="h-64">
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  </div>
);

// ===================================================================================
//  MAIN DASHBOARD COMPONENT
// ===================================================================================
const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({ patientsToday: 0, patientsThisWeek: 0, queueCount: 0 });
  const [revenue, setRevenue] = useState({ completed: 0, pending: 0 });
  const [queueList, setQueueList] = useState([]);
  const [dailyTrends, setDailyTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getCurrentTimeSlot = () => new Date().getHours() < 12 ? "morning" : "evening";

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queuePayload = { date: getTodayDate(), time: getCurrentTimeSlot() };

      const [appointmentsRes, queueRes, completedRes, pendingRes] = await Promise.all([
        apiClient.get('/getAllAppoinments'),
        apiClient.post('/getQueue', queuePayload),
        apiClient.get('/financials/completed'),
        apiClient.get('/financials/pending'),
      ]);

      // Process Appointments & Trends
      const appointments = appointmentsRes.data.data || [];
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
      oneWeekAgo.setHours(0, 0, 0, 0);

      const thisWeekAppointments = appointments.filter(app => new Date(app.date) >= oneWeekAgo);
      const patientsToday = appointments.filter(app => new Date(app.date).toDateString() === today.toDateString()).length;
      
      const trends = Array(7).fill(0).map((_, i) => {
        const date = new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
        return appointments.filter(app => new Date(app.date).toDateString() === date.toDateString()).length;
      });
      setDailyTrends(trends);

      setStats({
        patientsToday,
        patientsThisWeek: thisWeekAppointments.length,
        queueCount: (queueRes.data.data || []).length,
      });

      // Process Revenue
      setRevenue({
        completed: completedRes.data.data?.grandTotal || 0,
        pending: pendingRes.data.data?.grandTotal || 0,
      });

      // Process Queue List for Table
      const queueData = (queueRes.data.data || []).map(item => ({
        id: item.appointment?.aid || item.patient?.pid,
        name: item.user?.username || 'N/A',
        time: item.appointment?.time,
        status: item.appointment?.status,
        number: item.appointment?.number,
      })).sort((a, b) => a.number - b.number);
      setQueueList(queueData);

    } catch (err) {
      setError("Failed to load dashboard data. Please check connection and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dailyPatientsChartData = useMemo(() => {
    const labels = Array(7).fill(0).map((_, i) => {
      const date = new Date(new Date().getTime() - (6 - i) * 24 * 60 * 60 * 1000);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    return {
      labels,
      datasets: [{
        label: "Patients per Day",
        data: dailyTrends,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      }],
    };
  }, [dailyTrends]);

  if (isLoading) return <div className="p-8 text-center">Loading Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor's Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your real-time overview.</p>
          </div>
          <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Activity size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={Users} 
          title="Patients This Week" 
          value={stats.patientsThisWeek}
          percentage={15} // Placeholder
          color="blue"
          trends={dailyTrends}
        />
        <MetricCard 
          icon={UserCheck} 
          title="Patients Today" 
          value={stats.patientsToday} 
          percentage={-5} // Placeholder
          color="green"
        />
        <MetricCard 
          icon={Clock} 
          title="In Queue Now" 
          value={stats.queueCount} 
          percentage={null}
          color="amber"
        />
        <MetricCard 
          icon={DollarSign} 
          title="Completed Revenue" 
          value={`$${revenue.completed.toFixed(2)}`}
          percentage={8} // Placeholder
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
            <LineChartCard 
                chartData={dailyPatientsChartData}
                title="Weekly Patient Volume"
            />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h2>
            <div className="space-y-6">
                <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4"><DollarSign className="text-purple-600" /></div>
                    <div>
                        <p className="text-gray-500 text-sm">Completed Revenue</p>
                        <p className="text-2xl font-bold text-gray-800">${revenue.completed.toFixed(2)}</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg mr-4"><TrendingUp className="text-yellow-600" /></div>
                    <div>
                        <p className="text-gray-500 text-sm">Pending Revenue</p>
                        <p className="text-2xl font-bold text-gray-800">${revenue.pending.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <button className="mt-auto w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors text-sm font-semibold">
                View Detailed Report
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Queue</h2>
            <button onClick={() => navigate('/doctor/today-que')} className="text-sm font-medium text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-500">
                        <th className="py-2 px-3 font-medium">#</th>
                        <th className="py-2 px-3 font-medium">Patient Name</th>
                        <th className="py-2 px-3 font-medium">Session</th>
                        <th className="py-2 px-3 font-medium">Status</th>
                        <th className="py-2 px-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {queueList.length > 0 ? queueList.slice(0, 5).map(p => (
                        <tr key={p.id} className="hover:bg-gray-50">
                            <td className="py-3 px-3 font-semibold text-gray-600">{p.number}</td>
                            <td className="py-3 px-3 font-medium text-gray-800">{p.name}</td>
                            <td className="py-3 px-3 text-gray-600 capitalize">{p.time}</td>
                            <td className="py-3 px-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                                    p.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                    p.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>{p.status}</span>
                            </td>
                            <td className="py-3 px-3 text-right">
                                <button className="text-blue-600 hover:text-blue-800 flex items-center justify-end w-full">
                                    <Eye size={16} className="mr-1" /> View
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className="text-center py-8 text-gray-500">No patients in the queue right now.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;