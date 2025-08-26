import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, MapPin, BriefcaseMedical, FileText, Award, Clock, DollarSign } from 'lucide-react';

const AddDoctorModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'doctor',
    phoneNumber: '',
    city: '',
    district: '',
    specialization: '',
    licenseNomber: '',
    experience: '',
    consultationFee: '',
    availableTimes: [],
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const generateId = () => {
    return Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTimeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      availableTimes: checked
        ? [...prevData.availableTimes, value]
        : prevData.availableTimes.filter(time => time !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const uniqueId = generateId();
      const apiData = {
        userData: {
          uid: uniqueId,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phoneNumber: formData.phoneNumber,
          city: formData.city,
          district: formData.district,
          profilepic: "" // Empty string as requested
        },
        doctorData: {
          did: uniqueId,
          specialization: formData.specialization,
          licenseNomber: formData.licenseNomber,
          experience: formData.experience,
          consultationFee: formData.consultationFee,
          availableTimes: formData.availableTimes,
          description: formData.description
        }
      };

      const response = await fetch('http://localhost:8080/admin/addDoctor', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const newDoctor = {
          did: uniqueId,
          username: formData.username,
          email: formData.email,
          specialization: formData.specialization,
          licenseNomber: formData.licenseNomber,
          experience: formData.experience,
          consultationFee: formData.consultationFee,
          availableTimes: formData.availableTimes,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          city: formData.city,
          district: formData.district
        };
        onSubmit(newDoctor);
        alert('Doctor added successfully!');
      } else {
        throw new Error(result.message || 'Failed to add doctor');
      }
    } catch (err) {
      console.error('Error adding doctor:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const timeOptions = [
    { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
    
    { value: 'evening', label: 'Evening (6 PM - 10 PM)' }
  ];

  const specializations = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics',
    'Ophthalmology', 'Psychiatry', 'Dentistry', 'Surgery', 'Gynecology',
    'Endocrinology', 'Gastroenterology', 'Urology', 'Oncology', 'Radiology'
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 rounded-t-xl border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Register New Doctor</h2>
              <p className="text-sm text-gray-500 mt-1">
                {currentStep === 1 ? "Personal Information" : "Professional Details"}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              disabled={loading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center">
              {[1, 2].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex flex-col items-center ${step < currentStep ? 'text-blue-600' : step === currentStep ? 'text-blue-800' : 'text-gray-400'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step < currentStep ? 'bg-blue-600 border-blue-600 text-white' : step === currentStep ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}>
                      {step < currentStep ? (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Step {step}</span>
                  </div>
                  {step < 2 && (
                    <div className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
              <svg className="h-5 w-5 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="username" 
                      value={formData.username} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Password *
                    </label>
                    <input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Number *
                    </label>
                    <input 
                      type="text" 
                      name="phoneNumber" 
                      value={formData.phoneNumber} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      City *
                    </label>
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      District *
                    </label>
                    <input 
                      type="text" 
                      name="district"  
                      value={formData.district} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={loading || !formData.username || !formData.email || !formData.password || !formData.phoneNumber || !formData.city || !formData.district}
                  >
                    Next
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <BriefcaseMedical className="h-4 w-4 mr-2" />
                      Specialization *
                    </label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      disabled={loading}
                    >
                      <option value="">Select a specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      License Number *
                    </label>
                    <input 
                      type="text" 
                      name="licenseNomber" 
                      value={formData.licenseNomber} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Years of Experience *
                    </label>
                    <input 
                      type="number" 
                      name="experience"
                      min="0"
                      value={formData.experience} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Consultation Fee (LKR) *
                    </label>
                    <input 
                      type="number" 
                      name="consultationFee" 
                      min="0"
                      step="100"
                      value={formData.consultationFee} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Available Times *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                      {timeOptions.map((option) => (
                        <label 
                          key={option.value} 
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.availableTimes.includes(option.value) ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:border-blue-300'}`}
                        >
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={formData.availableTimes.includes(option.value)}
                            onChange={handleTimeChange}
                            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                            disabled={loading}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Professional Description *
                    </label>
                    <textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      rows="4" 
                      required 
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={loading}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={loading || !formData.specialization || !formData.licenseNomber || !formData.experience || !formData.consultationFee || formData.availableTimes.length === 0 || !formData.description}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Doctor...
                      </>
                    ) : (
                      'Add Doctor'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorModal;