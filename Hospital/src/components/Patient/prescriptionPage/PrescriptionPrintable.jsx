import React from 'react';
import { FaPills } from 'react-icons/fa';

const PrescriptionPrintable = ({ doctor, patient, prescriptions, advice, appointment }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        Prescription
      </h1>
      <hr style={{ marginBottom: '20px' }} />

      {/* Header with Doctor and Patient Information */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
            Dr. {doctor?.name || 'N/A'}
          </h2>
          <p>Specialization: {doctor?.specialty || 'General Practitioner'}</p>
          <p>License No: {doctor?.licenseNomber || 'N/A'}</p>
          <p>Contact: {doctor?.phone || 'N/A'}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p>Date: {appointment?.date || 'N/A'}</p>
          <p>Patient Name: {patient?.name || 'N/A'}</p>
          <p>Date of Birth: {patient?.age || 'N/A'}</p>
          <p>Gender: {patient?.gender || 'N/A'}</p>
        </div>
      </div>

      <hr style={{ marginBottom: '20px' }} />

      {/* Prescribed Medications Section */}
      <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Medications</h3>
      {prescriptions && prescriptions.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>Medicine</th>
              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>Dosage</th>
              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>Duration</th>
              <th style={{ padding: '8px', border: '1px solid #ccc', textAlign: 'left' }}>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaPills style={{ marginRight: '5px' }} />
                    {p.name}
                  </div>
                </td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                  {p.dosage} pill(s), {p.frequency} time(s) per day
                </td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{p.duration} day(s)</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{p.instructions || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medications listed.</p>
      )}
      
      <hr style={{ marginTop: '20px', marginBottom: '20px' }} />

      {/* Doctor's Advice Section */}
      <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Doctor's Advice</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '80px' }}>
        <p>{advice || 'No specific advice found.'}</p>
      </div>

      <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '10px', color: '#888' }}>
        This is an automatically generated prescription.
      </p>
    </div>
  );
};

export default PrescriptionPrintable;