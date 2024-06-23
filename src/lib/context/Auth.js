// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_SINGLE_USER;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { identifier, password });
      const { data } = response;
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };
  const registerUser = async (newUserData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, newUserData);
      const { data } = response;
      console.log('Register User Response:', data);
  
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      } else {
        throw new Error('User registration failed. No valid user data returned.');
      }
    } catch (error) {
      console.error('Register User Error:', error);
      setIsError(true);
      throw error;
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registerUser,
        logout,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
