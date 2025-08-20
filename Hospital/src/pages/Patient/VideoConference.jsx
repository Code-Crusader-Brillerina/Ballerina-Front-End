import React from "react";
import { useParams, useLocation } from "react-router-dom";

const VideoConference = () => {
  const { doctorName } = useParams();
  const location = useLocation();
  const { doctor, url } = location.state || {};

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Video Conference</h1>
        <h2 className="text-xl text-gray-700 mb-6">Dr. {doctorName}</h2>

        {/* Jitsi Meet iframe */}
        {url ? (
          <iframe
            src={url}
            allow="camera; microphone; fullscreen; display-capture"
            className="w-full h-[600px] rounded-lg shadow-lg"
            title="Video Conference"
          ></iframe>
        ) : (
          <p className="text-red-600">No video conference URL provided</p>
        )}
      </div>
    </div>
  );
};

export default VideoConference;
