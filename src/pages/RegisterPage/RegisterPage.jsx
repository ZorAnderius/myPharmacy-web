import AuthRightPanel from "../../shared/UI/AuthRightPanel/AuthRightPanel";
import Container from "../../shared/UI/Container/Container";
import RegisterForm from "../../shared/UI/Forms/RegisterForm/RegisterForm";
import Section from "../../shared/UI/Section/Section";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <Section style="authSection">
      <Container>
       <div className={styles.registerPage}>
         <AuthRightPanel />
         <RegisterForm />
       </div>
      </Container>
    </Section>
  );
};

export default RegisterPage;
