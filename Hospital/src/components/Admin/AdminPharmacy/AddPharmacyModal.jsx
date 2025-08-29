import React, { useState } from 'react';
import { 
  FaTimes, 
  FaHospital, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaKey, 
  FaClock, 
  FaIdCard 
} from 'react-icons/fa';

const AddPharmacyModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    email: '',
    contactNumber: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    district: '',
    licenseNumber: '',
    operatingHours: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePharmacyId = () => {
    return Math.floor(100 + Math.random() * 900).toString(); // Generate 3-digit ID
  };

  const handleSubmit = async () => {
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate required fields
    const requiredFields = ['pharmacyName', 'email', 'contactNumber', 'address', 'username', 'password'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate pharmacy ID
      const phId = generatePharmacyId();
      
      // Prepare data in the format expected by backend
      const submitData = {
        user: {
          uid: phId,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "pharmacy",
          phoneNumber: formData.contactNumber,
          city: formData.city || "Unknown",
          district: formData.district || "Unknown",
          profilepic: "",
          emailConfirmed: 1,
          OTP: null,

        },
        pharmacy: {
          phId: phId,
          pharmacyName: formData.pharmacyName,
          address: formData.address,
          licenseNumber: formData.licenseNumber || `PH-${new Date().getFullYear()}-${phId}`,
          operatingHours: formData.operatingHours || "8:00 AM - 10:00 PM"
        }
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add pharmacy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      pharmacyName: '',
      email: '',
      contactNumber: '',
      address: '',
      username: '',
      password: '',
      confirmPassword: '',
      city: '',
      district: '',
      licenseNumber: '',
      operatingHours: '',
      emailConfirmed: 1,
      OTP: null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaHospital className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Add New Pharmacy</h2>
                <p className="text-gray-600 text-sm">Create a new pharmacy account in the system</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6 space-y-6">
          {/* Pharmacy Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pharmacy Information</h3>
            
            {/* Pharmacy Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaHospital className="mr-2 text-blue-500" />
                Pharmacy Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pharmacyName"
                value={formData.pharmacyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter pharmacy name"
              />
            </div>

            {/* Email and Contact Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="mr-2 text-green-500" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="pharmacy@example.com"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="mr-2 text-purple-500" />
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* City and District Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter city"
                />
              </div>

              {/* District */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter district"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                Complete Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Enter complete pharmacy address"
              />
            </div>

            {/* License and Operating Hours Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* License Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaIdCard className="mr-2 text-orange-500" />
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="PH-2024-001 (auto-generated if empty)"
                />
              </div>

              {/* Operating Hours */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaClock className="mr-2 text-teal-500" />
                  Operating Hours
                </label>
                <input
                  type="text"
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="8:00 AM - 10:00 PM (default)"
                />
              </div>
            </div>
          </div>

          {/* Login Credentials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Login Credentials</h3>
            
            {/* Username */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaUser className="mr-2 text-indigo-500" />
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter unique username"
              />
            </div>

            {/* Password Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaKey className="mr-2 text-yellow-500" />
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter secure password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaKey className="mr-2 text-yellow-500" />
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                'Add Pharmacy'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPharmacyModal;
