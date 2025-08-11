import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddPharmacyModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Pharmacist',
    phoneNumber: '',
    address: '',
    gender: 'male',
    profilePic: '',
    PHID: '',
    pharmacyName: '',
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
      <div className="relative p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Add New Pharmacy</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Data Fields */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">User Details</h4>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="address" placeholder="Address (District, City, etc.)" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="text" name="profilePic" placeholder="Profile Picture URL" value={formData.profilePic} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Pharmacist Data Fields */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">Pharmacy Details</h4>
            <input type="text" name="PHID" placeholder="Pharmacist ID (PHID)" value={formData.PHID} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="pharmacyName" placeholder="Pharmacy Name" value={formData.pharmacyName} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add Pharmacy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPharmacyModal;