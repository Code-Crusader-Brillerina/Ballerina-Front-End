import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Pill,
  TrendingUp,
  MoreVertical,
  Activity,
  ArrowUp,
  ArrowDown,
  Eye,
  Clock,
  CheckCircle,
  DollarSign,
  Package,
  AlertTriangle
} from 'lucide-react';

// API Client
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/pharmacy',
  withCredentials: true,
});

// ===================================================================================
//  REUSABLE COMPONENTS (Styled like AdminDashboard)
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
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
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

const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={18} />
        </button>
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-600 truncate">{item.label}</div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-100 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 text-sm font-semibold text-gray-800 text-right">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ===================================================================================
//  MAIN DASHBOARD COMPONENT
// ===================================================================================
function PharmacyDashboard() {
  const [stats, setStats] = useState({ processing: 0, sending: 0, received: 0 });
  const [revenue, setRevenue] = useState({ delivered: 0, pending: 0 });
  const [inventory, setInventory] = useState({ lowStockCount: 0, byForm: [] });
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsRes, inventoryRes, deliveredRes, pendingRes, prescriptionsRes] = await Promise.all([
        apiClient.get('/dashboard/stats'),
        apiClient.get('/myinventory'),
        apiClient.get('/financials/delivered'),
        apiClient.get('/financials/pending'),
        apiClient.get('/prescriptions')
      ]);

      setStats(statsRes.data.data || { processing: 0, sending: 0, received: 0 });
      setRevenue({
        delivered: deliveredRes.data.data?.grandTotal || 0,
        pending: pendingRes.data.data?.grandTotal || 0,
      });
      setPrescriptions(prescriptionsRes.data.data || []);
      
      const inventoryData = inventoryRes.data.data || [];
      const lowStockCount = inventoryData.filter(item => parseInt(item.availableState, 10) < 50 && parseInt(item.availableState, 10) > 0).length;
      
      const dataByForm = inventoryData.reduce((acc, med) => {
        if (med.form && med.form !== "-") {
          acc[med.form] = (acc[med.form] || 0) + parseInt(med.availableState);
        }
        return acc;
      }, {});

      setInventory({ 
        lowStockCount, 
        byForm: Object.entries(dataByForm).map(([label, value]) => ({ label, value })) 
      });

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

  const monthlyPrescriptionTrends = useMemo(() => {
    if (!prescriptions || prescriptions.length === 0) return Array(12).fill(0);
    const monthCounts = Array(12).fill(0);
    const currentYear = new Date().getFullYear();
    prescriptions.forEach(p => {
        const date = new Date(p.dateTime);
        if (date.getFullYear() === currentYear) {
            monthCounts[date.getMonth()]++;
        }
    });
    return monthCounts;
  }, [prescriptions]);

  const calculatePercentageChange = (monthlyData) => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentValue = monthlyData[currentMonth] || 0;
    const lastValue = monthlyData[lastMonth] || 0;
    if (lastValue === 0) return currentValue > 0 ? 100 : 0;
    return Math.round(((currentValue - lastValue) / lastValue) * 100);
  };
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time overview of your pharmacy operations</p>
          </div>
          <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Activity size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={DollarSign} 
          title="Total Revenue" 
          value={`LKR ${revenue.delivered.toLocaleString()}`}
          percentage={12} // Note: Placeholder percentage
          color="green"
          trends={[10, 20, 15, 30, 25, 40, 50]} // Note: Placeholder trends
        />
        <MetricCard 
          icon={Clock} 
          title="Pending Orders" 
          value={stats.processing + stats.sending} 
          percentage={-3} // Note: Placeholder percentage
          color="amber"
          trends={[30, 25, 28, 22, 25, 20, 18]} // Note: Placeholder trends
        />
        <MetricCard 
          icon={CheckCircle} 
          title="Completed Orders" 
          value={stats.received} 
          percentage={8} // Note: Placeholder percentage
          color="blue"
          trends={[40, 45, 50, 48, 55, 60, 62]} // Note: Placeholder trends
        />
        <MetricCard 
          icon={AlertTriangle} 
          title="Low Stock Items" 
          value={inventory.lowStockCount}
          percentage={null} // No percentage for this one
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BarChart 
          data={inventory.byForm}
          title="Stock Quantity by Form"
        />
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
           <h2 className="text-lg font-semibold text-gray-800 mb-6">Monthly Prescription Volume</h2>
           <div className="grid grid-cols-6 gap-2">
            {monthlyPrescriptionTrends.map((count, index) => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const isCurrentMonth = index === new Date().getMonth();
                return (
                  <div key={index} className={`text-center p-3 rounded-lg ${isCurrentMonth ? 'bg-blue-100 border-2 border-blue-200' : 'bg-gray-50'}`}>
                    <div className={`text-xl font-bold ${isCurrentMonth ? 'text-blue-600' : 'text-gray-800'}`}>{count}</div>
                    <div className={`text-sm ${isCurrentMonth ? 'text-blue-500' : 'text-gray-500'}`}>{monthNames[index]}</div>
                  </div>
                );
            })}
           </div>
        </div>
      </div>

       {/* Detailed Prescriptions Table */}
       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Prescriptions</h2>
            <Link to="/pharmacy/prescription" className="text-sm font-medium text-blue-600 hover:underline">View All</Link>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-500">
                        <th className="py-2 px-3 font-medium">ID</th>
                        <th className="py-2 px-3 font-medium">Patient</th>
                        <th className="py-2 px-3 font-medium">Date</th>
                        <th className="py-2 px-3 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {prescriptions.slice(0, 5).map(p => (
                        <tr key={p.preId}>
                            <td className="py-3 px-3 font-mono text-gray-600">#{p.preId}</td>
                            <td className="py-3 px-3 font-medium text-gray-800">{p.patientInfo?.username}</td>
                            <td className="py-3 px-3 text-gray-600">{p.dateTime}</td>
                            <td className="py-3 px-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${ p.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }`}>{p.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
       </div>
    </div>
  );
};

export default PharmacyDashboard;