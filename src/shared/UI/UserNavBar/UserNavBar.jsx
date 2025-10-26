import clsx from "clsx";
import styles from "./UserNavBar.module.css";
import LinkButton from "../LinkButton/LinkButton";
import { ROUTES } from "../../../constants/routes";
import { selectIsAuthenticate } from "../../../redux/auth/selectors";
import { useSelector } from "react-redux";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";

const UserNavBar = ({ location, isMobile, onNavClick }) => {
  const isAuthenticate = useSelector(selectIsAuthenticate);
  let prefix = "";
  if (location === ROUTES.MAIN) prefix = "-home";
  if (isMobile) prefix = "-mobile";
  
  const handleNavClick = () => {
    if (onNavClick) {
      onNavClick();
    }
  };
  
  return !isAuthenticate ? (
    <ul
      className={clsx(
        styles["auth-nav"],
        location && styles["home"],
        isMobile && styles["mobile"]
      )}
    >
      <li>
        <LinkButton type={`login${prefix}`} direction={ROUTES.LOGIN} handleClick={handleNavClick}>
          Log In
        </LinkButton>
      </li>
      <li>
        <LinkButton type={`register${prefix}`} direction={ROUTES.REGISTER} handleClick={handleNavClick}>
          Registration
        </LinkButton>
      </li>
    </ul>
  ) : (
    <ul
      className={clsx(
        styles["user-nav"],
        location && styles["home"],
        isMobile && styles["mobile"]
      )}
    >
      {isMobile ? (
        <li>
          <UserBar className="mobile" onNavClick={handleNavClick} />
        </li>
      ) : (
        <>
          <li>
            <LogOutBtn />
          </li>
          <li>
            <UserBar />
          </li>
        </>
      )}
    </ul>
  );
};

export default UserNavBar;
