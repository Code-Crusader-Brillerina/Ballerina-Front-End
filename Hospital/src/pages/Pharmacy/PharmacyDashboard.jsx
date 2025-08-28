import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import MedicineStatusChart from "../../components/Pharmacy/PharmacyDashbord/MedicineStatusCharts";

// API Client
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/pharmacy',
  withCredentials: true,
});

const statusColors = {
  processing: "bg-yellow-100 text-yellow-800 border-yellow-30ax",
  sending: "bg-blue-100 text-blue-800 border-blue-300",
  received: "bg-green-100 text-green-800 border-green-300",
};

const SummaryCard = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl border-l-4 ${color} shadow-sm transition-all hover:shadow-md`}>
    <div className="text-sm font-medium opacity-80 capitalize">{title}</div>
    <div className="text-3xl font-bold mt-1">{value}</div>
  </div>
);

function PharmacyDashboard() {
  const [stats, setStats] = useState({ processing: 0, sending: 0, received: 0 });
  const [doctors, setDoctors] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all dashboard data concurrently
        const [statsRes, doctorsRes, inventoryRes] = await Promise.all([
          apiClient.get('/dashboard/stats'),
          apiClient.get('/doctors'),
          apiClient.get('/myinventory') // Get inventory list
        ]);

        setStats(statsRes.data.data || { processing: 0, sending: 0, received: 0 });
        setDoctors(doctorsRes.data.data || []);
        // Get the 5 most recently updated items for the table
        setInventory((inventoryRes.data.data || []).sort((a, b) => new Date(b.latestUpdate) - new Date(a.latestUpdate)).slice(0, 5));

      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = useMemo(() => [
    { name: "Processing", value: stats.processing || 0 },
    { name: "Sending", value: stats.sending || 0 },
    { name: "Received", value: stats.received || 0 },
  ], [stats]);

  if (isLoading) {
    return <div className="text-center p-10">Loading Dashboard...</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">Pharmacy Status Dashboard</h1>
            <p className="text-indigo-700 mt-1">Live overview of prescriptions and inventory</p>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
            <div className="text-sm text-indigo-600">Today</div>
            <div className="font-medium">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard title="Processing" value={stats.processing} color={statusColors.processing} />
          <SummaryCard title="Sending" value={stats.sending} color={statusColors.sending} />
          <SummaryCard title="Received" value={stats.received} color={statusColors.received} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <MedicineStatusChart data={chartData} />
          
          {/* Doctor List */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-indigo-900">Doctor List</h3>
              <div className="text-sm text-indigo-500 font-medium">{doctors.length} Specialists</div>
            </div>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <div key={doc.id} className="flex items-center p-3 rounded-lg border border-indigo-100 hover:bg-indigo-50 transition-colors">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-3">
                    {doc.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-indigo-600">{doc.specialization}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medicine List */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Recently Updated Inventory</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-indigo-700 border-b border-indigo-100">
                  <th className="pb-3 font-medium">Medicine</th>
                  <th className="pb-3 font-medium">Stock Status</th>
                  <th className="pb-3 font-medium text-right">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.inventoryId} className="border-b border-indigo-50 last:border-0 hover:bg-indigo-50">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        parseInt(item.availableState) === 0 ? statusColors.received :
                        parseInt(item.availableState) < 50 ? statusColors.processing :
                        statusColors.sending
                      }`}>
                        { parseInt(item.availableState) === 0 ? "Out of Stock" :
                          parseInt(item.availableState) < 50 ? "Low Stock" : "In Stock"
                        }
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">{item.availableState}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDashboard;