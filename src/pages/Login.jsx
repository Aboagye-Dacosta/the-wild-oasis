import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import Row from "../ui/Row";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
      <Row type="horizontal"  id="badges">
        <a href="https://www.linkedin.com/in/solomon-aboagye-011776210/">
          <img
            src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white"
            alt="LinkedIn Badge"
          />
        </a>
        <a href="https://dacostasolomon-codeman.hashnode.dev">
          <img
            src="https://img.shields.io/badge/Hashnode-blue?style=for-the-badge&logo=hashnode&logoColor=white"
            alt="Hashnode Badge"
          />
        </a>
        <a href="https://twitter.com/CODE_COSTA">
          <img
            src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white"
            alt="Twitter Badge"
          />
        </a>
        <a href="https://github.com/Aboagye-Dacosta">
          <img
            src="https://img.shields.io/badge/Github-black?style=for-the-badge&logo=github&logoColor=white"
            alt="Twitter Badge"
          />
        </a>
      </Row>
    </LoginLayout>
  );
}

export default Login;
