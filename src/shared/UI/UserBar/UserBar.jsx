import styles from "./UserBar.module.css";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";

const UserBar = ({ className = "" }) => {
  const user = useSelector(selectUser);
  
  return (
    <Button className={className ? styles[`${className}-user-bar`] : styles["user-bar"]}>
      <div className={styles["avatar-thumb"]}>
        <Icon name="user" size={32} />
      </div>
      <p className={styles["username"]}>
        {user?.name || 'User'}
      </p>
    </Button>
  );
};

export default UserBar;
