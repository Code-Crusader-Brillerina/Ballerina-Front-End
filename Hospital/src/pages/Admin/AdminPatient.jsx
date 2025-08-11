import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const patients = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '0771234567', actions: 'Edit' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0769876543', actions: 'Delete' },
  { name: 'Peter Jones', email: 'peter.j@example.com', phone: '0711122334', actions: 'Edit' },
  { name: 'Emily White', email: 'emily.w@example.com', phone: '0785566778', actions: 'Delete' },
  { name: 'Chris Brown', email: 'chris.b@example.com', phone: '0728899001', actions: 'Edit' },
];

const AdminPatient = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header and Add Patient Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          + Add Patient
        </button>
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
            {patients.map((patient, index) => (
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
    </div>
  );
};

export default AdminPatient;