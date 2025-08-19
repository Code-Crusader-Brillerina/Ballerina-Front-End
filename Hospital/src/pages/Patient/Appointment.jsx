import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Video, MapPin, User, FileText, Upload, Star, Award, Users, Heart, CheckCircle, Camera, Phone, Mail, ArrowRight, Plus } from 'lucide-react';

// --- IMPORTS FOR FIREBASE ---
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Appointment = () => {
    const { did } = useParams();
    const navigate = useNavigate();

    const [doctorDetails, setDoctorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(19);
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
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include",
                    body: JSON.stringify({ did }),
                });
                const result = await response.json();

                if (result.success && result.data) {
                    setDoctorDetails({
                        ...result.data,
                        name: result.data.username,
                        specialty: result.data.specialization,
                        education: 'MBBS, University of Colombo',
                        bio: result.data.description,
                        rating: 4.8,
                        reviews: 120,
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
        afternoon: { time: '2:00 PM - 6:00 PM', available: false },
        evening: { time: '8:00 PM - 10:00 PM', available: true },
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleFormSubmit = async () => {
        setBookingStatus('Initiating booking...');
        setError('');
    
        try {
            let reportUrls = []; // This variable will hold the Firebase URLs.
            if (uploadedFiles.length > 0) {
                setBookingStatus(`Uploading ${uploadedFiles.length} file(s)...`);
                const uploadPromises = uploadedFiles.map(file => {
                    const storageRef = ref(storage, `medical_reports/${Date.now()}_${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    return new Promise((resolve, reject) => {
                        uploadTask.on('state_changed', null, (error) => reject(error),
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                resolve(downloadURL); 
                            }
                        );
                    });
                });
                // After this line, 'reportUrls' will be an array of full Firebase URLs.
                reportUrls = await Promise.all(uploadPromises);
            }
    
            setBookingStatus('Creating appointment...');
    
            const day = selectedDate.toString().padStart(2, '0');
            const formattedDate = `2025-08-${day}`;
    
            const appointmentData = {
                aid: Date.now().toString(),
                pid:"",
                did: did,
                date: formattedDate,
                time: selectedTime,
                status: 'pending',
                description: 'New appointment booking',
                
                // --- THIS IS THE ONLY CHANGE YOU NEED ---
                // Use the array of Firebase URLs instead of just the file names.
                reports: reportUrls, 
                
                paymentState: 'pending',
            };
    
            const response = await fetch('http://localhost:8080/patient/createAppointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify(appointmentData),
            });
            const result = await response.json();
    
            if (response.ok) {
                setBookingStatus('Success! Navigating to payment...');
                navigate(`/appointment/payment/${result.data.aid}`);
            } else {
                setBookingStatus(`Error: ${result.message || 'Failed to create appointment.'}`);
                setError(result.message || 'Failed to create appointment.');
            }
        } catch (err) {
            console.error('Error during the booking process:', err);
            const errorMessage = 'An error occurred. Please try again.';
            setBookingStatus(`Failed: ${errorMessage}`);
            setError(errorMessage);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error && !doctorDetails) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (!doctorDetails) return <div className="min-h-screen flex items-center justify-center">Doctor not found.</div>;

    // --- The JSX part of your component remains unchanged ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold">Book Appointment</h1>
                    <p className="text-blue-100">Schedule your consultation with Dr. {doctorDetails.name}</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Doctor Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border sticky top-8">
                            <div className="text-center mb-6">
                                <img src={doctorDetails.profilepic || 'https://via.placeholder.com/128'} alt={doctorDetails.name} className="w-32 h-32 mx-auto rounded-3xl object-cover shadow-lg mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800">Dr. {doctorDetails.name}</h2>
                                <p className="text-blue-600 font-semibold">{doctorDetails.specialty}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center mb-6">
                                <div className="bg-blue-50 p-3 rounded-xl">
                                    <p className="font-bold text-xl text-blue-800">{doctorDetails.patients}+</p>
                                    <p className="text-sm text-gray-600">Patients</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl">
                                    <p className="font-bold text-xl text-green-800">{doctorDetails.experience}</p>
                                    <p className="text-sm text-gray-600">Years Exp.</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{doctorDetails.bio}</p>
                        </div>
                    </div>

                    {/* Appointment Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border">
                            {/* Date Selection */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Date</h3>
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <h4 className="text-xl font-bold text-center text-gray-800 mb-4">August 2025</h4>
                                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-semibold text-gray-500 py-2">{day}</div>)}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                            <button
                                                key={day}
                                                onClick={() => setSelectedDate(day)}
                                                disabled={day < 19}
                                                className={`p-3 rounded-xl font-medium transition-all ${day < 19 ? 'text-gray-300 cursor-not-allowed' : selectedDate === day ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-100'}`}
                                            >{day}</button>
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
                                            className={`p-4 rounded-2xl border-2 flex items-center space-x-3 transition-all ${!slot.available ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : selectedTime === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}
                                        >
                                            <Clock className="w-5 h-5" />
                                            <span className="font-semibold">{slot.time}</span>
                                            {selectedTime === key && <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Document Upload */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Upload Medical Documents</h3>
                                <label htmlFor="file-upload" className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 block">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-2">Click to browse or drag and drop</p>
                                    <span className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg">Choose Files</span>
                                </label>
                                <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" accept=".pdf,.jpg,.png,.doc,.docx" />
                                {uploadedFiles.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center p-2 bg-green-50 rounded-lg">
                                                <FileText className="w-5 h-5 text-green-600 mr-3" />
                                                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                                <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Booking Summary & Button */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h4>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between"><span className="text-gray-600">Date:</span><span className="font-semibold">Aug {selectedDate}, 2025</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600">Time:</span><span className="font-semibold">{timeSlots[selectedTime]?.time}</span></div>
                                    <div className="flex justify-between pt-2 border-t"><span className="font-semibold text-gray-800">Total Fee:</span><span className="font-bold text-green-600 text-xl">LKR {doctorDetails.consultationFee}</span></div>
                                </div>
                                {bookingStatus && <p className={`mb-4 text-center font-medium ${bookingStatus.startsWith('Error') || bookingStatus.startsWith('Failed') ? 'text-red-500' : 'text-blue-600'}`}>{bookingStatus}</p>}
                                <button
                                    onClick={handleFormSubmit}
                                    disabled={bookingStatus && bookingStatus.endsWith('...')}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>{bookingStatus && bookingStatus.endsWith('...') ? bookingStatus : 'Proceed to Payment'}</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;