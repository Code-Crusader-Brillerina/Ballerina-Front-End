import React from 'react';

const Footer = () => (
  <footer className="bg-blue-900 text-white mt-8 py-8">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.866-3.582 7-8 7-4.418 0-8-3.134-8-7s3.582-7 8-7 8 3.134 8 7zM12 11v6m0-6V5"></path></svg>
          </div>
          <span className="ml-2 font-bold text-lg">Hallguce</span>
        </div>
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