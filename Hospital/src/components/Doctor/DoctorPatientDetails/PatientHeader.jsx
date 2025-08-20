import React from "react";
import PropTypes from "prop-types";

const PatientHeader = ({ appointmentData, patientId }) => {
  // Default patient data (should ideally come from props or API)
  const defaultPatientData = {
    name: "Kavindha Perera",
    initials: "KP",
    age: 30,
    sex: "Male",
    lastVisit: "Nov 15, 2023"
  };

  const patientData = {
    ...defaultPatientData,
    lastVisit: appointmentData?.date || defaultPatientData.lastVisit
  };

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
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">{patientData.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
            <InfoBadge label="Age" value={`${patientData.age} years`} />
            <InfoBadge label="Sex" value={patientData.sex} />
            <InfoBadge label="Patient ID" value={`#${patientId || 'Loading...'}`} />
            <InfoBadge label="Last Visit" value={patientData.lastVisit} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Info Badge Component
const InfoBadge = ({ label, value }) => (
  <div className="bg-white/20 rounded-full px-4 py-1">
    <span className="font-medium">{label}:</span> {value}
  </div>
);

PatientHeader.propTypes = {
  appointmentData: PropTypes.object,
  patientId: PropTypes.string
};

InfoBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default PatientHeader;