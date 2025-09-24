import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticate } from "../../../redux/auth/selectors";
import { ROUTES } from "../../../constants/routes";
import clsx from "clsx";

const buildStyles = ({ isActive }) => {
  return clsx(styles["link-btn"], isActive && styles["active-btn"]);
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
          {!location && (
            <li>
              <NavLink to={ROUTES.MAIN} className={buildStyles}>
                Home
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to={ROUTES.SHOP} className={buildStyles}>
              Store
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.MEDICINE} className={buildStyles}>
              Medicine
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
