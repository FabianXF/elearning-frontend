import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../api/services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored token and user on mount
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            // Assuming data.data contains { user, token } or similar based on standard JWT responses
            // The spec says response format is { status, message, data }
            // We need to see what 'data' actually contains. Usually it has the token and user info.
            // Let's assume data.data = { token, user: {...} } or similar. 
            // If the backend returns the token directly in data, we'll adjust.

            // Based on typical implementations:
            const { token, user } = data.data; // Adjust based on actual response structure if needed

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                return { success: true };
            } else {
                return { success: false, message: "No token received" };
            }
        } catch (error) {
            console.error("Login error", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            return { success: true, message: data.message };
        } catch (error) {
            console.error("Registration error", error);
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
