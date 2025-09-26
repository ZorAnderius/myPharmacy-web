import { useEffect, useState, useCallback } from "react";
import styles from "./MobileMenu.module.css";
import clsx from "clsx";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import UserNavBar from "../UserNavBar/UserNavBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { useSelector } from "react-redux";
import { selectIsAuthenticate } from "../../../redux/auth/selectors";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === ROUTES.MAIN;
  const isAuthenticate = useSelector(selectIsAuthenticate);

  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }

    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsAnimated(true);
      }, 10);
    } else {
      setIsAnimated(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  const closeMenu = useCallback(() => {
    setIsAnimated(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      // Add no-scroll class to body and html
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");
    } else {
      // Remove no-scroll class
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <div className={styles["mobile-menu"]}>
        <Button
          className={styles["menu-toggle"]}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`${styles["hamburger"]} ${
              isOpen ? styles["hamburger-open"] : ""
            }`}
          >
            <span className={styles["hamburger-line"]}></span>
            <span className={styles["hamburger-line"]}></span>
            <span className={styles["hamburger-line"]}></span>
          </span>
        </Button>
      </div>
      {isOpen && (
        <div
          className={clsx(styles["menu-overlay"])}
          onClick={closeMenu}
          role="button"
          onKeyDown={(e) => (e.key === "Enter" ? closeMenu() : null)}
        >
          <nav
            className={clsx(
              styles["mobile-nav"],
              isAnimated && styles["animated"]
            )}
          >
            <div className={styles["line"]}></div>
            <UserNavBar location={isHome} isMobile={true} />
            {isAuthenticate && <div className={styles["line"]}></div>}
            {isAuthenticate && <NavBar location={isHome} isMobile={true} />}
            {isAuthenticate && (
              <>
                <div className={styles["line"]}></div>
                <div className={styles["logout-section"]}>
                  <LogOutBtn className="mobile" />
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;

