import React, { useState } from "react";
import PropTypes from "prop-types";

const PatientDetailsTab = ({ appointmentData, patientId, fallbackPatient }) => {
  const [showVideoCall, setShowVideoCall] = useState(false);

  const defaultDescription = `
    No description available for this appointment. The patient was examined and 
    relevant diagnostic assessments were carried out. Clinical findings, observations, 
    and treatment recommendations were documented in the patient's medical record.
  `;

  // Extract appointment data from the correct nested structure
  const appointment = appointmentData?.appointment || appointmentData;
  const patient = appointmentData?.patient || {};
  const user = appointmentData?.user || {};

  // Use fallback data if available
  const fallbackAppointment = fallbackPatient?.appointment || {};
  const fallbackPatientData = fallbackPatient?.patient || {};
  const fallbackUserData = fallbackPatient?.user || {};

  // Get description from the correct location
  const description = appointment?.description || 
                     fallbackAppointment?.description || 
                     defaultDescription;

  // Get appointment details with fallbacks
  const appointmentId = appointment?.aid || fallbackAppointment?.aid || 'N/A';
  const status = appointment?.status || fallbackAppointment?.status || 'Active';
  const date = appointment?.date || fallbackAppointment?.date || new Date().toLocaleDateString();
  const time = appointment?.time || fallbackAppointment?.time || 'N/A';

  // Patient information
  const patientGender = patient?.gender || fallbackPatientData?.gender || 'N/A';
  const patientDOB = patient?.DOB || fallbackPatientData?.DOB || 'N/A';
  const patientAge = patient?.DOB ? calculateAge(patient.DOB) : 'N/A';

  // User information
  const patientName = user?.username || fallbackUserData?.username || 'N/A';
  const patientEmail = user?.email || fallbackUserData?.email || 'N/A';
  const patientPhone = user?.phoneNumber || fallbackUserData?.phoneNumber || 'N/A';
  const patientCity = user?.city || fallbackUserData?.city || 'N/A';

  const handleJoinCall = () => {
    setShowVideoCall(true);
  };

  return (
    <div>
      {/* Video Call Link (if available) */}
      {appointment?.url && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-800 mb-3">Video Consultation</h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📹</span>
                <div>
                  <h5 className="font-medium text-green-800">Video Call Available</h5>
                  <p className="text-green-600 text-sm">Click to join the consultation</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleJoinCall}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Join Call
                </button>
                {showVideoCall && (
                  <button
                    onClick={() => setShowVideoCall(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel Call 
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Video Call Iframe - Separate Section with Increased Size */}
      {appointment?.url && showVideoCall && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-800 mb-3">Live Video Consultation</h4>
          <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <iframe
              src={appointment.url}
              className="w-full h-screen max-h-[800px] min-h-[600px] border border-gray-200 rounded-lg"
              allow="camera; microphone; fullscreen; speaker; display-capture"
              title="Video Call"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Overview</h3>
      
      {/* Description Section */}
      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500 mb-6">
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Appointment Details */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-3">Appointment Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailCard 
            title="Date" 
            value={date} 
            icon="📅"
          />
          <DetailCard 
            title="Time" 
            value={time} 
            icon="🕒"
          />
          <DetailCard 
            title="Status" 
            value={status} 
            icon="📋"
            statusColor={getStatusColor(status)}
          />
          <DetailCard 
            title="Payment Status" 
            value={appointment?.paymentState || 'N/A'} 
            icon="💳"
            statusColor={getPaymentColor(appointment?.paymentState)}
          />
        </div>
      </div>

      {/* Patient Information */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-800 mb-3">Patient Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailCard 
            title="Name" 
            value={patientName} 
            icon="👋"
          />
          <DetailCard 
            title="Gender" 
            value={patientGender.charAt(0).toUpperCase() + patientGender.slice(1)} 
            icon="⚧"
          />
          <DetailCard 
            title="Date of Birth" 
            value={patientDOB} 
            icon="🎂"
          />
          <DetailCard 
            title="Age" 
            value={patientAge} 
            icon="📊"
          />
          <DetailCard 
            title="Email" 
            value={patientEmail} 
            icon="📧"
          />
          <DetailCard 
            title="Phone" 
            value={patientPhone} 
            icon="📱"
          />
          <DetailCard 
            title="City" 
            value={patientCity} 
            icon="🏙️"
          />
        </div>
      </div>

      

      
    </div>
  );
};

// Helper function to calculate age from DOB
const calculateAge = (dobString) => {
  try {
    // Handle different date formats (YYYY.MM.DD)
    const dobParts = dobString.split('.');
    if (dobParts.length === 3) {
      const dob = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return `${age} years`;
    }
    return 'N/A';
  } catch (error) {
    return 'N/A';
  }
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'scheduled':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'completed':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'cancelled':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'in-progress':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

// Helper function to get payment status color
const getPaymentColor = (paymentState) => {
  switch (paymentState?.toLowerCase()) {
    case 'paid':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'failed':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

// Enhanced Detail Card Component
const DetailCard = ({ title, value, icon, statusColor = '' }) => (
  <div className={`bg-white border rounded-lg p-4 shadow-sm ${statusColor}`}>
    <div className="flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-gray-600 font-medium">{value}</p>
      </div>
    </div>
  </div>
);

PatientDetailsTab.propTypes = {
  appointmentData: PropTypes.object,
  patientId: PropTypes.string,
  fallbackPatient: PropTypes.object
};

DetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  statusColor: PropTypes.string
};

export default PatientDetailsTab;