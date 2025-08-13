import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Calendar, Clock, Video, MapPin, User, FileText, Upload, Star, Award, Users, Heart, CheckCircle, Camera, Phone, Mail, ArrowRight, Plus } from 'lucide-react';

const getDoctorDetails = (name) => {
  return {
    name: name || 'Maya Fornado',
    specialty: 'Physiologist',
    education: 'MBBS Colombo University',
    bio: 'Dr. Maya Fornado is a dedicated medical professional committed to delivering compassionate care and promoting patient well-being through expertise, integrity, and a passion for improving health outcomes in the community.',
    rating: 4.9,
    reviews: 156,
    experience: 8,
    patients: 520,
    languages: ['English', 'Sinhala', 'Tamil'],
    consultationFee: 2500,
    availability: 'Available Today'
  };
};

const Appointment = () => {
  const [appointmentType, setAppointmentType] = useState('online');
  const [selectedDate, setSelectedDate] = useState(16);
  const [selectedTime, setSelectedTime] = useState('morning');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const navigate = useNavigate(); // Initialize useNavigate
  const doctor = getDoctorDetails('Maya Fornado');

  const timeSlots = {
    morning: { time: '8:00 AM - 12:00 PM', available: true },
    evening: { time: '8:00 PM - 10:00 PM', available: true },
    afternoon: { time: '2:00 PM - 6:00 PM', available: false }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handlePaymentClick = () => {
    // Navigate to the payment page
    navigate('/appointment/payment');
  };

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
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Dr. {doctor.name}</h2>
                <p className="text-blue-600 font-semibold text-lg mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-3">{doctor.education}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                </div>

                {/* Availability Status */}
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {doctor.availability}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{doctor.patients}+</p>
                  <p className="text-sm text-gray-600">Patients</p>
                </div>
                <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4">
                  <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{doctor.experience}</p>
                  <p className="text-sm text-gray-600">Years Exp.</p>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">About</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Appointment Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setAppointmentType('online')}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                      appointmentType === 'online'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Video className={`w-8 h-8 mx-auto mb-3 ${appointmentType === 'online' ? 'text-blue-600' : 'text-gray-600'}`} />
                    <h4 className="font-semibold text-gray-800 mb-1">Online Consultation</h4>
                    <p className="text-sm text-gray-600">Video call from home</p>
                    <p className="text-lg font-bold text-green-600 mt-2">Rs. {doctor.consultationFee}</p>
                    {appointmentType === 'online' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setAppointmentType('inperson')}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                      appointmentType === 'inperson'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className={`w-8 h-8 mx-auto mb-3 ${appointmentType === 'inperson' ? 'text-blue-600' : 'text-gray-600'}`} />
                    <h4 className="font-semibold text-gray-800 mb-1">In-Person Visit</h4>
                    <p className="text-sm text-gray-600">Visit clinic directly</p>
                    <p className="text-lg font-bold text-green-600 mt-2">Rs. {doctor.consultationFee + 500}</p>
                    {appointmentType === 'inperson' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
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
                    {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
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
                    <span className="font-semibold text-gray-800 capitalize">{appointmentType.replace('inperson', 'In-Person')}</span>
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
                    <span className="font-bold text-green-600 text-xl">Rs. {appointmentType === 'online' ? doctor.consultationFee : doctor.consultationFee + 500}</span>
                  </div>
                </div>
              </div>

              {/* Book Appointment Button */}
              <button
                onClick={handlePaymentClick}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
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