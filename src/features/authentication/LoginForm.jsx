import { useState } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerSm from "../../ui/SpinnerSm";
import { useAuthLogin } from "./useAuthLogin";

const StyledForm = styled(Form)`
  background-color: var(--color-grey-0);
  width: 40rem;
  padding: 3rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 auto;
`;

function LoginForm() {
  const { isLoggingInUser, login } = useAuthLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit (e)
  {
    e.preventDefault()
    if (!email || !password)
      return toast.error("email and password are required");
    login({ email, password });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          disabled={isLoggingInUser}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled={isLoggingInUser}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="medium" disabled={isLoggingInUser} onClick={handleSubmit}>
          {isLoggingInUser ? (
            <>
              <SpinnerSm />
              Logging in
            </>
          ) : (
            "Login"
          )}
        </Button>
      </FormRowVertical>
    </StyledForm>
  );
}

export default LoginForm;
