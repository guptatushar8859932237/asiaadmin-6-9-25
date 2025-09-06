import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // Using the environment variable here
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Example function for API request (like login)
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  export default axiosInstance;