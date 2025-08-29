import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Trash2, Search, X } from 'lucide-react';

const AdminPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState('all'); // 'all', 'name', 'email', 'phone', 'id'
  const itemsPerPage = 8;

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('http://localhost:8080/admin/getAllPatient', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setPatientsData(result.data);
        console.log('Patients loaded successfully:', result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch patients data');
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if the backend is running on http://localhost:8080');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Enhanced filtering based on search filter selection
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patientsData;
    
    const term = searchTerm.toLowerCase().trim();
    
    return patientsData.filter(patient => {
      switch (searchFilter) {
        case 'name':
          return patient.userData?.username?.toLowerCase().includes(term);
        case 'email':
          return patient.userData?.email?.toLowerCase().includes(term);
        case 'phone':
          return patient.userData?.phoneNumber?.toLowerCase().includes(term);
        case 'id':
          return patient.pid?.toLowerCase().includes(term);
        case 'all':
        default:
          return (
            patient.userData?.username?.toLowerCase().includes(term) ||
            patient.userData?.email?.toLowerCase().includes(term) ||
            patient.userData?.phoneNumber?.toLowerCase().includes(term) ||
            patient.pid?.toLowerCase().includes(term)
          );
      }
    });
  }, [searchTerm, patientsData, searchFilter]);

  // Reset to first page when search term or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchFilter]);

  // Fixed pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage));
  
  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  // Update currentPage if it's out of range
  useEffect(() => {
    if (currentPage !== validCurrentPage) {
      setCurrentPage(validCurrentPage);
    }
  }, [currentPage, validCurrentPage]);

  // Fixed current patients calculation
  const currentPatients = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPatients.slice(startIndex, endIndex);
  }, [filteredPatients, validCurrentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    const newPage = Math.min(Math.max(1, pageNumber), totalPages);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      // Scroll to top of table when page changes
      setTimeout(() => {
        document.querySelector('.overflow-x-auto')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 50);
    }
  };

  const handleDelete = async (patient) => {
    if (window.confirm(`Are you sure you want to delete patient ${patient.userData?.username}?`)) {
      try {
        // Add actual delete API call here
        console.log('Delete patient:', patient);
        
        // For now, just remove from local state (replace with actual API call)
        const newPatientsData = patientsData.filter(p => p.pid !== patient.pid);
        setPatientsData(newPatientsData);
        
        // Calculate new pagination after deletion
        const filteredAfterDelete = searchTerm 
          ? newPatientsData.filter(p => {
              const term = searchTerm.toLowerCase().trim();
              switch (searchFilter) {
                case 'name':
                  return p.userData?.username?.toLowerCase().includes(term);
                case 'email':
                  return p.userData?.email?.toLowerCase().includes(term);
                case 'phone':
                  return p.userData?.phoneNumber?.toLowerCase().includes(term);
                case 'id':
                  return p.pid?.toLowerCase().includes(term);
                case 'all':
                default:
                  return (
                    p.userData?.username?.toLowerCase().includes(term) ||
                    p.userData?.email?.toLowerCase().includes(term) ||
                    p.userData?.phoneNumber?.toLowerCase().includes(term) ||
                    p.pid?.toLowerCase().includes(term)
                  );
              }
            })
          : newPatientsData;
        
        const newTotalPages = Math.ceil(filteredAfterDelete.length / itemsPerPage);
        
        // Adjust current page if necessary
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        } else if (newTotalPages === 0) {
          setCurrentPage(1);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error deleting patient:', err);
      }
    }
  };

  const handleEdit = (patient) => {
    console.log('Edit patient:', patient);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchFilter('all');
    setCurrentPage(1);
  };

  const handleSearchFilterChange = (filter) => {
    setSearchFilter(filter);
    setCurrentPage(1);
  };

  // Pagination info calculations
  const startIndex = filteredPatients.length === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(validCurrentPage * itemsPerPage, filteredPatients.length);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading patients...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <button 
            onClick={fetchPatients}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
          <div className="text-sm text-gray-500 text-center">
            <p>Troubleshooting steps:</p>
            <ul className="mt-2 space-y-1">
              <li>• Check if Ballerina service is running on port 8080</li>
              <li>• Verify you're logged in as admin</li>
              <li>• Check CORS configuration allows localhost:3000</li>
              <li>• Check browser console for detailed errors</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        <button
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Add patient clicked')}
        >
          + Add Patient
        </button>
      </div>

      {/* Enhanced Search Section */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 self-center mr-2">Search by:</span>
            {[
              { key: 'all', label: 'All Fields' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
              { key: 'id', label: 'Patient ID' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleSearchFilterChange(filter.key)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchFilter === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search patients by ${searchFilter === 'all' ? 'any field' : searchFilter}...`}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Summary */}
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">
              {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
            </span>
            {' '}matching "{searchTerm}" in {searchFilter === 'all' ? 'all fields' : searchFilter}
          </div>
        )}
      </div>

      {/* Statistics and Results Info */}
      <div className="mb-6">
        <div className="text-sm text-gray-600">
          Total Patients: <span className="font-semibold text-blue-600">{patientsData.length}</span>
          {filteredPatients.length > 0 && (
            <span> | Showing: <span className="font-semibold text-green-600">
              {startIndex} to {endIndex} of {filteredPatients.length}
            </span></span>
          )}
          {totalPages > 1 && (
            <span> | Page: <span className="font-semibold text-purple-600">
              {validCurrentPage} of {totalPages}
            </span></span>
          )}
        </div>
      </div>

      {/* Patient List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOB
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPatients.length > 0 ? (
              currentPatients.map((patient, index) => (
                <tr key={`${patient.pid}-${validCurrentPage}-${index}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {patient.pid || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.userData?.username || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.userData?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.userData?.phoneNumber || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {patient.gender || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.DOB || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {patient.userData?.city || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        onClick={() => handleEdit(patient)}
                        title="Edit patient"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        onClick={() => handleDelete(patient)}
                        title="Delete patient"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    {searchTerm ? (
                      <div>
                        <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-lg font-medium">No patients found</p>
                        <p className="text-sm">No patients match "{searchTerm}" in {searchFilter === 'all' ? 'any field' : searchFilter}</p>
                        <button
                          onClick={clearSearch}
                          className="mt-2 text-blue-600 hover:text-blue-700 text-sm underline"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium">No patients found</p>
                        <p className="text-sm">Add your first patient to get started</p>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination Controls */}
      {filteredPatients.length > 0 && totalPages > 1 && (
        <div className="mt-8">
          {/* Pagination Info */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              Page {validCurrentPage} of {totalPages} ({filteredPatients.length} total patients)
            </div>
            
            {/* Pagination Buttons */}
            <div className="flex justify-center items-center space-x-2">
              {/* First Page Button */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={validCurrentPage === 1}
                className="px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First Page"
              >
                ««
              </button>
              
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(validCurrentPage - 1)}
                disabled={validCurrentPage === 1}
                className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {(() => {
                const pageNumbers = [];
                const maxVisiblePages = 5;
                let startPage = Math.max(1, validCurrentPage - Math.floor(maxVisiblePages / 2));
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                
                // Adjust startPage if we're near the end
                if (endPage - startPage < maxVisiblePages - 1) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                // Add first page and ellipsis if needed
                if (startPage > 1) {
                  pageNumbers.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                    >
                      1
                    </button>
                  );
                  if (startPage > 2) {
                    pageNumbers.push(
                      <span key="ellipsis1" className="px-2 py-2 text-gray-500">...</span>
                    );
                  }
                }

                // Add visible page numbers
                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        validCurrentPage === i
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                // Add last page and ellipsis if needed
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pageNumbers.push(
                      <span key="ellipsis2" className="px-2 py-2 text-gray-500">...</span>
                    );
                  }
                  pageNumbers.push(
                    <button
                      key={totalPages}
                      onClick={() => handlePageChange(totalPages)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pageNumbers;
              })()}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(validCurrentPage + 1)}
                disabled={validCurrentPage === totalPages}
                className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
              
              {/* Last Page Button */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={validCurrentPage === totalPages}
                className="px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last Page"
              >
                »»
              </button>
            </div>
          </div>

          {/* Quick Page Jump */}
          {totalPages > 10 && (
            <div className="flex justify-center items-center space-x-2 text-sm">
              <span className="text-gray-600">Go to page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={validCurrentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                }}
                className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
              />
              <span className="text-gray-600">of {totalPages}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPatient;