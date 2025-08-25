import React from "react";
import PropTypes from "prop-types";

const PatientHeader = ({ appointmentData, patientId, fallbackPatient }) => {
  // Extract data from appointmentData or fallback
  const extractPatientInfo = () => {
    // Try to get data from appointmentData first
    if (appointmentData?.user && appointmentData?.patient) {
      const user = appointmentData.user;
      const patient = appointmentData.patient;
      
      // Calculate age from DOB
      const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob.replace(/\./g, '-'));
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      // Generate initials from username or email
      const generateInitials = (username, email) => {
        if (username && username !== 'N/A') {
          return username.substring(0, 2).toUpperCase();
        }
        if (email) {
          return email.substring(0, 2).toUpperCase();
        }
        return 'PT'; // Default
      };

      return {
        name: user.username || 'Unknown Patient',
        initials: generateInitials(user.username, user.email),
        age: calculateAge(patient.DOB),
        sex: patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'N/A',
        email: user.email,
        phone: user.phoneNumber,
        city: user.city,
        district: user.district
      };
    }
    
    // Fallback to passed patient data
    if (fallbackPatient?.user) {
      const user = fallbackPatient.user;
      return {
        name: user.username || 'Unknown Patient',
        initials: user.username ? user.username.substring(0, 2).toUpperCase() : 'PT',
        age: 'N/A',
        sex: 'N/A',
        email: user.email,
        phone: user.phoneNumber,
        city: user.city,
        district: user.district
      };
    }

    // Default fallback
    return {
      name: 'Patient Information Loading...',
      initials: 'PT',
      age: 'N/A',
      sex: 'N/A',
      email: 'N/A',
      phone: 'N/A',
      city: 'N/A',
      district: 'N/A'
    };
  };

  const patientData = extractPatientInfo();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white mb-6">
      <div className="flex flex-col md:flex-row items-center">
        {/* Patient Avatar */}
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {patientData.initials}
          </div>
          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Patient Information */}
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{patientData.name}</h1>
          
          {/* Primary Info Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-3">
            <InfoBadge label="Age" value={`${patientData.age} years`} />
            <InfoBadge label="Gender" value={patientData.sex} />
            <InfoBadge label="Patient ID" value={`#${patientId || 'Loading...'}`} />
          </div>

          {/* Secondary Info - Contact Details */}
          {(patientData.email !== 'N/A' || patientData.phone !== 'N/A') && (
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm opacity-90">
              {patientData.email !== 'N/A' && (
                <ContactInfo icon="✉" value={patientData.email} />
              )}
              {patientData.phone !== 'N/A' && (
                <ContactInfo icon="📞" value={patientData.phone} />
              )}
              {(patientData.city !== 'N/A' || patientData.district !== 'N/A') && (
                <ContactInfo 
                  icon="📍" 
                  value={`${patientData.city}${patientData.district !== 'N/A' && patientData.district !== patientData.city ? `, ${patientData.district}` : ''}`} 
                />
              )}
            </div>
          )}
        </div>

        {/* Appointment Status */}
        {appointmentData?.appointment?.status && (
          <div className="mt-4 md:mt-0">
            <AppointmentStatus status={appointmentData.appointment.status} />
          </div>
        )}
      </div>
    </div>
  );
};

// Info Badge Component
const InfoBadge = ({ label, value }) => (
  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
    <span className="font-medium">{label}:</span> <span className="font-semibold">{value}</span>
  </div>
);

// Contact Info Component
const ContactInfo = ({ icon, value }) => (
  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
    <span>{icon}</span>
    <span>{value}</span>
  </div>
);

// Appointment Status Component
const AppointmentStatus = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      case 'confirmed':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(status)}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
    </div>
  );
};

// PropTypes
PatientHeader.propTypes = {
  appointmentData: PropTypes.shape({
    appointment: PropTypes.object,
    patient: PropTypes.object,
    user: PropTypes.object
  }),
  patientId: PropTypes.string,
  fallbackPatient: PropTypes.object
};

InfoBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

ContactInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

AppointmentStatus.propTypes = {
  status: PropTypes.string
};

export default PatientHeader;