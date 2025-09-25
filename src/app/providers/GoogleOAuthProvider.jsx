import { createContext, useContext, useState, useCallback } from 'react';
import api from './api.js';
import { PuffLoader } from 'react-spinners';

const GoogleOAuthContext = createContext();

export const useGoogleOAuth = () => {
  const context = useContext(GoogleOAuthContext);
  if (!context) {
    throw new Error('useGoogleOAuth must be used within a GoogleOAuthProvider');
  }
  return context;
};

export const GoogleOAuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOAuthUrl = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/users/request-google-oauth');
        
        if (!response.data?.data?.url && !response.data?.url) {
          throw new Error('No OAuth URL received from server');
        }

        return response.data.data?.url || response.data.url;
      } catch (fetchError) {
        console.error('Backend OAuth endpoint not available:', fetchError);
        
        if (fetchError.response?.status === 404) {
          throw new Error('OAuth endpoint not found. Please contact support.');
        } else if (fetchError.code === 'ERR_NETWORK') {
          throw new Error('Cannot connect to server. Please check your internet connection.');
        } else {
          throw new Error('OAuth service unavailable. Please try again later.');
        }
      }
    } catch (err) {
      console.error('Error getting OAuth URL:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const authenticateWithGoogle = useCallback(async (code) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate code format - Google OAuth codes can contain various characters
      if (!code || typeof code !== 'string' || code.length < 10) {
        throw new Error('Invalid authorization code');
      }

      // Try backend first, but with timeout and single attempt
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        // Get real CSRF token from cookies
        const csrfToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrf-token='))
          ?.split('=')[1];
        

        const response = await api.post('/users/confirm-oauth', { 
          code: code.trim() 
        }, {
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'x-csrf-token': csrfToken }),
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.data?.data && !response.data?.accessToken) {
          throw new Error('Invalid response from OAuth authentication');
        }

        const data = response.data.data || response.data;
        
        // Validate response structure
        if (!data.accessToken || !data.user) {
          throw new Error('Invalid authentication response structure');
        }

        return {
          accessToken: data.accessToken,
          user: data.user
        };
      } catch (backendError) {
        console.error('Backend OAuth endpoint failed:', backendError);

        // Provide more specific error messages based on response
        if (backendError.response?.status === 400) {
          const errorData = backendError.response?.data;
          if (errorData?.message) {
            throw new Error(`Backend error: ${errorData.message}`);
          } else {
            throw new Error('Invalid OAuth code. Please try logging in again.');
          }
        } else if (backendError.response?.status === 401) {
          throw new Error('OAuth session expired. Please try again.');
        } else if (backendError.response?.status === 403) {
          throw new Error('Access denied. Please check your Google account permissions.');
        } else if (backendError.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error('Authentication service unavailable. Please try again later.');
        }
      }
    } catch (err) {
      console.error('Error authenticating with Google:', err);
      
      // Provide user-friendly error messages
      let errorMessage = 'Authentication failed. Please try again.';
      
      if (err.response?.status === 401) {
        errorMessage = 'Authentication expired. Please try again.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Access denied. Please check your permissions.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please check your connection.';
      } else if (err.message?.includes('Invalid')) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const redirectToGoogleAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const oauthUrl = await getOAuthUrl();
      if (!oauthUrl) {
        throw new Error('No OAuth URL received');
      }

      // Validate OAuth URL
      if (!oauthUrl.startsWith('https://accounts.google.com/')) {
        throw new Error('Invalid OAuth URL');
      }

      // Use redirect flow for better security
      window.location.href = oauthUrl;
    } catch (err) {
      console.error('Error redirecting to Google Auth:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getOAuthUrl]);

  const value = {
    isLoading,
    error,
    getOAuthUrl,
    authenticateWithGoogle,
    redirectToGoogleAuth,
  };

  return (
    <GoogleOAuthContext.Provider value={value}>
      {children}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            minWidth: '200px'
          }}>
            <PuffLoader color="#4ade80" size={80} />
            <p style={{
              margin: 0,
              color: '#374151',
              fontSize: '18px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Authenticating with Google...
            </p>
          </div>
        </div>
      )}
    </GoogleOAuthContext.Provider>
  );
};
