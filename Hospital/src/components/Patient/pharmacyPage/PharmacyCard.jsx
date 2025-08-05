import React from 'react';

const PharmacyCard = ({ name, address, deliveryTime, price }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
    <div className="flex items-center justify-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.663 17h.01M12.003 17h.01M14.343 17h.01M15 12h.01M11.993 12h.01M16.333 12h.01M16.663 8h.01M14.343 8h.01M12.003 8h.01M9.663 8h.01"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    <p className="text-sm text-gray-600">{address}</p>
    <p className="text-sm text-gray-600">Delivery Time - {deliveryTime}</p>
    <p className="text-sm font-bold text-gray-800 mt-2">{price}</p>
    <button className="w-full bg-blue-600 text-white text-sm mt-4 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
      Select & Pay
    </button>
  </div>
);

export default PharmacyCard;