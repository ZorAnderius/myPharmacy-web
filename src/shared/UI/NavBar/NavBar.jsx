import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticate } from "../../../redux/auth/selectors";
import { ROUTES } from "../../../constants/routes";
import clsx from "clsx";

const buildStyles = (isActive, location) => {
  return clsx(
    styles["link-btn"],
    isActive && styles["active-btn"],
    location && styles["home"]
  );
};

const NavBar = ({ location, isMobile }) => {
  const isAuthenticate = useSelector(selectIsAuthenticate);
  return (
    <div
      className={clsx(
        styles["routes-nav"],
        location && styles["home"],
        isMobile && styles["mobile"]
      )}
    >
      {isAuthenticate && (
        <ul className={styles["routes-list"]}>
          <li>
            <NavLink
              to={ROUTES.MAIN}
              className={({ isActive }) => buildStyles(isActive, location)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.SHOP}
              className={({ isActive }) => buildStyles(isActive, location)}
            >
              Store
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
