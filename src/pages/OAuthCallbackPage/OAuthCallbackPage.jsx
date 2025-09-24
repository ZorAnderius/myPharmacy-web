import { useOAuthCallback } from '../../app/providers/useOAuthCallback';
import Loader from '../../features/Loader/Loader';
import styles from './OAuthCallbackPage.module.css';

const OAuthCallbackPage = () => {
  const { isProcessing, error } = useOAuthCallback();

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Authentication Error</h2>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.returnButton}
          onClick={() => window.location.href = '/login'}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return <Loader />;
};

export default OAuthCallbackPage;
