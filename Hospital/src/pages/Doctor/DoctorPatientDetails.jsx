import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PatientHeader from "../../components/Doctor/DoctorPatientDetails/PatientHeader";
import PatientDetailsTab from "../../components/Doctor/DoctorPatientDetails/PatientDetailsTab";
import MedicalReportsTab from "../../components/Doctor/DoctorPatientDetails/MedicalReportsTab";
import PrescriptionCard from "../../components/Doctor/DoctorPatientDetails/PrescriptionCard";
import CommentsCard from "../../components/Doctor/DoctorPatientDetails/CommentsCard";

const DoctorPatientDetails = () => {
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [appointmentData, setAppointmentData] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { aid } = location.state || {};

  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("Appointment ID:", aid);
    
    if (!aid) {
      console.error("No appointment ID provided");
      setError("No appointment ID provided");
      // Redirect after a delay to show error
      setTimeout(() => {
        navigate("/doctor/today-que");
      }, 2000);
      return;
    }

    const fetchAppointmentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching appointment data for AID:", aid);
        
        const response = await fetch("http://localhost:8080/doctor/getAppoinment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ aid: aid }),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Appointment API response:", result);

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

    fetchAppointmentData();
  }, [aid, navigate, location.state]);

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

  const handleAddComment = async () => {
    if (comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    try {
      // You can implement API call here to save comment
      console.log(`Adding comment for Patient ID ${patientId}: ${comment}`);
      alert(`Comment added for Patient ID ${patientId}: ${comment}`);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    }
  };

  const handleBackToQueue = () => {
    navigate("/doctor/today-que");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <div className="mb-4">
          <button
            onClick={handleBackToQueue}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            ← Back to Queue
          </button>
        </div>

        <PatientHeader appointmentData={appointmentData} patientId={patientId} />

        {patientId && (
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
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-6 py-4 font-medium text-sm transition ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Patient Details
                </button>
                <button
                  onClick={() => setActiveTab("reports")}
                  className={`px-6 py-4 font-medium text-sm transition ${
                    activeTab === "reports"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Medical Reports
                </button>
              </div>

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

          <div className="space-y-6">
            <PrescriptionCard onAdd={handleAddPrescription} patientId={patientId} />
            <CommentsCard
              comment={comment}
              setComment={setComment}
              onAddComment={handleAddComment}
              patientId={patientId}
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-3xl font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition"
            onClick={() => {
              console.log(`Viewing full patient profile for Patient ID: ${patientId}`);
              alert(`Viewing full patient profile for Patient ID: ${patientId}`);
            }}
          >
            View Full Profile
          </button>
        </div>

        {/* Debug information */}
        {appointmentData && process.env.NODE_ENV === 'development' && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Debug - Appointment Details:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Appointment ID: {appointmentData.aid}</div>
              <div>Patient ID: {appointmentData.pid}</div>
              <div>Doctor ID: {appointmentData.did}</div>
              <div>Date: {appointmentData.date}</div>
              <div>Time: {appointmentData.time}</div>
              <div>Status: {appointmentData.status}</div>
              <div>Payment: {appointmentData.paymentState}</div>
              <div>Reports: {appointmentData.reports?.join(", ") || "None"}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatientDetails;