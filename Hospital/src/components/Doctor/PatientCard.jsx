import React from "react";
import { FaNotesMedical } from "react-icons/fa";

const PatientCard = ({ patient }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.02] ${
        patient.status === "waiting"
          ? "border-l-4 border-amber-500"
          : patient.status === "in-progress"
          ? "border-l-4 border-blue-500"
          : "border-l-4 border-emerald-500"
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                patient.status === "waiting"
                  ? "bg-amber-100 text-amber-800"
                  : patient.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {patient.status === "waiting"
                ? "Waiting"
                : patient.status === "in-progress"
                ? "In Progress"
                : "Completed"}
            </span>
            <h3 className="mt-2 text-lg font-bold text-teal-900">
              {patient.name}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-sm text-teal-600 font-medium">
              {patient.time}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ID: {patient.patientId}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={patient.image}
            alt={patient.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-teal-200"
          />
          <div>
            <p className="text-gray-700">
              <span className="font-medium">{patient.gender}</span>,{" "}
              {patient.age} years
            </p>
            <p className="text-sm text-gray-600 mt-1">{patient.address}</p>
            <p className="text-sm text-teal-700 mt-1">{patient.university}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors flex items-center gap-2">
            <FaNotesMedical /> Notes
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
