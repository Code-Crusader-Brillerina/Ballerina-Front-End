import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MedicalReportsTab = ({ appointmentData, patientId, reports = [], aid }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [apiReports, setApiReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Configuration
  const API_BASE_URL = "http://localhost:8080";

  // Console log the aid when component mounts or aid changes
  useEffect(() => {
    if (aid) {
      fetchReports();
    } else {
      // Try to extract aid from appointmentData if available
      const fallbackAid = appointmentData?.appointment?.aid || appointmentData?.aid;
      if (fallbackAid) {
        fetchReports(fallbackAid);
      }
    }
  }, [aid, appointmentData]);

  // Fetch reports from API
  const fetchReports = async (aidToUse = null) => {
    const currentAid = aidToUse || aid;
    
    if (!currentAid) {
      console.warn("No aid available for fetching reports");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/doctor/getAppoinment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ aid: currentAid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success === true || result.success === "true") {
        const reportUrls = result.data?.appointment?.reports || [];
        
        // Transform URLs into report objects
        const transformedReports = reportUrls.map((url, index) => {
          const filename = extractFilename(url);
          const reportType = determineReportType(filename);
          
          return {
            id: `api_report_${index + 1}`,
            title: filename || `Report ${index + 1}`,
            type: reportType,
            date: result.data?.appointment?.date || new Date().toISOString().split('T')[0],
            color: getColorByType(reportType),
            status: "Available",
            url: url,
            isApiReport: true
          };
        });

        setApiReports(transformedReports);
      } else {
        throw new Error(result.message || "Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const extractFilename = (url) => {
    try {
      // Extract filename from Firebase URL
      const urlParts = url.split('/');
      const filenamePart = urlParts.find(part => part.includes('_') && (part.includes('.pdf') || part.includes('.jpg') || part.includes('.png')));
      if (filenamePart) {
        const filename = filenamePart.split('?')[0]; // Remove query parameters
        // Clean up the filename by removing timestamp prefix
        return filename.replace(/^\d+_/, '').replace(/%20/g, ' ');
      }
      return "Medical Report";
    } catch (error) {
      return "Medical Report";
    }
  };

  const determineReportType = (filename) => {
    const lower = filename.toLowerCase();
    if (lower.includes('x-ray') || lower.includes('xray') || lower.includes('scan') || lower.includes('ultrasound') || lower.includes('mri') || lower.includes('ct')) {
      return 'imaging';
    } else if (lower.includes('blood') || lower.includes('lab') || lower.includes('test') || lower.includes('analysis')) {
      return 'lab';
    }
    return 'document';
  };

  const getColorByType = (type) => {
    switch (type) {
      case "imaging": return "bg-gradient-to-r from-blue-100 to-cyan-100";
      case "lab": return "bg-gradient-to-r from-green-100 to-emerald-100";
      default: return "bg-gradient-to-r from-purple-100 to-pink-100";
    }
  };

  // Default reports data (fallback)
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
    }
  ];

  // Determine which reports to display
  const getReportsToDisplay = () => {
    if (apiReports.length > 0) {
      return apiReports;
    } else if (reports.length > 0) {
      return reports;
    } else {
      return defaultReports;
    }
  };

  const reportsData = getReportsToDisplay();

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
      case "document":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
      case "document": return "bg-purple-200 text-purple-700";
      default: return "bg-yellow-200 text-yellow-700";
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    
    const currentAid = aid || appointmentData?.appointment?.aid || appointmentData?.aid || "unknown";
    
    if (report.isApiReport && report.url) {
      // Open the actual report URL in a new tab
      window.open(report.url, '_blank');
    } else {
      // Show alert for demo reports
      alert(`Opening ${report.title || 'Report'} from ${report.date || 'Unknown date'} (Appointment ID: ${currentAid})`);
    }
  };

  const handleDownloadReport = (report) => {
    if (report.isApiReport && report.url) {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = report.url;
      link.download = report.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Medical Reports</h3>
        <div className="text-sm text-gray-500">
          Total Reports: {reportsData.length}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">Error loading reports: {error}</p>
          </div>
        </div>
      )}

      {/* Reports Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportsData.map((report) => (
            <div
              key={report.id}
              className={`${report.color} border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col cursor-pointer relative`}
              onClick={() => handleViewReport(report)}
            >
              

              <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${getReportColor(report.type)}`}>
                {getReportIcon(report.type)}
              </div>
              
              <h4 className="font-medium text-gray-800 mb-1 pr-8">{report.title}</h4>
              <p className="text-sm text-gray-600 mb-2">Date: {report.date}</p>
              
              {report.status && (
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-3 self-start ${
                  report.status === 'Normal' || report.status === 'Available'
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {report.status}
                </div>
              )}

              <div className="mt-auto flex space-x-2">
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewReport(report);
                  }}
                >
                  {report.isApiReport ? 'Open' : 'View Report'}
                </button>
                
                {report.isApiReport && (
                  <button 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadReport(report);
                    }}
                    title="Download Report"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && reportsData.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-500 mb-2">No Medical Reports</h4>
          <p className="text-gray-400">No medical reports are available for this patient yet.</p>
          {aid && <p className="text-xs text-gray-300 mt-2">Appointment ID: {aid}</p>}
        </div>
      )}
    </div>
  );
};

MedicalReportsTab.propTypes = {
  appointmentData: PropTypes.object,
  patientId: PropTypes.string,
  reports: PropTypes.array,
  aid: PropTypes.string
};

export default MedicalReportsTab;