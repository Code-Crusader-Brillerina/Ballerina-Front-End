import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddMedicineModal from '../../components/Admin/AdminMedicine/AddMedicineModal';

const medicinesData = [
  { name: 'Paracetamol', type: 'Tablet', size: '500 mg', description: 'Used for pain relief and fever.', price: 'Rs. 200.00', actions: 'Edit' },
  { name: 'Amoxicillin', type: 'Capsule', size: '250 mg', description: 'An antibiotic used to treat various bacterial infections.', price: 'Rs. 350.00', actions: 'Delete' },
  { name: 'Omeprazole', type: 'Capsule', size: '20 mg', description: 'Used to treat stomach ulcers and heartburn.', price: 'Rs. 150.00', actions: 'Edit' },
  { name: 'C Vitamin', type: 'Tablet', size: '1000 mg', description: 'A supplement used to boost the immune system.', price: 'Rs. 500.00', actions: 'Edit' },
  { name: 'Ibuprofen', type: 'Tablet', size: '200 mg', description: 'A nonsteroidal anti-inflammatory drug (NSAID) for pain and inflammation.', price: 'Rs. 250.00', actions: 'Delete' },
  { name: 'Loratadine', type: 'Tablet', size: '10 mg', description: 'An antihistamine used to relieve allergy symptoms.', price: 'Rs. 180.00', actions: 'Delete' },
  { name: 'Aspirin', type: 'Tablet', size: '81 mg', description: 'A common pain reliever and anti-inflammatory.', price: 'Rs. 120.00', actions: 'Edit' },
  { name: 'Cetirizine', type: 'Tablet', size: '10 mg', description: 'An antihistamine for allergies.', price: 'Rs. 160.00', actions: 'Delete' },
];

const AdminMedicine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleAddMedicine = (medicineData) => {
    console.log('Adding new medicine:', medicineData);
    setIsModalOpen(false);
  };

  const filteredMedicines = useMemo(() => {
    if (!searchTerm) return medicinesData;
    return medicinesData.filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const currentMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMedicines, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header, Search, and Add Medicine Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Medicine Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search medicines..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            + Add Medicine
          </button>
        </div>
      </div>

      {/* Medicine List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (mg or ml)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Small Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMedicines.map((medicine, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medicine.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.size}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{medicine.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {medicine.actions === 'Edit' ? (
                    <button className="text-blue-600 hover:text-blue-900 mr-2"><FaEdit className="inline-block h-4 w-4" /></button>
                  ) : (
                    <button className="text-red-600 hover:text-red-900"><FaTrashAlt className="inline-block h-4 w-4" /></button>
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

      {/* The modal component */}
      {isModalOpen && (
        <AddMedicineModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddMedicine}
        />
      )}
    </div>
  );
};

export default AdminMedicine;