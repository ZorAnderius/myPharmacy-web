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
  if (typeof document === 'undefined' || !document.cookie) {
    return null;
  }
  
  // Try to get csrfToken from all cookies
  const cookies = document.cookie.split(";");
  
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    // Backend використовує назву csrfToken
    if (name === "csrfToken" || name === "csrf_token") {
      try {
        const token = decodeURIComponent(value);
        return token;
      } catch (e) {
        // If decode fails, return as is
        return value;
      }
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
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("csrf-token", token);
    // Also set cookie for cross-domain access
    if (typeof document !== "undefined") {
      document.cookie = `csrfToken=${token}; path=/; max-age=${TOKEN_LIFETIME / 1000}; SameSite=None; Secure`;
    }
  }
};

/**
 * Get current CSRF token
 */
export const getCSRFToken = async () => {
  // Sprawdź czy working в browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  // First try to get from cookie (backend sets this)
  const cookieToken = getCSRFTokenFromCookie();
  if (cookieToken) {
    csrfToken = cookieToken;
    tokenExpiry = Date.now() + TOKEN_LIFETIME;
    // Зберігаємо в localStorage як backup для production
    localStorage.setItem('csrf-token', cookieToken);
    return csrfToken;
  }

  // Check if we have a cached token that's still valid
  if (csrfToken && tokenExpiry && Date.now() < tokenExpiry) {
    return csrfToken;
  }

  // Fallback to localStorage
  const storedToken = localStorage.getItem('csrf-token');
  if (storedToken) {
    csrfToken = storedToken;
    tokenExpiry = Date.now() + TOKEN_LIFETIME;
    return csrfToken;
  }

  // If no valid token, return null instead of throwing error
  return null;
};

/**
 * Clear CSRF token (e.g., on logout)
 */
export const clearCSRFToken = () => {
  csrfToken = null;
  tokenExpiry = null;

  // Clear localStorage якщо в browser environment
  if (typeof window !== "undefined") {
    localStorage.removeItem("csrf-token");
    // Clear cookie by setting it to expire in the past
    if (typeof document !== "undefined") {
      // Clear csrfToken cookie (correct name)
      document.cookie = 'csrfToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // Also clear any other possible cookie names
      document.cookie = 'csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
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
    return false;
  }
};

/**
 * Force refresh CSRF token
 */
export const refreshCSRFToken = async () => {
  clearCSRFToken();
  // Try to get fresh token from cookies
  const cookieToken = getCSRFTokenFromCookie();
  if (cookieToken) {
    setCSRFToken(cookieToken);
    return cookieToken;
  }
  // Fallback to localStorage
  const storedToken = localStorage.getItem('csrf-token');
  if (storedToken) {
    setCSRFToken(storedToken);
    return storedToken;
  }
  throw new Error("No CSRF token available in cookies or localStorage");
};
