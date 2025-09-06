import { useEffect, useState } from "react";
import styles from "./MobileMenu.module.css";
import clsx from "clsx";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { selectIsAuthenticate } from "../../../redux/auth/selectors";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import UserNavBar from "../UserNavBar/UserNavBar";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const isAuthenticate = useSelector(selectIsAuthenticate);
  const location = useLocation();
  const isHome = location.pathname === ROUTES.MAIN;

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

  const closeMenu = () => {
    setIsAnimated(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
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
  }, [isOpen]);

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
            {!isHome && <NavBar location={isHome} />}
            <UserNavBar location={isHome} isMobile={true} />
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
