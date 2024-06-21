import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = 'https://4004.vercel.app/api/backend';

const AuthProvider = ({ children }) => {
  const [basename, setBasename] = useState('default'); 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const checkLocalStorage = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken); // Set token state
          const response = await axios.get(`${API_BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          const { data } = response;
          if (data) {
            setUser(data); // Set user state from API response
          }
        }
      } catch (error) {
        console.error('Fetch User Error:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocalStorage();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    // This effect will run on every render
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Set token state
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
      const { data } = response;
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in localStorage
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data from localStorage
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

  // const updateUser = async (userId, updatedUserData) => {
  //   try {
  //     const storedToken = localStorage.getItem('token');
  //     const response = await axios.patch(`${USERS_API}/${userId}`, updatedUserData, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     });
  //     const { data } = response;
  //     setUser(data); // Update user state
  //     return data;
  //   } catch (error) {
  //     console.error('Update User Error:', error);
  //     throw error;
  //   }
  // };

  // const deleteUser = async (userId) => {
  //   try {
  //     const storedToken = localStorage.getItem('token');
  //     await axios.delete(`${USERS_API}/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     });
  //     setUser(null); // Clear user state
  //     setToken(null); // Clear token state
  //     localStorage.removeItem('token'); // Remove token from localStorage
  //     localStorage.removeItem('user'); // Remove user from localStorage
  //   } catch (error) {
  //     console.error('Delete User Error:', error);
  //     throw error;
  //   }
  // };


  return (
    <AuthContext.Provider
    
      value={{
        user,
        login,
        token,
        logout,
        isLoading,
        setIsLoading,
        setIsError,
        isError,
        registerUser,
        basename,
        setBasename
        // updateUser,
        // deleteUser,
      }}
    >
      {!isLoading && children} {/* Render children only when loading is false */}
  
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
