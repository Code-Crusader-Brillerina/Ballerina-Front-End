import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PrescriptionPayment = () => {
  const location = useLocation();

  // Extract the state passed from the Link component
  const { selectedPharmacy, prescription } = location.state || {};

  // If the page is accessed directly without state, redirect or show an error
  if (!selectedPharmacy || !prescription) {
    // You can redirect to the home page or show an error message
    return <Navigate to="/" replace />;
  }

  // Define a fixed delivery fee or get it from somewhere else
  const deliveryFee = 160.00;
  const totalAmount = selectedPharmacy.totalPrice + deliveryFee;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment for {selectedPharmacy.pharmacyInfo.name}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="max-w-2xl mx-auto">
          {/* Bill Section - Now Dynamic */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bill Details</h2>
            <div className="space-y-2">
              {/* Map over the itemized prices */}
              {selectedPharmacy.itemizedPrices.map((item, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-700">{`${item.medicineName} x${item.quantity}`}</span>
                  <span className="font-semibold text-gray-800">{`Rs. ${item.subTotal.toFixed(2)}`}</span>
                </div>
              ))}

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-700">Delivery</span>
                <span className="font-semibold text-gray-800">{`Rs. ${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between items-center pt-2 font-bold text-lg">
                <span className="text-gray-800">Total</span>
                <span className="text-gray-800">{`Rs. ${totalAmount.toFixed(2)}`}</span>
              </div>
            </div>
          </div>

          {/* Credit Card Details Section (remains the same) */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Credit Card Details</h2>
            {/* ... rest of the form ... */}
            <form className="space-y-4">
                {/* ... all form inputs ... */}
                <button
                 type="submit"
                 className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                 Pay Rs. {totalAmount.toFixed(2)}
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPayment;