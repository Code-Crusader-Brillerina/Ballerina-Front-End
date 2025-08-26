import React, { useState, useMemo, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddPharmacyModal from '../../components/Admin/AdminPharmacy/AddPharmacyModal';

const AdminPharmacy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pharmaciesData, setPharmaciesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  // Load pharmacies data on component mount
  useEffect(() => {
    fetchPharmacies();
  }, []);

  // Fetch pharmacies data from API
  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8080/admin/getAllPharmacies', {
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
        setPharmaciesData(result.data);
        console.log('Pharmacies loaded successfully:', result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch pharmacy data');
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

  const handleAddPharmacy = async (pharmacyData) => {
    try {
      const response = await fetch('http://localhost:8080/admin/addPharmacy', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pharmacyData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Pharmacy added successfully:', result);
        setIsModalOpen(false);
        await fetchPharmacies();
      } else {
        console.error('Failed to add pharmacy:', result.message);
        setError('Failed to add pharmacy: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding pharmacy:', error);
      setError('Error adding pharmacy: ' + error.message);
    }
  };

  const handleDeletePharmacy = async (phId) => {
    if (window.confirm('Are you sure you want to delete this pharmacy?')) {
      try {
        const response = await fetch('http://localhost:8080/admin/deletePharmacy', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phId: phId
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          console.log('Pharmacy deleted successfully');
          setPharmaciesData(prev => prev.filter(pharmacy => pharmacy.phId !== phId));
        } else {
          console.error('Failed to delete pharmacy:', result.message);
          setError('Failed to delete pharmacy: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting pharmacy:', error);
        setError('Error deleting pharmacy: ' + error.message);
      }
    }
  };

  const handleEditPharmacy = (pharmacy) => {
    console.log('Edit pharmacy:', pharmacy);
    // You can implement edit functionality here
  };

  const filteredPharmacies = useMemo(() => {
    if (!searchTerm) return pharmaciesData;
    return pharmaciesData.filter(pharmacy => {
      const pharmacyName = pharmacy.name || pharmacy.pharmacyName || '';
      const email = pharmacy.email || pharmacy.userData?.email || '';
      const contactNumber = pharmacy.contactNomber || pharmacy.userData?.phoneNumber || '';
      const username = pharmacy.userData?.username || '';
      
      return pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
             username.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, pharmaciesData]);

  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);
  const currentPharmacies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPharmacies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPharmacies, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPharmacyDisplayName = (pharmacy) => {
    return pharmacy.name || pharmacy.pharmacyName || pharmacy.userData?.username || 'N/A';
  };

  const getPharmacyEmail = (pharmacy) => {
    return pharmacy.email || pharmacy.userData?.email || 'N/A';
  };

  const getPharmacyContact = (pharmacy) => {
    return pharmacy.contactNomber || pharmacy.userData?.phoneNumber || 'N/A';
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="ml-4 text-lg text-gray-600">Loading pharmacies...</div>
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
            onClick={fetchPharmacies}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
          <div className="text-sm text-gray-500 text-center">
            <p>Troubleshooting steps:</p>
            <ul className="mt-2 space-y-1">
              <li>• Check if Ballerina service is running on port 8080</li>
              <li>• Check CORS configuration allows localhost:3000</li>
              <li>• Check browser console for detailed errors</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pharmacy Management</h1>
          <p className="text-gray-600 mt-1">Manage hospital pharmacy network</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search pharmacies..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            + Add Pharmacy
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Pharmacies</h3>
          <p className="text-3xl font-bold">{pharmaciesData.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Pharmacies</h3>
          <p className="text-3xl font-bold">{pharmaciesData.filter(p => p.userData || p.name).length}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <p className="text-3xl font-bold">{filteredPharmacies.length}</p>
        </div>
      </div>

      {/* Pharmacy List Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pharmacy ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPharmacies.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                  <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">🏥</div>
                    <div className="text-lg font-medium">No pharmacies found</div>
                    <div className="text-sm mt-2">
                      {searchTerm ? 'Try adjusting your search terms' : 'Add your first pharmacy to get started'}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              currentPharmacies.map((pharmacy, index) => (
                <tr 
                  key={pharmacy.phId || pharmacy._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {pharmacy.phId || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span className="font-semibold">{getPharmacyDisplayName(pharmacy)}</span>
                      {pharmacy.userData?.username && pharmacy.userData.username !== getPharmacyDisplayName(pharmacy) && (
                        <span className="text-xs text-gray-500">User: {pharmacy.userData.username}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPharmacyEmail(pharmacy) !== 'N/A' ? (
                      <a 
                        href={`mailto:${getPharmacyEmail(pharmacy)}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {getPharmacyEmail(pharmacy)}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPharmacyContact(pharmacy) !== 'N/A' ? (
                      <a 
                        href={`tel:${getPharmacyContact(pharmacy)}`}
                        className="text-green-600 hover:text-green-800 hover:underline"
                      >
                        {getPharmacyContact(pharmacy)}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 p-2 rounded-full transition-colors"
                        onClick={() => handleEditPharmacy(pharmacy)}
                        title="Edit Pharmacy"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button 
                        className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 p-2 rounded-full transition-colors"
                        onClick={() => handleDeletePharmacy(pharmacy.phId)}
                        title="Delete Pharmacy"
                      >
                        <FaTrashAlt className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {currentPharmacies.length} of {filteredPharmacies.length} pharmacies
        {searchTerm && ` (filtered from ${pharmaciesData.length} total)`}
      </div>

      {/* Add Pharmacy Modal */}
      {isModalOpen && (
        <AddPharmacyModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPharmacy}
        />
      )}
    </div>
  );
};

export default AdminPharmacy;