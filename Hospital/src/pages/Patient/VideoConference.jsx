// VideoConference.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { FaMicrophoneSlash, FaVideoSlash, FaPhone, FaPhoneSlash } from 'react-icons/fa';

const VideoConference = () => {
  const { doctorName } = useParams();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Video Conference</h1>
        <h2 className="text-xl text-gray-700 mb-6">Dr. {doctorName}</h2>
        
        {/* Video container */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden h-[500px] mb-8">
          {/* Main video frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main video goes here (e.g., the user's view) */}
          </div>
          
          {/* Smaller video frame for the other participant (the doctor) */}
          <div className="absolute bottom-6 right-6 w-1/4 h-1/4 bg-gray-700 rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Dr. Maya Fornado" className="object-cover w-full h-full" />
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
            {/* Mute/unmute microphone button */}
            <button className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
              <FaMicrophoneSlash className="h-6 w-6" />
            </button>

            {/* Turn off/on camera button */}
            <button className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors">
              <FaVideoSlash className="h-6 w-6" />
            </button>

            {/* End call button */}
            <button className="p-4 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors">
              <FaPhoneSlash className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Text-based controls for clarity */}
        <div className="flex justify-center space-x-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaMicrophoneSlash />
            <span>Microphone</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaVideoSlash />
            <span>Camera</span>
          </div>
          <button className="flex items-center space-x-2 text-red-600 font-semibold">
            <FaPhoneSlash />
            <span>End</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;