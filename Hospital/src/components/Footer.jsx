import React from 'react';

const Footer = () => (
  <footer className="bg-blue-900 text-white mt-8 py-8 relative rounded-t-3xl overflow-hidden">
    {/* Optional: A dark blue background curve to match the image if needed */}
    <div className="absolute top-0 left-0 w-full h-8 bg-blue-900 transform -translate-y-full rounded-t-3xl"></div>
    
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* Footer Branding Section */}
      <div>
        <div className="flex items-center mb-4">
          <img src="/Logo.png" alt="Halgouce Logo" className="h-10 w-10" />
          <span className="ml-2 font-bold text-lg">Hallguce</span>
        </div>
      </div>
      
      {/* Footer Link Sections */}
      <div>
        <h4 className="font-semibold mb-2">Records</h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>Records</li>
          <li>Records</li>
          <li>Records</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Records</h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>Records</li>
          <li>Records</li>
          <li>Records</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Records</h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>Records</li>
          <li>Records</li>
          <li>Records</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;