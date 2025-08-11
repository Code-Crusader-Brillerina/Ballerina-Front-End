import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddDoctorModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Doctor',
    phoneNumber: '',
    address: '',
    gender: 'male',
    profilePic: '',
    specialization: '',
    licenseNo: '',
    experience: '',
    consultationFees: '',
    availableTimes: '',
    description: '',
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
          <h3 className="text-2xl font-bold text-gray-800">Add New Doctor</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Data Fields */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">User Details</h4>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="address" placeholder="Address (District, City, etc.)" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Doctor Data Fields */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">Doctor Details</h4>
            <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="licenseNo" placeholder="License Number" value={formData.licenseNo} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="consultationFees" placeholder="Consultation Fees" value={formData.consultationFees} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="availableTimes" placeholder="Available Times" value={formData.availableTimes} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" required />
            
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;