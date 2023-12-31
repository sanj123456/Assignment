import axios from "axios";
import { getAccessToken } from "../services/helper";
import { constants } from "../constant/constants";
import { handleLogout } from "../services/authServices/authServices";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: constants.baseUrl,
    // baseURL: process.env.REACT_APP_BASE_URL
})

axiosInstance.interceptors.request.use(function (config) {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    toast.error(error.response.data.error ? error.response.data.error : "Something went wrong!")
    if (error.response.status === 401) {
        handleLogout()
    }
    return Promise.reject(error.response);
});

export default axiosInstance

