import { useEffect } from "react";
import api from "../../app/providers/api";

const LoginPage = () => {
  
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/categories");
        console.log(res.data);
      } catch (err) {
        console.error("Помилка при отриманні категорій:", err);
      }
    };

    getCategory();
  }, []);

  return <div style={{ backgroundColor: "blue" }}>LoginPage</div>;
};

export default LoginPage;
