import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// API client setup
const apiClient = axios.create({
  baseURL: "http://localhost:8080/pharmacy",
  withCredentials: true,
});

// An array of the new valid order statuses
const ORDER_STATUSES = ["Order Confirmed", "Order Packed", "Shipped", "Delivered"];

// ===================================================================================
//  STATS COMPONENT (Updated for new statuses)
// ===================================================================================
function PrescriptionStats({ prescriptions }) {
  const stats = useMemo(() => ({
    total: prescriptions.length,
    processing: prescriptions.filter(p => p.status === "Order Confirmed" || p.status === "Order Packed").length,
    shipped: prescriptions.filter(p => p.status === "Shipped").length,
    completed: prescriptions.filter(p => p.status === "Delivered").length,
  }), [prescriptions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
        <div className="text-gray-500 text-sm">Total Prescriptions</div>
        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
        <div className="text-gray-500 text-sm">Processing</div>
        <div className="text-2xl font-bold text-gray-800">{stats.processing}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-indigo-500">
        <div className="text-gray-500 text-sm">Shipped</div>
        <div className="text-2xl font-bold text-gray-800">{stats.shipped}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
        <div className="text-gray-500 text-sm">Completed</div>
        <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
      </div>
    </div>
  );
}


// ===================================================================================
//  TABLE COMPONENT (Now with status update dropdown)
// ===================================================================================
function PrescriptionTable({ prescriptions, onRowClick, onStatusChange }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Confirmed": return "bg-blue-100 text-blue-800";
      case "Order Packed": return "bg-indigo-100 text-indigo-800";
      case "Shipped": return "bg-yellow-100 text-yellow-800";
      case "Delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="py-3 px-4 font-medium">Prescription ID</th>
              <th className="py-3 px-4 font-medium">Patient</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium text-center">Items</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prescriptions.map((p) => (
              <tr key={p.preId} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick(p.preId)}>
                <td className="py-3 px-4 font-mono text-gray-700">#{p.preId}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-gray-800">{p.patientInfo.username}</div>
                  <div className="text-xs text-gray-500">Age: {p.patientInfo.age > 0 ? p.patientInfo.age : 'N/A'}</div>
                </td>
                <td className="py-3 px-4 text-gray-600">{new Date(p.dateTime).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-center text-gray-600">{p.items.length}</td>
                <td className="py-3 px-4">
                  {/* The interactive status dropdown */}
                  <select
                    value={p.status}
                    onChange={(e) => onStatusChange(p.preId, e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevents row click when changing status
                    className={`border-none rounded-full text-xs font-semibold capitalize text-center p-2 appearance-none focus:ring-2 focus:ring-blue-500 ${getStatusStyle(p.status)}`}
                  >
                    {ORDER_STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the button itself
                        onRowClick(p.preId);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {prescriptions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No prescriptions found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}


// ===================================================================================
//  MAIN PAGE COMPONENT
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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Function to handle status updates
  const handleStatusChange = async (preId, newStatus) => {
    // Optimistically update the UI for a better user experience
    setPrescriptions(prev =>
      prev.map(p => (p.preId === preId ? { ...p, status: newStatus } : p))
    );

    try {
      await apiClient.put("/prescriptions/status", { preId, newStatus });
      // You can add a success notification here if you like
    } catch (err) {
      setError("Failed to update status. Please refresh and try again.");
      console.error(err);
      // If the API call fails, revert the change to show the original status
      fetchPrescriptions(); // Re-fetch to get the true state from the server
    }
  };

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(p => {
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesSearch = p.patientInfo.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.preId.includes(searchQuery);
      return matchesStatus && matchesSearch;
    });
  }, [prescriptions, statusFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8 text-center">
          {/* Header content... (no changes here) */}
        </div>

        <PrescriptionStats prescriptions={prescriptions} />

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-grow w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by Patient Name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="All">All Statuses</option>
              {ORDER_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && <div className="text-center py-10">Loading prescriptions...</div>}
        {error && <div className="text-center py-10 text-red-600">{error}</div>}
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