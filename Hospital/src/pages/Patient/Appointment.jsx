import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Video, MapPin, User, FileText, Upload, Star, Award, Users, Heart, CheckCircle, Camera, Phone, Mail, ArrowRight, Plus } from 'lucide-react';

const Appointment = () => {
    const { did } = useParams();
    const navigate = useNavigate();

    const [doctorDetails, setDoctorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(16);
    const [selectedTime, setSelectedTime] = useState('morning');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [bookingStatus, setBookingStatus] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            if (!did) {
                setError('Doctor ID not found.');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/patient/getDoctor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({ did }),
                });
                const result = await response.json();

                if (result.success && result.data) {
                    setDoctorDetails({
                        ...result.data,
                        name: result.data.username,
                        specialty: result.data.specialization,
                        education: 'MBBS Colombo University',
                        bio: result.data.description,
                        rating: 4,
                        reviews: 100,
                        experience: result.data.experience,
                        patients: 500,
                        languages: ['English', 'Sinhala', 'Tamil'],
                        consultationFee: parseInt(result.data.consultationFee, 10),
                        availability: result.data.availableTimes.length > 0 ? 'Available Today' : 'Not Available'
                    });
                } else {
                    setError(result.message || 'Failed to fetch doctor details.');
                }
            } catch (err) {
                console.error('Error fetching doctor details:', err);
                setError('An error occurred while fetching doctor details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [did]);

    const timeSlots = {
        morning: { time: '8:00 AM - 12:00 PM', available: true },
        evening: { time: '8:00 PM - 10:00 PM', available: true },
        afternoon: { time: '2:00 PM - 6:00 PM', available: false }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles([...uploadedFiles, ...files]);
    };

    const handleFormSubmit = async () => {
        setBookingStatus('Booking...');
    
        const appointmentData = {
            // Remove the local aid generation. The server will create it.
            "aid": Date.now().toString(),
            "pid": "",
            did: did,
            date: `2025-12-${selectedDate}`, // Constructing date from state
            time: selectedTime,
            status: 'pending',
            description: 'New appointment booking',
            reports: uploadedFiles.map(file => file.name),
            paymentState: 'pending',
        };
    
        console.log("Sending appointment request with data:", appointmentData);
    
        try {
            const response = await fetch('http://localhost:8080/patient/createAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(appointmentData),
            });
    
            const result = await response.json();
    
            console.log("Appointment creation response:", result);
    
            if (result.success) {
                setBookingStatus('Success! Navigating to payment page...');
                // Use the aid from the server's response to navigate
                navigate(`/appointment/payment/${result.data.aid}`); 
            } else {
                setBookingStatus(`Error: ${result.message}`);
                setError(result.message || 'Failed to create appointment.');
            }
        } catch (err) {
            console.error('Error creating appointment:', err);
            setBookingStatus('Failed to book appointment. Please try again.');
            setError('An error occurred while creating the appointment.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="text-center text-gray-500 text-lg">Loading doctor details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="text-center text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    if (!doctorDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="text-center text-gray-500 text-lg">Doctor not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Book Appointment</h1>
                            <p className="text-blue-100 text-lg">Schedule your consultation with ease</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Doctor Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-8">
                            {/* Doctor Image */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                                        {doctorDetails.profilepic && doctorDetails.profilepic !== 'http://' ? (
                                            <img src={doctorDetails.profilepic} alt={doctorDetails.name} className="w-full h-full object-cover rounded-3xl" />
                                        ) : (
                                            <User className="w-16 h-16 text-white" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-1">Dr. {doctorDetails.name}</h2>
                                <p className="text-blue-600 font-semibold text-lg mb-2">{doctorDetails.specialty}</p>
                                <p className="text-gray-600 text-sm mb-3">{doctorDetails.education}</p>

                                {/* Rating */}
                                <div className="flex items-center justify-center space-x-2 mb-4">
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(doctorDetails.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">{doctorDetails.rating}</span>
                                    <span className="text-sm text-gray-500">({doctorDetails.reviews} reviews)</span>
                                </div>

                                {/* Availability Status */}
                                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    {doctorDetails.availability}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4">
                                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-800">{doctorDetails.patients}+</p>
                                    <p className="text-sm text-gray-600">Patients</p>
                                </div>
                                <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4">
                                    <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-800">{doctorDetails.experience}</p>
                                    <p className="text-sm text-gray-600">Years Exp.</p>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    {doctorDetails.languages.map((lang, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">About</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{doctorDetails.bio}</p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">+94 77 123 4567</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">dr.maya@halgouce.com</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">Halgouce Medical Center</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            {/* Appointment Type */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Appointment Type</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div
                                        className="relative p-6 rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50"
                                    >
                                        <Video className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                                        <h4 className="font-semibold text-gray-800 mb-1">Online Consultation</h4>
                                        <p className="text-sm text-gray-600">Video call from home</p>
                                        <p className="text-lg font-bold text-green-600 mt-2">Rs. {doctorDetails.consultationFee}</p>
                                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Date</h3>
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                                    <h4 className="text-xl font-bold text-center text-gray-800 mb-4">December 2024</h4>
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="font-semibold text-gray-600 py-2">{day}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                            <button
                                                key={day}
                                                onClick={() => setSelectedDate(day)}
                                                disabled={day < 15}
                                                className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                                                    day < 15
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : selectedDate === day
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                                        : 'hover:bg-blue-100 text-gray-700'
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Available Time Slots</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(timeSlots).map(([key, slot]) => (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedTime(key)}
                                            disabled={!slot.available}
                                            className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                                                !slot.available
                                                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    : selectedTime === key
                                                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-blue-300 text-gray-700'
                                            }`}
                                        >
                                            <Clock className={`w-5 h-5 ${!slot.available ? 'text-gray-400' : selectedTime === key ? 'text-blue-600' : 'text-gray-600'}`} />
                                            <span className="font-semibold">{slot.time}</span>
                                            {selectedTime === key && (
                                                <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Document Upload */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Upload Medical Documents</h3>
                                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">Drop files here or click to browse</p>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="file-upload"
                                        accept=".pdf,.jpg,.png,.doc,.docx"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Choose Files</span>
                                    </label>
                                </div>

                                {/* Uploaded Files */}
                                {uploadedFiles.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <h4 className="font-semibold text-gray-700">Uploaded Files:</h4>
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                                                <FileText className="w-5 h-5 text-green-600" />
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                                <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Booking Summary */}
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Appointment Type</span>
                                        <span className="font-semibold text-gray-800 capitalize">Online</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Date</span>
                                        <span className="font-semibold text-gray-800">Dec {selectedDate}, 2024</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Time</span>
                                        <span className="font-semibold text-gray-800">{timeSlots[selectedTime]?.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="font-semibold text-gray-800">Total Fee</span>
                                        <span className="font-bold text-green-600 text-xl">Rs. {doctorDetails.consultationFee}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Status Message */}
                            {bookingStatus && (
                                <p className={`mt-4 text-center font-medium ${bookingStatus.startsWith('Error') || bookingStatus.startsWith('Failed') ? 'text-red-500' : 'text-green-600'}`}>
                                    {bookingStatus}
                                </p>
                            )}

                            {/* Book Appointment Button */}
                            <button
                                onClick={handleFormSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                                disabled={bookingStatus === 'Booking...' || !doctorDetails}
                            >
                                <span className="text-lg">Proceed to Payment</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;