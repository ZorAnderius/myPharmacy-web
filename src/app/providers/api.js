import axios from "axios";
import { getAccessToken, refreshToken, setAccessToken } from "./tokenManager.js";
import { getCSRFToken, clearCSRFToken } from "./csrfService.js";
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

  // Debug cookies for refresh endpoint
  if (config.url?.includes('/refresh')) {
    console.log('Refresh request config:', {
      url: config.url,
      withCredentials: config.withCredentials,
      headers: config.headers,
      baseURL: config.baseURL,
      currentOrigin: window.location.origin
    });
  }

  const method = config.method?.toUpperCase();
  const requiresCSRF = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
  const isAuthEndpoint =
    config.url?.includes("/users/login") ||
    config.url?.includes("/users/register") ||
    config.url?.includes("/users/confirm-oauth") ||
    config.url?.includes("/users/request-google-oauth") ||
    config.url?.includes("/users/refresh"); // Додаємо refresh endpoint

  if (requiresCSRF && !isAuthEndpoint) {
    try {
      const csrfToken = await getCSRFToken();
      if (csrfToken) {
        config.headers["X-Csrf-Token"] = csrfToken;
        config.headers["x-csrf-token"] = csrfToken; // Додаткова можливість для різних серверів
        config.headers["X-CSRF-Token"] = csrfToken; // Альтернативний header
      } else {
        console.warn("No CSRF token available for", config.method?.toUpperCase(), config.url);
        // Спробуємо отримати з localStorage як fallback
        const storedToken = localStorage.getItem('csrf-token');
        if (storedToken) {
          config.headers["X-Csrf-Token"] = storedToken;
          config.headers["x-csrf-token"] = storedToken;
          config.headers["X-CSRF-Token"] = storedToken;
        }
      }
    } catch (error) {
      console.warn("Failed to get CSRF token:", error);
      // Спробуємо з localStorage як fallback
      const storedToken = localStorage.getItem('csrf-token');
      if (storedToken) {
        config.headers["X-Csrf-Token"] = storedToken;
        config.headers["x-csrf-token"] = storedToken;
        config.headers["X-CSRF-Token"] = storedToken;
      }
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
      console.log('Refresh response:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
    }
    return response;
  },
  async (error) => {
    // Debug cookies for refresh endpoint errors
    if (error.config?.url?.includes('/refresh')) {
      console.log('Refresh error:', {
        status: error.response?.status,
        message: error.response?.data,
        headers: error.response?.headers
      });
    }
    // Handle CSRF token errors
    if (
      error.response?.status === 403 &&
      (error.response?.data?.message === "CSRF header missing" ||
        error.response?.data?.error === "CSRF token mismatch")
    ) {
      clearCSRFToken();
      // Retry the request with a new CSRF token (only once)
      if (error.config && !error.config._csrfRetry) {
        error.config._csrfRetry = true;
        try {
          const csrfToken = await getCSRFToken();
          if (csrfToken) {
            error.config.headers["X-Csrf-Token"] = csrfToken;
            return api.request(error.config);
          }
        } catch (csrfError) {
          console.error("Failed to retry with new CSRF token:", csrfError);
          // If we can't get a new CSRF token, redirect to login or show error
          if (typeof window !== 'undefined') {
            // Optionally redirect to login page or show error message
            console.error("CSRF token unavailable. Please refresh the page or log in again.");
          }
        }
      }
    }

    // Handle CORS errors - don't retry
    if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
      console.warn('CORS error detected, not retrying:', error.message);
      return Promise.reject(error);
    }

    // Handle CORS preflight issues
    if (error.response?.status === 0 || error.message?.includes('CORS')) {
      console.warn('CORS preflight error detected:', error.message);
      return Promise.reject(error);
    }

    // Handle OAuth endpoint errors - don't retry
    if (error.config?.url?.includes('confirm-oauth')) {
      console.warn('OAuth endpoint error, not retrying:', error.message);
      return Promise.reject(error);
    }

    // Handle timeout errors - don't retry
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      console.warn('Request timeout, not retrying:', error.message);
      return Promise.reject(error);
    }

    // Handle abort errors - don't retry
    if (error.name === 'AbortError' || error.code === 'ABORT_ERR') {
      console.warn('Request aborted, not retrying:', error.message);
      return Promise.reject(error);
    }

    // Handle token refresh on 401 and 403 errors (but not CSRF errors)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      error.config &&
      !error.config._retry &&
      !error.config._csrfRetry && // Don't retry if this was already a CSRF retry
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
        console.error("Token refresh failed:", refreshError);
        // Clear invalid token
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
