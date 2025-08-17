import React, { useRef, useState } from 'react';
import { FaPills, FaFileMedical, FaDownload } from 'react-icons/fa';
import { User, Stethoscope, Clock, Calendar, Phone } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrescriptionPrintable from './PrescriptionPrintable'; // Import the new component

const PrescriptionDetails = ({ doctor, patient, prescriptions, advice, appointment }) => {
  const prescriptionRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);

    const input = prescriptionRef.current;
    if (input) {
      try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        const filename = `Prescription_${patient?.name || 'patient'}_${appointment?.date || 'date'}.pdf`;
        pdf.save(filename);
      } catch (error) {
        console.error("PDF generation failed:", error);
        alert("Failed to generate PDF. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Container for the content to be downloaded. The ref is attached here. */}
      {/* It's hidden from view but still rendered in the DOM for html2canvas to capture */}
      <div 
        ref={prescriptionRef}
        style={{
          position: 'absolute',
          left: '-9999px', // Hide it off-screen
          top: '0',
          width: '210mm',  // A4 width
          height: '297mm', // A4 height
        }}
      >
        <PrescriptionPrintable 
          doctor={doctor} 
          patient={patient} 
          prescriptions={prescriptions} 
          advice={advice} 
          appointment={appointment}
        />
      </div>

      {/* The visible UI for the user */}
      <div>
        {/* The existing display logic */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b pb-4">
          {/* Doctor Info */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Stethoscope className="mr-2 text-blue-600" />
              Dr. {doctor?.name || 'N/A'}
            </h2>
            <p className="text-gray-600 text-sm">Specialization: {doctor?.specialty || 'General Practitioner'}</p>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <Phone className="w-4 h-4 mr-1" />
              {doctor?.phone || 'N/A'}
            </p>
          </div>

          {/* Patient Info */}
          <div className="text-left md:text-right">
            <p className="text-sm text-gray-600 flex items-center md:justify-end">
              <User className="w-4 h-4 mr-1" />
              Patient: <span className="font-semibold ml-1">{patient?.name || 'N/A'}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center md:justify-end">
              <Calendar className="w-4 h-4 mr-1" />
              Date of Birth: <span className="font-semibold ml-1">{patient?.age || 'N/A'}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center md:justify-end">
              Gender: <span className="font-semibold ml-1">{patient?.gender || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Appointment Details Section */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold text-blue-800 flex items-center mb-2">
            <Clock className="w-5 h-5 mr-2" />
            Appointment Details
          </h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Appointment Date:</span> {appointment?.date || 'N/A'}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Time:</span> {appointment?.time || 'N/A'}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Reason:</span> {appointment?.description || 'N/A'}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Reports:</span> {appointment?.reports?.join(', ') || 'N/A'}
          </p>
        </div>

        {/* Prescribed Medications */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaPills className="mr-2 text-green-600" />
            Medications
          </h3>
          {prescriptions && prescriptions.length > 0 ? (
            prescriptions.map((p, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-50 rounded-lg p-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPills className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-800">{p.name}</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Dosage:</span> Take {p.dosage} pill(s) {p.frequency} time(s) per day.
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Duration:</span> For {p.duration} day(s).
                  </p>
                  <p className="text-xs text-gray-500 italic mt-1">
                    <span className="font-medium">Instructions:</span> {p.instructions || 'N/A'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No medications listed.</p>
          )}
        </div>

        {/* Doctor's Advice */}
        <div className="bg-gray-50 rounded-lg p-5">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex-shrink-0 flex items-center justify-center">
              <FaFileMedical className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Doctor's Advice</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{advice || 'No specific advice found.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleDownloadPdf}
          className="flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FaDownload className="h-4 w-4" />
              <span>Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;