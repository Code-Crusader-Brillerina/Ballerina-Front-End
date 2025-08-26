import React, { useState } from 'react';
import { FaTimes, FaCapsules, FaFlask, FaBox, FaInfoCircle, FaTag } from 'react-icons/fa';

const AddMedicineModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    strength: '',
    form: '',
    medicineType: '',
    size: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert price to number if it's provided
    const submissionData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : 0
    };
    
    onSubmit(submissionData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border border-gray-200 animate-scaleIn">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaCapsules className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Add New Medicine</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-2 flex items-center">
              <FaCapsules className="mr-2 text-blue-600" /> Medicine Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="e.g., Paracetamol" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <label htmlFor="form" className="block text-sm font-medium text-indigo-800 mb-2 flex items-center">
                <FaBox className="mr-2 text-indigo-600" /> Form
              </label>
              <select 
                name="form" 
                id="form" 
                value={formData.form} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
                required
              >
                <option value="">Select Form</option>
                <option value="tablet">Tablet</option>
                <option value="capsule">Capsule</option>
                <option value="syrup">Syrup</option>
                <option value="injection">Injection</option>
                <option value="ointment">Ointment</option>
                <option value="drops">Drops</option>
                <option value="inhaler">Inhaler</option>
              </select>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <label htmlFor="strength" className="block text-sm font-medium text-purple-800 mb-2 flex items-center">
                <FaFlask className="mr-2 text-purple-600" /> Strength
              </label>
              <input 
                type="text" 
                name="strength" 
                id="strength" 
                placeholder="e.g., 500mg, 10ml" 
                value={formData.strength} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <label htmlFor="medicineType" className="block text-sm font-medium text-teal-800 mb-2 flex items-center">
                <FaInfoCircle className="mr-2 text-teal-600" /> Medicine Type
              </label>
              <select 
                name="medicineType" 
                id="medicineType" 
                value={formData.medicineType} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                required
              >
                <option value="">Select Type</option>
                <option value="over-the-counter">Over-the-Counter</option>
                <option value="prescription">Prescription</option>
                <option value="controlled">Controlled Substance</option>
              </select>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <label htmlFor="size" className="block text-sm font-medium text-amber-800 mb-2">Package Size</label>
              <input 
                type="text" 
                name="size" 
                id="size" 
                placeholder="e.g., 20 tablets, 100ml bottle" 
                value={formData.size} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" 
                required 
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <label htmlFor="description" className="block text-sm font-medium text-green-800 mb-2 flex items-center">
              <FaInfoCircle className="mr-2 text-green-600" /> Description
            </label>
            <textarea 
              name="description" 
              id="description" 
              placeholder="Brief description of the medicine and its uses" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
              rows="3" 
              required 
            />
          </div>

          <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
            <label htmlFor="price" className="block text-sm font-medium text-rose-800 mb-2 flex items-center">
              <FaTag className="mr-2 text-rose-600" /> Price ($)
            </label>
            <input 
              type="number" 
              step="0.01" 
              min="0" 
              name="price" 
              id="price" 
              placeholder="e.g., 12.50" 
              value={formData.price} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200" 
              required 
            />
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
            >
              Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;