// import { clearAuth, setAuth } from "../redux/auth/slice"; // Dynamic import to avoid circular dependency

import { clearCSRFToken } from "./csrfService.js";

let accessToken = null;
let isRefreshing = false;
let pendingQueue = [];

// BroadcastChannel for synchronization
const channel = new BroadcastChannel("auth_channel");

channel.onmessage = (event) => {
  if (event.data.type === "TOKEN_REFRESH") {
    accessToken = event.data.accessToken;
    processQueue(null, accessToken);
  }
};

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  pendingQueue = [];
};

// Initialize token from localStorage on module load
const initializeToken = () => {
  try {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      accessToken = storedToken;
    }
  } catch (error) {
    console.error("Failed to initialize token from localStorage:", error);
  }
};

// Initialize token when module loads
initializeToken();

// Listen for Redux store changes to sync token (lazy initialization)
let unsubscribe = null;

const initializeStoreSubscription = async () => {
  if (unsubscribe) return; // Already initialized

  try {
    const { store } = await import("../../redux/store.js");
    unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const authState = state.auth;

      // If user becomes authenticated but we don't have token in memory
      if (authState?.isAuthenticated && !accessToken) {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          accessToken = storedToken;
        }
      }

      // If user becomes unauthenticated, clear token
      if (!authState?.isAuthenticated && accessToken) {
        accessToken = null;
      }
    });
  } catch {
    // Ignore store subscription errors
  }
};

export const getAccessToken = () => {
  // Initialize store subscription on first access (async, don't wait)
  initializeStoreSubscription().catch(() => {});

  return accessToken;
};

export const setAccessToken = (token, user = null) => {
  accessToken = token;

  // Save to localStorage
  if (token) {
    localStorage.setItem("accessToken", token);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  } else {
    // Clear all auth-related items from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Clear Redux Persist storage
    try {
      localStorage.removeItem("persist:root");
      // Also clear sessionStorage
      sessionStorage.clear();
    } catch (error) {
      console.warn("Failed to clear persist storage:", error);
    }
    // Clear CSRF token when access token is cleared
    clearCSRFToken();
  }

  channel.postMessage({ type: "TOKEN_REFRESH", accessToken: token });
  if (token && user) {
    // Dynamic import to avoid circular dependency
    import("../../redux/auth/slice").then(({ setAuth }) => {
      import("../../redux/store").then(({ store }) => {
        store.dispatch(setAuth({ user }));
      });
    });
  } else if (!token) {
    // Dynamic import to avoid circular dependency
    import("../../redux/auth/slice").then(({ clearAuth }) => {
      import("../../redux/store").then(({ store }) => {
        store.dispatch(clearAuth());
      });
    });
  }
};

export const refreshToken = async () => {
  // Initialize store subscription on first access
  await initializeStoreSubscription();

  if (isRefreshing) {
    return new Promise((resolve, reject) =>
      pendingQueue.push({ resolve, reject })
    );
  }

  isRefreshing = true;

  try {
    // Import api client here to avoid circular dependency
    const { default: api } = await import("./api.js");

    console.log("Attempting refresh with cookies...");
    console.log("Current origin:", window.location.origin);
    console.log("API base URL:", api.defaults.baseURL);
    
    // Refresh token from httpOnly cookie - не передаємо Authorization header
    const response = await api.post("/users/refresh", {}, {
      withCredentials: true // Важливо для відправки cookies
    });

    // Extract data from nested structure
    const { accessToken: newAccessToken, user } =
      response.data.data || response.data;

    if (newAccessToken) {
      setAccessToken(newAccessToken, user);
      processQueue(null, newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("Token refresh failed:", err);
    processQueue(err, null);
    setAccessToken(null);
    throw err;
  } finally {
    isRefreshing = false;
  }
};