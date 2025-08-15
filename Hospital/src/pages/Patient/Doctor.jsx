import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Calendar, MapPin, Award, Clock, Video, Users, Heart, Stethoscope, User, ArrowRight, Plus, ChevronDown, X } from 'lucide-react';

// Enhanced Doctor Card Component
const DoctorCard = ({ doctor }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Construct the URL for the appointment page using the doctor's did
    const appointmentUrl = `/appointment/${doctor.did}`;

    return (
        <Link to={appointmentUrl} className="block">
            <div
                className="group relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative mb-4 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                            {doctor.profilepic && doctor.profilepic !== 'http://' ? (
                                <img src={doctor.profilepic} alt={doctor.username} className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                <User className="w-12 h-12 text-white" />
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Dr. {doctor.username}</h3>
                    <p className="text-blue-600 font-semibold text-sm mb-2">{doctor.specialization}</p>
                    <p className="text-gray-500 text-xs mb-3">{doctor.description}</p>
                    <div className="flex items-center justify-center space-x-1 mb-3">
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < doctor.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({doctor.experience}+ Years)</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                        <div className="bg-blue-100 rounded-xl p-2 mb-1">
                            <Users className="w-4 h-4 text-blue-600 mx-auto" />
                        </div>
                        <p className="text-xs text-gray-600">Experience</p>
                        <p className="text-sm font-bold text-gray-800">{doctor.experience}+ Years</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 rounded-xl p-2 mb-1">
                            <Calendar className="w-4 h-4 text-green-600 mx-auto" />
                        </div>
                        <p className="text-xs text-gray-600">Available</p>
                        <p className="text-sm font-bold text-gray-800">
                            {doctor.availableTimes && doctor.availableTimes.length > 0 ? 'Yes' : 'No'}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Book Appointment</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Enhanced Search and Filter Component
const SearchFilter = ({ searchTerm, setSearchTerm, filters, setFilters, showFilters, setShowFilters, allSpecialties }) => {
    const specialties = ['All Specialties', ...new Set(allSpecialties)];
    const availability = ['Any Time', 'Today', 'Tomorrow', 'This Week'];
    
    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search doctors by name or specialty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                    />
                </div>
                
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
            </div>
            
            {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                        <select 
                            value={filters.specialty}
                            onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>{specialty}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                        <select 
                            value={filters.availability}
                            onChange={(e) => setFilters({...filters, availability: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            {availability.map(avail => (
                                <option key={avail} value={avail}>{avail}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

// Quick Stats Component
const QuickStats = ({ doctors }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-blue-100 text-sm font-medium">Total</p>
                    <p className="text-3xl font-bold">{doctors.length}+</p>
                    <p className="text-blue-100 text-sm">Doctors</p>
                </div>
                <Stethoscope className="w-10 h-10 text-blue-200" />
            </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-green-100 text-sm font-medium">Available</p>
                    <p className="text-3xl font-bold">{doctors.filter(d => d.availableTimes.length > 0).length}+</p>
                    <p className="text-green-100 text-sm">Today</p>
                </div>
                <Calendar className="w-10 h-10 text-green-200" />
            </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-orange-100 text-sm font-medium">Specialties</p>
                    <p className="text-3xl font-bold">{new Set(doctors.map(d => d.specialization)).size}+</p>
                    <p className="text-orange-100 text-sm">Categories</p>
                </div>
                <Award className="w-10 h-10 text-orange-200" />
            </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-purple-100 text-sm font-medium">Experience</p>
                    <p className="text-3xl font-bold">5+</p>
                    <p className="text-purple-100 text-sm">Average</p>
                </div>
                <Star className="w-10 h-10 text-purple-200" />
            </div>
        </div>
    </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center items-center space-x-4 mt-8">
        <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
            Previous
        </button>
        
        <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                        currentPage === i + 1
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
        
        <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
            Next
        </button>
    </div>
);

// Main Doctor Page Component
const Doctor = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        specialty: 'All Specialties',
        availability: 'Any Time'
    });
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8080/patient/getAllDoctors');
                const result = await response.json();
                
                if (result.success && result.data) {
                    const formattedDoctors = result.data.map(doc => ({
                        ...doc,
                        // Mapping API fields to component props
                        username: doc.username,
                        specialization: doc.specialization,
                        description: doc.description,
                        experience: doc.experience,
                        availableTimes: doc.availableTimes,
                        profilepic: doc.profilepic,
                        // Mocked data not available in API response
                        rating: 4.5,
                        reviews: 100,
                    }));
                    setDoctors(formattedDoctors);
                } else {
                    setError(result.message || 'Failed to fetch doctor data');
                }
            } catch (err) {
                console.error('Error fetching doctors:', err);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const allSpecialties = doctors.map(d => d.specialization);

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = filters.specialty === 'All Specialties' || doctor.specialization === filters.specialty;
        // Logic for availability filter would go here

        return matchesSearch && matchesSpecialty;
    });

    const doctorsPerPage = 8;
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
    const displayedDoctors = filteredDoctors.slice((currentPage - 1) * doctorsPerPage, currentPage * doctorsPerPage);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Find Your Doctor</h1>
                            <p className="text-blue-100 text-xl">Connect with the best healthcare professionals</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <Stethoscope className="w-10 h-10 text-white" />
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <Heart className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <QuickStats doctors={doctors} />

                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    allSpecialties={allSpecialties}
                />

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Available Doctors</h2>
                        <p className="text-gray-600">Found {filteredDoctors.length} doctors matching your criteria</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Sort by Rating</option>
                            <option>Sort by Experience</option>
                            <option>Sort by Name</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading doctors...</div>
                ) : error ? (
                    <div className="text-center py-12 text-red-500">{error}</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {displayedDoctors.map((doctor, index) => (
                                <DoctorCard key={index} doctor={doctor} />
                            ))}
                        </div>

                        {filteredDoctors.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                            </div>
                        )}

                        {filteredDoctors.length > doctorsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        )}
                    </>
                )}

                <div className="mt-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 text-white text-center shadow-xl">
                    <h3 className="text-2xl font-bold mb-2">Need Emergency Care?</h3>
                    <p className="mb-6 text-red-100">For immediate medical attention, contact our emergency hotline</p>
                    <button className="bg-white text-red-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg">
                        Call Emergency: +94 11 123 4567
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Doctor;