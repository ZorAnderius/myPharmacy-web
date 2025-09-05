import styles from "./LinkButton.module.css";

const LinkButton = ({
  children,
  type = "",
  direction = ROUTES.HOME,
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
