import React, { useState, useEffect } from 'react';
import {
  Bell,
  User,
  Menu,
  X,
  Heart,
  Shield,
  LogOut
} from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


// Enhanced Header Component
const Header = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div className="h-20"></div>;
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100/30'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Halgouce
                </span>
                <p className="text-xs text-gray-500 font-medium -mt-1">Healthcare Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink to="/" end className={({ isActive }) => `relative font-semibold transition-all duration-300 py-2 px-4 rounded-xl ${ isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50" }`}>
                Home
              </NavLink>
              
              {isAuthenticated && (
                <NavLink to="/dashboard" className={({ isActive }) => `relative font-semibold transition-all duration-300 py-2 px-4 rounded-xl ${ isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50" }`}>
                  Dashboard
                </NavLink>
              )}

              <NavLink to="/doctorpage" className={({ isActive }) => `relative font-semibold transition-all duration-300 py-2 px-4 rounded-xl ${ isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50" }`}>
                Doctors
              </NavLink>
              <NavLink to="/pharmacypage" className={({ isActive }) => `relative font-semibold transition-all duration-300 py-2 px-4 rounded-xl ${ isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50" }`}>
                Pharmacy
              </NavLink>
              <NavLink to="/about-us" className={({ isActive }) => `relative font-semibold transition-all duration-300 py-2 px-4 rounded-xl ${ isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50" }`}>
                About
              </NavLink>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold">3</span>
                  </button>
                  <div className="group relative">
                    <button className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200">
                      
                      {/* MODIFICATION START: Display profile picture or fallback icon */}
                      {user?.profilepic ? (
                        <img
                          src={user.profilepic}
                          alt="Profile"
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {/* MODIFICATION END */}

                      <span className="hidden md:block font-medium text-gray-700">{user?.username || 'User'}</span>
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-800 truncate">{user?.username || 'Guest User'}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">My Dashboard</span>
                        </Link>
                        <Link to="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Account Settings</span>
                        </Link>
                        <div className="h-px bg-gray-100 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="hidden md:block font-semibold px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Get Started
                    </button>
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
            <nav className="container mx-auto px-6 py-4 space-y-2">
              <NavLink to="/" end className={({ isActive }) => `block font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              
              {isAuthenticated && (
                <NavLink to="/dashboard" className={({ isActive }) => `block font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
              )}

              <NavLink to="/doctorpage" className={({ isActive }) => `block font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`} onClick={() => setIsMobileMenuOpen(false)}>Doctors</NavLink>
              <NavLink to="/pharmacypage" className={({ isActive }) => `block font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`} onClick={() => setIsMobileMenuOpen(false)}>Pharmacy</NavLink>
              <NavLink to="/about-us" className={({ isActive }) => `block font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
              
              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full text-center font-semibold py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">Login</button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">Get Started</button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;