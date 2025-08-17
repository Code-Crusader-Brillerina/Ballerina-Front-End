import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PharmacyCard from './PharmacyCard';
import { Loader2 } from 'lucide-react';

// Accept prescriptionData as a prop
const SelectedPharmaciesSection = ({ pharmacies, loading, error, prescriptionData }) => {
  const renderContent = () => {
    // ... loading, error, empty states are the same ...
    if (!pharmacies || pharmacies.length === 0) {
        //...
    }

    return pharmacies.map((pharmacy) => (
      <PharmacyCard
        key={pharmacy.pharmacyInfo.phId}
        pharmacy={pharmacy} // Pass the entire pharmacy object
        prescription={prescriptionData} // Pass the prescription data
      />
    ));
  };
  
  return (
    // ... JSX is the same ...
    <section className="bg-transparent rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Available Pharmacies</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {renderContent()}
      </div>
    </section>
  );
};

export default SelectedPharmaciesSection;