import React from 'react';

const AppointmentCard = ({ doctor, time }) => (
  <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-3">
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M16 11h.01M10 11h.01M12 15h.01M12 19h.01M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{doctor}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

export default AppointmentCard;