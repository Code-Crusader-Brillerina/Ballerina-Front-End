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
  const { aid, patient } = location.state || {};

  // API Configuration
  const API_BASE_URL = "http://localhost:8080";

  // CONSOLE LOGS FOR DEBUGGING AID
  console.log("=== DOCTOR PATIENT DETAILS DEBUG ===");
  console.log("Component mounted/rendered");
  console.log("aid from location.state:", aid);
  console.log("patient from location.state:", patient);
  console.log("Full location.state:", location.state);
  console.log("location object:", location);
  console.log("Current pathname:", location.pathname);
  console.log("Current search:", location.search);
  console.log("=====================================");

  // Effects
  useEffect(() => {
    console.log("=== USEEFFECT DEBUG ===");
    console.log("useEffect triggered with aid:", aid);
    console.log("aid type:", typeof aid);
    console.log("aid truthy?", !!aid);
    
    if (!aid) {
      console.error("❌ No appointment ID provided");
      console.log("Setting error and navigating back...");
      setError("No appointment ID provided");
      setTimeout(() => navigate("/doctor/today-que"), 2000);
      return;
    }
    
    console.log("✅ Aid exists, calling fetchAppointmentData");
    fetchAppointmentData();
  }, [aid, navigate]);

  useEffect(() => {
    if (appointmentData && patientId) {
      console.log("State Updated:", { patientId, appointmentId: appointmentData.appointment?.aid || appointmentData.aid });
    }
  }, [appointmentData, patientId]);

  // API Functions
  const fetchAppointmentData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("=== FETCH APPOINTMENT DATA ===");
      console.log("🔄 Fetching appointment data for aid:", aid);
      console.log("aid value:", aid);
      console.log("aid type:", typeof aid);
      console.log("Request URL:", `${API_BASE_URL}/doctor/getAppoinment`);
      console.log("Request body:", JSON.stringify({ aid }));

      const response = await fetch(`${API_BASE_URL}/doctor/getAppoinment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ aid }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        console.error("❌ Response not ok, status:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Full API Response:", result);

      // Handle the response structure correctly
      if (result.success === true || result.success === "true") {
        if (result.data) {
          console.log("✅ Setting appointment data:", result.data);
          
          // Set the entire result.data object which contains appointment, patient, and user
          setAppointmentData(result.data);
          
          // Extract patient ID from the correct location
          const extractedPatientId = result.data.patient?.pid || 
                                   result.data.user?.uid ||
                                   result.data.appointment?.pid;
          
          console.log("Extracted patient ID:", extractedPatientId);
          setPatientId(extractedPatientId);
          
          if (!extractedPatientId) {
            console.warn("⚠️ No patient ID found in response");
          }
        } else {
          console.warn("⚠️ API response successful but no data provided");
          // Fallback logic remains the same...
          if (patient) {
            console.log("Using fallback patient data:", patient);
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
        console.log("API response message:", message);
        
        if (message.toLowerCase().includes("success") || 
            message.toLowerCase().includes("found")) {
          console.log("Treating as success despite success:false");
          
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
        console.log("🔄 Using emergency fallback patient data");
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
      console.log("=== FETCH COMPLETE ===");
    }
  };

  // Event Handlers
  const handleAddPrescription = () => {
    console.log("=== ADD PRESCRIPTION ===");
    console.log("patientId:", patientId);
    console.log("appointmentData?.appointment?.aid:", appointmentData?.appointment?.aid);
    console.log("appointmentData?.aid:", appointmentData?.aid);
    
    const appointmentId = appointmentData?.appointment?.aid || appointmentData?.aid;
    
    if (!patientId || !appointmentId) {
      console.error("❌ Missing patient or appointment information");
      console.log("patientId:", patientId, "appointmentId:", appointmentId);
      alert("Missing patient or appointment information");
      return;
    }

    console.log("✅ Navigating to add prescription with:", { patientId, appointmentId });
    navigate("/doctor/add-prescription", {
      state: {
        patientId: patientId,
        appointmentId: appointmentId,
      },
    });
  };

  const handleBackToQueue = () => {
    console.log("🔄 Navigating back to queue");
    navigate("/doctor/today-que");
  };

  const handleViewFullProfile = () => {
    console.log("=== VIEW FULL PROFILE ===");
    console.log("View Full Profile:", {
      patientId,
      doctorId: appointmentData?.appointment?.did || appointmentData?.did,
      appointmentId: appointmentData?.appointment?.aid || appointmentData?.aid,
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
                console.log("🔄 Using fallback data button clicked");
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

        {/* Bottom Action Button */}
        <div className="mt-10 text-center">
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