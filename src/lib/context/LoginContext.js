
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = 'https://4004.vercel.app/api/backend';
const USERS_API = `${API_BASE_URL}/users`;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkLocalStorage = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const response = await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          const { data } = response;
          setUser(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch User Error:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocalStorage();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
      const { data } = response;
      setUser(data.user);
      localStorage.setItem('token', data.token); // Store token in localStorage
      setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null);
  };

  const registerUser = async (newUserData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, newUserData);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('Register User Error:', error);
      throw error;
    }
  };

  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.patch(`${USERS_API}/${userId}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setUser(data);
      return data;
    } catch (error) {
      console.error('Update User Error:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${USERS_API}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(null);
    } catch (error) {
      console.error('Delete User Error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setIsLoading,
        isLoading,
        isError,
        setIsError,
        registerUser,
        updateUser,
        deleteUser,
      }}
    >
      {!isLoading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
