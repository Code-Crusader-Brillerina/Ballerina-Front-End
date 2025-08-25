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
  const [finishingAppointment, setFinishingAppointment] = useState(false);

  // Navigation and Location
  const navigate = useNavigate();
  const location = useLocation();
  const { aid, patient } = location.state || {};

  // API Configuration
  const API_BASE_URL = "http://localhost:8080";

  // Console log for aid
  // console.log("aid from location.state:", aid);

  // Effects
  useEffect(() => {
    console.log("aid:", aid);
    
    if (!aid) {
      console.error("❌ No appointment ID provided");
      setError("No appointment ID provided");
      setTimeout(() => navigate("/doctor/today-que"), 2000);
      return;
    }
    
    fetchAppointmentData();
  }, [aid, navigate]);

  useEffect(() => {
    if (appointmentData && patientId) {
      // Optional: Keep if you need to track state updates
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
        console.error("❌ Response not ok, status:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Handle the response structure correctly
      if (result.success === true || result.success === "true") {
        if (result.data) {
          // Set the entire result.data object which contains appointment, patient, and user
          setAppointmentData(result.data);
          
          // Extract patient ID from the correct location
          const extractedPatientId = result.data.patient?.pid || 
                                   result.data.user?.uid ||
                                   result.data.appointment?.pid;
          
          setPatientId(extractedPatientId);
          
          if (!extractedPatientId) {
            console.error("⚠️ No patient ID found in response");
          }
        } else {
          console.error("⚠️ API response successful but no data provided");
          // Fallback logic remains the same...
          if (patient) {
            setAppointmentData({
              appointment: { aid: aid, pid: patient.user?.uid || patient.patientId, status: patient.status || 'pending' },
              patient: patient.patient || {},
              user: patient.user || {}
            });
            setPatientId(patient.user?.uid || patient.patientId);
          } else {
            throw new Error("No appointment data available");
          }
        }
      } else {
        // Error handling remains the same...
        const message = result.message || "Unknown error occurred";
        
        if (message.toLowerCase().includes("success") || 
            message.toLowerCase().includes("found")) {
          
          if (result.data) {
            setAppointmentData(result.data);
            setPatientId(result.data.patient?.pid || result.data.user?.uid);
          } else if (patient) {
            setAppointmentData({
              appointment: { aid: aid, pid: patient.user?.uid || patient.patientId, status: patient.status || 'pending' },
              patient: patient.patient || {},
              user: patient.user || {}
            });
            setPatientId(patient.user?.uid || patient.patientId);
          }
        } else {
          throw new Error(message);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching appointment:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setError(`Failed to fetch appointment data: ${error.message}`);
      
      // Emergency fallback remains the same...
      if (patient && !appointmentData) {
        setAppointmentData({
          appointment: { aid: aid, pid: patient.user?.uid || patient.patientId, status: patient.status || 'pending' },
          patient: patient.patient || {},
          user: patient.user || {}
        });
        setPatientId(patient.user?.uid || patient.patientId);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // New function to finish appointment
  const finishAppointment = async () => {
    try {
      setFinishingAppointment(true);

      const response = await fetch(`${API_BASE_URL}/doctor/updateAppoinmentStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          aid: aid,
          status: "completed"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success === true || result.success === "true") {
        console.log("✅ Appointment finished successfully");
        // Navigate back to queue after successful update
        handleViewFullProfile();
      } else {
        throw new Error(result.message || "Failed to update appointment status");
      }

    } catch (error) {
      console.error("❌ Error finishing appointment:", error);
      alert(`Failed to finish appointment: ${error.message}`);
    } finally {
      setFinishingAppointment(false);
    }
  };

  // Event Handlers
  const handleAddPrescription = () => {
    const appointmentId = appointmentData?.appointment?.aid || appointmentData?.aid;
    
    if (!patientId || !appointmentId) {
      console.error("❌ Missing patient or appointment information");
      alert("Missing patient or appointment information");
      return;
    }

    navigate("/doctor/add-prescription", {
      state: {
        patientId: patientId,
        appointmentId: appointmentId,
      },
    });
  };

  const handleBackToQueue = () => {
    navigate("/doctor/today-que");
  };

  const handleViewFullProfile = () => {
    // Removed the alert message - directly navigate back to queue
    handleBackToQueue();
  };

  // Loading Component
  const LoadingComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading patient data...</p>
        <p className="text-sm text-gray-500 mt-2">Appointment ID: {aid}</p>
      </div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
      <div className="text-center bg-white rounded-lg shadow-md p-8">
        <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
        <p className="text-gray-700 mb-4">{error}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>Appointment ID: {aid}</p>
          {patient && <p>Fallback patient data available</p>}
        </div>
        <div className="space-x-4">
          <button
            onClick={handleBackToQueue}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Queue
          </button>
          {patient && (
            <button
              onClick={() => {
                // Try to proceed with fallback data - FIXED structure
                setAppointmentData({
                  appointment: {
                    aid: aid,
                    pid: patient.user?.uid || patient.patientId,
                    status: patient.status || 'pending'
                  },
                  patient: patient.patient || {},
                  user: patient.user || {}
                });
                setPatientId(patient.user?.uid || patient.patientId);
                setError(null);
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Use Available Data
            </button>
          )}
        </div>
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
  const PatientInfoCard = () => {
    const appointmentId = appointmentData?.appointment?.aid || appointmentData?.aid;
    const status = appointmentData?.appointment?.status || appointmentData?.status;
    
    return (
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Patient ID:</span>
            <span className="ml-2 text-lg font-semibold text-blue-600">{patientId}</span>
          </div>
          <div className="text-sm text-gray-500">
            Appointment: {appointmentId} | Status: {status}
          </div>
        </div>
        {/* Debug info - remove in production */}
        <div className="mt-2 text-xs text-gray-400">
          Debug: aid={aid}, hasAppointmentData={!!appointmentData}, hasPatientFallback={!!patient}
        </div>
      </div>
    );
  };

  // Main Render Logic
  if (loading) return <LoadingComponent />;
  if (error && !appointmentData) return <ErrorComponent />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        

        {/* Patient Header */}
        <PatientHeader 
          appointmentData={appointmentData} 
          patientId={patientId}
          fallbackPatient={patient}
        />

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
                  <PatientDetailsTab 
                    appointmentData={appointmentData} 
                    patientId={patientId}
                    fallbackPatient={patient}
                  />
                )}
                {activeTab === "reports" && (
                  <MedicalReportsTab
                    appointmentData={appointmentData}
                    patientId={patientId}
                    reports={appointmentData?.appointment?.reports || appointmentData?.reports}
                    fallbackPatient={patient}
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

        {/* Bottom Action Buttons */}
        <div className="mt-10 text-center space-x-4">
          <button
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-3xl font-semibold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={finishAppointment}
            disabled={finishingAppointment}
          >
            {finishingAppointment ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Finishing...
              </>
            ) : (
              'Finish Appointment'
            )}
          </button>
          
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-3xl font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition"
            onClick={handleViewFullProfile}
          >
            Back to Queue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;