import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

function ApiCallComponent() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const API = "https://raw.githubusercontent.com/GrowinFlow/json/main/data.json";
  

    const fetchApi = async (url, setData) => {
        setIsLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApi(API, setProduct);
    }, [product]);

    return {
        product, setProduct,
        isLoading,
        isError,
    };
}

export const DataProvider = ({ children }) => {
    const data = ApiCallComponent();
    return (
        <DataContext.Provider value={{ ...data }}>
            {children}
        </DataContext.Provider>
    );
};
