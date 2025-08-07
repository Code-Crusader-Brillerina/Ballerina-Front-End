import React from 'react';
import { Link } from 'react-router-dom';

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
    {/* Prescription Button */}
    {isActive && (
      <Link to={`/prescription/${appointment.id}`}>
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          View Prescription
        </button>
      </Link>
    )}
    {!isActive && (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    )}
  </div>
);

export default CompletedAppointmentCard;