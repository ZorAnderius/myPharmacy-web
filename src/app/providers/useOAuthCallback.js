import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleOAuth } from './GoogleOAuthProvider';
import { authenticateWithGoogleOAuth } from '../../redux/auth/operations';

export const useOAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { authenticateWithGoogle } = useGoogleOAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (isProcessing || hasProcessed || attemptCount >= 1) return; // Only 1 attempt
      
      setIsProcessing(true);
      setError(null);
      setAttemptCount(prev => prev + 1);

      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        // Validate state parameter for CSRF protection
        if (state && !state.match(/^[a-zA-Z0-9_-]+$/)) {
          throw new Error('Invalid state parameter');
        }

        if (error) {
          const errorDescription = searchParams.get('error_description');
          setError(`OAuth error: ${error}${errorDescription ? ` - ${errorDescription}` : ''}`);
          navigate('/login?error=oauth_failed');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          navigate('/login?error=no_code');
          return;
        }

        // Validate code format - Google OAuth codes can contain various characters
        if (!code || code.length < 10) {
          throw new Error('Invalid authorization code format');
        }

        // Authenticate with Google using the code
        const oauthData = await authenticateWithGoogle(code);
        
        // Validate oauthData structure
        if (!oauthData.accessToken || !oauthData.user) {
          throw new Error('Invalid authentication data received');
        }
        
        // Dispatch the authentication action
        await dispatch(authenticateWithGoogleOAuth(oauthData)).unwrap();
        
        // Mark as processed to avoid retries
        setHasProcessed(true);
        
        // Redirect to shop page after successful authentication
        navigate('/shop');
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message);
        // Mark as processed to avoid retries
        setHasProcessed(true);
      } finally {
        setIsProcessing(false);
      }
    };

    // Only run if we have a code or error parameter and haven't processed yet
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if ((code || error) && !hasProcessed && attemptCount < 1) {
      handleOAuthCallback();
    }
  }, [searchParams, dispatch, navigate, authenticateWithGoogle, isProcessing, hasProcessed, attemptCount]);

  return { isProcessing, error };
};
