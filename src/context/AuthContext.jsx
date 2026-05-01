import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { permissions } from '../utils/permission';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const authData = response.data.data || response.data;
      const { token, ...userData } = authData;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      
      throw new Error('No token received from server');
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const hasPermission = (permission) => {
    return permissions.has(user, permission);
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send recovery code.' 
      };
    }
  };

  const resetPassword = async (resetData) => {
    try {
      const response = await authService.resetPassword(resetData);
      return { success: true, message: response.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to reset password.' 
      };
    }
  };

  const verifyOTP = async (verifyData) => {
    try {
      const response = await authService.verifyOTP(verifyData);
      return { success: true, message: response.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid or expired code.' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasPermission, forgotPassword, resetPassword, verifyOTP }}>
      {children}
    </AuthContext.Provider>
  );
};


