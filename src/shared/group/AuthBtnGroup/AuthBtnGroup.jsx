import { Link } from "react-router-dom";
import styles from "./AuthBtnGroup.module.css";
import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";

const AuthBtnGroup = ({ authType }) => {
  return (
    <div className={styles.authBtnGroup}>
      <div className={styles.btnGroup}>
        <Button type="submit" className={styles.authBtn}>
          {authType === "register" ? "Sign Up" : "Sign In"}
        </Button>
        <Link
          to={authType === "register" ? "/login" : "/register"}
          className={styles.switchLink}
        >
          {authType === "register"
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Link>
      </div>
      <div className={styles.googleAuth}>
        <p>or sign in with Google</p>
        <Button className={styles.googleBtn} size="icon">
          <Icon name="google" size={40} />
        </Button>
      </div>
    </div>
  );
};

export default AuthBtnGroup;
