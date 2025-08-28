import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; // For making API calls
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Set a default base URL for axios to simplify API calls
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/pharmacy', // Your Ballerina backend URL
  withCredentials: true, // Important for sending cookies for authentication
});


// ===================================================================================
//  MODAL COMPONENT FOR ADDING/EDITING MEDICINE
// ===================================================================================
const MedicineFormModal = ({ isOpen, onClose, onSave, medicine, masterMedicineList }) => {
  const [formData, setFormData] = useState({
    medicineId: '',
    price: '',
    availableState: '',
    latestUpdate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (medicine) { // Editing existing inventory
      setFormData({
        medicineId: medicine.medicineId || '',
        price: medicine.price || '',
        availableState: medicine.availableState || '',
        latestUpdate: medicine.latestUpdate ? new Date(medicine.latestUpdate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        inventoryId: medicine.inventoryId // Keep track of inventoryId for updates
      });
    } else { // Adding new inventory
      setFormData({
        medicineId: '', price: '', availableState: '',
        latestUpdate: new Date().toISOString().split('T')[0]
      });
    }
  }, [medicine, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">{medicine ? 'Edit Stock Details' : 'Add New Medicine to Stock'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select 
            name="medicineId" 
            value={formData.medicineId} 
            onChange={handleChange} 
            required 
            disabled={!!medicine}
            className="w-full p-3 border border-indigo-200 rounded-lg bg-white disabled:bg-gray-100"
          >
            <option value="" disabled>-- Select a Medicine --</option>
            {masterMedicineList.map(med => (
              <option key={med.mediId} value={med.mediId}>{med.name}</option>
            ))}
          </select>

          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (LKR)" required className="w-full p-3 border border-indigo-200 rounded-lg" />
          <input type="number" name="availableState" value={formData.availableState} onChange={handleChange} placeholder="Available Stock" required className="w-full p-3 border border-indigo-200 rounded-lg" />
          <input type="date" name="latestUpdate" value={formData.latestUpdate} onChange={handleChange} required className="w-full p-3 border border-indigo-200 rounded-lg" />
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ===================================================================================
//  HEADER COMPONENT
// ===================================================================================
// CHANGE: The component now receives a dynamic list of forms for the filter
const Header = ({ searchQuery, setSearchQuery, selectedForm, setSelectedForm, forms, onAddNew }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-indigo-900">Medicine Stock</h1>
        <p className="text-indigo-600">Manage your pharmacy inventory.</p>
      </div>
      <div className="flex items-center space-x-2">
        <input type="text" placeholder="Search medicine..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded-lg" />
        <select value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)} className="p-2 border rounded-lg">
          {/* The options are now generated from the data */}
          {forms.map(form => <option key={form} value={form}>{form}</option>)}
        </select>
        <button onClick={onAddNew} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold">
          Add New
        </button>
      </div>
    </div>
  );
};

// ===================================================================================
//  STATS CARDS COMPONENT
// ===================================================================================
const StatsCards = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-green-100">
            <h3 className="text-lg font-semibold text-indigo-900">In Stock</h3>
            <p className="text-3xl font-bold text-indigo-900 mt-4">{stats.inStock}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-yellow-100">
            <h3 className="text-lg font-semibold text-indigo-900">Low Stock</h3>
            <p className="text-3xl font-bold text-indigo-900 mt-4">{stats.lowStock}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-red-100">
            <h3 className="text-lg font-semibold text-indigo-900">Out of Stock</h3>
            <p className="text-3xl font-bold text-indigo-900 mt-4">{stats.outOfStock}</p>
        </div>
    </div>
);


// ===================================================================================
//  STOCK CHART COMPONENT
// ===================================================================================
const StockChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name), // The name here is the form type (e.g., 'tablet')
    datasets: [{
      label: 'Units in Stock',
      data: data.map(item => item.value),
      backgroundColor: 'rgba(79, 70, 229, 0.7)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1,
      borderRadius: 8,
    }],
  };
  const options = { responsive: true, scales: { y: { beginAtZero: true } } };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-indigo-900 text-lg mb-4">Stock by Form</h3>
      <div className="h-72"><Bar data={chartData} options={options} /></div>
    </div>
  );
};


