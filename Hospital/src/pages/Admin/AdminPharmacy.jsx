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

    useEffect(() => {
        fetchPharmacies();
    }, []);

    const fetchPharmacies = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // CHANGED: Corrected URL to kebab-case
            const response = await fetch('http://localhost:8080/admin/getAllPharmacies', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();
            
            if (result.success && result.data) {
                setPharmaciesData(result.data);
            } else {
                throw new Error(result.message || 'Failed to fetch pharmacy data');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPharmacy = async (pharmacyData) => {
        try {
            // CHANGED: Corrected URL to kebab-case
            const response = await fetch('http://localhost:8080/admin/addPharmacy', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pharmacyData),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();
            
            if (result.success) {
                setIsModalOpen(false);
                fetchPharmacies(); // Refetch the list to include the new pharmacy
            } else {
                throw new Error(result.message || 'Failed to add pharmacy');
            }
        } catch (error) {
            alert('Error adding pharmacy: ' + error.message);
        }
    };

    const handleDeletePharmacy = async (phId) => {
        if (window.confirm('Are you sure you want to delete this pharmacy?')) {
            try {
                // CHANGED: Corrected URL to kebab-case
                const response = await fetch('http://localhost:8080/admin/deletePharmacy', {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phId: phId }),
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();
                
                if (result.success) {
                    setPharmaciesData(prev => prev.filter(pharmacy => pharmacy.phId !== phId));
                } else {
                    throw new Error(result.message || 'Failed to delete pharmacy');
                }
            } catch (error) {
                alert('Error deleting pharmacy: ' + error.message);
            }
        }
    };
    
    // ... rest of the component remains the same
    const handleEditPharmacy = (pharmacy) => {
      console.log('Edit pharmacy:', pharmacy);
    };
  
    const filteredPharmacies = useMemo(() => {
      if (!searchTerm) return pharmaciesData;
      return pharmaciesData.filter(pharmacy => {
        const pharmacyName = pharmacy.pharmacyName || '';
        const email = pharmacy.userData?.email || '';
        return pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               email.toLowerCase().includes(searchTerm.toLowerCase());
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
  
    if (loading) {
      return <div className="p-8 text-center">Loading...</div>;
    }
  
    if (error) {
      return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }
  
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Pharmacy Management</h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search pharmacies..."
              className="px-4 py-2 border rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full"
            >
              + Add Pharmacy
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pharmacy ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPharmacies.map((pharmacy) => (
                <tr key={pharmacy.phId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{pharmacy.phId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{pharmacy.pharmacyName || pharmacy.userData?.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{pharmacy.userData?.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{pharmacy.userData?.phoneNumber}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleEditPharmacy(pharmacy)} className="text-blue-600 hover:text-blue-900 mr-3"><FaEdit /></button>
                    <button onClick={() => handleDeletePharmacy(pharmacy.phId)} className="text-red-600 hover:text-red-900"><FaTrashAlt /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        )}

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