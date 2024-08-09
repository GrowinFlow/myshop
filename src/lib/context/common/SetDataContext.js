import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SetDataContext = createContext();

const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api/backend";
const USERS_API = `${API_BASE_URL}/users`;
const REGISTER_USER_API = `${API_BASE_URL}/users/register`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiCallComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(USERS_API);
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch Users Error:", error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(REGISTER_USER_API, userData);
      setUsers(prevUsers => [...prevUsers, res.data]);
      console.log("User registration successful:", res.data);
    } catch (error) {
      console.error("User registration error:", error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    isError,
    registerUser,
  };
};

export const SetDataProvider = ({ children }) => {
  const data = ApiCallComponent();

  return (
    <SetDataContext.Provider value={{ ...data }}>
      {children}
    </SetDataContext.Provider>
  );
};
