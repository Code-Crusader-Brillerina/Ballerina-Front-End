import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { ArrowRight, User } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (data.success) {
                console.log('Login successful:', data.message);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border border-blue-100 transform transition-all duration-300 hover:scale-[1.01]">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-3xl opacity-10"></div>
                
                <Link to="/" className="absolute top-6 right-6">
                    <FaTimes className="text-gray-400 w-6 h-6 hover:text-gray-600 transition-colors" />
                </Link>

                {/* Header Section */}
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
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600 text-sm font-medium text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                        <span>Login</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline transition-colors">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;