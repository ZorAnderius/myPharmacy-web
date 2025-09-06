import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector } from "react-redux";
import { selectIsAuthenticate } from "../../redux/auth/selectors";
import Logo from "../../shared/UI/Logo/Logo";
import Container from "../../shared/UI/Container/Container";
import NavBar from "../../shared/UI/NavBar/NavBar";
import styles from "./Header.module.css";
import UserNavBar from "../../shared/UI/UserNavBar/UserNavBar";
import MobileMenu from "../../shared/UI/MobileMenu/MobileMenu";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticate = useSelector(selectIsAuthenticate);
  const location = useLocation();
  const isHome = location.pathname === ROUTES.MAIN;

  return (
    <header>
      <Container>
        <nav className={styles["nav-wrapper"]}>
          <Logo location={isHome} />
          <NavBar location={isHome} />
          <UserNavBar location={isHome} />
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
