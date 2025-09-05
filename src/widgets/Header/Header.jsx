import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useSelector } from "react-redux";
import { selectIsAuthenticate } from "../../redux/auth/selectors";
import Logo from "../../shared/UI/Logo/Logo";
import Container from "../../shared/UI/Container/Container";
import NavBar from "../../shared/UI/NavBar/NavBar";
import styles from "./Header.module.css";
import AuthNavBar from "../../shared/UI/AuthNavBar/AuthNavBar";

const Header = () => {
  const isAuthenticate = useSelector(selectIsAuthenticate);
  const location = useLocation();
  const isHome = location.pathname === ROUTES.MAIN;
  return (
    <header>
      <Container>
        <nav className={styles["nav-wrapper"]}>
          <Logo location={isHome} />
          <NavBar location={isHome} />
          {isAuthenticate && <AuthNavBar location={isHome}/>}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
