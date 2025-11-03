import axios from "axios";

import { CONFIG_STATIC } from "src/config-global";

// ----------------------------------------------------------------------

export const axiosInstance = axios.create({
  baseURL: CONFIG_STATIC.serverUrl,
});

// Interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

// Static fetcher (used for public requests)
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
