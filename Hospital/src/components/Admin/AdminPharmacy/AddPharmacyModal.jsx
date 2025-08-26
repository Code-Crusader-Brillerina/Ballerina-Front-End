import React, { useState, useEffect } from 'react';
import { FaTimes, FaEye, FaEyeSlash, FaSync, FaMapMarkerAlt, FaClock, FaIdCard, FaUser, FaEnvelope, FaPhone, FaCity } from 'react-icons/fa';

const AddPharmacyModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // User data
    uid: '',
    username: '',
    email: '',
    password: '',
    role: 'pharmacy',
    phoneNumber: '',
    city: '',
    district: '',
    profilepic: '',
    
    // Pharmacy data
    phId: '',
    pharmacyName: '',
    address: '',
    licenseNumber: '',
    operatingHours: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Auto-generate UID when component mounts
  useEffect(() => {
    generateUID();
  }, []);

  const generateUID = () => {
    const prefix = 'PH';
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const newUID = `${prefix}${timestamp.slice(-6)}${random}`;
    
    setFormData(prevData => ({
      ...prevData,
      uid: newUID,
      phId: newUID
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.pharmacyName.trim()) newErrors.pharmacyName = 'Pharmacy name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.operatingHours.trim()) newErrors.operatingHours = 'Operating hours are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);

    // Structure the data according to your API format
    const apiData = {
      user: {
        uid: formData.uid,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        district: formData.district,
        profilepic: formData.profilepic
      },
      pharmacy: {
        phId: formData.phId,
        pharmacyName: formData.pharmacyName,
        address: formData.address,
        licenseNumber: formData.licenseNumber,
        operatingHours: formData.operatingHours
      }
    };

    try {
      await onSubmit(apiData);
    } catch (error) {
      console.error('Error submitting pharmacy data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-blue-800">Add New Pharmacy</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* ID Section */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-blue-800 flex items-center">
                <FaIdCard className="mr-2" /> Pharmacy ID
              </h4>
              <button
                onClick={generateUID}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center bg-blue-100 px-3 py-1 rounded-md transition-colors"
              >
                <FaSync className="mr-1" /> Regenerate
              </button>
            </div>
            <div className="bg-white p-3 rounded-md border border-blue-200">
              <code className="text-blue-700 font-mono text-lg">{formData.uid}</code>
            </div>
            <p className="text-sm text-gray-600 mt-2">This ID will be used for both user account and pharmacy record</p>
          </div>

          {/* User Details Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h4 className="text-lg font-semibold text-blue-800 mb-5 pb-2 border-b border-blue-200 flex items-center">
              <FaUser className="mr-2" /> User Account Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter pharmacy username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter email address" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Enter secure password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    placeholder="Enter phone number" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="Enter city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FaCity className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                <input 
                  type="text" 
                  name="district" 
                  placeholder="Enter district" 
                  value={formData.district} 
                  onChange={handleChange} 
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
              </div>
            </div>
          </div>

          {/* Pharmacy Details Section */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
            <h4 className="text-lg font-semibold text-green-800 mb-5 pb-2 border-b border-green-200 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Pharmacy Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name *</label>
                <input 
                  type="text" 
                  name="pharmacyName" 
                  placeholder="Enter pharmacy name" 
                  value={formData.pharmacyName} 
                  onChange={handleChange} 
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.pharmacyName ? 'border-red-500' : 'border-gray-300'}`}
                  required 
                />
                {errors.pharmacyName && <p className="text-red-500 text-xs mt-1">{errors.pharmacyName}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                <div className="relative">
                  <textarea
                    name="address" 
                    placeholder="Enter full address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    rows={3}
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
                <input 
                  type="text" 
                  name="licenseNumber" 
                  placeholder="Enter license number" 
                  value={formData.licenseNumber} 
                  onChange={handleChange} 
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'}`}
                  required 
                />
                {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="operatingHours" 
                    placeholder="8:00 AM - 10:00 PM" 
                    value={formData.operatingHours} 
                    onChange={handleChange} 
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.operatingHours ? 'border-red-500' : 'border-gray-300'}`}
                    required 
                  />
                  <FaClock className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.operatingHours && <p className="text-red-500 text-xs mt-1">{errors.operatingHours}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
            <p className="text-sm text-gray-500">* indicates required fields</p>
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Adding Pharmacy...</span>
                  </>
                ) : (
                  <span>Add Pharmacy</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPharmacyModal;