import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddPharmacyModal from '../../components/Admin/AdminPharmacy/AddPharmacyModal';

const pharmaciesData = [
  { name: 'The New Pharmacy', email: 'info@newpharmacy.com', location: 'Kurunegala', revenue: '$150,000', actions: 'Edit' },
  { name: 'Health Hub Pharmacy', email: 'contact@healthhub.com', location: 'Colombo', revenue: '$120,500', actions: 'Delete' },
  { name: 'City Meds', email: 'support@citymeds.lk', location: 'Kandy', revenue: '$98,750', actions: 'Edit' },
  { name: 'Quick Care Pharmacy', email: 'sales@quickcare.lk', location: 'Galle', revenue: '$110,200', actions: 'Delete' },
  { name: 'Central Pharmacy', email: 'central@pharmacy.com', location: 'Jaffna', revenue: '$95,200', actions: 'Delete' },
  { name: 'Greenleaf Pharma', email: 'greenleaf@pharma.com', location: 'Gampaha', revenue: '$150,200', actions: 'Edit' },
  { name: 'Medicaid Pharmacy', email: 'info@medicaid.com', location: 'Kurunegala', revenue: '$130,000', actions: 'Edit' },
  { name: 'Sunrise Pharmacy', email: 'contact@sunrise.com', location: 'Colombo', revenue: '$105,000', actions: 'Delete' },
  { name: 'Town Meds', email: 'support@townmeds.lk', location: 'Kandy', revenue: '$90,000', actions: 'Edit' },
];

const AdminPharmacy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleAddPharmacy = (pharmacyData) => {
    console.log('Adding new pharmacy:', pharmacyData);
    setIsModalOpen(false);
  };

  const filteredPharmacies = useMemo(() => {
    if (!searchTerm) return pharmaciesData;
    return pharmaciesData.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);
  const currentPharmacies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPharmacies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPharmacies, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header, Add Pharmacy Button, Search, and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Pharmacy Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search pharmacies..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            + Add Pharmacy
          </button>
        </div>
      </div>

      {/* Pharmacy List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue Generated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPharmacies.map((pharmacy, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pharmacy.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pharmacy.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pharmacy.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{pharmacy.revenue}</td>
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
        <AddPharmacyModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPharmacy}
        />
      )}
    </div>
  );
};

export default AdminPharmacy;