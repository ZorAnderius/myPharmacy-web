import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./LogOutBtn.module.css";
import { logoutThunk } from "../../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

const LogOutBtn = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to login page
      navigate(ROUTES.LOGIN);
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
