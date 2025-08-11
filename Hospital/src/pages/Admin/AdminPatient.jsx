import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const patientsData = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '0771234567', actions: 'Edit' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0769876543', actions: 'Delete' },
  { name: 'Peter Jones', email: 'peter.j@example.com', phone: '0711122334', actions: 'Edit' },
  { name: 'Emily White', email: 'emily.w@example.com', phone: '0785566778', actions: 'Delete' },
  { name: 'Chris Brown', email: 'chris.b@example.com', phone: '0728899001', actions: 'Edit' },
  { name: 'Alice Green', email: 'alice.g@example.com', phone: '0778899001', actions: 'Edit' },
  { name: 'Bob Johnson', email: 'bob.j@example.com', phone: '0712233445', actions: 'Delete' },
  { name: 'Charlie Davis', email: 'charlie.d@example.com', phone: '0763344556', actions: 'Edit' },
  { name: 'Diana Miller', email: 'diana.m@example.com', phone: '0774455667', actions: 'Delete' },
];

const AdminPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patientsData;
    return patientsData.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header, Search, and Add Patient Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            + Add Patient
          </button>
        </div>
      </div>

      {/* Patient List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPatients.map((patient, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {patient.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {patient.actions === 'Edit' ? (
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaEdit className="inline-block h-4 w-4" />
                    </button>
                  ) : (
                    <button className="text-red-600 hover:text-red-900">
                      <FaTrashAlt className="inline-block h-4 w-4" />
                    </button>
                  )}
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
    </div>
  );
};

export default AdminPatient;