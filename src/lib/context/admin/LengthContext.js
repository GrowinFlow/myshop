// LengthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const LengthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_LENGTH;

const LengthProvider = ({ children }) => {
  // Initialize state to store the lengths
  const [lengths, setLengths] = useState({
    products: null,
    admins: null,
    managers: null,
    clients: null,
    users: null,
  });

  // State to handle loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLengths = async () => {
      try {
        // Define endpoints
        const endpoints = {
          products: `${API_BASE_URL}/products`,
          admins: `${API_BASE_URL}/admins`,
          managers: `${API_BASE_URL}/managers`,
          clients: `${API_BASE_URL}/clients`,
          users: `${API_BASE_URL}/users`,
        };

        // Fetch data from all endpoints concurrently
        const [productsResponse, adminsResponse, managersResponse, clientsResponse, usersResponse] = await Promise.all([
          axios.get(endpoints.products),
          axios.get(endpoints.admins),
          axios.get(endpoints.managers),
          axios.get(endpoints.clients),
          axios.get(endpoints.users),
        ]);

        // Extract length data from responses
        const productsLength = productsResponse.data.totalProducts;
        const adminsLength = adminsResponse.data.totalAdmins;
        const managersLength = managersResponse.data.totalManagers;
        const clientsLength = clientsResponse.data.totalClients;
        const usersLength = usersResponse.data.totalUsers;

        // Set the lengths in the state
        setLengths({
          products: productsLength,
          admins: adminsLength,
          managers: managersLength,
          clients: clientsLength,
          users: usersLength,
        });

        setIsLoading(false); // Data has been loaded
      } catch (error) {
        console.error("Error fetching lengths:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          setError(error.response.data.message || error.response.statusText);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request made but no response received:", error.request);
          setError("Network error. Please try again later.");
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
          setError("An unexpected error occurred. Please try again later.");
        }
        setIsLoading(false); // Stop loading state when an error occurs
      }
    };

    fetchLengths();
  }, []); // Empty dependency array means this useEffect runs once after initial render

  return (
    <LengthContext.Provider value={{ lengths, isLoading, error }}>
      {children}
    </LengthContext.Provider>
  );
};

export { LengthContext, LengthProvider };
