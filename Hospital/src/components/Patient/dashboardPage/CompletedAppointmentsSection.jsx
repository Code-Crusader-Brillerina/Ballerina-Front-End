// CompletedAppointmentsSection.jsx

import React, { useState } from 'react';

// Placeholder data for completed appointments
const completedAppointments = [
  {
    id: 1,
    doctor: 'Dr. John Doe - Cardiologist',
    date: 'Oct 28, 2025',
    prescription: 'Take two pills of Atorvastatin daily. Schedule a follow-up in 3 months.',
    adviser: 'Maintain a low-sodium diet and exercise for 30 minutes, 5 times a week.',
  },
  {
    id: 2,
    doctor: 'Dr. Jane Smith - Dermatologist',
    date: 'Nov 01, 2025',
    prescription: 'Apply Hydrocortisone cream twice daily to the affected area. Avoid direct sun exposure.',
    adviser: 'Keep the skin moisturized and use a gentle, fragrance-free soap.',
  },
  {
    id: 3,
    doctor: 'Dr. Maya Fornado - Physiologist',
    date: 'Nov 10, 2025',
    prescription: 'Start physical therapy exercises. Use a cold pack for 15 minutes after each session.',
    adviser: 'Avoid heavy lifting and report any new pain to the therapist.',
  },
];

const CompletedAppointmentCard = ({ appointment, onClick, isActive }) => (
  <div
    onClick={onClick}
    className={`flex justify-between items-center bg-gray-50 rounded-lg p-4 cursor-pointer transition-all duration-200 
                ${isActive ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
  >
    <div>
      <p className="text-sm font-semibold text-gray-800">{appointment.doctor}</p>
      <p className="text-xs text-gray-500">{appointment.date}</p>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </div>
);

const CompletedAppointmentsSection = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Completed Appointments</h2>
        <div className="flex items-center space-x-2 text-blue-600 cursor-pointer">
          <span className="font-semibold">View All</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* List of completed appointments */}
        <div className="space-y-4">
          {completedAppointments.map(appt => (
            <CompletedAppointmentCard
              key={appt.id}
              appointment={appt}
              onClick={() => setSelectedAppointment(appt)}
              isActive={selectedAppointment?.id === appt.id}
            />
          ))}
        </div>
        
        {/* Prescription and Advice Section */}
        <div className="bg-white rounded-lg p-4">
          {selectedAppointment ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">
                Summary for Dr. {selectedAppointment.doctor.split(' - ')[0].replace('Dr. ', '')}
              </h3>
              
              <div>
                <h4 className="font-semibold text-gray-700">Prescriptions</h4>
                <p className="text-sm text-gray-600">{selectedAppointment.prescription}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">Doctor's Advice</h4>
                <p className="text-sm text-gray-600">{selectedAppointment.adviser}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a completed appointment to view details.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompletedAppointmentsSection;