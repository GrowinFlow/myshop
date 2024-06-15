import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SetDataContext = createContext();

const API_BASE_URL = "https://4004.vercel.app/api/backend";
const USERS_API = `${API_BASE_URL}/users`;
const REGISTER_USER_API = `${API_BASE_URL}/users/register`;

function ApiCallComponent() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [products, setProducts] = useState([]);
    const [ userIdToEdit, setUserIdToEdit] = useState([]);

    const [isError, setIsError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userRole, setUserRole] = useState(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            return parsedUser.roles || null;
        }
        return null;
    });

    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    const fetchUsersIfNeeded = async () => {
        if (userRole === "admin") {
            setIsLoading(true);
            try {
                const res = await axiosInstance.get(USERS_API);
                setUsers(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Fetch Users Error:", error);
                setIsError(error);
                setIsLoading(false);
            }
        }
    };

    const updateUserIfNeeded = async (userId, updatedUserData) => {
        if (userRole === "admin") {
            setIsLoading(true);
            try {
                const res = await axiosInstance.patch(`${USERS_API}/${userId}`, updatedUserData);
                setUsers(users.map((user) => (user._id === userId ? res.data : user)));
                setIsLoading(false);
                
            } catch (error) {
                console.error("Update User Error:", error);
                setIsError(error);
                setIsLoading(false);
            }
        } else {
            console.error("Permission denied: User cannot update other users.");
        }
    };

    const deleteUserIfNeeded = async (userId) => {
        if (userRole === "admin") {
            setIsLoading(true);
            try {
                await axiosInstance.delete(`${USERS_API}/${userId}`);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            } catch (error) {
                console.error("Delete User Error:", error);
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error("Permission denied: Only admins can delete users.");
        }
    };

    const registerUser = async (userData) => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.post(REGISTER_USER_API, userData);
            setIsLoading(false);
            console.log("User registration successful:", res.data);
            // Optionally, you can update state or perform additional actions upon successful registration
        } catch (error) {
            console.error("User registration error:", error);
            setIsError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersIfNeeded();
    }, [userRole]);

    return {
        users,
        setUsers, 
        userIdToEdit, setUserIdToEdit,
        products, setProducts,
        token,
        isLoading,
        isError,
        updateUserIfNeeded,
        deleteUserIfNeeded,
        registerUser,
        userRole,
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
