import React from "react";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    "completed": { text: "Completed", color: "bg-green-100 text-green-800 ring-green-600/20" },
    "in-progress": { text: "In Progress", color: "bg-blue-100 text-blue-800 ring-blue-600/20" },
    "scheduled": { text: "Scheduled", color: "bg-yellow-100 text-yellow-800 ring-yellow-600/20" },
    "canceled": { text: "Canceled", color: "bg-red-100 text-red-800 ring-red-600/20" }
  };

  const config = statusConfig[status] || statusConfig.scheduled;

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ring-1 ring-inset ${config.color}`}>
      {config.text}
    </span>
  );
};

const AppointmentCard = ({ appt }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-500">
      <div className="flex items-start">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold ${appt.avatarColor}`}>
          {appt.patientName.split(" ").map(n => n[0]).join("")}
        </div>

        {/* Details */}
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{appt.patientName}</h2>
              <div className="flex items-center mt-1">
                <span className="text-gray-600 mr-3 text-sm">
                  {appt.gender}, {appt.age} years
                </span>
                <StatusBadge status={appt.status} />
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-800">
                  {new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm font-medium text-gray-800">{appt.time}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Reason</p>
                <p className="text-sm font-medium text-gray-800">{appt.reason}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-800">
                  {appt.status === "completed" ? "Completed" :
                   appt.status === "in-progress" ? "In Progress" :
                   appt.status === "scheduled" ? "Scheduled" : "Canceled"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
