
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_SINGLE_USER; // Ensure this is correctly set in your .env file

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

  // Update local storage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login user
  const login = async (identifier, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { identifier, password });
      const { data } = response;
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      setIsError(true);
      throw error;
    }
  };

  // Register new user

  const registerUser = async (newUserData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, newUserData);
      // const { data } = response;
      //   setUser(data.user);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        // return data; 
      
    } catch (error) {
      console.error('Register User Error:', error);
      setIsError(true);
      throw error;
    }
  }; 
  
  // Fetch user by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      const { data } = response;
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Fetch User Error:', error);
      setIsError(true);
      throw error;
    }
  };

  // Update user profile
  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${userId}`, updatedUserData);
      const { data } = response;
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error('Update User Error:', error);
      setIsError(true);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registerUser,
        fetchUserById,
        updateUser,
        logout,
        isLoading,
        isError,
        setIsLoading,
        setIsError
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
