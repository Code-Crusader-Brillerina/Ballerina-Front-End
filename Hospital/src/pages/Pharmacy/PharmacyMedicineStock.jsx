import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Package, AlertTriangle, CheckCircle, Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// API client setup
const apiClient = axios.create({
  baseURL: "http://localhost:8080/pharmacy",
  withCredentials: true,
});

// ===================================================================================
//  MODAL COMPONENT (Styling tweaks for consistency)
// ===================================================================================
const MedicineFormModal = ({ isOpen, onClose, onSave, medicine, masterMedicineList }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (medicine) { // Editing existing inventory
        setFormData({
          medicineId: medicine.medicineId || '',
          price: medicine.price || '',
          availableState: medicine.availableState || '',
          latestUpdate: medicine.latestUpdate ? new Date(medicine.latestUpdate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          inventoryId: medicine.inventoryId
        });
      } else { // Adding new inventory
        setFormData({
          medicineId: '', price: '', availableState: '',
          latestUpdate: new Date().toISOString().split('T')[0]
        });
      }
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

  const isEditing = !!medicine;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Stock Details' : 'Add New Medicine to Stock'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select 
            name="medicineId" 
            value={formData.medicineId} 
            onChange={handleChange} 
            required 
            disabled={isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>-- Select a Medicine --</option>
            {masterMedicineList.map(med => (
              <option key={med.mediId} value={med.mediId}>{med.name}</option>
            ))}
          </select>
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (LKR)" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="number" name="availableState" value={formData.availableState} onChange={handleChange} placeholder="Available Quantity" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <input type="date" name="latestUpdate" value={formData.latestUpdate} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===================================================================================
//  METRIC CARD COMPONENT (Re-styled to match the Dashboard)
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
//  MAIN PAGE COMPONENT (Re-styled)
// ===================================================================================
function PharmacyMedicineStock() {
  const [inventory, setInventory] = useState([]);
  const [masterMedicineList, setMasterMedicineList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      setInventory(inventoryResponse.data.data || []);
      setMasterMedicineList(masterListResponse.data.data || []);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
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
        latestUpdate: new Date(formData.latestUpdate).toISOString().split('T')[0]
      }
    };
    try {
      if (isEditing) {
        await apiClient.put(`/inventory/${formData.inventoryId}`, payload);
      } else {
        // CORRECTED: URL to match Ballerina's kebab-case convention
        await apiClient.post('/add-inventory', payload);
      }
      fetchInitialData();
      closeModal();
    } catch (err) {
      alert("Error: Could not save medicine. The medicine may already be in your inventory.");
    }
  };

  const handleDeleteMedicine = async (inventoryId) => {
    if (window.confirm("Are you sure you want to delete this item from your inventory?")) {
      try {
        await apiClient.delete(`/inventory/${inventoryId}`);
        fetchInitialData();
      } catch (err) {
        alert("Error: Could not delete medicine.");
      }
    }
  };

  const openAddNewModal = () => { setEditingMedicine(null); setIsModalOpen(true); };
  const openEditModal = (medicine) => { setEditingMedicine(medicine); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingMedicine(null); };

  const medicineForms = useMemo(() => ['All', ...new Set(inventory.map(m => m.form).filter(Boolean))], [inventory]);

  const filteredMedicines = useMemo(() => {
    return inventory.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesForm = selectedForm === 'All' || med.form === selectedForm;
      return matchesSearch && matchesForm;
    });
  }, [inventory, searchQuery, selectedForm]);

  const stats = useMemo(() => {
    const reorderLevel = 50;
    return {
      inStock: inventory.filter(m => parseInt(m.availableState) > reorderLevel).length,
      lowStock: inventory.filter(m => parseInt(m.availableState) <= reorderLevel && parseInt(m.availableState) > 0).length,
      outOfStock: inventory.filter(m => parseInt(m.availableState) === 0).length
    };
  }, [inventory]);

  const chartData = useMemo(() => {
    const dataByForm = inventory.reduce((acc, med) => {
      if (med.form && med.form !== "-") {
        acc[med.form] = (acc[med.form] || 0) + parseInt(med.availableState);
      }
      return acc;
    }, {});
    return {
      labels: Object.keys(dataByForm),
      datasets: [{
        label: 'Total Units in Stock',
        data: Object.values(dataByForm),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
        borderRadius: 8,
      }],
    };
  }, [inventory]);

  const getStatus = (stock, reorderLevel = 50) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock <= reorderLevel) return { text: "Low Stock", color: "bg-amber-100 text-amber-700" };
    return { text: "In Stock", color: "bg-emerald-100 text-emerald-700" };
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  
  return (
    <>
      <MedicineFormModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveMedicine} medicine={editingMedicine} masterMedicineList={masterMedicineList}/>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Medicine Inventory
          </h1>
          <p className="text-gray-600 mt-2">Manage, track, and analyze your entire medicine stock.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MetricCard title="In Stock" value={stats.inStock} icon={CheckCircle} color="emerald" />
            <MetricCard title="Low Stock" value={stats.lowStock} icon={AlertTriangle} color="amber" />
            <MetricCard title="Out of Stock" value={stats.outOfStock} icon={Package} color="red" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Table Section */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">All Medicine Stock</h3>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-56">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type="text" placeholder="Search medicine..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="relative w-full sm:w-40">
                          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)} className="w-full p-2 pl-10 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-500">
                              {medicineForms.map(form => <option key={form} value={form}>{form}</option>)}
                          </select>
                        </div>
                        <button onClick={openAddNewModal} className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                          <Plus className="w-5 h-5" /> Add New
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50/70">
                            <tr>
                                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Medicine</th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Form</th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Price (LKR)</th>
                                <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Stock</th>
                                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredMedicines.map((med) => {
                                const status = getStatus(parseInt(med.availableState));
                                return (
                                <tr key={med.inventoryId} className="hover:bg-gray-50">
                                    <td className="p-4 font-semibold text-gray-800">{med.name}</td>
                                    <td className="p-4 text-gray-600">{med.form}</td>
                                    <td className="p-4 text-gray-600">{parseFloat(med.price).toFixed(2)}</td>
                                    <td className="p-4 text-center font-bold text-gray-800">{med.availableState}</td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.color}`}>{status.text}</span></td>
                                    <td className="p-4 flex justify-end space-x-4">
                                        <button onClick={() => openEditModal(med)} className="text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4"/></button>
                                        <button onClick={() => handleDeleteMedicine(med.inventoryId)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Chart Section */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Stock by Form</h3>
                <div className="h-80"><Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} /></div>
            </div>
        </div>
      </div>
    </>
  );
}

export default PharmacyMedicineStock;