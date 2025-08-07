import React from 'react';
import { useParams } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa'; // Assuming you use react-icons

const PharmacyDelivery = () => {
  const { pharmacyName } = useParams();

  // Mock data for the selected pharmacy, in a real app you'd fetch this.
  const pharmacyDetails = {
    name: pharmacyName,
    address: 'Wariyapola, Kurunegala',
    phone: '+1 555-123-4567',
    deliveryTime: '1 hours 31 Min',
    fee: 'Rs 560.00',
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Delivery</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Pharmacy Details Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center space-x-4">
            <FaLeaf className="text-green-600 h-8 w-8" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{pharmacyDetails.name}</h2>
              <p className="text-sm text-gray-600">{pharmacyDetails.address}</p>
              <p className="text-sm text-gray-600">Phone: {pharmacyDetails.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Delivery Time - {pharmacyDetails.deliveryTime}</p>
            <p className="text-sm font-bold text-gray-800">Fee - {pharmacyDetails.fee}</p>
          </div>
        </div>

        {/* Delivery Form */}
        <form className="space-y-4 max-w-xl mx-auto">
          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input 
              id="fullName" 
              type="text" 
              placeholder="Full Name" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="district" className="sr-only">District</label>
              <input 
                id="district" 
                type="text" 
                placeholder="District" 
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="city" className="sr-only">City</label>
              <input 
                id="city" 
                type="text" 
                placeholder="City" 
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="sr-only">Address</label>
            <input 
              id="address" 
              type="text" 
              placeholder="Address" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="zipCode" className="sr-only">Zip Code</label>
              <input 
                id="zipCode" 
                type="text" 
                placeholder="Zip Code" 
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input 
                id="phone" 
                type="text" 
                placeholder="Phone" 
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          
          <button className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PharmacyDelivery;