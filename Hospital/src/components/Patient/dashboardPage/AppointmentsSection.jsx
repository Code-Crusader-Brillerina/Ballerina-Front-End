import React from 'react';
import AppointmentCard from './AppointmentCard';

const appointments = [
  { doctor: 'Dr. Maya Fornado - Physiologist', time: '10.00 PM, Nov 15, 2025' },
  { doctor: 'Dr. Maya Fornado - Physiologist', time: '10.00 PM, Nov 15, 2025' },
];

const AppointmentsSection = () => (
  <section className="bg-white rounded-lg shadow-md p-6 mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
      <div className="flex items-center space-x-2 text-blue-600 cursor-pointer">
        <span className="font-semibold">View All</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Online Appointments</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="space-y-4">
          {appointments.map((appt, index) => (
            <AppointmentCard key={index} {...appt} />
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">In-Person Appointments</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="space-y-4">
          {appointments.map((appt, index) => (
            <AppointmentCard key={index} {...appt} />
          ))}
        </div>
      </div>
    </div>
    <div className="mt-6 flex justify-center space-x-4">
      <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
        + Add New Appointments
      </button>
      <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
        + View Medical History
      </button>
    </div>
  </section>
);

export default AppointmentsSection;