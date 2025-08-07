import React from 'react';
import { Link } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa'; // Assuming you have react-icons installed

const AppointmentCard = ({ doctor, time }) => {
  const doctorName = doctor.split(' - ')[0].replace('Dr. ', ''); // Extract doctor's name for URL

  return (
    <div className="flex items-center justify-between space-x-4 bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        {/* Calendar Icon and Details */}
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
      
      {/* Video Conference Button */}
      <Link to={`/video-conference/${doctorName}`}>
        <button className="flex items-center justify-center p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <FaVideo />
        </button>
      </Link>
    </div>
  );
};

export default AppointmentCard;