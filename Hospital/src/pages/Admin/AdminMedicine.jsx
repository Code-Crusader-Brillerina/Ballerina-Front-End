import React, { useState, useMemo, useEffect } from 'react';
import { Pill, Shapes, ClipboardList, Search, Plus, Edit, Trash2 } from 'lucide-react';
import AddMedicineModal from '../../components/Admin/AdminMedicine/AddMedicineModal'; // Assuming this component exists

// ===================================================================================
//  METRIC CARD COMPONENT
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
//  MAIN PAGE COMPONENT
// ===================================================================================
const AdminMedicine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesData, setMedicinesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/admin/getAllMedicines', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setMedicinesData(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch medicine data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);
  
  const handleAddMedicine = (newMedicine) => {
    // This function would be called by the AddMedicineModal on successful submission
    // It optimistically updates the UI while the full list refetches
    setMedicinesData(prev => [newMedicine, ...prev]);
    setIsModalOpen(false);
    fetchMedicines(); // Refetch to ensure data consistency
  };
  
  const handleDeleteMedicine = (medicineId) => {
      if(window.confirm('Are you sure you want to delete this medicine?')) {
          alert(`Deleting medicine ID ${medicineId}. Backend endpoint needs to be implemented.`);
          // Example of API call to make when backend is ready:
          /*
          fetch(`http://localhost:8080/admin/delete-medicine/${medicineId}`, {
              method: 'DELETE',
              credentials: 'include'
          }).then(res => {
              if(!res.ok) throw new Error('Deletion failed');
              fetchMedicines();
          }).catch(err => setError(err.message));
          */
      }
  }

  const filteredMedicines = useMemo(() => {
    return medicinesData.filter(med =>
      med.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, medicinesData]);

  const stats = useMemo(() => ({
    total: medicinesData.length,
    forms: new Set(medicinesData.map(m => m.form)).size,
    types: new Set(medicinesData.map(m => m.medicineType)).size
  }), [medicinesData]);

  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / itemsPerPage));
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const currentMedicines = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMedicines, validCurrentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };
  
  if (loading) return <div className="p-8 text-center font-medium text-gray-600">Loading Medicines...</div>;
  if (error) return <div className="p-8 text-center font-medium text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-8">
      {isModalOpen && <AddMedicineModal onClose={() => setIsModalOpen(false)} onSubmit={handleAddMedicine} />}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Medicine Master List
        </h1>
        <p className="text-gray-600 mt-2">Manage the central catalog of all available medicines.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard title="Total Medicines" value={stats.total} icon={Pill} color="blue" />
        <MetricCard title="Unique Forms" value={stats.forms} icon={Shapes} color="indigo" />
        <MetricCard title="Unique Types" value={stats.types} icon={ClipboardList} color="green" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">All Registered Medicines</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" /> Add Medicine
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Form</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Strength</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentMedicines.map((med) => (
                <tr key={med.mediId} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{med.name}</td>
                  <td className="p-4 text-gray-600">{med.form}</td>
                  <td className="p-4 text-gray-600">{med.strength}</td>
                  <td className="p-4 text-gray-600">{med.medicineType}</td>
                  <td className="p-4 flex justify-end space-x-4">
                    <button className="text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                    <button onClick={() => handleDeleteMedicine(med.mediId)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredMedicines.length)} of {filteredMedicines.length}
            </span>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg disabled:opacity-50">&laquo; Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg disabled:opacity-50">Next &raquo;</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMedicine;