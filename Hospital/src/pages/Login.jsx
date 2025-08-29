import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { ArrowRight, User, Mail, Key, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    // State for different views: 'login', 'forgot', 'otp', 'reset'
    const [view, setView] = useState('login'); 
    
    // Form input states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI state
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // For success messages
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const data = await login(email, password);

        if (data.success) {
            console.log('Login successful:', data.message);
            const userRole = data.data.role;
            switch (userRole) {
                case 'admin': navigate('/admin'); break;
                case 'doctor': navigate('/doctor'); break;
                case 'pharmacy': navigate('/pharmacy'); break;
                case 'patient': default: navigate('/dashboard'); break;
            }
        } else {
            setError(data.message || 'Login failed. Please check your credentials.');
        }
        setIsLoading(false);
    };

    // --- FORGOT PASSWORD HANDLERS ---

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/user/forgetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setMessage('OTP sent successfully to your email.');
                setView('otp'); // Move to OTP view
            } else {
                setError(data.message || 'Failed to send OTP.');
            }
        } catch (err) {
            setError('Could not connect to the server. Please try again.');
        }
        setIsLoading(false);
    };

    const handleSubmitOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/user/submitOTP', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important: to send the email cookie
                body: JSON.stringify({ OTP: otp }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage('OTP verified. Please set your new password.');
                setView('reset'); // Move to password reset view
            } else {
                setError(data.message || 'Invalid OTP.');
            }
        } catch (err) {
            setError('An error occurred during OTP verification.');
        }
        setIsLoading(false);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        setMessage('');
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/user/changePassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important: to send the email cookie
                body: JSON.stringify({ password: newPassword }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage('Password changed successfully! You can now log in.');
                setView('login'); // Go back to login view
                setPassword(''); // Clear password field
            } else {
                setError(data.message || 'Failed to change password.');
            }
        } catch (err) {
            setError('An error occurred while changing password.');
        }
        setIsLoading(false);
    };
    
    const renderLoginView = () => (
        <>
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-500">Sign in to your account to continue.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input type="password" id="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="text-right">
                    <button type="button" onClick={() => setView('forgot')} className="text-sm font-semibold text-blue-600 hover:underline">
                        Forgot Password?
                    </button>
                </div>
                {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50">
                    <span>{isLoading ? 'Logging in...' : 'Login'}</span>
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
            </form>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign up</Link>
                </p>
            </div>
        </>
    );

    const renderForgotView = () => (
        <>
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
                <p className="text-gray-500">Enter your email to receive a verification code.</p>
            </div>
            <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-4 rounded-2xl font-semibold hover:from-yellow-600 hover:to-orange-600 flex items-center justify-center space-x-2 disabled:opacity-50">
                    <span>{isLoading ? 'Sending...' : 'Send OTP'}</span>
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
            </form>
            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Remembered your password? <button onClick={() => setView('login')} className="text-blue-600 font-bold hover:underline">Login</button>
                </p>
            </div>
        </>
    );

    const renderOtpView = () => (
        <>
            <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Enter OTP</h2>
                <p className="text-gray-500">Check your email for the One-Time Password.</p>
            </div>
            <form onSubmit={handleSubmitOtp} className="space-y-6">
                <div>
                    <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
                    <input type="text" id="otp" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
                {message && <p className="text-green-600 text-sm font-medium text-center">{message}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 px-4 rounded-2xl font-semibold hover:from-teal-600 hover:to-cyan-600 flex items-center justify-center space-x-2 disabled:opacity-50">
                    <span>{isLoading ? 'Verifying...' : 'Verify OTP'}</span>
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
            </form>
             <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Go back? <button onClick={() => setView('forgot')} className="text-blue-600 font-bold hover:underline">Resend OTP</button>
                </p>
            </div>
        </>
    );

    const renderResetView = () => (
        <>
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Key className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
                <p className="text-gray-500">Please enter a new, strong password.</p>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
                {message && <p className="text-green-600 text-sm font-medium text-center">{message}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 flex items-center justify-center space-x-2 disabled:opacity-50">
                    <span>{isLoading ? 'Resetting...' : 'Change Password'}</span>
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
            </form>
        </>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border border-blue-100 transform transition-all duration-300 hover:scale-[1.01]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10"></div>
                <Link to="/" className="absolute top-6 right-6">
                    <FaTimes className="text-gray-400 w-6 h-6 hover:text-gray-600 transition-colors" />
                </Link>

                {view === 'login' && renderLoginView()}
                {view === 'forgot' && renderForgotView()}
                {view === 'otp' && renderOtpView()}
                {view === 'reset' && renderResetView()}

            </div>
        </div>
    );
};

export default Login;