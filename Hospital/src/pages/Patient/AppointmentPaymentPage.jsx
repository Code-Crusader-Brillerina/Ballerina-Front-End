import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Lock, CheckCircle, Calendar, Clock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AppointmentPaymentPage = () => {
  const { aid } = useParams();
  const navigate = useNavigate(); // Import useNavigate for redirection
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false); // New state for payment loading

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

  // New handler for the "Complete Payment" button
  const handleCompletePayment = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true); // Set loading state for the payment button

    try {
      // API call to update the appointment status and payment state
      const response = await fetch(`http://localhost:8080/patient/appointment/${aid}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        alert('Payment failed: Unauthorized. Please log in again.');
        setPaymentProcessing(false);
        return;
      }
      
      const result = await response.json();
      
      if (result.success) {
        alert('Payment successful! Your appointment is now confirmed.');
        // Redirect the user to the dashboard or a confirmation page
        navigate('/dashboard'); 
      } else {
        alert(`Payment failed: ${result.message}`);
        setPaymentProcessing(false);
      }
    } catch (err) {
      console.error('Error during payment:', err);
      alert('An error occurred during payment. Please try again.');
      setPaymentProcessing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-gray-500 text-lg">Loading appointment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  const getTimeSlot = (time) => {
    switch (time) {
        case 'morning':
            return '8:00 AM - 12:00 PM';
        case 'afternoon':
            return '2:00 PM - 6:00 PM';
        case 'evening':
            return '8:00 PM - 10:00 PM';
        default:
            return 'N/A';
    }
  };

  const consultationFee = parseInt(appointmentData.doctor.consultationFee, 10);
  const platformFee = 150;
  const serviceTax = 350;
  const totalAmount = consultationFee + platformFee + serviceTax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Secure Payment</h1>
              <p className="text-blue-100 text-lg">Complete your appointment booking</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Security Notice */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-8 border border-green-200">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Secure Payment</h4>
                    <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    className="p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-3 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50"
                  >
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">Credit/Debit Card</h4>
                      <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              <form onSubmit={handleCompletePayment} className="space-y-6">
                {/* ... (form inputs remain the same) ... */}
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name as shown on card"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                    required
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={formData.expiryMonth}
                        onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        required
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        value={formData.expiryYear}
                        onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        required
                      >
                        <option value="">YY</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year.toString().slice(-2)}>
                            {year.toString().slice(-2)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type={showCVV ? "text" : "password"}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                        className="w-full px-4 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCVV(!showCVV)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCVV ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Card Checkbox */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={formData.saveCard}
                    onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="saveCard" className="text-sm text-gray-700">
                    Save this card for future payments
                  </label>
                </div>

                {/* Security Note */}
                <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Your payment is secured</p>
                    <p className="text-xs text-blue-600 mt-1">We use bank-level encryption to protect your data</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span className="text-lg">Complete Payment</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              {/* Appointment Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                  <User className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Dr. {appointmentData.doctor.name}</h4>
                    <p className="text-sm text-gray-600">{appointmentData.doctor.specialization}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{formatDate(appointmentData.date)}</h4>
                    <p className="text-sm text-gray-600">{getDayOfWeek(appointmentData.date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{getTimeSlot(appointmentData.time)}</h4>
                    <p className="text-sm text-gray-600">Online Consultation</p>
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Payment Breakdown</h4>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-gray-800">Rs. {consultationFee}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-semibold text-gray-800">Rs. {platformFee}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Service Tax</span>
                  <span className="font-semibold text-gray-800">Rs. {serviceTax}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600">Rs. {totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Savings Badge */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">You're saving Rs. 500!</p>
                    <p className="text-sm text-green-600">Compared to in-person consultation</p>
                  </div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800 text-sm">100% Money Back Guarantee</p>
                    <p className="text-xs text-yellow-700 mt-1">Full refund if you're not satisfied with the consultation</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Need help with payment?</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Secure Payments</h4>
            <p className="text-sm text-gray-600">256-bit SSL encryption</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Money Back Guarantee</h4>
            <p className="text-sm text-gray-600">100% satisfaction guaranteed</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">Instant Confirmation</h4>
            <p className="text-sm text-gray-600">Immediate booking confirmation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPaymentPage;