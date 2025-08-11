import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddDoctorModal from '../../components/Admin/AdminDoctor/AddDoctorModal';

const doctorsData = [
  { name: 'Dr. Emily Smith', email: 'emily.s@example.com', specialization: 'Cardiology', revenue: '$150,000', actions: 'Edit' },
  { name: 'Dr. John Doe', email: 'john.d@example.com', specialization: 'Pediatrics', revenue: '$120,500', actions: 'Delete' },
  { name: 'Dr. Sarah Chein', email: 'sarah.c@example.com', specialization: 'Dermatology', revenue: '$120,500', actions: 'Ediete' },
  { name: 'Dr. Jane Brown', email: 'jane.b@example.com', specialization: 'Dermatology', revenue: '$120,500', actions: 'Edit' },
  { name: 'Nowish', email: 'nowish@example.com', specialization: 'Neurology', revenue: '$95,200', actions: 'Delete' },
  { name: 'Hormitch', email: 'hormitch@example.com', specialization: 'Neurology', revenue: '$150,200', actions: 'Delete' },
  { name: 'Dr. Alice Jones', email: 'alice.j@example.com', specialization: 'Cardiology', revenue: '$160,000', actions: 'Edit' },
  { name: 'Dr. Bob Williams', email: 'bob.w@example.com', specialization: 'Pediatrics', revenue: '$110,000', actions: 'Delete' },
  { name: 'Dr. Charlie Davis', email: 'charlie.d@example.com', specialization: 'Neurology', revenue: '$98,000', actions: 'Edit' },
  { name: 'Dr. David Evans', email: 'david.e@example.com', specialization: 'Cardiology', revenue: '$145,000', actions: 'Edit' },
];

const AdminDoctor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleAddDoctor = (doctorData) => {
    console.log('Adding new doctor:', doctorData);
    setIsModalOpen(false);
  };

  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctorsData;
    return doctorsData.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
            {currentDoctors.map((doctor, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{doctor.revenue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-2"><FaEdit className="inline-block h-4 w-4" /></button>
                  <button className="text-red-600 hover:text-red-900"><FaTrashAlt className="inline-block h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
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
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
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