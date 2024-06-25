import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AdminSideProductContext = createContext();

// Base URL for the products API
const API_BASE_URL = process.env.REACT_APP_ADMIN_SIDE_PRODUCTS;

// Provider component
const AdminSideProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (productData) => {
    try {
      const response = await axios.post(API_BASE_URL, productData);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.message);
    }
  };

  // Update an existing product
  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${productId}`, updatedProductData);
      setProducts(products.map(product => (product._id === productId ? response.data : product)));
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      setError(error.message);
    }
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      setError(error.message);
    }
  };

  // Fetch visibility status of a product by ID
  const fetchProductVisibility = async (productId) => {
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/${productId}/visibility`);
      return response.data.visible;
    } catch (error) {
      console.error(`Error fetching visibility status for product ${productId}:`, error);
      setError(error.message);
      throw error; // Re-throw to handle in the caller if needed
    }
  };

  // Update the visibility status of a product by ID
  const updateProductVisibility = async (productId, visible) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${productId}/visibility`, { visible });
      setProducts(products.map(product => (product._id === productId ? response.data : product)));
    } catch (error) {
      console.error(`Error updating visibility status for product ${productId}:`, error);
      setError(error.message);
    }
  };

  // Context value to be provided to the children components
  const value = {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProductVisibility,
    updateProductVisibility,
    productIdToEdit,
    setProductIdToEdit,
  };

  return (
    <AdminSideProductContext.Provider value={value}>
      {children}
    </AdminSideProductContext.Provider>
  );
};

export { AdminSideProductContext, AdminSideProductProvider };
