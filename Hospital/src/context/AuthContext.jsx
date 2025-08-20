import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext(null);

// Create an API instance with base configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // This is crucial for sending cookies
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // To handle initial auth check

    // Function to check auth status on app load
    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await apiClient.get('/user/check-auth');
            if (response.data.success) {
                setUser(response.data.data);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            console.error('Auth check failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/user/login', { email, password });
            if (response.data.success) {
                setUser(response.data.data);
                setIsAuthenticated(true);
            }
            return response.data; // Return the full response
        } catch (error) {
            return error.response.data; // Return error data from server
        }
    };

    const logout = async () => {
        try {
            await apiClient.post('/user/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            // Clear state regardless of API call success
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
    return useContext(AuthContext);
};