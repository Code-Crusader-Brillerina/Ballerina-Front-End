import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PharmacyCard from './PharmacyCard';

const pharmaciesData = [
  { name: 'The New Pharmacy', address: 'Wariyapola, Kurunegala', deliveryTime: '1 hours 31 Min', price: 'Rs 566.00' },
  { name: 'The New Pharmacy', address: 'Wariyapola, Kurunegala', deliveryTime: '1 hours 31 Min', price: 'Rs 580.00' },
  { name: 'The New Pharmacy', address: 'Wariyapola, Kurunegala', deliveryTime: '1 hours 31 Min', price: 'Rs 566.00' },
  { name: 'The New Pharmacy', address: 'Wariyapola, Kurunegala', deliveryTime: '1 hours 31 Min', price: 'Rs 583.00' },
];

const SelectedPharmaciesSection = () => (
  <section className="bg-transparent rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Selected Pharmacies</h2>
      <button className="flex items-center space-x-2 text-blue-600 cursor-pointer">
        <FaPlus className="h-4 w-4" />
        <span className="font-semibold">View All</span>
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pharmaciesData.map((pharmacy, index) => (
        <PharmacyCard key={index} {...pharmacy} />
      ))}
    </div>
  </section>
);

export default SelectedPharmaciesSection;