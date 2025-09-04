import Header from "../../widgets/Header/Header";
import AnimatedRoutes from "../../app/routes/AnimatedRouter";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import styles from "./SharedLayout.module.css";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

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
