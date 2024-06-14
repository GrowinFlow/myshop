import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SetDataContext = createContext();

const API_BASE_URL = "https://4004.vercel.app/api/backend";
const PRODUCT_API = `${API_BASE_URL}/products`;
const USERS_API = `${API_BASE_URL}/users`;
const LOGIN_API = `${API_BASE_URL}/login`; // Endpoint for user login

function ApiCallComponent() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [token, setToken] = useState(null); // State to store JWT token

    // Axios instance with default headers
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Set Authorization header with token
        },
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const fetchApi = async (url, setData) => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get(url);
            setData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    const loginUser = async (credentials) => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.post(LOGIN_API, credentials);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token); // Store token in localStorage
            setIsLoading(false);
            return res.data; // Return user and token data
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
            throw error; // Propagate error to handle in UI
        }
    };

    const logoutUser = () => {
        setToken(null);
        localStorage.removeItem("token"); // Remove token from localStorage
    };

    const addProduct = async (newProduct) => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.post(PRODUCT_API, newProduct);
            setProducts([...products, res.data]);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    const addUser = async (newUser) => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.post(USERS_API, newUser);
            setUsers([...users, res.data]);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            setIsLoading(true);
            await axiosInstance.delete(`${PRODUCT_API}/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    const updateUser = async (userId, updatedUserData) => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.patch(`${USERS_API}/${userId}`, updatedUserData);
            setUsers(users.map(user => user.id === userId ? res.data : user));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            setIsLoading(true);
            await axiosInstance.delete(`${USERS_API}/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApi(PRODUCT_API, setProducts);
        fetchApi(USERS_API, setUsers);
    }, []); // Empty dependency array, runs only once on mount

    return {
        products,
        users,
        isLoading,
        isError,
        addProduct,
        addUser,
        deleteProduct,
        updateUser,
        deleteUser,
    
        token,
        loginUser,
        logoutUser,
    };
}

export const SetDataProvider = ({ children }) => {
    const data = ApiCallComponent();

    // Context provider value includes all the state and functions from ApiCallComponent
    return (
        <SetDataContext.Provider value={{ ...data }}>
            {children}
        </SetDataContext.Provider>
    );
};
