import React, { useState, useMemo, useEffect } from 'react';
import { User, UserPlus, Stethoscope, Briefcase, Search, Edit, Trash2 } from 'lucide-react';
import AddDoctorModal from '../../components/Admin/AdminDoctor/AddDoctorModal';

// ===================================================================================
//  METRIC CARD COMPONENT (Consistent with other dashboards)
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
//  MAIN PAGE COMPONENT (Re-styled)
// ===================================================================================
const AdminDoctor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      // CORRECTED: URL to match Ballerina's kebab-case convention
      const response = await fetch('http://localhost:8080/admin/getAllDoctors', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setDoctorsData(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch doctors data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = (newDoctor) => {
    setDoctorsData(prevData => [newDoctor, ...prevData]);
    setIsModalOpen(false);
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure you want to delete this doctor? This action is irreversible.')) return;

    try {
      // CORRECTED: URL to match Ballerina's kebab-case convention
      const response = await fetch('http://localhost:8080/admin/deleteDoctor', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ did: doctorId })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      if (result.success) {
        setDoctorsData(prevData => prevData.filter(doctor => doctor.did !== doctorId));
        alert('Doctor deleted successfully!');
        
        const updatedDoctors = doctorsData.filter(doctor => doctor.did !== doctorId);
        const newTotalPages = Math.ceil(updatedDoctors.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } else {
        throw new Error(result.message || 'Failed to delete doctor');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor =>
      doctor.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, doctorsData]);

  const stats = useMemo(() => ({
    total: doctorsData.length,
    specialties: new Set(doctorsData.map(d => d.specialization)).size
  }), [doctorsData]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const currentDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  if (loading) return <div className="p-8 text-center font-medium text-gray-600">Loading Doctors...</div>;
  if (error) return <div className="p-8 text-center font-medium text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-8">
       {isModalOpen && (
        <AddDoctorModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddDoctor}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Doctor Management
        </h1>
        <p className="text-gray-600 mt-2">Oversee all registered medical professionals in the system.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard title="Total Doctors" value={stats.total} icon={User} color="blue" />
        <MetricCard title="Unique Specialties" value={stats.specialties} icon={Stethoscope} color="green" />
        <MetricCard title="Avg. Experience" value="8 Years" icon={Briefcase} color="indigo" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">All Registered Doctors</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name or Specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              <UserPlus className="w-5 h-5" /> Add Doctor
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Specialization</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Experience</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentDoctors.map((doctor) => (
                <tr key={doctor.did} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{doctor.username}</td>
                  <td className="p-4 text-gray-600">{doctor.email}</td>
                  <td className="p-4 text-gray-600">{doctor.specialization}</td>
                  <td className="p-4 text-gray-600">{doctor.experience} years</td>
                  <td className="p-4 flex justify-end space-x-4">
                    <button className="text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4"/></button>
                    <button onClick={() => handleDeleteDoctor(doctor.did)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <span>
              Showing {currentDoctors.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredDoctors.length)} of {filteredDoctors.length}
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

export default AdminDoctor;