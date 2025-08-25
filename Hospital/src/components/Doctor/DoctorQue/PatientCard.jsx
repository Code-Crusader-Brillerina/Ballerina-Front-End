import React from "react";
import { FaNotesMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();

  const handleViewReports = () => {
    // Debug logging
    console.log("Patient data:", patient);
    console.log("Available keys:", Object.keys(patient));
    console.log("QueData:", patient.queData);
    
    // Try multiple possible sources for appointment ID with priority order
    let appointmentId = null;
    
    // Priority 1: Check if parent component already provided appointmentId
    if (patient.appointmentId) {
      appointmentId = patient.appointmentId;
      console.log("Found appointmentId from parent:", appointmentId);
    }
    
    // Priority 2: Check queData if it exists
    if (!appointmentId && patient.queData) {
      appointmentId = patient.queData.aid || 
                     patient.queData.appointmentId || 
                     patient.queData.id;
      console.log("Found appointmentId from queData:", appointmentId);
    }
    
    // Priority 3: Check patient directly
    if (!appointmentId) {
      appointmentId = patient.aid || 
                     patient.id;
      console.log("Found appointmentId from patient:", appointmentId);
    }
    
    // Priority 4: Check user data
    if (!appointmentId && patient.user) {
      appointmentId = patient.user.aid || 
                     patient.user.appointmentId || 
                     patient.user.id ||
                     patient.user.uid; // fallback to user ID
      console.log("Found appointmentId from user:", appointmentId);
    }
    
    console.log("Final appointment ID:", appointmentId);
    
    // Check if any appointment ID exists
    if (!appointmentId) {
      console.error("No appointment ID found anywhere in patient data!");
      console.log("Full patient structure:", JSON.stringify(patient, null, 2));
      
      // More helpful error message with detailed debugging info
      const debugInfo = {
        hasQueData: !!patient.queData,
        queDataKeys: patient.queData ? Object.keys(patient.queData) : [],
        hasUser: !!patient.user,
        userKeys: patient.user ? Object.keys(patient.user) : [],
        patientKeys: Object.keys(patient),
        queDataContent: patient.queData
      };
      
      console.log("Debug info:", debugInfo);
      
      alert(`No appointment ID found. Debug info:
      - Has queData: ${debugInfo.hasQueData}
      - QueData keys: ${debugInfo.queDataKeys.join(', ') || 'None'}
      - Has user: ${debugInfo.hasUser}
      - User keys: ${debugInfo.userKeys.join(', ') || 'None'}
      - Patient keys: ${debugInfo.patientKeys.join(', ')}
      - QueData content: ${JSON.stringify(debugInfo.queDataContent)}`);
      return;
    }

    try {
      navigate("/doctor/patient-details", {
        state: { 
          aid: appointmentId,
          patient: patient // Pass full patient data as backup
        },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      alert("Navigation failed. Please try again.");
    }
  };

  // Handle notes button click
  const handleNotes = () => {
    console.log("Notes clicked for patient:", patient.user?.uid);
    // Add your notes functionality here
  };

  // Extract data from nested structure with better fallbacks
  const userData = patient.user || {};
  const queData = patient.queData || {};
  
  // Map status from API to display format
  const getDisplayStatus = (status) => {
    switch(status) {
      case 'pending': return 'waiting';
      case 'in-progress': return 'in-progress';
      case 'completed': return 'completed';
      default: return 'waiting';
    }
  };

  // Try to get status from multiple sources
  const statusFromQueData = queData.status;
  const statusFromPatient = patient.status;
  const displayStatus = getDisplayStatus(statusFromQueData || statusFromPatient);

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] ${
        displayStatus === "waiting"
          ? "border-l-4 border-amber-500"
          : displayStatus === "in-progress"
          ? "border-l-4 border-blue-500"
          : "border-l-4 border-emerald-500"
      }`}
    >
      <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                displayStatus === "waiting"
                  ? "bg-amber-100 text-amber-800"
                  : displayStatus === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {displayStatus === "waiting"
                ? "Waiting"
                : displayStatus === "in-progress"
                ? "In Progress"
                : "Completed"}
            </span>
            <h3 className="mt-2 text-lg font-bold text-teal-900">
              {userData.username || userData.name || patient.name || 'Unknown Patient'}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-sm text-teal-600 font-medium">
              {queData.time || patient.time || patient.appointmentTime || 'No time set'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ID: {userData.uid || userData.id || patient.patientId || patient.id || 'No ID'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={userData.profilepic || userData.profilePicture || userData.avatar || patient.image || "https://via.placeholder.com/64x64/20B2AA/FFFFFF?text=Patient"}
            alt={userData.username || userData.name || patient.name || 'Patient'}
            className="w-16 h-16 rounded-xl object-cover border-2 border-teal-200"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/64x64/20B2AA/FFFFFF?text=Patient";
            }}
          />
          <div>
            <p className="text-gray-700">
              <span className="font-medium">{userData.username || userData.name || patient.username || 'Unknown'}</span>
              {(userData.phoneNumber || userData.phone || patient.phoneNumber) && (
                <span>, Phone: {userData.phoneNumber || userData.phone || patient.phoneNumber}</span>
              )}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {userData.city || userData.address || patient.address || 'No address available'}
              {userData.district && userData.city !== userData.district && (
                <span>, {userData.district}</span>
              )}
            </p>
            <p className="text-sm text-teal-700 mt-1">
              {userData.email || patient.university || 'No email available'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button 
            onClick={handleNotes}
            className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors flex items-center gap-2"
          >
            <FaNotesMedical /> Notes
          </button>
          <button
            onClick={handleViewReports}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;