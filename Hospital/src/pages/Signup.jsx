import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { UserPlus, ArrowRight, Camera, ShieldCheck } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const Signup = () => {
    // State to manage which view is shown: 'signup' or 'otp'
    const [view, setView] = useState('signup');
    
    // State for the OTP input
    const [otp, setOtp] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        city: '',
        district: '',
        dob: '',
        gender: 'male',
        emailConfirmed:0,
        OTP:""
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);
        setUploadProgress(0);

        let profilePicUrl = '';

        if (imageFile) {
            try {
                const storageRef = ref(storage, `profile_pictures/${Date.now()}_${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                profilePicUrl = await new Promise((resolve, reject) => {
                    uploadTask.on( 'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress);
                        },
                        (error) => {
                            console.error("Firebase upload error:", error);
                            reject('Image upload failed. Please try again.');
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        }
                    );
                });
            } catch (uploadError) {
                setError(uploadError.toString());
                setIsSubmitting(false);
                return;
            }
        }

        const uniqueId = "p" + Date.now();
        const requestBody = {
            userData: {
                uid: uniqueId,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'patient',
                phoneNumber: formData.phoneNumber,
                city: formData.city,
                district: formData.district,
                profilepic: profilePicUrl,
                emailConfirmed:null,
                OTP:"",
            },
            patientData: {
                pid: uniqueId,
                DOB: formData.dob,
                gender: formData.gender,
            },
        };

        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // IMPORTANT: This is required to receive the 'email' cookie from the backend
                credentials: 'include',
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Registration successful:', data.message);
                setMessage(data.message); // Show success message on OTP screen
                setView('otp'); // Switch to the OTP verification view
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please connect to the server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- NEW HANDLER FOR OTP SUBMISSION ---
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8080/user/emailValidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // IMPORTANT: This sends the 'email' cookie back to the server
                credentials: 'include',
                body: JSON.stringify({ OTP: otp }),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message); // Show success alert
                navigate('/login'); // Navigate to login page on success
            } else {
                setError(data.message || 'OTP validation failed.');
            }
        } catch (err) {
            setError('An error occurred during OTP verification.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderSignupView = () => (
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-lg border border-blue-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                <p className="text-gray-500">Join our community and start your journey.</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-6">
                {/* Image Upload UI */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <img src={imagePreview || 'https://via.placeholder.com/100'} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md" />
                        <label htmlFor="profilePic" className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                            <Camera className="w-4 h-4" />
                            <input type="file" id="profilePic" name="profilePic" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting}/>
                        </label>
                    </div>
                    {isSubmitting && imageFile && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                    )}
                </div>
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                        <input type="text" name="username" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.username} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input type="email" name="email" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input type="password" name="password" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.password} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" name="phoneNumber" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.phoneNumber} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                        <input type="date" name="dob" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.dob} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                        <select name="gender" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.gender} onChange={handleChange} required disabled={isSubmitting}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input type="text" name="city" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.city} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                        <input type="text" name="district" className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500" value={formData.district} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                </div>
                {error && <p className="text-red-600 text-sm font-medium text-center mt-4">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50">
                    <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
            </form>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );

    const renderOtpView = () => (
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border border-blue-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                {message && <p className="text-gray-500 mt-2">{message}</p>}
            </div>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                    <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
                    <input type="text" id="otp" className="w-full text-center tracking-[1em] px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-cyan-500" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50">
                    <span>{isSubmitting ? 'Verifying...' : 'Verify Account'}</span>
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
            </form>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <Link to="/" className="absolute top-6 right-6">
                <FaTimes className="text-gray-400 w-6 h-6 hover:text-gray-600 transition-colors" />
            </Link>
            
            {/* Conditionally render the correct view */}
            {view === 'signup' ? renderSignupView() : renderOtpView()}
        </div>
    );
};

export default Signup;