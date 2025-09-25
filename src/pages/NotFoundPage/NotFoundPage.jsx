import { useRouteError, useNavigate } from "react-router-dom";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import Button from "../../shared/UI/Button/Button";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  console.error("Router error:", error);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Section>
      <Container>
        <div className={styles.notFoundContainer}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.errorTitle}>Page Not Found</h1>
          <p className={styles.errorDescription}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className={styles.errorActions}>
            <Button 
              className={styles.homeButton}
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
            <Button 
              className={styles.backButton}
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default NotFoundPage;