import React, { useState } from 'react';
import PrescriptionCard from './PrescriptionCard';
import DeliveryProgress from './DeliveryProgress';

const prescriptions = [
  { id: 1, pharmacy: 'The New Pharmacy', date: 'Delivery on Nov 15, 2025' },
  { id: 2, pharmacy: 'The New Pharmacy', date: 'Delivery on Nov 15, 2025' },
  { id: 3, pharmacy: 'The New Pharmacy', date: 'Delivery on Nov 15, 2025' },
];

const PrescriptionsSection = () => {
  // State to track the currently selected prescription's ID.
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(prescriptions[0].id);

  // Find the selected prescription to pass to the DeliveryProgress component
  const selectedPrescription = prescriptions.find(p => p.id === selectedPrescriptionId);

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Prescriptions</h2>
        <div className="flex items-center space-x-2 text-blue-600 cursor-pointer">
          <span className="font-semibold">View All</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {prescriptions.map((p) => (
            <PrescriptionCard 
              key={p.id}
              pharmacy={p.pharmacy} 
              date={p.date} 
              onClick={() => setSelectedPrescriptionId(p.id)} // Add onClick handler
              isActive={p.id === selectedPrescriptionId} // Pass active state
            />
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Progress</h3>
          {/* Pass the selected prescription data to DeliveryProgress */}
          {selectedPrescription && <DeliveryProgress prescription={selectedPrescription} />}
        </div>
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          + Add New Prescriptions
        </button>
      </div>
    </section>
  );
};

export default PrescriptionsSection;