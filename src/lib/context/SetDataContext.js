import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SetDataContext = createContext();

const API_BASE_URL = "https://4004.vercel.app/api/backend";
const PRODUCT_API = `${API_BASE_URL}/products`;
const USERS_API = `${API_BASE_URL}/users`; // Corrected endpoint

function ApiCallComponent() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userIdToEdit, setUserIdToEdit] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    // Axios instance with default headers
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
        },
    });

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
        userIdToEdit,
        setUserIdToEdit
    };
}

export const SetDataProvider = ({ children }) => {
    const data = ApiCallComponent();
    return (
        <SetDataContext.Provider value={{ ...data }}>
            {children}
        </SetDataContext.Provider>
    );
};
