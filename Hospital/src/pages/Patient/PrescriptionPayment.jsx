import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CreditCard, Shield, Lock, CheckCircle, User, Home, ArrowRight, Eye, EyeOff } from 'lucide-react';

const PrescriptionPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the state passed from the Link component
  const { selectedPharmacy, prescription } = location.state || {};
  
  // State for the payment form and submission
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  });

  useEffect(() => {
    console.log("Data for Payment Page:", location.state);
  }, [location.state]);

  // If the page is accessed directly without state, redirect
  if (!selectedPharmacy || !prescription) {
    return <Navigate to="/" replace />;
  }

  // Handle the form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);

    try {
      // TODO: Create this backend endpoint
      // This endpoint should update the prescription status to 'paid' 
      // and confirm the selected pharmacy (phId).
      const response = await fetch('http://localhost:8080/patient/prescription/finalizePayment', {
        method: 'PUT', // Or POST
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preId: prescription.preId,
          phId: selectedPharmacy.pharmacyInfo.phId
        }),
      });
      
      const result = await response.json();

      if (result.success) {
        alert('Payment successful! Your order has been sent to the pharmacy.');
        navigate('/dashboard'); 
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (err) {
      console.error('Error during payment submission:', err);
      alert('An error occurred during payment. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // --- Helper functions for the form ---
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };
  // --- End of helper functions ---


  const deliveryFee = 160.00;
  const totalAmount = selectedPharmacy.totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Secure Checkout</h1>
          <p className="text-blue-100 text-lg">Finalize your prescription order</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Payment Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {/* Bill Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bill Details</h2>
              <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border">
                {selectedPharmacy.itemizedPrices.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{`${item.medicineName} x${item.quantity}`}</span>
                    <span className="font-semibold text-gray-800">{`Rs. ${item.subTotal.toFixed(2)}`}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm pt-2 border-t">
                  <span className="text-gray-700">Delivery Fee</span>
                  <span className="font-semibold text-gray-800">{`Rs. ${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center pt-3 font-bold text-lg border-t-2">
                  <span className="text-gray-800">Total</span>
                  <span className="text-green-600">{`Rs. ${totalAmount.toFixed(2)}`}</span>
                </div>
              </div>
            </div>

            {/* Card Payment Form */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                <input type="text" placeholder="Enter name as shown on card" value={formData.cardName} onChange={(e) => handleInputChange('cardName', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleCardNumberChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={formData.expiryMonth} onChange={(e) => handleInputChange('expiryMonth', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={formData.expiryYear} onChange={(e) => handleInputChange('expiryYear', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString().slice(-2)).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                  <div className="relative">
                    <input type={showCVV ? "text" : "password"} placeholder="123" value={formData.cvv} onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))} className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <button type="button" onClick={() => setShowCVV(!showCVV)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showCVV ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2" disabled={paymentProcessing}>
                {paymentProcessing ? 'Processing...' : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span className="text-lg">Pay Rs. {totalAmount.toFixed(2)}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <Home className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Pharmacy</p>
                    <h4 className="font-semibold text-gray-800">{selectedPharmacy.pharmacyInfo.name}</h4>
                    <p className="text-sm text-gray-500">{`${selectedPharmacy.pharmacyInfo.city}, ${selectedPharmacy.pharmacyInfo.district}`}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <User className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Patient</p>
                    <h4 className="font-semibold text-gray-800">{prescription.patient.name}</h4>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200 flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800 text-sm">100% Secure Transaction</p>
                    <p className="text-xs text-yellow-700 mt-1">All your payment details are encrypted and protected.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPayment;