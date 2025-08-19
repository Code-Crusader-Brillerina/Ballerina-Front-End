import React, { useState, useMemo, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddDoctorModal from '../../components/Admin/AdminDoctor/AddDoctorModal';

const AdminDoctor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  // Fixed function name and logic to fetch doctors instead of medicines
  const fetchDoctors = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('http://localhost:8080/patient/getAllDoctors', {
        method: 'GET',
        credentials: 'include', // Include cookies for JWT authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setDoctorsData(result.data);
        console.log('Doctors loaded successfully:', result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch doctors data');
      }
    } catch (err) {
      if (err.username === 'TypeError' && err.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if the backend is running on http://localhost:8080');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = (doctorData) => {
    console.log('Adding new doctor:', doctorData);
    // Add the new doctor to the existing data
    setDoctorsData(prevData => [...prevData, doctorData]);
    setIsModalOpen(false);
  };

  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctorsData;
    return doctorsData.filter(doctor =>
      doctor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, doctorsData]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const currentDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading doctors...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <button 
            onClick={fetchDoctors}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
          <div className="text-sm text-gray-500 text-center">
            <p>Troubleshooting steps:</p>
            <ul className="mt-2 space-y-1">
              <li>• Check if Ballerina service is running on port 8080</li>
              <li>• Verify you're logged in as admin</li>
              <li>• Check CORS configuration allows localhost:3000</li>
              <li>• Check browser console for detailed errors</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header, Add Doctor Button, Search, and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search doctors..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            + Add Doctor
          </button>
        </div>
      </div>

      {/* Doctor List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue Generated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor, index) => (
                <tr key={doctor.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{doctor.revenue || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      <FaEdit className="inline-block h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FaTrashAlt className="inline-block h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* The modal component */}
      {isModalOpen && (
        <AddDoctorModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddDoctor}
        />
      )}
    </div>
  );
};

export default AdminDoctor;