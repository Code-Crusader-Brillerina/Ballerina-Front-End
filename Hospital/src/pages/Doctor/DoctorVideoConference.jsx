import React, { useState, useEffect } from "react";
import VideoCallComponent from "../../components/Doctor/DoctorVideoConference/VideoCallComponent";

const DoctorVideoConference = () => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMic = () => setMicOn(prev => !prev);
  const toggleCamera = () => setCameraOn(prev => !prev);
  const endCall = () => alert("Call ended");

  return (
    <VideoCallComponent
  micOn={micOn}
  cameraOn={cameraOn}
  callDuration={callDuration}
  formatTime={formatTime}
  toggleMic={toggleMic}
  toggleCamera={toggleCamera}
  endCall={endCall}
/>
  );
};

export default DoctorVideoConference;
