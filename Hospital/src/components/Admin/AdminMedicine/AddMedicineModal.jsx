import React, { useState, useRef } from 'react';

const AddMedicineModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    strength: '',
    form: '',
    medicineType: '',
    size: '',
    description: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const submissionRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear any previous error when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submit triggered - isSubmitting:', isSubmitting, 'submissionRef:', submissionRef.current);
    
    // Enhanced double submission prevention
    if (isSubmitting || submissionRef.current) {
      console.log('Submission blocked - already in progress');
      return;
    }
    
    // Set both flags
    setIsSubmitting(true);
    submissionRef.current = true;
    setSubmitError(null);
    
    try {
      // Auto-generate unique Medicine ID with better uniqueness
      const generateMediId = () => {
        // Combine timestamp + random number for better uniqueness
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `MED${timestamp}${random}`;
      };
      
      // Add auto-generated mediId (removed price)
      const submissionData = {
        mediId: generateMediId(),
        ...formData
      };
      
      console.log('Preparing medicine data:', submissionData);
      
      // Add a small delay to prevent rapid duplicate calls
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Reset form after successful preparation
      setFormData({
        name: '',
        strength: '',
        form: '',
        medicineType: '',
        size: '',
        description: '',
      });
      
      // Pass the data to parent component to handle the API call
      onSubmit(submissionData);
      onClose();
      
    } catch (err) {
      console.error('Error preparing medicine data:', err);
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
      submissionRef.current = false;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Add New Medicine</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
            disabled={isSubmitting}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Error Message Display */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-700 text-sm">
              <strong>Error:</strong> {submitError}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-2 flex items-center">
              <svg className="mr-2 h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Medicine Name
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
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <label htmlFor="form" className="block text-sm font-medium text-indigo-800 mb-2 flex items-center">
                <svg className="mr-2 h-4 w-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                Form
              </label>
              <select 
                name="form" 
                id="form" 
                value={formData.form} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
                required
                disabled={isSubmitting}
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
                <svg className="mr-2 h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v3a2 2 0 01-2 2H5a2 2 0 01-2-2V9a1 1 0 00-1 1v5.5a1.5 1.5 0 01-3 0V9a2 2 0 012-2h1V5a2 2 0 012-2h8a2 2 0 012 2v2z"/>
                </svg>
                Strength
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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <label htmlFor="medicineType" className="block text-sm font-medium text-teal-800 mb-2 flex items-center">
                <svg className="mr-2 h-4 w-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                Medicine Type
              </label>
              <select 
                name="medicineType" 
                id="medicineType" 
                value={formData.medicineType} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200" 
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <label htmlFor="description" className="block text-sm font-medium text-green-800 mb-2 flex items-center">
              <svg className="mr-2 h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              Description
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
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Adding...' : 'Add Medicine'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicineModal;