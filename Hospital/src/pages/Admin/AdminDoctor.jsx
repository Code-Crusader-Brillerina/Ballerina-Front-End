import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const doctors = [
  { name: 'Dr. Emily Smith', email: 'emily.s@example.com', specialization: 'Cardiology', revenue: '$150,000', actions: 'Edit' },
  { name: 'Dr. John Doe', email: 'john.d@example.com', specialization: 'Pediatrics', revenue: '$120,500', actions: 'Delete' },
  { name: 'Dr. Sarah Chein', email: 'sarah.c@example.com', specialization: 'Dermatology', revenue: '$120,500', actions: 'Ediete' },
  { name: 'Dr. John Doe', email: 'john.d@example.com', specialization: 'Dermatology', revenue: '$120,500', actions: 'Delete' },
  { name: 'Nowish', email: 'nowish@example.com', specialization: 'Neurology', revenue: '$95,200', actions: 'Delete' },
  { name: 'Hormitch', email: 'hormitch@example.com', specialization: 'Neurology', revenue: '$150,200', actions: 'Delete' },
];

const AdminDoctor = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header and Add Doctor Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          + Add Doctor
        </button>
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
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {doctor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.specialization}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                  {doctor.revenue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {doctor.actions === 'Edit' || doctor.actions === 'Ediete' ? (
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
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

export default AdminDoctor;