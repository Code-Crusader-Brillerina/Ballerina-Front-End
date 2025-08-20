import React, { useState } from "react";
import PropTypes from "prop-types";

const MedicalReportsTab = ({ appointmentData, patientId, reports = [] }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  // Default reports data
  const defaultReports = [
    { 
      id: 1,
      title: "X-ray Report", 
      type: "imaging", 
      date: "2023-11-15", 
      color: "bg-gradient-to-r from-blue-100 to-cyan-100",
      status: "Completed"
    },
    { 
      id: 2,
      title: "Complete Blood Count", 
      type: "lab", 
      date: "2023-11-10", 
      color: "bg-gradient-to-r from-green-100 to-emerald-100",
      status: "Normal"
    },
    { 
      id: 3,
      title: "Blood Test Report", 
      type: "lab", 
      date: "2023-11-05", 
      color: "bg-gradient-to-r from-green-100 to-emerald-100",
      status: "Normal"
    },
    { 
      id: 4,
      title: "ECG Results", 
      type: "test", 
      date: "2023-10-28", 
      color: "bg-gradient-to-r from-yellow-100 to-amber-100",
      status: "Normal"
    },
    { 
      id: 5,
      title: "Ultrasound Scan", 
      type: "imaging", 
      date: "2023-10-20", 
      color: "bg-gradient-to-r from-blue-100 to-cyan-100",
      status: "Completed"
    },
    { 
      id: 6,
      title: "Urinalysis Report", 
      type: "lab", 
      date: "2023-10-15", 
      color: "bg-gradient-to-r from-green-100 to-emerald-100",
      status: "Normal"
    }
  ];

  const reportsData = reports.length > 0 ? reports : defaultReports;

  const getReportIcon = (type) => {
    switch (type) {
      case "imaging":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case "lab":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getReportColor = (type) => {
    switch (type) {
      case "imaging": return "bg-blue-200 text-blue-700";
      case "lab": return "bg-green-200 text-green-700";
      default: return "bg-yellow-200 text-yellow-700";
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    // Here you would typically open a modal or navigate to report details
    console.log("Viewing report:", report);
    alert(`Opening ${report.title} from ${report.date}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Medical Reports</h3>
        <div className="text-sm text-gray-500">
          Total Reports: {reportsData.length}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportsData.map((report) => (
          <div
            key={report.id}
            className={`${report.color} border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col cursor-pointer`}
            onClick={() => handleViewReport(report)}
          >
            <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${getReportColor(report.type)}`}>
              {getReportIcon(report.type)}
            </div>
            
            <h4 className="font-medium text-gray-800 mb-1">{report.title}</h4>
            <p className="text-sm text-gray-600 mb-2">Date: {report.date}</p>
            
            {report.status && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-3 self-start ${
                report.status === 'Normal' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {report.status}
              </div>
            )}

            <button 
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleViewReport(report);
              }}
            >
              View Report
            </button>
          </div>
        ))}
      </div>

      {reportsData.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-500 mb-2">No Medical Reports</h4>
          <p className="text-gray-400">No medical reports are available for this patient yet.</p>
        </div>
      )}
    </div>
  );
};

MedicalReportsTab.propTypes = {
  appointmentData: PropTypes.object,
  patientId: PropTypes.string,
  reports: PropTypes.array
};

export default MedicalReportsTab;
