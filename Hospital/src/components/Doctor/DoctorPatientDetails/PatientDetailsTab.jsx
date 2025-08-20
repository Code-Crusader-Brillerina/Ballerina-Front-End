import React from "react";
import PropTypes from "prop-types";

const PatientDetailsTab = ({ appointmentData, patientId }) => {
  const defaultDescription = `
    No description available for this appointment. The patient was examined and 
    relevant diagnostic assessments were carried out. Clinical findings, observations, 
    and treatment recommendations were documented in the patient's medical record.
  `;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Overview</h3>
      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
        <p className="text-gray-700 leading-relaxed">
          {appointmentData?.description || defaultDescription}
        </p>
      </div>
      
      {/* Additional patient details can be added here */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailCard 
          title="Appointment ID" 
          value={appointmentData?.aid || 'N/A'} 
          icon="🏥"
        />
        <DetailCard 
          title="Patient ID" 
          value={patientId || 'N/A'} 
          icon="👤"
        />
        <DetailCard 
          title="Status" 
          value={appointmentData?.status || 'Active'} 
          icon="📋"
        />
        <DetailCard 
          title="Date" 
          value={appointmentData?.date || new Date().toLocaleDateString()} 
          icon="📅"
        />
      </div>
    </div>
  );
};

// Detail Card Component
const DetailCard = ({ title, value, icon }) => (
  <div className="bg-white border rounded-lg p-4 shadow-sm">
    <div className="flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  </div>
);

PatientDetailsTab.propTypes = {
  appointmentData: PropTypes.object,
  patientId: PropTypes.string
};

DetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default PatientDetailsTab;