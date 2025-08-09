// components/Patient/homePage/HeroSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[500px] pb-32"> {/* Min-height and padding for content */}
      <div className="absolute inset-0 z-0">
        <img
          src="p2.png"
          alt="Smiling family"
          className="w-full h-full object-cover"
        />
        {/* The background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
        
        {/* Wavy bottom SVG */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,149.3C672,139,768,181,864,202.7C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Hero content positioned over the image */}
      <div className="relative z-20 container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:space-x-12">
          <div className="md:w-1/3 mt-12"> {/* Adjust margin-top to position correctly */}
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              Patient <br />
              Hamsgonte
            </h1>
            <div className="mt-8 flex space-x-4">
              <Link to="/login">
                <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;