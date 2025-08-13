import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { UserPlus, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        city: '',
        district: '',
        dob: '',
        gender: 'male',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        const requestBody = {
            userData: {
                uid: Date.now().toString(),
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'patient',
                phoneNumber: formData.phoneNumber,
                city: formData.city,
                district: formData.district,
                profilepic: 'http://',
            },
            patientData: {
                pid: Date.now().toString(),
                DOB: formData.dob,
                gender: formData.gender,
            },
        };

        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Registration successful:', data.message);
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-lg border border-blue-100 transform transition-all duration-300 hover:scale-[1.01]">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10"></div>

                <Link to="/" className="absolute top-6 right-6">
                    <FaTimes className="text-gray-400 w-6 h-6 hover:text-gray-600 transition-colors" />
                </Link>

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                    <p className="text-gray-500">Join our community and start your journey to better health.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-600 text-sm font-medium text-center mt-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline transition-colors">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;