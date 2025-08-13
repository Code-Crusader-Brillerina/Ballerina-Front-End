import React, { useState } from 'react';
import { CreditCard, Shield, Lock, CheckCircle, Calendar, Clock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AppointmentPaymentPage = () => {
  const [showCVV, setShowCVV] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment processed successfully!');
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Icons */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm font-medium text-gray-700">Accepted Cards:</span>
                  <div className="flex space-x-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AMEX</span>
                    </div>
                  </div>
                </div>

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
                >
                  <Lock className="w-5 h-5" />
                  <span className="text-lg">Complete Payment</span>
                  <ArrowRight className="w-5 h-5" />
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
                    <h4 className="font-semibold text-gray-800">Dr. Maya Fornado</h4>
                    <p className="text-sm text-gray-600">Physiologist</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <Calendar className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">December 16, 2024</h4>
                    <p className="text-sm text-gray-600">Monday</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">8:00 AM - 12:00 PM</h4>
                    <p className="text-sm text-gray-600">Online Consultation</p>
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Payment Breakdown</h4>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-gray-800">Rs. 2,500.00</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-semibold text-gray-800">Rs. 150.00</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Service Tax</span>
                  <span className="font-semibold text-gray-800">Rs. 350.00</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600">Rs. 3,000.00</span>
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