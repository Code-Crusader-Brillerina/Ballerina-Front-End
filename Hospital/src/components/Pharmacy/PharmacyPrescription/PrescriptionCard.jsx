import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "Processing": return "bg-yellow-100 text-yellow-800";
    case "Ready": return "bg-blue-100 text-blue-800";
    case "Completed": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function PrescriptionCard({ prescription, onClick }) {
  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl w-14 h-14 flex items-center justify-center text-blue-600">
          <span className="text-2xl">{prescription.categoryIcon}</span>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <h4 className="font-bold text-gray-800">{prescription.patientName}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
              {prescription.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">Age: {prescription.age}</p>
          <p className="text-gray-500 text-xs mt-1 truncate">{prescription.address}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">{prescription.category}</span>
            {prescription.medications.slice(0, 2).map((med, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-100">{med.name}</span>
            ))}
            {prescription.medications.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{prescription.medications.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-500">{prescription.date}</span>
          <span className="text-xs text-gray-400 ml-2">• {prescription.time}</span>
        </div>
      </div>
    </div>
  );
}
