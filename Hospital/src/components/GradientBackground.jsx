import React from 'react';

const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-blue-100 relative">
      {/* Subtle medical pattern overlay */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/60 via-transparent to-blue-50/40"></div>
      </div>
      
      {/* Clean floating elements */}
      <div className="absolute top-10 right-20 w-20 h-20 bg-green-200/20 rounded-full blur-lg"></div>
      <div className="absolute top-32 left-16 w-16 h-16 bg-blue-200/25 rounded-full blur-md"></div>
      <div className="absolute bottom-40 right-12 w-24 h-24 bg-green-100/30 rounded-full blur-lg"></div>
      <div className="absolute bottom-16 left-24 w-18 h-18 bg-blue-100/20 rounded-full blur-md"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;