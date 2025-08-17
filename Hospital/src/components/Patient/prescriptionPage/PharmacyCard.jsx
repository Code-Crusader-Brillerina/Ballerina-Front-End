import React from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, ShoppingCart } from 'lucide-react'; // Import modern icons

const PharmacyCard = ({ pharmacy, prescription }) => {
  const { pharmacyInfo, totalPrice } = pharmacy;

  return (
    // The entire card is a link, passing state to the payment page
    <Link 
      to="/prescription/payment" 
      state={{ selectedPharmacy: pharmacy, prescription: prescription }} 
      className="block h-full"
    >
      <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 overflow-hidden h-full flex flex-col">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

        {/* Icon Section */}
        <div className="relative mb-4 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <Store className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Details Section */}
        <div className="text-center mb-4 flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{pharmacyInfo.name}</h3>
          <p className="text-blue-600 font-semibold text-sm mb-3 flex items-center justify-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{`${pharmacyInfo.city}, ${pharmacyInfo.district}`}</span>
          </p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{`Rs ${totalPrice.toFixed(2)}`}</p>
        </div>

        {/* Button Lookalike (part of the link) */}
        <div className="mt-auto">
          <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Select & Pay</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PharmacyCard;