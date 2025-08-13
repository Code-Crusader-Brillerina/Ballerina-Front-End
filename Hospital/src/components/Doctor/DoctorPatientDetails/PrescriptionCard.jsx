import React from "react";

const PrescriptionCard = ({ onAdd }) => (
  <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-xl p-6 border border-blue-100">
    <div className="flex items-center mb-4">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Prescription</h3>
    </div>

    <div className="space-y-3 mb-4">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100">
        <div>
          <div className="font-medium text-blue-800">Metformin 500mg</div>
          <div className="text-sm text-blue-600">Twice daily after meals</div>
        </div>
        <div className="text-sm text-blue-500 font-medium">10 days</div>
      </div>

      <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
        <div>
          <div className="font-medium text-green-800">Lisinopril 10mg</div>
          <div className="text-sm text-green-600">Once daily in the morning</div>
        </div>
        <div className="text-sm text-green-500 font-medium">30 days</div>
      </div>

      <div className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-100">
        <div>
          <div className="font-medium text-amber-800">Atorvastatin 20mg</div>
          <div className="text-sm text-amber-600">At bedtime</div>
        </div>
        <div className="text-sm text-amber-500 font-medium">30 days</div>
      </div>
    </div>

    <button
      onClick={onAdd}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium w-full hover:from-blue-600 hover:to-indigo-700 transition shadow-md flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Add New Prescription
    </button>
  </div>
);

export default PrescriptionCard;
