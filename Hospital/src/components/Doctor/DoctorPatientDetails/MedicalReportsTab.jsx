import React from "react";

const MedicalReportsTab = () => {
  const reports = [
    { title: "X-ray Report", type: "imaging", date: "2023-11-15", color: "bg-gradient-to-r from-blue-100 to-cyan-100" },
    { title: "Complete Blood Count", type: "lab", date: "2023-11-10", color: "bg-gradient-to-r from-green-100 to-emerald-100" },
    { title: "Blood Test Report", type: "lab", date: "2023-11-05", color: "bg-gradient-to-r from-green-100 to-emerald-100" },
    { title: "ECG Results", type: "test", date: "2023-10-28", color: "bg-gradient-to-r from-yellow-100 to-amber-100" },
    { title: "Ultrasound Scan", type: "imaging", date: "2023-10-20", color: "bg-gradient-to-r from-blue-100 to-cyan-100" },
    { title: "Urinalysis Report", type: "lab", date: "2023-10-15", color: "bg-gradient-to-r from-green-100 to-emerald-100" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`${report.color} border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col`}
          >
            <div
              className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${
                report.type === "imaging"
                  ? "bg-blue-200 text-blue-700"
                  : report.type === "lab"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h4 className="font-medium text-gray-800">{report.title}</h4>
            <p className="text-sm text-gray-500 mt-1">Date: {report.date}</p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition self-start">
              View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalReportsTab;
