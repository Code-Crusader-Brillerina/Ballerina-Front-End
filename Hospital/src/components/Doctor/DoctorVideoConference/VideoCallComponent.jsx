import React from "react";
import { FaMicrophone, FaMicrophoneSlash, FaCamera, FaVideoSlash, FaPhoneSlash, FaEllipsisV, FaComment } from "react-icons/fa";

const VideoCallComponent = ({
  micOn,
  cameraOn,
  callDuration,
  formatTime,
  toggleMic,
  toggleCamera,
  endCall,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col p-4">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 bg-white rounded-t-xl shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-indigo-800">Consultation with Maya Fornado</h1>
            <p className="text-sm text-indigo-500 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Connected • {formatTime(callDuration)}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-indigo-100 transition text-indigo-600">
              <FaComment />
            </button>
            <button className="p-2 rounded-full hover:bg-indigo-100 transition text-indigo-600">
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 mt-4">
          {/* Doctor's Video (Main) */}
          <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
              <div className="text-center">
                <div className="bg-indigo-200 border-2 border-white rounded-full w-24 h-24 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-indigo-800">Maya Fornado</h2>
                <p className="text-indigo-500 mt-1">Cardiologist</p>
                {!cameraOn && (
                  <div className="mt-4 bg-white bg-opacity-80 p-3 rounded-lg inline-block">
                    <p className="text-indigo-700">Camera is off</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Patient's Video (Smaller) */}
          <div className="md:w-64 bg-white rounded-xl shadow-md overflow-hidden relative">
            <div className="h-full flex flex-col">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-200 border-2 border-white rounded-full w-16 h-16 mx-auto mb-3" />
                  <p className="text-indigo-800 font-medium">You</p>
                  {!cameraOn && (
                    <div className="mt-2 bg-white bg-opacity-80 p-2 rounded-lg">
                      <p className="text-xs text-indigo-700">Your camera is off</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center p-6 bg-white rounded-b-xl shadow-sm mt-4">
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMic}
              className={`p-4 rounded-full text-xl ${
                micOn 
                  ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              } transition`}
              aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
            >
              {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-4 rounded-full text-xl ${
                cameraOn 
                  ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              } transition`}
              aria-label={cameraOn ? "Turn off camera" : "Turn on camera"}
            >
              {cameraOn ? <FaCamera /> : <FaVideoSlash />}
            </button>

            <button
              onClick={endCall}
              className="p-4 rounded-full bg-red-600 text-white text-xl hover:bg-red-700 transition"
              aria-label="End call"
            >
              <FaPhoneSlash />
            </button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-white rounded-xl mt-4 p-3 text-center text-sm text-indigo-600">
          <div className="flex justify-center items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Secure end-to-end encrypted • Connection quality: Excellent
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallComponent;
