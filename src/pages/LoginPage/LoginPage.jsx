import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../app/providers/api";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/categories");
      } catch (err) {
        console.error("Помилка при отриманні категорій:", err);
      }
    };

    getCategory();
  }, []);

  // Handle OAuth errors
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error('OAuth error:', error);
      // You can show a toast notification or error message here
    }
  }, [searchParams]);

  return <div className={styles.loginPage}>LoginPage</div>;
};

export default LoginPage;
