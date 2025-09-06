import Button from "../Button/Button";
import styles from "./LogOutBtn.module.css";

const LogOutBtn = ({ style='' }) => {
  return <Button style={style ? `${style}-logout` : "logout"}>Log Out</Button>;
};

export default LogOutBtn;
