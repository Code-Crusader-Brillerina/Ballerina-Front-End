import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import MedicineStatusChart from "../../components/Pharmacy/PharmacyDashbord/MedicineStatusCharts";
// ADDED: Import new icons for the revenue section
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

// API Client
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/pharmacy',
  withCredentials: true,
});

const statusColors = {
  processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
  sending: "bg-blue-100 text-blue-800 border-blue-300",
  received: "bg-green-100 text-green-800 border-green-300",
  inStock: "bg-green-100 text-green-800",
  lowStock: "bg-yellow-100 text-yellow-800",
  outOfStock: "bg-red-100 text-red-800",
};

const SummaryCard = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl border-l-4 ${color} shadow-sm transition-all hover:shadow-md`}>
    <div className="text-sm font-medium opacity-80 capitalize">{title}</div>
    <div className="text-3xl font-bold mt-1">{value}</div>
  </div>
);

// ADDED: New component for displaying revenue figures
const RevenueCard = ({ title, value, icon, colorClass }) => (
  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border">
    <div className={`p-3 rounded-lg mr-4 ${colorClass.bg}`}>
      {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass.icon}` })}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">
        LKR {value.toLocaleString()}
      </p>
    </div>
  </div>
);

function PharmacyDashboard() {
  const [stats, setStats] = useState({ processing: 0, sending: 0, received: 0 });
  // ADDED: New state for revenue data
  const [revenue, setRevenue] = useState({ delivered: 0, pending: 0 });
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all dashboard data concurrently
        // UPDATED: Added new financial endpoints and removed non-existent '/doctors' endpoint
        const [statsRes, inventoryRes, deliveredRes, pendingRes] = await Promise.all([
          apiClient.get('/dashboard/stats'),
          apiClient.get('/myinventory'),
          apiClient.get('/financials/delivered'),
          apiClient.get('/financials/pending')
        ]);

        setStats(statsRes.data.data || { processing: 0, sending: 0, received: 0 });
        
        // ADDED: Set revenue state from the new API responses
        setRevenue({
          delivered: deliveredRes.data.data?.grandTotal || 0,
          pending: pendingRes.data.data?.grandTotal || 0,
        });

        // Get the 5 most recently updated items for the table
        const sortedInventory = (inventoryRes.data.data || [])
          .sort((a, b) => new Date(b.latestUpdate) - new Date(a.latestUpdate))
          .slice(0, 5);
        setInventory(sortedInventory);

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

  const getStockStatus = (stock) => {
    const stockCount = parseInt(stock, 10);
    if (stockCount === 0) return { text: "Out of Stock", color: statusColors.outOfStock };
    if (stockCount < 50) return { text: "Low Stock", color: statusColors.lowStock };
    return { text: "In Stock", color: statusColors.inStock };
  };

  if (isLoading) {
    return <div className="text-center p-10 font-medium text-gray-600">Loading Dashboard...</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-600 font-medium">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">Pharmacy Status Dashboard</h1>
            <p className="text-indigo-700 mt-1">Live overview of prescriptions and inventory</p>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border">
            <div className="text-sm text-indigo-600">Today</div>
            <div className="font-medium">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard title="Processing" value={stats.processing} color={statusColors.processing} />
          <SummaryCard title="Sending" value={stats.sending} color={statusColors.sending} />
          <SummaryCard title="Received" value={stats.received} color={statusColors.received} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Chart (takes 2/5 width) */}
          <div className="lg:col-span-2">
            <MedicineStatusChart data={chartData} />
          </div>
          
          {/* Revenue Section (takes 3/5 width) */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-5 border">
            <h3 className="font-semibold text-lg text-indigo-900 mb-4">Revenue Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RevenueCard 
                title="Completed Revenue" 
                value={revenue.delivered} 
                icon={<CheckCircle />} 
                colorClass={{bg: "bg-green-100", icon: "text-green-600"}}
              />
              <RevenueCard 
                title="Pending Revenue" 
                value={revenue.pending} 
                icon={<Clock />} 
                colorClass={{bg: "bg-yellow-100", icon: "text-yellow-600"}}
              />
              <RevenueCard 
                title="Total Projected" 
                value={revenue.delivered + revenue.pending} 
                icon={<TrendingUp />} 
                colorClass={{bg: "bg-indigo-100", icon: "text-indigo-600"}}
              />
            </div>
          </div>
        </div>

        {/* Recently Updated Inventory Table */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Recently Updated Inventory</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-indigo-800/70 border-b border-indigo-100">
                  <th className="p-3 font-medium">Medicine</th>
                  <th className="p-3 font-medium">Stock Status</th>
                  <th className="p-3 font-medium text-right">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length > 0 ? inventory.map((item) => {
                  const stockStatus = getStockStatus(item.availableState);
                  return (
                    <tr key={item.inventoryId} className="border-b border-indigo-50 last:border-0 hover:bg-indigo-50/50">
                      <td className="p-3 font-medium text-gray-800">{item.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="p-3 text-right font-medium text-gray-700">{item.availableState}</td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan="3" className="text-center p-8 text-gray-500">No inventory items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDashboard;