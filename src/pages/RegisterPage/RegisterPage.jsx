import AuthRightPanel from "../../shared/UI/AuthRightPanel/AuthRightPanel";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";

const RegisterPage = () => {
  return (
    <Section style="authSection">
      <Container>
        <AuthRightPanel />
      </Container>
    </Section>
  );
};

export default RegisterPage;
