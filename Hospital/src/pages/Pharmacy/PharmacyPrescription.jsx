import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipboardList, Clock, Truck, CheckCircle, Search, SlidersHorizontal } from "lucide-react";

// API client setup
const apiClient = axios.create({
  baseURL: "http://localhost:8080/pharmacy",
  withCredentials: true,
});

// An array of the new valid order statuses
const ORDER_STATUSES = ["Order Confirmed", "Order Packed", "Shipped", "Delivered"];

// ===================================================================================
//  METRIC CARD COMPONENT (Re-styled to match the Dashboard)
// ===================================================================================
const MetricCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

// ===================================================================================
//  TABLE COMPONENT (Re-styled for consistency)
// ===================================================================================
function PrescriptionTable({ prescriptions, onRowClick, onStatusChange }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Confirmed": return "bg-blue-100 text-blue-700";
      case "Order Packed": return "bg-indigo-100 text-indigo-700";
      case "Shipped": return "bg-amber-100 text-amber-700";
      case "Delivered": return "bg-emerald-100 text-emerald-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Prescription ID</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
            <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Items</th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {prescriptions.map((p) => (
            <tr key={p.preId} className="hover:bg-gray-50/50 cursor-pointer" onClick={() => onRowClick(p.preId)}>
              <td className="p-4 font-mono text-gray-700">#{p.preId}</td>
              <td className="p-4">
                <div className="font-semibold text-gray-800">{p.patientInfo.username}</div>
                <div className="text-xs text-gray-500">Age: {p.patientInfo.age > 0 ? p.patientInfo.age : 'N/A'}</div>
              </td>
              <td className="p-4 text-gray-600">{new Date(p.dateTime).toLocaleDateString()}</td>
              <td className="p-4 text-center font-medium text-gray-700">{p.items.length}</td>
              <td className="p-4">
                <select
                  value={p.status}
                  onChange={(e) => onStatusChange(p.preId, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className={`border-none rounded-full text-xs font-semibold capitalize text-center p-2 appearance-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${getStatusStyle(p.status)}`}
                >
                  {ORDER_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(p.preId);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {prescriptions.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="font-semibold">No Prescriptions Found</h3>
          <p className="text-sm">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}

// ===================================================================================
//  MAIN PAGE COMPONENT (Re-styled)
// ===================================================================================
function PharmacyPrescriptionPage() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPrescriptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/prescriptions");
      setPrescriptions(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch prescriptions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleStatusChange = async (preId, newStatus) => {
    setPrescriptions(prev =>
      prev.map(p => (p.preId === preId ? { ...p, status: newStatus } : p))
    );
    try {
      await apiClient.put("/prescriptions/status", { preId, newStatus });
    } catch (err) {
      setError("Failed to update status. Data has been reverted.");
      fetchPrescriptions();
    }
  };

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(p => {
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesSearch = p.patientInfo.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.preId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [prescriptions, statusFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: prescriptions.length,
    processing: prescriptions.filter(p => p.status === "Order Confirmed" || p.status === "Order Packed").length,
    shipped: prescriptions.filter(p => p.status === "Shipped").length,
    completed: prescriptions.filter(p => p.status === "Delivered").length,
  }), [prescriptions]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Prescription Management
        </h1>
        <p className="text-gray-600 mt-2">View, search, and update the status of all incoming prescriptions.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title="Total Prescriptions" value={stats.total} icon={ClipboardList} color="blue" />
        <MetricCard title="Processing" value={stats.processing} icon={Clock} color="amber" />
        <MetricCard title="Shipped" value={stats.shipped} icon={Truck} color="indigo" />
        <MetricCard title="Completed" value={stats.completed} icon={CheckCircle} color="emerald" />
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Table Header with Controls */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">All Prescriptions</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Patient or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                {ORDER_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Table Content */}
        {isLoading && <div className="text-center py-16 text-gray-500">Loading prescriptions...</div>}
        {error && <div className="text-center py-16 text-red-600">{error}</div>}
        {!isLoading && !error && (
          <PrescriptionTable
            prescriptions={filteredPrescriptions}
            onRowClick={(preId) => navigate(`/pharmacy/pharmacyprescriptiondetails/${preId}`)}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}

export default PharmacyPrescriptionPage;