import React from 'react';

const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      {children}
    </div>
  );
};

export default GradientBackground;