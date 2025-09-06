import styles from "./UserBar.module.css";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

const UserBar = () => {
  return (
    <Button style="user-bar">
      <div className={styles["avatar-thumb"]}>
        <Icon name="user" size={32} />
      </div>
      <p className={styles["username"]}>Anna</p>
    </Button>
  );
};

export default UserBar;
