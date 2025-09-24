import { createContext, useContext, useState, useCallback } from 'react';
import api from './api.js';

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
        console.warn('Backend OAuth endpoint not available, using fallback');
        
        // Fallback: construct OAuth URL manually for testing
        const baseUrl = window.location.origin; // http://localhost:5179
        const redirectUri = encodeURIComponent(`${baseUrl}/oauth/callback`);
        
        // You'll need to replace YOUR_CLIENT_ID with your actual Google Client ID
        const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual Client ID
        const scope = encodeURIComponent('openid email profile');
        
        return `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${clientId}&` +
          `redirect_uri=${redirectUri}&` +
          `scope=${scope}&` +
          `response_type=code&` +
          `access_type=offline`;
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

      const response = await api.post('/users/confirm-oauth', { code }, {
        headers: {
          'X-No-CSRF': '1', // Disable CSRF check for OAuth
        }
      });

      if (!response.data?.data && !response.data?.accessToken) {
        throw new Error('Invalid response from OAuth authentication');
      }

      const data = response.data.data || response.data;
      return {
        accessToken: data.accessToken,
        user: data.user
      };
    } catch (err) {
      console.error('Error authenticating with Google:', err);
      setError(err.message);
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

      // Use redirect flow instead of popup for better reliability
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
    </GoogleOAuthContext.Provider>
  );
};
