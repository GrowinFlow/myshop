import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SetDataContext = createContext();
console.log(process.env.REACT_APP_BASE_URL)
const API_BASE_URL = "http://4004.vercel.app/api/backend";
// const API_BASE_URL = "http://localhost:3001/api/backend";
const USERS_API = `${API_BASE_URL}/users`;
const REGISTER_USER_API = `${API_BASE_URL}/users/register`;

function ApiCallComponent() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const [products, setProducts] = useState(null);
    const [ userIdToEdit, setUserIdToEdit] = useState(null);

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
            setIsLoading(true); // Show loading state during the update process
            
            // Log the updatedUserData to inspect the payload
            console.log("Attempting to update user with ID:", userId);
            console.log("Payload:", updatedUserData);
    
            try {
                // Get token from local storage or context
                const token = localStorage.getItem('token'); // Adjust this based on how you store tokens
    
                // Set up headers with the authorization token
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Ensure content type is JSON
                };
    
                // Make API call to update user data
                const res = await axiosInstance.patch(`${USERS_API}/${userId}`, updatedUserData, { headers });
    
                // Check if response contains updated user data
                if (res && res.data) {
                    console.log("User updated successfully:", res.data);
                    // Replace the updated user in the users array with the response data
                    setUsers(prevUsers => prevUsers.map(user => user._id === userId ? res.data : user));
                } else {
                    console.error("No data returned from the update request");
                }
            } catch (error) {
                console.error("Update User Error:", error);
    
                // Detailed logging for troubleshooting
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    console.error("Request data:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
    
                setIsError(error); // Set error state if there's an issue with the update
            } finally {
                setIsLoading(false); // Hide loading state once the update process is done
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
            
            // Update local state with the newly registered user
            setUsers(prevUsers => [...prevUsers, res.data]);
            
            // Optionally, you can perform additional actions upon successful registration
            
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
