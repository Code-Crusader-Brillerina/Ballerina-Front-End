import React, { useState, useEffect, useMemo } from 'react';
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  List,
  Search,
  Filter
} from 'lucide-react';

// ===================================================================================
//  REUSABLE METRIC CARD COMPONENT
// ===================================================================================
const MetricCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
);

// ===================================================================================
//  MAIN PAGE COMPONENT
// ===================================================================================
const AdminTransaction = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/admin/getAllAppoinments', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        const transformedData = result.data.map(item => ({
          id: item.aid,
          patientName: item.patient?.name || 'N/A',
          doctorEmail: item.doctor?.email || 'N/A',
          description: item.appointment?.description || 'No description',
          paymentState: item.appointment?.paymentState || 'unknown',
          doctorName: item.doctor?.name || 'N/A',
          date: item.appointment?.date || 'N/A',
          time: item.appointment?.time || 'N/A'
        }));
        setAppointmentsData(transformedData);
      } else {
        throw new Error(result.message || "Invalid data format from API.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const stats = useMemo(() => ({
    total: appointmentsData.length,
    paid: appointmentsData.filter(t => t.paymentState === 'paid').length,
    pending: appointmentsData.filter(t => t.paymentState === 'pending').length,
  }), [appointmentsData]);

  const filteredTransactions = useMemo(() => {
    return appointmentsData.filter(t => {
      const matchesStatus = statusFilter === 'all' || t.paymentState === statusFilter;
      const matchesSearch = searchTerm === '' ||
        t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.doctorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter, appointmentsData]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const PaymentStatusBadge = ({ status }) => {
    if (status === 'paid') {
      return <span className="flex items-center gap-2 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700"><CheckCircle size={14}/> Paid</span>;
    }
    if (status === 'pending') {
      return <span className="flex items-center gap-2 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700"><Clock size={14}/> Pending</span>;
    }
    return <span className="flex items-center gap-2 px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">Unknown</span>;
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-600 font-medium">Loading Transactions...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-medium">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Transaction History
        </h1>
        <p className="text-gray-600 mt-2">Monitor all appointment payments and financial records.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard title="Total Transactions" value={stats.total} icon={List} color="blue" />
        <MetricCard title="Completed Payments" value={stats.paid} icon={CheckCircle} color="emerald" />
        <MetricCard title="Pending Payments" value={stats.pending} icon={Clock} color="amber" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">All Transactions</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Patient or Doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient Name</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Doctor Name</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Doctor Email</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{tx.patientName}</td>
                  <td className="p-4 text-gray-600">{tx.doctorName}</td>
                  <td className="p-4 text-gray-600">{tx.doctorEmail}</td>
                  <td className="p-4 text-gray-600">
                    <div>{tx.date}</div>
                    <div className="text-xs capitalize text-gray-400">{tx.time}</div>
                  </td>
                  <td className="p-4"><PaymentStatusBadge status={tx.paymentState} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination and Summary */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <span>
            Showing {currentTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
          </span>
          {totalPages > 1 && (
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg disabled:opacity-50">&laquo; Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg disabled:opacity-50">Next &raquo;</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTransaction;