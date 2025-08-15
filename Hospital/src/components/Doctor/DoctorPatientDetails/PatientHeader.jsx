import React from "react";

const PatientHeader = ({ appointmentData, patientId }) => {
  // Log the patient ID to console
  console.log("Patient ID:", patientId);
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white mb-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            KP
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
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">Kavindha Perera</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
            <div className="bg-white/20 rounded-full px-4 py-1">
              <span className="font-medium">Age:</span> 30 years
            </div>
            <div className="bg-white/20 rounded-full px-4 py-1">
              <span className="font-medium">Sex:</span> Male
            </div>
            <div className="bg-white/20 rounded-full px-4 py-1">
              <span className="font-medium">Patient ID:</span> #{patientId || 'Loading...'}
            </div>
            <div className="bg-white/20 rounded-full px-4 py-1">
              <span className="font-medium">Last Visit:</span> {appointmentData?.date || 'Nov 15, 2023'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;