import axios from "axios";
import { getAccessToken, refreshToken, setAccessToken } from "./tokenManager.js";
import { getCSRFToken } from "./csrfService.js";
import { sanitizeInput } from "../../utils/security/sanitizeInput.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
});

api.interceptors.request.use(async (config) => {
  // Add access token
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add CSRF token to headers for state-changing requests
  const method = config.method?.toUpperCase();
  const requiresCSRF = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const isAuthEndpoint = config.url?.includes('/users/login') || 
                        config.url?.includes('/users/register') || 
                        config.url?.includes('/users/confirm-oauth') ||
                        config.url?.includes('/users/request-google-oauth');
  
  if (requiresCSRF && !isAuthEndpoint) {
    try {
      const csrfToken = await getCSRFToken();
      if (csrfToken) {
        config.headers['x-csrf-token'] = csrfToken;
      }
    } catch (error) {
      // CSRF token not available
    }
  }

  if (
    config.data &&
    typeof config.data === "object" &&
    !(config.data instanceof FormData)
  ) {
    config.data = sanitizeRequestData(config.data);
  }

  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    // Debug cookies for refresh endpoint
    if (response.config?.url?.includes('/refresh')) {
      // Debug info removed
    }
    return response;
  },
  async (error) => {
    // CSRF token is handled automatically via cookies

    // Handle CORS errors - don't retry
    if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
      return Promise.reject(error);
    }

    // Handle CORS preflight issues
    if (error.response?.status === 0 || error.message?.includes('CORS')) {
      return Promise.reject(error);
    }

    // Handle OAuth endpoint errors - don't retry
    if (error.config?.url?.includes('confirm-oauth')) {
      return Promise.reject(error);
    }

    // Handle timeout errors - don't retry
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return Promise.reject(error);
    }

    // Handle abort errors - don't retry
    if (error.name === 'AbortError' || error.code === 'ABORT_ERR') {
      return Promise.reject(error);
    }

    // Handle token refresh on 401 and 403 errors
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      error.config &&
      !error.config._retry &&
      !error.config.url?.includes("/oauth/") // Don't retry on OAuth endpoints
    ) {
      error.config._retry = true;
      try {
        const newToken = await refreshToken();
        if (newToken) {
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config);
        } else {
          setAccessToken(null);
        }
      } catch (refreshError) {
        // Token refresh failed - clear invalid token
        setAccessToken(null);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to sanitize request data
const sanitizeRequestData = (data) => {
  if (typeof data === "string") {
    return sanitizeInput(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeRequestData(item));
  }

  if (data && typeof data === "object") {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      const sanitizedKey = sanitizeInput(key);
      sanitized[sanitizedKey] = sanitizeRequestData(value);
    }
    return sanitized;
  }

  return data;
};

export default api;
