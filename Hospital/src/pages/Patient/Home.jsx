import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-transparent min-h-screen">
      {/* Hero Section with Wavy background and Gradient overlay */}
      <div className="relative h-[80vh] flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <img
            src="p2.png" // The path to your image
            alt="Doctor speaking with a young patient"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
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
        
        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-6 py-12 flex-grow flex items-center">
          <div className="flex flex-col md:flex-row items-start md:space-x-12">
            <div className="md:w-1/3">
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

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Patient Hamsgonce</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Find Doctors
              </h3>
              <p className="text-gray-600 text-sm">
                Search and book appointments with qualified doctors near you.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Get Prescriptions
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage your prescriptions securely online.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-purple-100 mb-4">
                <svg
                  className="h-8 w-8 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                View Medical Records
              </h3>
              <p className="text-gray-600 text-sm">
                Access your health history and medical records anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;