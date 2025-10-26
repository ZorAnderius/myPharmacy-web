import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./LogOutBtn.module.css";
import { logoutThunk } from "../../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

const LogOutBtn = ({ className = "", onNavClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      
      // Manually clear localStorage to ensure complete cleanup
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      
      // Navigate to login page using React Router
      navigate(ROUTES.LOGIN, { replace: true });
      
      // Close mobile menu if onNavClick is provided
      if (onNavClick) {
        onNavClick();
      }
    } catch (error) {
      // Logout failed - manual cleanup even on failure
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      
      // Even if logout fails, redirect to login page
      navigate(ROUTES.LOGIN, { replace: true });
      
      // Close mobile menu if onNavClick is provided
      if (onNavClick) {
        onNavClick();
      }
    }
  };
  return (
    <Button
      className={className ? styles[`${className}-logout`] : styles["logout"]}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};

export default LogOutBtn;
