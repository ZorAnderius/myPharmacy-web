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

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (isProcessing) return;
      
      setIsProcessing(true);
      setError(null);

      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setError(`OAuth error: ${error}`);
          navigate('/login?error=oauth_failed');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          navigate('/login?error=no_code');
          return;
        }

        // Authenticate with Google using the code
        const oauthData = await authenticateWithGoogle(code);
        
        // Dispatch the authentication action
        await dispatch(authenticateWithGoogleOAuth(oauthData)).unwrap();
        
        // Redirect to home page or dashboard
        navigate('/');
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message);
        navigate('/login?error=authentication_failed');
      } finally {
        setIsProcessing(false);
      }
    };

    handleOAuthCallback();
  }, [searchParams, dispatch, navigate, authenticateWithGoogle, isProcessing]);

  return { isProcessing, error };
};
