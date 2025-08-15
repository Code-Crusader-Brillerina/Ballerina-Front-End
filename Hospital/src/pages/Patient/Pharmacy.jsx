import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, MapPin, Clock, Truck, Heart, Stethoscope, Book, ChevronDown } from 'lucide-react';

// Enhanced Pharmacy Card Component (No changes needed)
const PharmacyCard = ({ pharmacy }) => {
    const pharmacyUrl = `/pharmacy/${pharmacy.phId}`;
    return (
        <Link to={pharmacyUrl} className="block h-full">
            <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative mb-4 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                            <Stethoscope className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md" title="Online"></div>
                    </div>
                </div>
                <div className="text-center mb-4 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{pharmacy.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm mb-2 flex items-center justify-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{pharmacy.userDetails.city}, {pharmacy.userDetails.district}</span>
                    </p>
                    <p className="text-gray-500 text-xs mb-3">Contact: {pharmacy.contactNomber}</p>
                </div>
                <div className="mt-auto">
                    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                        <Book className="w-4 h-4" />
                        <span>View Details</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Search and Filter Component (Updated for District and City)
const SearchFilter = ({ searchTerm, setSearchTerm, filters, setFilters, showFilters, setShowFilters, districts, cities }) => {
    
    // Handler to reset city when district changes
    const handleDistrictChange = (e) => {
        const newDistrict = e.target.value;
        setFilters({ district: newDistrict, city: 'All' }); // Reset city to 'All'
    };

    const handleCityChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, city: e.target.value }));
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search pharmacies by name, city, or district..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                    />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Filter className="w-5 h-5" />
                    <span className="font-semibold">Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
            </div>
            {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                    {/* District Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                        <select value={filters.district} onChange={handleDistrictChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                            {districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    {/* City Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <select value={filters.city} onChange={handleCityChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};


// Quick Stats Component (No changes needed)
const QuickStats = ({ total, fastDelivery, online, onDemand }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-blue-100 text-sm font-medium">Total</p>
                    <p className="text-3xl font-bold">{total}</p>
                    <p className="text-blue-100 text-sm">Pharmacies</p>
                </div>
                <Stethoscope className="w-10 h-10 text-blue-200" />
            </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-green-100 text-sm font-medium">Fast Delivery</p>
                    <p className="text-3xl font-bold">{fastDelivery}</p>
                    <p className="text-green-100 text-sm">Within 1 Hr</p>
                </div>
                <Truck className="w-10 h-10 text-green-200" />
            </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-orange-100 text-sm font-medium">Online</p>
                    <p className="text-3xl font-bold">{online}</p>
                    <p className="text-orange-100 text-sm">Pharmacies</p>
                </div>
                <Book className="w-10 h-10 text-orange-200" />
            </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-purple-100 text-sm font-medium">Availability</p>
                    <p className="text-3xl font-bold">{onDemand}</p>
                    <p className="text-purple-100 text-sm">On-demand</p>
                </div>
                <Clock className="w-10 h-10 text-purple-200" />
            </div>
        </div>
    </div>
);

// Pagination Component (No changes needed)
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center items-center space-x-4 mt-8">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            Previous
        </button>
        <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => onPageChange(i + 1)} className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${currentPage === i + 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>
                    {i + 1}
                </button>
            ))}
        </div>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            Next
        </button>
    </div>
);

// Main Pharmacy Page Component
const Pharmacy = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Updated filter state
    const [filters, setFilters] = useState({ district: 'All', city: 'All' });
    
    // State for dropdown options
    const [districts, setDistricts] = useState(['All']);
    const [availableCities, setAvailableCities] = useState(['All']);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quickStats, setQuickStats] = useState({ total: '0', fastDelivery: '30+', online: '0', onDemand: '24/7'});

    // Effect for fetching initial data
    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/patient/getAllPharmacis', { withCredentials: true });
                if (response.data && response.data.success) {
                    const fetchedPharmacies = response.data.data;
                    setPharmacies(fetchedPharmacies);

                    // Set unique districts
                    const uniqueDistricts = ['All', ...new Set(fetchedPharmacies.map(p => p.userDetails.district))];
                    setDistricts(uniqueDistricts);
                    
                    // Set all unique cities initially
                    const uniqueCities = ['All', ...new Set(fetchedPharmacies.map(p => p.userDetails.city))];
                    setAvailableCities(uniqueCities);

                    setQuickStats(prevStats => ({
                        ...prevStats,
                        total: fetchedPharmacies.length.toString(),
                        online: fetchedPharmacies.length.toString(),
                    }));
                    setError(null);
                } else {
                    setError('Failed to fetch pharmacies. Please try again later.');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('You are not authorized. Please log in again.');
                } else {
                    setError('Could not connect to the server. Please check your connection.');
                }
                console.error("API Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPharmacies();
    }, []);

    // Effect for handling dependent dropdowns
    useEffect(() => {
        if (filters.district === 'All') {
            // If 'All' districts, show all cities
            const allCities = ['All', ...new Set(pharmacies.map(p => p.userDetails.city))];
            setAvailableCities(allCities);
        } else {
            // Filter cities based on the selected district
            const citiesInDistrict = ['All', ...new Set(pharmacies
                .filter(p => p.userDetails.district === filters.district)
                .map(p => p.userDetails.city)
            )];
            setAvailableCities(citiesInDistrict);
        }
    }, [filters.district, pharmacies]); // Re-run when district or the main pharmacy list changes

    // Updated filtering logic
    const filteredPharmacies = pharmacies.filter(pharmacy => {
        const matchesSearch = searchTerm === '' ||
            pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pharmacy.userDetails.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pharmacy.userDetails.district.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDistrict = filters.district === 'All' || pharmacy.userDetails.district === filters.district;
        const matchesCity = filters.city === 'All' || pharmacy.userDetails.city === filters.city;

        return matchesSearch && matchesDistrict && matchesCity;
    });

    const PHARMACIES_PER_PAGE = 8;
    const totalPages = Math.ceil(filteredPharmacies.length / PHARMACIES_PER_PAGE);
    const displayedPharmacies = filteredPharmacies.slice((currentPage - 1) * PHARMACIES_PER_PAGE, currentPage * PHARMACIES_PER_PAGE);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Find a Pharmacy</h1>
                            <p className="text-blue-100 text-xl">Order your medication with ease</p>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"><Stethoscope className="w-10 h-10 text-white" /></div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"><Heart className="w-10 h-10 text-white" /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <QuickStats {...quickStats} />
                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    districts={districts}
                    cities={availableCities}
                />

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Available Pharmacies</h2>
                        <p className="text-gray-600">Found {filteredPharmacies.length} pharmacies matching your criteria</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-lg font-semibold text-gray-600">Loading Pharmacies...</div>
                ) : error ? (
                    <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl p-4">
                        <h3 className="text-xl font-bold">An Error Occurred</h3>
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        {displayedPharmacies.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {displayedPharmacies.map((pharmacy) => (
                                    <PharmacyCard key={pharmacy.phId} pharmacy={pharmacy} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No pharmacies found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters</p>
                            </div>
                        )}
                        
                        {filteredPharmacies.length > PHARMACIES_PER_PAGE && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Pharmacy;