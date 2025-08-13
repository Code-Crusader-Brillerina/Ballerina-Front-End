import React from "react";

export default function PharmacyHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 rounded-xl mr-3 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Pharmacy Prescription Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all patient prescriptions in one place
          </p>
        </div>
      </div>
    </div>
  );
}
