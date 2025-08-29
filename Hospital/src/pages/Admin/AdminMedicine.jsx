import React, { useState, useMemo, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddMedicineModal from '../../components/Admin/AdminMedicine/AddMedicineModal';

const AdminMedicine = () => {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesData, setMedicinesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const itemsPerPage = 10;

  // Fetch medicines function
  const fetchMedicines = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await fetch('http://localhost:8080/admin/getAllMedicines', {
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
        setMedicinesData(result.data);
        console.log('Medicines loaded successfully:', result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch medicine data');
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

  // Load data on component mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddMedicine = async (medicineData) => {
    try {
      const response = await fetch('http://localhost:8080/admin/addMedicine', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          console.log('Medicine added successfully:', medicineData);
          setIsModalOpen(false);
          // Refresh the medicines list
          await fetchMedicines();
          // Reset to first page to show the newly added medicine
          setCurrentPage(1);
        } else {
          throw new Error(result.message || 'Failed to add medicine');
        }
      } else {
        throw new Error('Failed to add medicine');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error adding medicine:', err);
    }
  };

  const handleEditMedicine = (medicine) => {
    console.log('Editing medicine:', medicine);
  };

  const handleDeleteMedicine = async (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const response = await fetch(`http://localhost:8080/admin/deleteMedicine/${medicineId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('Medicine deleted successfully');
            // Update local state immediately to avoid refetch
            const newMedicinesData = medicinesData.filter(med => med.mediId !== medicineId);
            setMedicinesData(newMedicinesData);
            
            // Calculate new pagination after deletion
            const filteredAfterDelete = searchTerm 
              ? newMedicinesData.filter(medicine => 
                  medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()))
              : newMedicinesData;
            
            const newTotalPages = Math.ceil(filteredAfterDelete.length / itemsPerPage);
            
            // Adjust current page if necessary
            if (currentPage > newTotalPages && newTotalPages > 0) {
              setCurrentPage(newTotalPages);
            } else if (newTotalPages === 0) {
              setCurrentPage(1);
            }
          } else {
            throw new Error(result.message || 'Failed to delete medicine');
          }
        } else {
          throw new Error('Failed to delete medicine');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error deleting medicine:', err);
      }
    }
  };

  // Fixed filteredMedicines calculation
  const filteredMedicines = useMemo(() => {
    if (!searchTerm.trim()) return medicinesData;
    return medicinesData.filter(medicine =>
      medicine.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm, medicinesData]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fixed pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / itemsPerPage));
  
  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  // Update currentPage if it's out of range
  useEffect(() => {
    if (currentPage !== validCurrentPage) {
      setCurrentPage(validCurrentPage);
    }
  }, [currentPage, validCurrentPage]);

  // Fixed current medicines calculation
  const currentMedicines = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMedicines.slice(startIndex, endIndex);
  }, [filteredMedicines, validCurrentPage, itemsPerPage]);

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

  // Fixed pagination info calculations
  const startIndex = filteredMedicines.length === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(validCurrentPage * itemsPerPage, filteredMedicines.length);

  // Loading State
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading medicines...</div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <button 
            onClick={fetchMedicines}
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
      {/* Header, Search, and Add Medicine Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Medicine Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by medicine name..."
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

      {/* Results Summary */}
      {filteredMedicines.length > 0 ? (
        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex} to {endIndex} of {filteredMedicines.length} medicines
          {searchTerm && ` (filtered by "${searchTerm}")`}
        </div>
      ) : searchTerm ? (
        <div className="mb-4 text-sm text-gray-600">
          No medicines found for "{searchTerm}"
        </div>
      ) : (
        <div className="mb-4 text-sm text-gray-600">
          No medicines available
        </div>
      )}

      {/* Medicine List Table */}
      <div className="overflow-x-auto">
        {currentMedicines.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm 
              ? `No medicines found matching "${searchTerm}". Try adjusting your search.`
              : 'No medicines available. Click "Add Medicine" to get started.'
            }
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strength</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMedicines.map((medicine, index) => (
                <tr key={`${medicine.mediId}-${validCurrentPage}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{medicine.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.form || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.strength || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.medicineType || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medicine.size || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{medicine.description || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.price ? `$${medicine.price}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditMedicine(medicine)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title="Edit medicine"
                    >
                      <FaEdit className="inline-block h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMedicine(medicine.mediId)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete medicine"
                    >
                      <FaTrashAlt className="inline-block h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Enhanced Pagination Controls - Only show if there are results */}
      {filteredMedicines.length > 0 && totalPages > 1 && (
        <div className="mt-8">
          {/* Pagination Info */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              Page {validCurrentPage} of {totalPages} ({filteredMedicines.length} total medicines)
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
                          ? 'bg-blue-600 text-white'
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