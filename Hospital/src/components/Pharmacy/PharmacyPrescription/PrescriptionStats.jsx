import React from "react";

export default function PrescriptionStats({ prescriptions }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
        <div className="text-gray-500 text-sm">Total Prescriptions</div>
        <div className="text-2xl font-bold text-gray-800">{prescriptions.length}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
        <div className="text-gray-500 text-sm">Processing</div>
        <div className="text-2xl font-bold text-gray-800">{prescriptions.filter(p => p.status === "Processing").length}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
        <div className="text-gray-500 text-sm">Ready for Pickup</div>
        <div className="text-2xl font-bold text-gray-800">{prescriptions.filter(p => p.status === "Ready").length}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
        <div className="text-gray-500 text-sm">Completed</div>
        <div className="text-2xl font-bold text-gray-800">{prescriptions.filter(p => p.status === "Completed").length}</div>
      </div>
    </div>
  );
}
