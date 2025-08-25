import React, { useState } from "react";
import PropTypes from "prop-types";

const PrescriptionCard = ({ pid, appointmentData, onAdd }) => {
  // State Management
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [newPrescription, setNewPrescription] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    quantity: "",
    instructions: "",
  });

  // API Configuration
  const API_BASE_URL = "http://localhost:8080";

  // Form Validation
  const validatePrescription = (prescription) => {
    const required = ['name', 'dosage', 'frequency', 'duration', 'quantity'];
    return required.every(field => prescription[field]?.trim());
  };

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPrescription = () => {
    if (!validatePrescription(newPrescription)) {
      alert("Please fill all required fields before adding.");
      return;
    }

    setPrescriptions(prev => [...prev, { ...newPrescription, id: Date.now() }]);
    setNewPrescription({
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      quantity: "",
      instructions: ""
    });
  };

  const handleRemovePrescription = (index) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== index));
  };

  // Utility Functions
  const generatePrescriptionId = () => {
    return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  };

  const generateItemId = (index) => {
    return (index + 1).toString().padStart(2, '0');
  };

  // API Call
  const handleSavePrescription = async () => {
    if (prescriptions.length === 0) {
      alert("Please add at least one prescription before saving.");
      return;
    }

    // Debug logging
    console.log("Debug - pid:", pid);
    console.log("Debug - appointmentData:", appointmentData);
    console.log("Debug - appointmentData.aid:", appointmentData?.aid);

    if (!pid) {
      alert(`Missing patient information. PID: ${pid || 'missing'}`);
      return;
    }

    // Generate a default AID if not provided
    const appointmentId = appointmentData?.aid || `temp_${Date.now().toString().slice(-6)}`;
    
    if (!appointmentData?.aid) {
      console.warn("No appointment ID provided, using temporary ID:", appointmentId);
    }

    setLoading(true);

    try {
      const items = prescriptions.map((prescription, index) => ({
        preItemId: generateItemId(index),
        mediId: "002", // You might want to make this dynamic based on medicine selection
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        duration: prescription.duration,
        quantity: prescription.quantity,
        instructions: prescription.instructions || "no"
      }));

      const prescriptionData = {
        preId: generatePrescriptionId(),
        pid: pid,
        did: appointmentData.did || "",
        aid: appointmentId, // Use the appointmentId (either provided or generated)
        dateTime: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        diliveryMethod: "COD",
        phId: "005",
        status: "good",
        note: comment.trim() || "no", // This now properly uses the doctor's comment
        items: items
      };

      console.log("Sending prescription data:", prescriptionData);

      const response = await fetch(`${API_BASE_URL}/doctor/createPrescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(prescriptionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        alert("Prescription saved successfully!");
        setPrescriptions([]);
        setComment("");
      } else {
        throw new Error(result.message || "Failed to save prescription");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert(`Failed to save prescription: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Form Fields Configuration
  const formFields = [
    { name: "name", placeholder: "Medicine Name *", type: "text", required: true },
    { name: "dosage", placeholder: "Dosage (e.g., 500mg) *", type: "text", required: true },
    { name: "frequency", placeholder: "Frequency (e.g., 2 times daily) *", type: "text", required: true },
    { name: "duration", placeholder: "Duration (e.g., 10 days) *", type: "text", required: true },
    { name: "quantity", placeholder: "Quantity *", type: "number", required: true },
    { name: "instructions", placeholder: "Special Instructions (optional)", type: "text", required: false },
  ];

  return (
    <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-blue-100">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Prescription Management</h3>
      </div>

      {/* Current Prescriptions List */}
      {prescriptions.length > 0 && (
        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-gray-700">Current Prescriptions ({prescriptions.length})</h4>
          {prescriptions.map((prescription, index) => (
            <div
              key={prescription.id || index}
              className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100"
            >
              <div className="flex-1">
                <div className="font-medium text-blue-800">{prescription.name} - {prescription.dosage}</div>
                <div className="text-sm text-blue-600">{prescription.frequency} times daily • {prescription.duration} days</div>
                <div className="text-xs text-blue-500">Quantity: {prescription.quantity}</div>
                {prescription.instructions && prescription.instructions !== "no" && (
                  <div className="text-xs text-gray-600 mt-1">Instructions: {prescription.instructions}</div>
                )}
              </div>
              <button
                onClick={() => handleRemovePrescription(index)}
                className="text-red-500 hover:text-red-700 text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                title="Remove prescription"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Prescription Form */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Add New Prescription</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {formFields.map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type}
                name={field.name}
                value={newPrescription[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full border rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all ${
                  field.required && !newPrescription[field.name] 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-300' 
                    : 'border-gray-300'
                }`}
                required={field.required}
              />
              {field.required && (
                <span className="absolute top-2 right-3 text-red-500 text-xs">*</span>
              )}
            </div>
          ))}
        </div>

        {/* Add Prescription Button */}
        <button
          onClick={handleAddPrescription}
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Prescription
        </button>
      </div>

      {/* Doctor's Comments Section */}
      <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-lg p-6 border border-purple-100 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-800">Doctor's Comments</h4>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add clinical notes, patient instructions, follow-up recommendations, or any special observations..."
          className="w-full p-3 rounded-lg border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 resize-y min-h-[120px] transition-all"
          rows="4"
        />

        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium">Note:</span> These comments will be included in the prescription record and can be viewed by the patient and pharmacy.
        </div>

        {comment.trim() && (
          <div className="mt-3 p-3 bg-purple-100 border border-purple-200 rounded-lg">
            <div className="text-sm font-medium text-purple-800 mb-1">Preview:</div>
            <div className="text-sm text-purple-700 italic">"{comment}"</div>
          </div>
        )}
      </div>

      {/* Save to Database Button */}
      <div className="space-y-3">
        <button
          onClick={handleSavePrescription}
          disabled={loading || prescriptions.length === 0}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-all shadow-md flex items-center justify-center ${
            loading || prescriptions.length === 0 
              ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Saving Prescription...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Prescription 
            </>
          )}
        </button>

        {/* Status Indicator */}
        {prescriptions.length > 0 && (
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-blue-100 text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {prescriptions.length} prescription{prescriptions.length > 1 ? 's' : ''} ready to save
              {comment.trim() && (
                <span className="ml-2 px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                  + Doctor's note
                </span>
              )}
            </div>
          </div>
        )}

        {prescriptions.length === 0 && (
          <div className="text-center text-gray-500 text-sm">
            Add at least one prescription to save to database
          </div>
        )}
      </div>


    </div>
  );
};

PrescriptionCard.propTypes = {
  pid: PropTypes.string.isRequired,
  appointmentData: PropTypes.object.isRequired,
  onAdd: PropTypes.func
};

export default PrescriptionCard;