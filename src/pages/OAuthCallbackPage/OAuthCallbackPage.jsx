import { useOAuthCallback } from '../../app/providers/useOAuthCallback';
import Loader from '../../features/Loader/Loader';
import { PuffLoader } from 'react-spinners';
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
          onClick={() => {
            // Force reload to clean up any dirty states
            window.location.href = '/login';
          }}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
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
          Processing Google authentication...
        </p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
