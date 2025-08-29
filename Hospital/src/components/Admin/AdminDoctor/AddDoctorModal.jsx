import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, MapPin, BriefcaseMedical, FileText, Award, Clock, DollarSign, Camera } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase'; 

const AddDoctorModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'doctor',
        phoneNumber: '',
        city: '',
        district: '',
        specialization: '',
        licenseNomber: '',
        experience: '',
        consultationFee: '',
        availableTimes: [],
        description: '',
        emailConfirmed: 1,
        OTP: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const generateId = () => {
        return "d" + Date.now().toString();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTimeChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            availableTimes: checked
                ? [...prevData.availableTimes, value]
                : prevData.availableTimes.filter(time => time !== value)
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setUploadProgress(0);

        let profilePicUrl = '';

        if (imageFile) {
            try {
                const storageRef = ref(storage, `profile_pictures/doctors/${Date.now()}_${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                profilePicUrl = await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(progress);
                        },
                        (error) => {
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

        try {
            const uniqueId = generateId();
            const apiData = {
                userData: {
                    uid: uniqueId,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    phoneNumber: formData.phoneNumber,
                    city: formData.city,
                    district: formData.district,
                    profilepic: profilePicUrl,
                    emailConfirmed: 1,
                    OTP: null,
                },
                doctorData: {
                    did: uniqueId,
                    specialization: formData.specialization,
                    licenseNomber: formData.licenseNomber,
                    experience: formData.experience,
                    consultationFee: formData.consultationFee,
                    availableTimes: formData.availableTimes,
                    description: formData.description
                }
            };

            const response = await fetch('http://localhost:8080/admin/addDoctor', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData)
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                const newDoctor = { ...apiData.userData, ...apiData.doctorData };
                delete newDoctor.password;
                
                onSubmit(newDoctor);
                alert('Doctor added successfully!');
            } else {
                throw new Error(result.message || 'Failed to add doctor');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const timeOptions = [
        { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
        { value: 'evening', label: 'Evening (6 PM - 10 PM)' }
    ];

    const specializations = [
        'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics',
        'Ophthalmology', 'Psychiatry', 'Dentistry', 'Surgery', 'Gynecology'
    ];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 rounded-t-xl border-b border-gray-200 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Register New Doctor</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {currentStep === 1 ? "Personal Information" : "Professional Details"}
                            </p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full" disabled={isSubmitting}>
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative">
                                        <img src={imagePreview || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md" />
                                        <label htmlFor="profilePic" className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                                            <Camera className="w-4 h-4" />
                                            <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting} />
                                        </label>
                                    </div>
                                    {isSubmitting && imageFile && (
                                        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                        <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Password *</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">City *</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">District *</label>
                                        <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting} />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="button" onClick={nextStep} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg" disabled={isSubmitting}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Specialization *</label>
                                        <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting}>
                                            <option value="">Select a specialization</option>
                                            {specializations.map((spec) => (<option key={spec} value={spec}>{spec}</option>))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">License Number *</label>
                                        <input type="text" name="licenseNomber" value={formData.licenseNomber} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting}/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
                                        <input type="number" name="experience" min="0" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting}/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Consultation Fee (LKR) *</label>
                                        <input type="number" name="consultationFee" min="0" step="100" value={formData.consultationFee} onChange={handleChange} className="w-full p-3 border rounded-lg" required disabled={isSubmitting}/>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Available Times *</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                            {timeOptions.map((option) => (
                                                <label key={option.value} className="flex items-center p-3 border rounded-lg">
                                                    <input type="checkbox" value={option.value} checked={formData.availableTimes.includes(option.value)} onChange={handleTimeChange} className="mr-3 h-4 w-4" disabled={isSubmitting}/>
                                                    {option.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Professional Description *</label>
                                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg" rows="4" required disabled={isSubmitting}/>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={prevStep} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg" disabled={isSubmitting}>
                                        Back
                                    </button>
                                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg" disabled={isSubmitting}>
                                        {isSubmitting ? 'Adding Doctor...' : 'Add Doctor'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctorModal;