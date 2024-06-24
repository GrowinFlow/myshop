import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TotalUsersContext = createContext();

const API_BASE_URL = process.env.REACT_APP_TOTAL_USERS;

const TotalUsersProvider = ({ children }) => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTotalUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching total users:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      setTotalUsers([...totalUsers, response.data]);
    } catch (error) {
      console.error('Error registering user:', error);
      setError(error.message);
    }
  };

  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${userId}`, updatedUserData);
      setTotalUsers(totalUsers.map(user => (user._id === userId ? response.data : user)));
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      setError(error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${userId}`);
      setTotalUsers(totalUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      setError(error.message);
    }
  };

  const value = {
    totalUsers,
    isLoading,
    error,
    registerUser,
    updateUser,
    deleteUser,
    userIdToEdit,
    setUserIdToEdit,
  };

  return (
    <TotalUsersContext.Provider value={value}>
      {children}
    </TotalUsersContext.Provider>
  );
};

export { TotalUsersContext, TotalUsersProvider };
