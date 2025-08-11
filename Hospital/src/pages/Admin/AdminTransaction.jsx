import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const transactions = [
  { id: 'T001', patientName: 'John Doe', email: 'john.d@example.com', description: 'Consultation Fee', price: '$50.00', paid: true },
  { id: 'T002', patientName: 'Jane Smith', email: 'jane.s@example.com', description: 'Prescription Refill', price: '$25.00', paid: true },
  { id: 'T003', patientName: 'Peter Jones', email: 'peter.j@example.com', description: 'Video Conference', price: '$75.00', paid: false },
  { id: 'T004', patientName: 'Emily Davis', email: 'emily.d@example.com', description: 'Consultation Fee', price: '$50.00', paid: true },
  { id: 'T005', patientName: 'Chris Brown', email: 'chris.b@example.com', description: 'Prescription Refill', price: '$25.00', paid: false },
];

const AdminTransaction = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
      </div>

      {/* Transaction List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {transaction.paid ? (
                    <span className="flex items-center text-green-600">
                      <FaCheckCircle className="mr-1 h-4 w-4" /> Paid
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <FaTimesCircle className="mr-1 h-4 w-4" /> Unpaid
                    </span>
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

export default AdminTransaction;