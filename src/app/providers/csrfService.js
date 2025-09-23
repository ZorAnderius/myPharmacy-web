/**
 * CSRF Token Service
 * Handles fetching and managing CSRF tokens for secure API requests
 */

let csrfToken = null;
let tokenExpiry = null;
const TOKEN_LIFETIME = 30 * 60 * 1000; // 30 minutes

/**
 * Get CSRF token from cookie (since backend sets it in cookie)
 */
const getCSRFTokenFromCookie = () => {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "csrf_token" || name === "csrfToken") {
      const token = decodeURIComponent(value);
      return token;
    }
  }
  return null;
};

/**
 * Set CSRF token from server response (used during auth operations)
 */
export const setCSRFToken = (token) => {
  csrfToken = token;
  tokenExpiry = Date.now() + TOKEN_LIFETIME;
};

/**
 * Get current CSRF token
 */
export const getCSRFToken = async () => {
  // First try to get from cookie (backend sets this)
  const cookieToken = getCSRFTokenFromCookie();
  if (cookieToken) {
    csrfToken = cookieToken;
    tokenExpiry = Date.now() + TOKEN_LIFETIME;
    return csrfToken;
  }

  // Check if we have a cached token that's still valid
  if (csrfToken && tokenExpiry && Date.now() < tokenExpiry) {
    return csrfToken;
  }

  // Try to fetch CSRF token from server
  try {
    const response = await fetch('/api/csrf-token', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.csrfToken || data.token;
      if (token) {
        setCSRFToken(token);
        return token;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch CSRF token from server:", error);
  }

  // If no valid token, throw error
  throw new Error("No valid CSRF token available. Please authenticate first.");
};

/**
 * Clear CSRF token (e.g., on logout)
 */
export const clearCSRFToken = () => {
  csrfToken = null;
  tokenExpiry = null;

  // Clear cookie by setting it to expire in the past
  document.cookie =
    "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/**
 * Check if CSRF token is valid
 */
export const isCSRFTokenValid = () => {
  return csrfToken && tokenExpiry && Date.now() < tokenExpiry;
};

/**
 * Initialize CSRF token on app startup
 */
export const initializeCSRFToken = async () => {
  try {
    await getCSRFToken();
    return true;
  } catch (error) {
    console.warn("CSRF token initialization failed:", error);
    return false;
  }
};

/**
 * Force refresh CSRF token
 */
export const refreshCSRFToken = async () => {
  clearCSRFToken();
  try {
    return await getCSRFToken();
  } catch (error) {
    console.error("Failed to refresh CSRF token:", error);
    throw error;
  }
};
