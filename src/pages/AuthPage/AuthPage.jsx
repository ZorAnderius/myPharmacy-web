import { useLocation } from "react-router-dom";
import AuthRightPanel from "../../shared/UI/AuthRightPanel/AuthRightPanel";
import Container from "../../shared/UI/Container/Container";
import RegisterForm from "../../shared/UI/Forms/RegisterForm/RegisterForm";
import Section from "../../shared/UI/Section/Section";
import styles from "./AuthPage.module.css";
import LoginForm from "../../shared/UI/Forms/LoginForm/LoginForm";
import { ROUTES } from "../../constants/routes";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === ROUTES.LOGIN;
  return (
    <Section style="authSection">
      <Container>
       <div className={styles.authPage}>
         <AuthRightPanel />
         {isLogin ? <LoginForm /> : <RegisterForm />}
       </div>
      </Container>
    </Section>
  );
};

export default AuthPage;
