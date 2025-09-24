import Button from "../Button/Button";
import styles from "./LogOutBtn.module.css";

const LogOutBtn = ({ className = '' }) => {
  return <Button className={className ? styles[`${className}-logout`] : styles["logout"]}>Log Out</Button>;
};

export default LogOutBtn;
