import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientHeader from "../../components/Doctor/DoctorPatientDetails/PatientHeader";
import PatientDetailsTab from "../../components/Doctor/DoctorPatientDetails/PatientDetailsTab";
import MedicalReportsTab from "../../components/Doctor/DoctorPatientDetails/MedicalReportsTab";
import PrescriptionCard from "../../components/Doctor/DoctorPatientDetails/PrescriptionCard";
import CommentsCard from "../../components/Doctor/DoctorPatientDetails/CommentsCard";

const DoctorPatientDetails = () => {
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  const handleAddPrescription = () => {
    navigate("/doctor/add-prescription");
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      alert(`Comment added: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <PatientHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tab Navigation */}
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

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "details" && <PatientDetailsTab />}
                {activeTab === "reports" && <MedicalReportsTab />}
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <PrescriptionCard onAdd={handleAddPrescription} />
            <CommentsCard
              comment={comment}
              setComment={setComment}
              onAddComment={handleAddComment}
            />
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-10 text-center">
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-3xl font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition"
            onClick={() => alert("Viewing full patient profile")}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;
