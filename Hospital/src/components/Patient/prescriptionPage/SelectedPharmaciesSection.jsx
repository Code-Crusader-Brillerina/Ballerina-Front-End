import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PharmacyCard from './PharmacyCard';
import { Loader2 } from 'lucide-react'; // For a loading spinner

const SelectedPharmaciesSection = ({ pharmacies, loading, error }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center col-span-full p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="ml-2 text-gray-600">Finding best prices...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500 col-span-full">Error: {error}</p>;
    }

    if (!pharmacies || pharmacies.length === 0) {
      return <p className="text-gray-500 col-span-full">No suitable pharmacies found for this prescription.</p>;
    }

    return pharmacies.map((pharmacy) => (
      <PharmacyCard
        key={pharmacy.pharmacyInfo.phId}
        phId={pharmacy.pharmacyInfo.phId}
        name={pharmacy.pharmacyInfo.name}
        address={`${pharmacy.pharmacyInfo.city}, ${pharmacy.pharmacyInfo.district}`}
        price={`Rs ${pharmacy.totalPrice.toFixed(2)}`}
      />
    ));
  };
  
  return (
    <section className="bg-transparent rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Available Pharmacies</h2>
        <button className="flex items-center space-x-2 text-blue-600 cursor-pointer">
          <FaPlus className="h-4 w-4" />
          <span className="font-semibold">View All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {renderContent()}
      </div>
    </section>
  );
};

export default SelectedPharmaciesSection;