import React, { useState, useMemo, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa';
// import AddPharmacyModal from '../../components/Admin/AdminPharmacy/AddPharmacyModal';

const AdminPharmacy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pharmaciesData, setPharmaciesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const itemsPerPage = 8;

  // Check if user is already authenticated on component mount
  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      setLoading(true);
      await fetchPharmacies();
      setIsAuthenticated(true);
    } catch (err) {
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Admin login function
  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Admin login successful');
        setIsAuthenticated(true);
        setLoginCredentials({ username: '', password: '' });
        await fetchPharmacies();
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Login error: ' + error.message);
      console.error('Login error:', error);
    } finally {
      setLoginLoading(false);
    }
  };

  // Admin logout function
  const adminLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Clear local state regardless of response
      setIsAuthenticated(false);
      setPharmaciesData([]);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state
      setIsAuthenticated(false);
      setPharmaciesData([]);
    }
  };

  // Fetch pharmacies data from API
  const fetchPharmacies = async () => {
    try {
      setError(null);
      
      const response = await fetch('http://localhost:8080/admin/getAllPharmacies', {
        method: 'GET',
        credentials: 'include', // Include cookies for JWT authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Check if response is ok
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login as admin');
        }
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
        throw new Error('Cannot connect to server. Please check if the backend is running on http://localhost:8080');
      } else {
        throw new Error(err.message);
      }
    }
  };

  const handleAddPharmacy = async (pharmacyData) => {
    try {
      const response = await fetch('http://localhost:8080/admin/addPharmacy', {
        method: 'POST',
        credentials: 'include', // Include cookies for JWT authentication
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
        // Refresh the pharmacy list
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
          credentials: 'include', // Include cookies for JWT authentication
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
          // Remove from local state
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
    // For example, open a modal with pre-filled data
  };

  // Updated filtering logic to handle the correct data structure
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

  // Helper function to get the display name for a pharmacy
  const getPharmacyDisplayName = (pharmacy) => {
    return pharmacy.name || pharmacy.pharmacyName || pharmacy.userData?.username || 'N/A';
  };

  // Helper function to get the email for a pharmacy
  const getPharmacyEmail = (pharmacy) => {
    return pharmacy.email || pharmacy.userData?.email || 'N/A';
  };

  // Helper function to get the contact number for a pharmacy
  const getPharmacyContact = (pharmacy) => {
    return pharmacy.contactNomber || pharmacy.userData?.phoneNumber || 'N/A';
  };

  // Login Form Component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-blue-600 text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Please login to access Pharmacy Management</p>
          </div>

          <form onSubmit={adminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter admin username"
                value={loginCredentials.username}
                onChange={(e) => setLoginCredentials(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter admin password"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-600 text-sm">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure admin access to Hospital Management System</p>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={checkAuthAndFetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
          <button 
            onClick={adminLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Logout
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

  // Main Dashboard
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header with Logout */}
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
          <button
            onClick={adminLogout}
            className="bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            Logout
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
          
          {/* Page numbers */}
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