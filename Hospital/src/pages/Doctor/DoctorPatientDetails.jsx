import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PatientHeader from "../../components/Doctor/DoctorPatientDetails/PatientHeader";
import PatientDetailsTab from "../../components/Doctor/DoctorPatientDetails/PatientDetailsTab";
import MedicalReportsTab from "../../components/Doctor/DoctorPatientDetails/MedicalReportsTab";
import PrescriptionCard from "../../components/Doctor/DoctorPatientDetails/PrescriptionCard";

const DoctorPatientDetails = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("details");
  const [appointmentData, setAppointmentData] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation and Location
  const navigate = useNavigate();
  const location = useLocation();
  const { aid } = location.state || {};

  // API Configuration
  const API_BASE_URL = "http://localhost:8080";

  // Effects
  useEffect(() => {
    if (!aid) {
      setError("No appointment ID provided");
      setTimeout(() => navigate("/doctor/today-que"), 2000);
      return;
    }
    fetchAppointmentData();
  }, [aid, navigate]);

  useEffect(() => {
    if (appointmentData && patientId) {
      console.log("State Updated:", { patientId, appointmentId: appointmentData.aid });
    }
  }, [appointmentData, patientId]);

  // API Functions
  const fetchAppointmentData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/doctor/getAppoinment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ aid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setAppointmentData(result.data);
        setPatientId(result.data.pid);
      } else {
        throw new Error(result.message || "Failed to fetch appointment data");
      }
    } catch (error) {
      console.error("Error fetching appointment:", error);
      setError(`Failed to fetch appointment data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Event Handlers
  const handleAddPrescription = () => {
    if (!patientId || !appointmentData?.aid) {
      alert("Missing patient or appointment information");
      return;
    }

    navigate("/doctor/add-prescription", {
      state: {
        patientId: patientId,
        appointmentId: appointmentData.aid,
      },
    });
  };

  const handleBackToQueue = () => {
    navigate("/doctor/today-que");
  };

  const handleViewFullProfile = () => {
    console.log("View Full Profile:", {
      patientId,
      doctorId: appointmentData?.did,
      appointmentId: appointmentData?.aid,
    });
    alert(`Viewing full patient profile for Patient ID: ${patientId}`);
    handleBackToQueue();
  };

  // Loading Component
  const LoadingComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading patient data...</p>
      </div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <div className="text-center bg-white rounded-lg shadow-md p-8">
        <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={handleBackToQueue}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Queue
        </button>
      </div>
    </div>
  );

  // Tab Navigation Component
  const TabNavigation = () => (
    <div className="flex border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      {[
        { id: "details", label: "Patient Details" },
        { id: "reports", label: "Medical Reports" }
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-4 font-medium text-sm transition ${
            activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600 bg-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Patient Info Card
  const PatientInfoCard = () => (
    <div className="mb-6 bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Patient ID:</span>
          <span className="ml-2 text-lg font-semibold text-blue-600">{patientId}</span>
        </div>
        <div className="text-sm text-gray-500">
          Appointment: {appointmentData?.aid} | Status: {appointmentData?.status}
        </div>
      </div>
    </div>
  );

  // Main Render Logic
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={handleBackToQueue}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            ← Back to Queue
          </button>
        </div>

        {/* Patient Header */}
        <PatientHeader appointmentData={appointmentData} patientId={patientId} />

        {/* Patient Info Card */}
        {patientId && <PatientInfoCard />}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Details and Reports */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <TabNavigation />
              <div className="p-6">
                {activeTab === "details" && (
                  <PatientDetailsTab appointmentData={appointmentData} patientId={patientId} />
                )}
                {activeTab === "reports" && (
                  <MedicalReportsTab
                    appointmentData={appointmentData}
                    patientId={patientId}
                    reports={appointmentData?.reports}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Prescription Card */}
          <div className="space-y-6">
            <PrescriptionCard 
              onAdd={handleAddPrescription} 
              pid={patientId}
              appointmentData={appointmentData}
            />
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-10 text-center">
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-3xl font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition"
            onClick={handleViewFullProfile}
          >
            View Queue Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;