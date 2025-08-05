import React from 'react';

const DoctorCard = ({ name, specialty, education, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
    <img
      src={imageUrl}
      alt={`Dr. ${name}`}
      className="w-24 h-24 rounded-full mb-4 object-cover"
    />
    <h3 className="text-lg font-semibold text-gray-800">Dr. {name}</h3>
    <p className="text-sm text-gray-600">{specialty}</p>
    <p className="text-xs text-gray-500 mb-4">{education}</p>
    <button className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
      Add Appointments
    </button>
  </div>
);

export default DoctorCard;