import { useGoogleOAuth } from '../../../app/providers/GoogleOAuthProvider';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './GoogleAuthButton.module.css';

const GoogleAuthButton = ({ className, disabled, children, ...props }) => {
  const { redirectToGoogleAuth, isLoading, error } = useGoogleOAuth();

  const handleGoogleAuth = async () => {
    try {
      await redirectToGoogleAuth();
    } catch (error) {
      console.error('Google OAuth error:', error);
    }
  };

  return (
    <div className={styles.googleAuthContainer}>
      <Button 
        className={`${styles.googleBtn} ${className || ''}`}
        onClick={handleGoogleAuth}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className={styles.loadingSpinner} />
        ) : (
          <Icon name="google" size={40} />
        )}
        {children || (isLoading ? 'Connecting...' : '')}
      </Button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default GoogleAuthButton;
