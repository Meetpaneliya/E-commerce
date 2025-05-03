import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name, role) => {
    setError('');
    try {
      console.log("Registering user:", { name, email, password, role });

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        email,
        password,
        name,
        role
      });

      console.log("User registered successfully:", response.data);

      const userToStore = response.data;
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const login = async (email, password) => {
    setError('');
    try {
      console.log("Logging in with:", { email, password });

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        email,
        password
      });

      console.log("User logged in:", response.data);

      const userToStore = response.data;
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`);
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError('Logout failed');
    }
  };
  

  const value = {
    currentUser,
    signup,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
