import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const pharmacies = [
  { name: 'The New Pharmacy', location: 'Kurunegala', revenue: '$150,000', actions: 'Edit' },
  { name: 'Health Hub Pharmacy', location: 'Colombo', revenue: '$120,500', actions: 'Delete' },
  { name: 'City Meds', location: 'Kandy', revenue: '$98,750', actions: 'Edit' },
  { name: 'Quick Care Pharmacy', location: 'Galle', revenue: '$110,200', actions: 'Delete' },
  { name: 'Central Pharmacy', location: 'Jaffna', revenue: '$95,200', actions: 'Delete' },
  { name: 'Greenleaf Pharma', location: 'Gampaha', revenue: '$150,200', actions: 'Edit' },
];

const AdminPharmacy = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header and Add Pharmacy Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pharmacy Management</h1>
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          + Add Pharmacy
        </button>
      </div>

      {/* Pharmacy List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Revenue Generated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pharmacies.map((pharmacy, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {pharmacy.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pharmacy.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  {pharmacy.revenue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {pharmacy.actions === 'Edit' ? (
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

export default AdminPharmacy;