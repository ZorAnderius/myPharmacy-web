import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";
import clsx from "clsx";
import { ROUTES } from "../../../constants/routes";

const LinkButton = ({
  children,
  type = "",
  direction = ROUTES.MAIN,
  newTab,
  handleClick,
}) => {
  return newTab ? (
    <Link
      to={direction}
      className={clsx(styles["link-btn"], type && styles[type])}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  ) : (
    <Link
      to={direction}
      onClick={handleClick}
      className={clsx(styles["link-btn"], type && styles[type])}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
