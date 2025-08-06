import React from 'react';
import SearchFilter from '../../components/Patient/SearchFilter';
import PharmacyCard from '../../components/Patient/pharmacyPage/PharmacyCard';
import Pagination from '../../components/Patient/Pagination';


const pharmaciesData = new Array(9).fill({
  name: 'The New Pharmacy',
  address: 'Wariyapola, Kurunegala',
  deliveryTime: '1 hours 31 Min',
  price: 'Rs 566.00',
});

const Pharmacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pharmacies</h2>
      
      <SearchFilter />

      {/* Pharmacies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pharmaciesData.map((pharmacy, index) => (
          <PharmacyCard key={index} {...pharmacy} />
        ))}
      </div>
      
      <Pagination />
    </div>
  );
};

export default Pharmacy;