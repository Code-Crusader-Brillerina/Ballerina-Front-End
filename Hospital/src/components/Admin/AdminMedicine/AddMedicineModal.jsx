import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddMedicineModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
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
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Add New Medicine</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" placeholder="Medicine Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <input type="text" name="type" id="type" placeholder="e.g., Tablet, Capsule" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size (mg or ml)</label>
            <input type="text" name="size" id="size" placeholder="e.g., 500 mg" value={formData.size} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Small Description</label>
            <textarea name="description" id="description" placeholder="A brief description of the medicine" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" required />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="text" name="price" id="price" placeholder="e.g., Rs. 200.00" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;