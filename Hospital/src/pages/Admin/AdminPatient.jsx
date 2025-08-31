import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Trash2, Search, X, User, Users, MapPin, Plus } from 'lucide-react';

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
const AdminPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState('all'); // 'all', 'name', 'email', 'phone', 'id'
  const itemsPerPage = 8;

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      // CORRECTED: URL to match Ballerina's kebab-case convention
      const response = await fetch('http://localhost:8080/admin/getAllPatient', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setPatientsData(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch patients data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (patient) => {
    if (window.confirm(`Are you sure you want to delete patient ${patient.userData?.username}? This will also delete their user account.`)) {
      // NOTE: You need to create a `deletePatient` endpoint in your Ballerina admin service.
      // This is a placeholder for the API call.
      console.log('Attempting to delete patient with PID:', patient.pid);
      alert('Delete functionality is not yet connected to the backend.');
      // Example API call (uncomment when backend is ready):
      /*
      try {
        const response = await fetch('http://localhost:8080/admin/delete-patient', {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pid: patient.pid })
        });
        if (!response.ok) throw new Error('Failed to delete');
        
        fetchPatients(); // Refresh data after delete
        alert('Patient deleted successfully');
      } catch (err) {
        alert('Error deleting patient: ' + err.message);
      }
      */
    }
  };

  const handleEdit = (patient) => {
    console.log('Edit patient:', patient);
    // Logic to open an edit modal would go here
    alert(`Editing patient: ${patient.userData?.username}`);
  };

  const clearSearch = () => setSearchTerm('');

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patientsData;
    const term = searchTerm.toLowerCase().trim();
    return patientsData.filter(patient => {
      switch (searchFilter) {
        case 'name': return patient.userData?.username?.toLowerCase().includes(term);
        case 'email': return patient.userData?.email?.toLowerCase().includes(term);
        case 'phone': return patient.userData?.phoneNumber?.toLowerCase().includes(term);
        case 'id': return patient.pid?.toLowerCase().includes(term);
        default:
          return (
            patient.userData?.username?.toLowerCase().includes(term) ||
            patient.userData?.email?.toLowerCase().includes(term) ||
            patient.userData?.phoneNumber?.toLowerCase().includes(term) ||
            patient.pid?.toLowerCase().includes(term)
          );
      }
    });
  }, [searchTerm, patientsData, searchFilter]);

  const stats = useMemo(() => ({
    total: patientsData.length,
    male: patientsData.filter(p => p.gender?.toLowerCase() === 'male').length,
    female: patientsData.filter(p => p.gender?.toLowerCase() === 'female').length,
  }), [patientsData]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  useEffect(() => { setCurrentPage(1); }, [searchTerm, searchFilter]);
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const currentPatients = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, validCurrentPage, itemsPerPage]);
  
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div className="p-8 text-center font-medium text-gray-600">Loading Patients...</div>;
  if (error) return <div className="p-8 text-center font-medium text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Patient Management
        </h1>
        <p className="text-gray-600 mt-2">View, search, and manage all registered patients.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard title="Total Patients" value={stats.total} icon={Users} color="blue" />
        <MetricCard title="Male Patients" value={stats.male} icon={User} color="indigo" />
        <MetricCard title="Female Patients" value={stats.female} icon={User} color="pink" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">All Patients</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search by ${searchFilter}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => alert("Add patient modal not yet implemented.")}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" /> Add Patient
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6 flex flex-wrap gap-2 items-center bg-gray-50/70 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700 self-center mr-2">Search by:</span>
            {['all', 'name', 'email', 'phone', 'id'].map((filter) => (
                <button
                    key={filter}
                    onClick={() => setSearchFilter(filter)}
                    className={`px-3 py-1 text-sm rounded-full capitalize ${searchFilter === filter ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200 border'}`}
                >
                    {filter}
                </button>
            ))}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient ID</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Gender</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentPatients.map((patient) => (
                <tr key={patient.pid} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-blue-600">{patient.pid}</td>
                  <td className="p-4 font-semibold text-gray-800">{patient.userData?.username}</td>
                  <td className="p-4 text-gray-600">
                    <div>{patient.userData?.email}</div>
                    <div className="text-xs text-gray-400">{patient.userData?.phoneNumber}</div>
                  </td>
                  <td className="p-4 text-gray-600 capitalize">{patient.gender}</td>
                  <td className="p-4 text-gray-600 capitalize">{patient.userData?.city}</td>
                  <td className="p-4 flex justify-end space-x-4">
                    <button onClick={() => handleEdit(patient)} className="text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                    <button onClick={() => handleDelete(patient)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <span>
              Showing {currentPatients.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of {filteredPatients.length}
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

export default AdminPatient;