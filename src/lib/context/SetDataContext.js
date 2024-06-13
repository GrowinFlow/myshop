import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SetDataContext = createContext();

function ApiCallComponent() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const PRODUCT_API = "https://4004.vercel.app/api/backend/products";
    const USERS_API = "https://4004.vercel.app/api/backend/USERS";

    const fetchApi = async (url, setData) => {
        setIsLoading(true);
        try {
            const res = await axios.Set(url);
            setData(res.data);
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
