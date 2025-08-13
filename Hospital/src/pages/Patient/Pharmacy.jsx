import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Award, Clock, Truck, Users, Heart, Stethoscope, User, ArrowRight, Plus, ChevronDown, X, Book, DollarSign } from 'lucide-react';

// Enhanced Pharmacy Card Component
const PharmacyCard = ({ pharmacy }) => {
    // Construct the URL for the pharmacy detail page
    const pharmacyUrl = `/pharmacy/${pharmacy.name.replace(/\s+/g, '-')}`;

    return (
        <Link to={pharmacyUrl} className="block">
            <div
                className="group relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 overflow-hidden"
            >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Pharmacy Image/Icon */}
                <div className="relative mb-4 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                            <Stethoscope className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                    </div>
                </div>

                {/* Pharmacy Info */}
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{pharmacy.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm mb-2">{pharmacy.address}</p>
                    <p className="text-gray-500 text-xs mb-3">Availability: {pharmacy.availability}</p>

                    {/* Delivery & Price */}
                    <div className="flex items-center justify-center space-x-1 mb-3">
                        <div className="flex items-center space-x-1">
                            <Truck className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-600 font-medium">{pharmacy.deliveryTime}</span>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-bold text-gray-800">{pharmacy.price}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                        <Book className="w-4 h-4" />
                        <span>View Details</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Enhanced Search and Filter Component for Pharmacies
const SearchFilter = ({ searchTerm, setSearchTerm, filters, setFilters, showFilters, setShowFilters }) => {
    const locations = ['All Locations', 'Colombo', 'Kandy', 'Galle', 'Negombo', 'Matara'];
    const deliveryOptions = ['Any Delivery', '1 Hour', '2-3 Hours', 'Next Day'];
    const services = ['All Services', '24/7', 'Online Order', 'Walk-in'];

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search pharmacies by name or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <select
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time</label>
                        <select
                            value={filters.deliveryTime}
                            onChange={(e) => setFilters({ ...filters, deliveryTime: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            {deliveryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Services</label>
                        <select
                            value={filters.services}
                            onChange={(e) => setFilters({ ...filters, services: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            {services.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

// Quick Stats Component for Pharmacies
const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-blue-100 text-sm font-medium">Total</p>
                    <p className="text-3xl font-bold">80+</p>
                    <p className="text-blue-100 text-sm">Pharmacies</p>
                </div>
                <Stethoscope className="w-10 h-10 text-blue-200" />
            </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-green-100 text-sm font-medium">Fast Delivery</p>
                    <p className="text-3xl font-bold">30+</p>
                    <p className="text-green-100 text-sm">Within 1 Hr</p>
                </div>
                <Truck className="w-10 h-10 text-green-200" />
            </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-orange-100 text-sm font-medium">Online</p>
                    <p className="text-3xl font-bold">50+</p>
                    <p className="text-orange-100 text-sm">Pharmacies</p>
                </div>
                <Book className="w-10 h-10 text-orange-200" />
            </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-purple-100 text-sm font-medium">Availability</p>
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="text-purple-100 text-sm">On-demand</p>
                </div>
                <Clock className="w-10 h-10 text-purple-200" />
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

// Main Pharmacy Page Component
const Pharmacy = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        location: 'All Locations',
        deliveryTime: 'Any Delivery',
        services: 'All Services'
    });

    // Sample pharmacies data
    const pharmaciesData = [
        {
            name: 'The New Pharmacy',
            address: 'Wariyapola, Kurunegala',
            deliveryTime: '1 hours 31 Min',
            price: 'Rs 566.00',
            availability: '24/7',
            location: 'Colombo',
            services: 'Online Order'
        },
        {
            name: 'Health Hub Pharmacy',
            address: 'Main Street, Kandy',
            deliveryTime: '2 hours 15 Min',
            price: 'Rs 450.00',
            availability: '9am - 9pm',
            location: 'Kandy',
            services: 'Walk-in'
        },
        {
            name: 'MediCare Pharmacy',
            address: 'Galle Road, Galle',
            deliveryTime: '45 Min',
            price: 'Rs 620.00',
            availability: '24/7',
            location: 'Galle',
            services: 'Online Order'
        },
        {
            name: 'Quick Meds',
            address: 'Katunayake, Negombo',
            deliveryTime: '1 hour',
            price: 'Rs 380.00',
            availability: '10am - 8pm',
            location: 'Negombo',
            services: 'Online Order'
        },
        {
            name: 'City Pharmacy',
            address: 'Matara Town, Matara',
            deliveryTime: '1 hour 30 Min',
            price: 'Rs 590.00',
            availability: '7am - 10pm',
            location: 'Matara',
            services: 'Walk-in'
        },
        {
            name: 'Prime Pharmacy',
            address: 'Union Place, Colombo',
            deliveryTime: '30 Min',
            price: 'Rs 710.00',
            availability: '24/7',
            location: 'Colombo',
            services: 'Online Order'
        },
        {
            name: 'Central Dispensary',
            address: 'Kandy-Peradeniya Road, Kandy',
            deliveryTime: '2 hours',
            price: 'Rs 500.00',
            availability: '8am - 10pm',
            location: 'Kandy',
            services: 'Walk-in'
        },
        {
            name: 'South Meds',
            address: 'Welle Dewala Road, Galle',
            deliveryTime: '1 hour 15 Min',
            price: 'Rs 550.00',
            availability: '9am - 7pm',
            location: 'Galle',
            services: 'Walk-in'
        }
    ];

    const filteredPharmacies = pharmaciesData.filter(pharmacy => {
        const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = filters.location === 'All Locations' || pharmacy.location === filters.location;
        // Simplified filter logic for a basic example
        const matchesDelivery = filters.deliveryTime === 'Any Delivery' || pharmacy.deliveryTime.includes(filters.deliveryTime.split(' ')[0]);

        return matchesSearch && matchesLocation && matchesDelivery;
    });

    const totalPages = Math.ceil(filteredPharmacies.length / 8);
    const displayedPharmacies = filteredPharmacies.slice((currentPage - 1) * 8, currentPage * 8);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Find a Pharmacy</h1>
                            <p className="text-blue-100 text-xl">Order your medication with ease</p>
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
                {/* Quick Stats */}
                <QuickStats />

                {/* Search and Filters */}
                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                />

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Available Pharmacies</h2>
                        <p className="text-gray-600">Found {filteredPharmacies.length} pharmacies matching your criteria</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Sort by Price</option>
                            <option>Sort by Delivery Time</option>
                            <option>Sort by Name</option>
                        </select>
                    </div>
                </div>

                {/* Pharmacies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {displayedPharmacies.map((pharmacy, index) => (
                        <PharmacyCard key={index} pharmacy={pharmacy} />
                    ))}
                </div>

                {/* No results message */}
                {filteredPharmacies.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No pharmacies found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                    </div>
                )}

                {/* Pagination */}
                {filteredPharmacies.length > 8 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Pharmacy;