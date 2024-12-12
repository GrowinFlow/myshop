
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DashboardContext = createContext();

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const DashboardProvider = ({ children }) => {
  // Initialize state to store the lengths
  const [lengths, setLengths] = useState({
    users: null,
    super_admins: null,
    admins: null,
    managers: null,
    vendors: null,
    customers: null,
    marketing: null,
    logistics: null,
    products: null,
    products_low_stock: null,
    orders: null,
    db_stats: null,
  });

  // State to handle loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchLengths = async () => {
      try {
        // Define endpoints
        const endpoints = {
          users: `${API_BASE_URL}/stats/users`,
          super_admins: `${API_BASE_URL}/stats/super-admins`,
          admins: `${API_BASE_URL}/stats/admins`,
          managers: `${API_BASE_URL}/stats/managers`,
          vendors: `${API_BASE_URL}/stats/vendors`,
          customers: `${API_BASE_URL}/stats/customers`,
          marketing: `${API_BASE_URL}/stats/marketing`,
          logistics: `${API_BASE_URL}/stats/logistics`,
          products: `${API_BASE_URL}/stats/products`,
          products_low_stock: `${API_BASE_URL}/stats/products-low-stock`,
          orders: `${API_BASE_URL}/stats/orders`,
          db_stats: `${API_BASE_URL}/stats/db-stats`,
        };

        // Fetch data from all endpoints concurrently
        const [
          usersResponse,
          superAdminsResponse,
          adminsResponse,
          managersResponse,
          vendorsResponse,
          customersResponse,
          marketingResponse,
          logisticsResponse,
          productsResponse,
          productsLowStockResponse,
          ordersResponse,
          dbStatsResponse
        ] = await Promise.all([
          axios.get(endpoints.users),
          axios.get(endpoints.super_admins),
          axios.get(endpoints.admins),
          axios.get(endpoints.managers),
          axios.get(endpoints.vendors),
          axios.get(endpoints.customers),
          axios.get(endpoints.marketing),
          axios.get(endpoints.logistics),
          axios.get(endpoints.products),
          axios.get(endpoints.products_low_stock),
          axios.get(endpoints.orders),
          axios.get(endpoints.db_stats)
        ]);

        // Extract length data from responses
        const usersLength = usersResponse.data.totalUsers;
        const superAdminsLength = superAdminsResponse.data.totalSuperAdmins;
        const adminsLength = adminsResponse.data.totalAdmins;
        const managersLength = managersResponse.data.totalManagers;
        const vendorsLength = vendorsResponse.data.totalVendors;
        const customersLength = customersResponse.data.totalCustomers;
        const marketingLength = marketingResponse.data.totalMarketing;
        const logisticsLength = logisticsResponse.data.totalLogistics;
        const productsLength = productsResponse.data.totalProducts;
        const productsLowStockLength = productsLowStockResponse.data.totalProductsLowStock;
        const ordersLength = ordersResponse.data.totalOrders;
        const dbStatsLength = dbStatsResponse.data.totalDbStats;

        // Set the lengths in the state
        setLengths({
            users: usersLength,
            super_admins: superAdminsLength,
            admins: adminsLength,
            managers: managersLength,
            vendors: vendorsLength,
            customers: customersLength,
            marketing: marketingLength,
            logistics: logisticsLength,
            products: productsLength,
            products_low_stock: productsLowStockLength,
            orders: ordersLength,
            db_stats: dbStatsLength,
        });

        setIsLoading(false); // Data has been loaded
      } catch (error) {
        console.error("Error fetching lengths:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          setIsError(error.response.data.message || error.response.statusText);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request made but no response received:", error.request);
          setIsError("Network error. Please try again later.");
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
          setIsError("An unexpected error occurred. Please try again later.");
        }
        setIsLoading(false); // Stop loading state when an error occurs
      }
    };

    fetchLengths();
  }, []); // Empty dependency array means this useEffect runs once after initial render

  return (
    <DashboardContext.Provider value={{ lengths, isLoading, isError }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
