import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../redux/auth/selectors";
import styles from "./GlobalLoader.module.css";

const GlobalLoader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loaderContainer}>
        <PuffLoader
          color="#4ade80"
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