// ===================================================================================
//  MEDICINE TABLE COMPONENT
// ===================================================================================
const MedicineTable = ({ medicines, onEdit, onDelete }) => {
  const getStatus = (stock, reorderLevel = 50) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock <= reorderLevel) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
    return { text: "In Stock", color: "bg-green-100 text-green-700" };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-semibold text-indigo-900 text-lg mb-6">Medicine Stock Inventory</h3>
      <div className="overflow-x-auto rounded-xl border border-indigo-100">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-50"><tr className="text-left text-indigo-700">
            {/* CHANGE: Changed table header from "Category" to "Form" */}
            <th className="py-3 px-4">Medicine</th><th className="py-3 px-4">Form</th><th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock</th><th className="py-3 px-4">Status</th><th className="py-3 px-4">Actions</th>
          </tr></thead>
          <tbody>
            {medicines.map((med) => {
              const status = getStatus(parseInt(med.availableState));
              return (
                <tr key={med.inventoryId} className="border-b border-indigo-50 hover:bg-indigo-50/40">
                  <td className="py-3 px-4 font-medium text-indigo-900">{med.name}</td>
                  {/* CHANGE: Displaying `med.form` instead of `med.category` */}
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">{med.form}</span></td>
                  <td className="py-3 px-4">{parseFloat(med.price).toFixed(2)} LKR</td>
                  <td className="py-3 px-4 font-medium">{med.availableState}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.text}</span></td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button onClick={() => onEdit(med)} className="text-blue-500">Edit</button>
                    <button onClick={() => onDelete(med.inventoryId)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              );
            })}
            {medicines.length === 0 && (
              <tr><td colSpan="6" className="py-6 text-center text-indigo-500">No medicines found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// ===================================================================================
//  MAIN PAGE COMPONENT
// ===================================================================================
function PharmacyMedicineStock() {
  const [medicines, setMedicines] = useState([]);
  const [masterMedicineList, setMasterMedicineList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // CHANGE: Renamed state variable for clarity
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForm, setSelectedForm] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  
  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [inventoryResponse, masterListResponse] = await Promise.all([
        apiClient.get(`/myinventory`),
        apiClient.get(`/medicines`)
      ]);
      setMedicines(inventoryResponse.data.data || []);
      setMasterMedicineList(masterListResponse.data.data || []);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleSaveMedicine = async (formData) => {
    const isEditing = !!formData.inventoryId;
    const payload = {
      medicineId: formData.medicineId,
      inventoryData: {
        availableState: String(formData.availableState),
        price: String(formData.price),
        latestUpdate: new Date(formData.latestUpdate).toISOString()
      }
    };
    try {
      if (isEditing) {
        await apiClient.put(`/inventory/${formData.inventoryId}`, payload);
      } else {
        await apiClient.post('/addInventory', payload);
      }
      fetchInitialData();
      closeModal();
    } catch (err) {
      console.error("Failed to save medicine:", err);
      alert("Error: Could not save medicine.");
    }
  };

  const handleDeleteMedicine = async (inventoryId) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await apiClient.delete(`/inventory/${inventoryId}`);
        fetchInitialData();
      } catch (err) {
        console.error("Failed to delete medicine:", err);
        alert("Error: Could not delete medicine.");
      }
    }
  };

  const openAddNewModal = () => { setEditingMedicine(null); setIsModalOpen(true); };
  const openEditModal = (medicine) => { setEditingMedicine(medicine); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingMedicine(null); };

  // CHANGE: Dynamically generate the list of unique forms for the filter dropdown
  const medicineForms = useMemo(() => {
    const forms = [...new Set(medicines.map(m => m.form).filter(Boolean))];
    return ['All', ...forms];
  }, [medicines]);

  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
      // CHANGE: Filter logic now uses `med.form` and `selectedForm`
      const matchesForm = selectedForm === 'All' || med.form === selectedForm;
      return matchesSearch && matchesForm;
    });
  }, [medicines, searchQuery, selectedForm]);

  const stats = useMemo(() => {
    const reorderLevel = 50;
    return {
      inStock: medicines.filter(m => parseInt(m.availableState) > reorderLevel).length,
      lowStock: medicines.filter(m => parseInt(m.availableState) <= reorderLevel && parseInt(m.availableState) > 0).length,
      outOfStock: medicines.filter(m => parseInt(m.availableState) === 0).length
    };
  }, [medicines]);

  // CHANGE: Chart now groups data by `med.form`
  const chartDataArray = useMemo(() => {
    const dataByForm = medicines.reduce((acc, med) => {
      if(med.form && med.form !== "N/A") {
        acc[med.form] = (acc[med.form] || 0) + parseInt(med.availableState);
      }
      return acc;
    }, {});
    return Object.entries(dataByForm).map(([name, value]) => ({ name, value }));
  }, [medicines]);
  
  return (
    <>
      <MedicineFormModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveMedicine}
        medicine={editingMedicine}
        masterMedicineList={masterMedicineList}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
            forms={medicineForms}
            onAddNew={openAddNewModal}
          />
          
          <StatsCards stats={stats} />
          
          <StockChart data={chartDataArray} />
          
          {isLoading && <p className="text-center text-indigo-600">Loading inventory...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!isLoading && !error && (
            <MedicineTable 
              medicines={filteredMedicines} 
              onEdit={openEditModal}
              onDelete={handleDeleteMedicine}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PharmacyMedicineStock;