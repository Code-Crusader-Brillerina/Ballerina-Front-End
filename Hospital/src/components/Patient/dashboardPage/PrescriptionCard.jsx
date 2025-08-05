import React from 'react';

// Added isActive and onClick props
const PrescriptionCard = ({ pharmacy, date, isActive, onClick }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center space-x-4 rounded-lg p-3 cursor-pointer transition-all duration-200 
                ${isActive ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
                     ${isActive ? 'bg-blue-500' : 'bg-green-100'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isActive ? 'text-white' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h.01M12.003 17h.01M14.343 17h.01M15 12h.01M11.993 12h.01M16.333 12h.01M16.663 8h.01M14.343 8h.01M12.003 8h.01M9.663 8h.01" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{pharmacy}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  </div>
);

export default PrescriptionCard;