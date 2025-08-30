import React, { useState } from 'react';
// UPDATED: Added Camera icon from lucide-react for consistency
import { 
  X, 
  Hospital, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Key, 
  Clock, 
  IdCard,
  Camera
} from 'lucide-react';
// --- IMPORTS FOR FIREBASE ---
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase'; // Ensure this path is correct

const AddPharmacyModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    email: '',
    contactNumber: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    district: '',
    licenseNumber: '',
    operatingHours: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // --- NEW STATE FOR IMAGE HANDLING ---
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- NEW HANDLER FOR IMAGE SELECTION ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
  };
  
  // UPDATED: Switched to a more unique ID generation method
  const generatePharmacyId = () => {
    return "ph" + Date.now();
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    const requiredFields = ['pharmacyName', 'email', 'contactNumber', 'address', 'username', 'password'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    setError('');
    setUploadProgress(0);
    
    let profilePicUrl = '';

    // --- STEP 1: UPLOAD IMAGE TO FIREBASE IF A FILE IS SELECTED ---
    if (imageFile) {
        try {
            const storageRef = ref(storage, `profile_pictures/pharmacies/${Date.now()}_${imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            profilePicUrl = await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => reject('Image upload failed. Please try again.'),
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

    // --- STEP 2: PREPARE AND SUBMIT DATA ---
    try {
      const phId = generatePharmacyId();
      
      const submitData = {
        user: {
          uid: phId,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "pharmacy",
          phoneNumber: formData.contactNumber,
          city: formData.city || "Unknown",
          district: formData.district || "Unknown",
          profilepic: profilePicUrl, // Use the uploaded image URL
          emailConfirmed: 1,
          OTP: null,
        },
        pharmacy: {
          phId: phId,
          pharmacyName: formData.pharmacyName,
          address: formData.address,
          licenseNumber: formData.licenseNumber || `PH-${new Date().getFullYear()}-${phId.slice(-4)}`,
          operatingHours: formData.operatingHours || "8:00 AM - 10:00 PM"
        }
      };
      
      await onSubmit(submitData);
    } catch (error) {
      setError('Failed to add pharmacy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      pharmacyName: '', email: '', contactNumber: '', address: '',
      username: '', password: '', confirmPassword: '', city: '',
      district: '', licenseNumber: '', operatingHours: ''
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Hospital className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Add New Pharmacy</h2>
                <p className="text-gray-600 text-sm">Create a new pharmacy account in the system</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full">
              <X className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6 space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>}

          {/* Pharmacy Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pharmacy Information</h3>

            <div className="flex flex-col items-center space-y-3 pt-2">
                <div className="relative">
                    <img src={imagePreview || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm" />
                    <label htmlFor="profilePic" className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                        <Camera className="w-4 h-4" />
                        <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSubmitting} />
                    </label>
                </div>
                {isSubmitting && imageFile && (
                    <div className="w-full max-w-xs bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                )}
            </div>

            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><Hospital className="mr-2 text-blue-500" /> Pharmacy Name <span className="text-red-500">*</span></label>
              <input type="text" name="pharmacyName" value={formData.pharmacyName} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter pharmacy name"/>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><Mail className="mr-2 text-green-500" /> Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-lg" placeholder="pharmacy@example.com"/>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><Phone className="mr-2 text-purple-500" /> Contact Number <span className="text-red-500">*</span></label>
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-lg" placeholder="+94 XX XXX XXXX"/>
              </div>
            </div>
            {/* ... other pharmacy fields ... */}
             <div>
               <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><MapPin className="mr-2 text-red-500" /> Complete Address <span className="text-red-500">*</span></label>
               <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter complete pharmacy address" />
             </div>
          </div>
          
          {/* Login Credentials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Login Credentials</h3>
            {/* --- PROFILE PICTURE UPLOAD UI --- */}

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><User className="mr-2 text-indigo-500" /> Username <span className="text-red-500">*</span></label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter unique username" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><Key className="mr-2 text-yellow-500" /> Password <span className="text-red-500">*</span></label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Enter secure password" />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2"><Key className="mr-2 text-yellow-500" /> Confirm Password <span className="text-red-500">*</span></label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 border rounded-lg" placeholder="Confirm password" />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Adding...' : 'Add Pharmacy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPharmacyModal;