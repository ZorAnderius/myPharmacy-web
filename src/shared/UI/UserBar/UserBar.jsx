import styles from "./UserBar.module.css";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUser } from "../../../redux/auth/selectors";
import { useState, useEffect } from "react";
import UserProfileModal from "../UserProfileModal/UserProfileModal";

const UserBar = ({ className = "", onNavClick }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWaitingForMenuClose, setIsWaitingForMenuClose] = useState(false);
  
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

  // Show only first name
  const displayName = user?.firstName || user?.name?.split(' ')[0] || 'User';

  const handleProfileClick = () => {
    console.log('UserBar: handleProfileClick called');
    
    // Перевіряємо, чи мобільне меню активне
    if (document.body.classList.contains('no-scroll')) {
      console.log('UserBar: Mobile menu is active, waiting for it to close');
      setIsWaitingForMenuClose(true);
      
      // Спочатку закриваємо мобільне меню
      if (onNavClick) {
        onNavClick();
      }
    } else {
      console.log('UserBar: Mobile menu is not active, opening modal directly');
      setIsProfileModalOpen(true);
    }
  };

  // Відстежуємо закриття мобільного меню
  useEffect(() => {
    if (isWaitingForMenuClose) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const hasNoScroll = document.body.classList.contains('no-scroll');
            console.log('UserBar: no-scroll class changed', { hasNoScroll, isWaitingForMenuClose });
            
            // Якщо мобільне меню закрилося, відкриваємо модальне вікно
            if (!hasNoScroll && isWaitingForMenuClose) {
              console.log('UserBar: Mobile menu closed, opening profile modal');
              setIsWaitingForMenuClose(false);
              setIsProfileModalOpen(true);
            }
          }
        });
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [isWaitingForMenuClose]);

  return (
    <>
      <Button 
        className={`${className ? styles[`${className}-user-bar`] : styles["user-bar"]} ${!isHomePage ? styles["non-home"] : ""}`}
        onClick={handleProfileClick}
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

      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => {
          console.log('UserProfileModal: onClose called - modal will close');
          setIsProfileModalOpen(false);
          // НЕ закриваємо мобільне меню одразу - дамо користувачу час подивитися на модальне вікно
          // if (onNavClick) {
          //   onNavClick();
          // }
        }} 
      />
    </>
  );
};

export default UserBar;
