import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_SINGLE_USER; // Ensure this is correctly set in your .env file

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Function to fetch the latest user data from backend and update context
  // const fetchLatestUserData = async () => {
  //   try {
  //     if (!user) return; // Guard against fetching if user is null initially

  //     const response = await axios.get(`${API_BASE_URL}/me/${user._id}`); // Assuming `/me` endpoint returns the current user's data
  //     const backendUserData = response.data.user;

  //     if (backendUserData) {
  //       setUser(backendUserData); // Update user state with backend data
  //       localStorage.setItem('user', JSON.stringify(backendUserData)); // Update local storage
  //       console.log('Fetched and updated user data:', backendUserData); // Log the updated user data
  //     }
  //   } catch (error) {
  //     console.error('Fetch Latest User Data Error:', error);
  //     setIsError(true);
  //   }
  // };

  // Load user from local storage on initial render
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

  // Use useEffect to fetch data initially and schedule subsequent fetches
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchLatestUserData();
  //     const timeoutId = setTimeout(fetchLatestUserData, 300000); // Schedule next fetch after 10 seconds (10000 milliseconds)

  //     return () => clearTimeout(timeoutId); // Cleanup the timeout
  //   };

  //   if (user) {
  //     fetchData();
  //   }

  //   return () => {}; // No cleanup needed on component unmount
  // }, [user]); // Include `user` in the dependency array to trigger fetches when `user` changes

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
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
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
        setIsLoading,
        setIsError,
        isError,
        // fetchLatestUserData // Include fetchLatestUserData in the context value
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
