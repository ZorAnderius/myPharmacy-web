import styles from "./UserBar.module.css";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUser } from "../../../redux/auth/selectors";

const UserBar = ({ className = "" }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  // Get user initials
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      const firstInitial = user.firstName.trim()[0];
      const lastInitial = user.lastName.trim()[0];
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName.trim()[0].toUpperCase();
    }
    if (user?.name) {
      const nameParts = user.name.trim().split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
      }
      return user.name.trim()[0].toUpperCase();
    }
    return 'U';
  };

  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.firstName || user?.name || 'User';

  return (
    <Button 
      className={`${className ? styles[`${className}-user-bar`] : styles["user-bar"]} ${!isHomePage ? styles["non-home"] : ""}`}
    >
      <div className={styles["avatar-thumb"]}>
        {user?.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={displayName}
            className={styles["avatar-image"]}
          />
        ) : (
          <div className={styles["avatar-initials"]}>
            {getInitials()}
          </div>
        )}
      </div>
      <p className={styles["username"]}>
        {displayName}
      </p>
    </Button>
  );
};

export default UserBar;
