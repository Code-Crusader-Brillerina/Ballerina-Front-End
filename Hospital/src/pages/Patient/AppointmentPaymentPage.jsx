import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Shield, Lock, ArrowRight } from 'lucide-react';

// --- Stripe Setup ---
// Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51RxhFZ5EJAzziJaDxXJjVJg0p2R3IExLDZ8R9ur5dq960uKeMBv05SNOEvSwL6QOXpfs3UJjiUyfRV0zch4YFfR300zcaRolnW');

const CheckoutForm = ({ totalAmount, aid }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  // State for the new form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleCompletePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);
    setPaymentError(null);

    try {
      // Step 1: Create PaymentIntent on Your Server
      const intentResponse = await fetch('http://localhost:8080/patient/createPaymentIntent', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }),
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

      // Step 3: If Payment is Successful, Update Your Backend
      if (paymentIntent.status === 'succeeded') {
        const updateResponse = await fetch(`http://localhost:8080/patient/appointment/${aid}`, {
          method: 'PUT',
          credentials: 'include',
        });
        const updateResult = await updateResponse.json();

        if (updateResult.success) {
          alert('Payment successful! Your appointment is confirmed.');
          navigate('/dashboard');
        } else {
          alert('Payment was processed but failed to update appointment status. Please contact support.');
          setPaymentProcessing(false);
        }
      }
    } catch (error) {
      console.error('Error during payment:', error);
      setPaymentError('An unexpected error occurred. Please try again.');
      setPaymentProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' },
    },
  };

  return (
    <form onSubmit={handleCompletePayment} className="space-y-6">
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

      <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
        <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 font-medium">Your payment is secured by Stripe</p>
          <p className="text-xs text-blue-600 mt-1">Your card details are never sent to our servers.</p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
        disabled={!stripe || paymentProcessing}
      >
        {paymentProcessing ? 'Processing...' : (
          <>
            <Lock className="w-5 h-5" />
            <span className="text-lg">Complete Payment</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

const AppointmentPaymentPage = () => {
  const { aid } = useParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/patient/appointment/${aid}`, {
          credentials: 'include'
        });
        const result = await response.json();
        if (response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else if (result.success) {
          setAppointmentData(result.data);
        } else {
          setError(result.message || 'Failed to fetch appointment details.');
        }
      } catch (err) {
        setError('An error occurred while fetching appointment details.');
      } finally {
        setLoading(false);
      }
    };
    if (aid) {
      fetchAppointmentDetails();
    } else {
      setError('Appointment ID not provided.');
      setLoading(false);
    }
  }, [aid]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"><p>Loading...</p></div>;
  }
  if (error || !appointmentData) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"><p className="text-red-500">{error || 'Appointment not found.'}</p></div>;
  }

  const totalAmount = parseInt(appointmentData.doctor.consultationFee, 10) + 150 + 350;

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-2">Secure Payment</h1>
            <p className="text-blue-100 text-lg">Complete your appointment booking</p>
          </div>
        </div>
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-8 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-green-800">Secure Payment with Stripe</h4>
                  </div>
                </div>
                <CheckoutForm totalAmount={totalAmount} aid={aid} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">Rs. {totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default AppointmentPaymentPage;