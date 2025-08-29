import React, { useState, useEffect } from "react";
import { FaNotesMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PatientCard = ({ patient,uidList }) => {
  const navigate = useNavigate();

  const handleViewReports = () => {
    // Try multiple possible sources for appointment ID with priority order
    let appointmentId = null;
    
    // Priority 1: Check if parent component already provided appointmentId
    if (patient.appointmentId) {
      appointmentId = patient.appointmentId;
    }
    
    // Priority 2: Check appointment object (NEW STRUCTURE)
    if (!appointmentId && patient.appointment) {
      appointmentId = patient.appointment.aid || 
                     patient.appointment.appointmentId || 
                     patient.appointment.id;
    }
    
    // Priority 3: Check queData if it exists (OLD STRUCTURE - for backward compatibility)
    if (!appointmentId && patient.queData) {
      appointmentId = patient.queData.aid || 
                     patient.queData.appointmentId || 
                     patient.queData.id;
    }
    
    // Priority 4: Check patient directly
    if (!appointmentId) {
      appointmentId = patient.aid || 
                     patient.id;
    }
    
    // Priority 5: Check user data
    if (!appointmentId && patient.user) {
      appointmentId = patient.user.aid || 
                     patient.user.appointmentId || 
                     patient.user.id ||
                     patient.user.uid; // fallback to user ID
    }
    
    console.log("aid:", appointmentId);
    
    if (!appointmentId) {
      console.error("No appointment ID found");
      alert("No appointment ID found. Cannot proceed.");
      return;
    }

    try {
      navigate("/doctor/patient-details", {
        state: { 
          aid: appointmentId,
          patient: patient,
          uidList
        },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      alert("Navigation failed. Please try again.");
    }
  };

  // Handle notes button click
  const handleNotes = () => {
    // Add your notes functionality here
  };

  // Extract data from nested structure with better fallbacks
  const userData = patient.user || {};
  const appointmentData = patient.appointment || {}; // NEW: Use appointment instead of queData
  const queData = patient.queData || {}; // Keep for backward compatibility
  
  // Map status from API to display format
  const getDisplayStatus = (status) => {
    switch(status) {
      case 'pending': return 'waiting';
      case 'scheduled': return 'waiting'; // NEW: Handle 'scheduled' status
      case 'in-progress': return 'in-progress';
      case 'completed': return 'completed';
      default: return 'waiting';
    }
  };

  // Try to get status from multiple sources (prioritize appointment data)
  const statusFromAppointment = appointmentData.status;
  const statusFromQueData = queData.status;
  const statusFromPatient = patient.status;
  const displayStatus = getDisplayStatus(statusFromAppointment || statusFromQueData || statusFromPatient);

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
              {/* Updated to check appointment data first */}
              {appointmentData.time || queData.time || patient.time || patient.appointmentTime || 'No time set'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ID: { userData.uid ||  patient.patientId || 'No ID'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Queue: #{appointmentData.number || queData.number || 'N/A'}
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
            {/* NEW: Show appointment details */}
            {appointmentData.description && (
              <p className="text-xs text-gray-500 mt-1">
                {appointmentData.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
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