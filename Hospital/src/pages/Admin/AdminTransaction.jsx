import React, { useState, useMemo } from 'react';
import { FaCheckCircle, FaTimesCircle, FaFilter } from 'react-icons/fa';

const transactionsData = [
  { id: 'T001', patientName: 'John Doe', email: 'john.d@example.com', description: 'Consultation Fee', price: '$50.00', paid: true },
  { id: 'T002', patientName: 'Jane Smith', email: 'jane.s@example.com', description: 'Prescription Refill', price: '$25.00', paid: true },
  { id: 'T003', patientName: 'Peter Jones', email: 'peter.j@example.com', description: 'Video Conference', price: '$75.00', paid: false },
  { id: 'T004', patientName: 'Emily Davis', email: 'emily.d@example.com', description: 'Consultation Fee', price: '$50.00', paid: true },
  { id: 'T005', patientName: 'Chris Brown', email: 'chris.b@example.com', description: 'Prescription Refill', price: '$25.00', paid: false },
  { id: 'T006', patientName: 'Alice Green', email: 'alice.g@example.com', description: 'Consultation Fee', price: '$50.00', paid: true },
  { id: 'T007', patientName: 'Bob White', email: 'bob.w@example.com', description: 'Video Conference', price: '$75.00', paid: true },
  { id: 'T008', patientName: 'Susan Black', email: 'susan.b@example.com', description: 'Prescription Refill', price: '$25.00', paid: false },
];

const AdminTransaction = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    let result = transactionsData;

    if (searchTerm) {
      result = result.filter(t =>
        t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      const isPaid = statusFilter === 'paid';
      result = result.filter(t => t.paid === isPaid);
    }

    return result;
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header, Search, and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaFilter className="h-4 w-4" />
            </div>
          </div>
        </div>
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
            {currentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {transaction.paid ? (
                    <span className="flex items-center text-green-600"><FaCheckCircle className="mr-1 h-4 w-4" /> Paid</span>
                  ) : (
                    <span className="flex items-center text-red-600"><FaTimesCircle className="mr-1 h-4 w-4" /> Unpaid</span>
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

export default AdminTransaction;