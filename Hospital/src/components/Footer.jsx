import { ArrowUp, Clock, Facebook, Heart, Instagram, Linkedin, Mail, MapPin, Phone, Shield, Stethoscope, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsBackToTopVisible(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Back to Top Button */}
      {/* <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform ${
          isBackToTopVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        } hover:scale-110`}
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
      </button> */}

      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Wave Top Border */}
        <div className="absolute top-0 left-0 w-full">
          <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path
              fill="white"
              fillOpacity="1"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-20 pb-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Halgouce</span>
                  <p className="text-blue-200 text-sm">Healthcare Platform</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Revolutionizing healthcare with our comprehensive e-channeling and online pharmacy platform. 
                Your health, our priority.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Facebook className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Twitter className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Instagram className="w-5 h-5 text-pink-400 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 group">
                  <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2 text-blue-400" />
                Services
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Online Consultations
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Appointment Booking
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Prescription Management
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Medicine Delivery
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Health Records
                </a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Support
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Help Center
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Privacy Policy
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Terms of Service
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Security
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Contact Us
                </a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-purple-400" />
                Contact
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-300 text-sm">123 Healthcare St, Medical District, City 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300 text-sm">support@halgouce.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Hours</p>
                    <p className="text-gray-300 text-sm">24/7 Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-300 text-sm">
                © 2024 Halgouce. All rights reserved. Designed with ❤️ for better healthcare.
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">SSL Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;