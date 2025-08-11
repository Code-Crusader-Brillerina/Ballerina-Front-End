import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const medicines = [
  { name: 'Paracetamol', type: 'Tablet', size: '500 mg', description: 'Used for pain relief and fever.', price: 'Rs. 200.00', actions: 'Edit' },
  { name: 'Amoxicillin', type: 'Capsule', size: '250 mg', description: 'An antibiotic used to treat various bacterial infections.', price: 'Rs. 350.00', actions: 'Delete' },
  { name: 'Omeprazole', type: 'Capsule', size: '20 mg', description: 'Used to treat stomach ulcers and heartburn.', price: 'Rs. 150.00', actions: 'Edit' },
  { name: 'C Vitamin', type: 'Tablet', size: '1000 mg', description: 'A supplement used to boost the immune system.', price: 'Rs. 500.00', actions: 'Edit' },
  { name: 'Ibuprofen', type: 'Tablet', size: '200 mg', description: 'A nonsteroidal anti-inflammatory drug (NSAID) for pain and inflammation.', price: 'Rs. 250.00', actions: 'Delete' },
  { name: 'Loratadine', type: 'Tablet', size: '10 mg', description: 'An antihistamine used to relieve allergy symptoms.', price: 'Rs. 180.00', actions: 'Delete' },
];

const AdminMedicine = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header and Add Medicine Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medicine Management</h1>
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          + Add Medicine
        </button>
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
            {medicines.map((medicine, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {medicine.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.size}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {medicine.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {medicine.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {medicine.actions === 'Edit' ? (
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
    </div>
  );
};

export default AdminMedicine;