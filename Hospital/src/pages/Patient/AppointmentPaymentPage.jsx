import React from 'react';

const AppointmentPaymentPage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bill</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-700">Service</span>
                <span className="font-semibold text-gray-800">Rs. 1000.00</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-700">Tax</span>
                <span className="font-semibold text-gray-800">Rs. 200.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-lg">
                <span className="text-gray-800">Total</span>
                <span className="text-gray-800">Rs. 1200.00</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Credit Card Details</h2>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm text-gray-600">Payment Method</span>
              <div className="flex space-x-2">
                <img src="https://via.placeholder.com/40x25.png?text=Mastercard" alt="Mastercard" className="h-6" />
                <img src="https://via.placeholder.com/40x25.png?text=Visa" alt="Visa" className="h-6" />
                <img src="https://via.placeholder.com/40x25.png?text=Amex" alt="American Express" className="h-6" />
                <img src="https://via.placeholder.com/40x25.png?text=Discover" alt="Discover" className="h-6" />
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                <input
                  type="text"
                  placeholder="Viraj Perera"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                <input
                  type="text"
                  placeholder="5555 5555 5555 5555"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card expiration</label>
                  <div className="flex space-x-2">
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month}>{month}</option>
                      ))}
                    </select>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Year</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Security Code</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Code"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15h.01M12 9a2 2 0 00-2 2v2a2 2 0 104 0V9a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPaymentPage;