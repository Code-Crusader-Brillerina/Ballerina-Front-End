import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Shield, Lock, Home, User, ArrowRight } from 'lucide-react';

// --- Stripe Setup ---
// Use the same Stripe Promise and publishable key
const stripePromise = loadStripe('pk_test_51RxhFZ5EJAzziJaDxXJjVJg0p2R3IExLDZ8R9ur5dq960uKeMBv05SNOEvSwL6QOXpfs3UJjiUyfRV0zch4YFfR300zcaRolnW');

// A dedicated CheckoutForm for Prescriptions
const PrescriptionCheckoutForm = ({ selectedPharmacy, prescription, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  // State for the new form fields, pre-filled with patient data
  const [name, setName] = useState(prescription.patient?.name || '');
  const [email, setEmail] = useState(prescription.patient?.email || '');
  
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setPaymentProcessing(true);
    setPaymentError(null);

    try {
      // Step 1: Create PaymentIntent on Your Server
      const intentResponse = await fetch('http://localhost:8080/patient/createPaymentIntent', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100) }),
      });
      const intentResult = await intentResponse.json();

      if (!intentResult.success) {
        setPaymentError(intentResult.message || 'Could not initiate payment.');
        setPaymentProcessing(false);
        return;
      }
      const clientSecret = intentResult.data.clientSecret;

      // Step 2: Confirm the Payment using details from the new form fields
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,   // Use state variable for name
            email: email, // Use state variable for email
          },
        },
      });

      if (stripeError) {
        setPaymentError(stripeError.message);
        setPaymentProcessing(false);
        return;
      }

      // Step 3: If Payment Succeeds, Update Prescription Status on Your Backend
      if (paymentIntent.status === 'succeeded') {
        const updateResponse = await fetch('http://localhost:8080/patient/updatePrescriptionStatus', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            preId: prescription.preId,
            phId: selectedPharmacy.pharmacyInfo.phId,
          }),
        });
        const updateResult = await updateResponse.json();

        if (updateResult.success) {
          alert('Payment successful! Your order has been sent to the pharmacy.');
          navigate('/dashboard');
        } else {
          alert('Payment was processed but failed to update order status. Please contact support.');
          setPaymentProcessing(false);
        }
      }
    } catch (error) {
      console.error('Error during payment submission:', error);
      setPaymentError('An error occurred during payment. Please try again.');
      setPaymentProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' },
    },
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      {/* --- NEW CUSTOMER DETAIL FIELDS --- */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Details</label>
        <CardElement options={cardElementOptions} />
      </div>

      {paymentError && <div className="text-red-500 text-sm">{paymentError}</div>}
      
      <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center space-x-2" disabled={!stripe || paymentProcessing}>
        {paymentProcessing ? 'Processing...' : (
          <>
            <Lock className="w-5 h-5" />
            <span className="text-lg">Pay Rs. {totalAmount.toFixed(2)}</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

const PrescriptionPayment = () => {
  const location = useLocation();
  const { selectedPharmacy, prescription } = location.state || {};
  
  if (!selectedPharmacy || !prescription) {
    return <Navigate to="/dashboard" replace />;
  }

  const deliveryFee = 160.00;
  const totalAmount = selectedPharmacy.totalPrice + deliveryFee;

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold">Secure Checkout</h1>
            <p className="text-blue-100 text-lg">Finalize your prescription order</p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg-col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
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

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
              <PrescriptionCheckoutForm 
                selectedPharmacy={selectedPharmacy}
                prescription={prescription}
                totalAmount={totalAmount}
              />
            </div>

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
                    <Shield className="w-5 h-5 text-yellow-600 mt-0-5" />
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
    </Elements>
  );
};

export default PrescriptionPayment;