import clsx from "clsx";
import styles from "./UserNavBar.module.css";
import LinkButton from "../LinkButton/LinkButton";
import { ROUTES } from "../../../constants/routes";
import { selectIsAuthenticate } from "../../../redux/auth/selectors";
import { useSelector } from "react-redux";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";

const UserNavBar = ({ location }) => {
  const isAuthenticate = useSelector(selectIsAuthenticate);
  const prefix = location ? "-home" : "";
  return isAuthenticate ? (
    <ul className={clsx(styles["auth-nav"], location && styles["home"])}>
      <li>
        <LinkButton type={`login${prefix}`} direction={ROUTES.LOGIN}>
          Log In
        </LinkButton>
      </li>
      <li>
        <LinkButton type="register" direction={ROUTES.REGISTER}>
          Registration
        </LinkButton>
      </li>
    </ul>
  ) : (
    <ul className={clsx(styles["user-nav"], location && styles["home"])}>
      <li>
        <LogOutBtn />
      </li>
      <li>
        <UserBar />
      </li>
    </ul>
  );
};

export default UserNavBar;
