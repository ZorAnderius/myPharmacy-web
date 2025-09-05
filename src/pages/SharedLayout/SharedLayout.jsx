import Header from "../../widgets/Header/Header";
import AnimatedRoutes from "../../app/routes/AnimatedRouter";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import styles from "./SharedLayout.module.css";


const SharedLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.MAIN;
  return (
    <div className={isHome ? styles["home-bg"] : ""}>
      <Header />
      <main style={{ flex: 1 }}>
        <AnimatedRoutes />
      </main>
    </div>
  );
};

export default SharedLayout;
