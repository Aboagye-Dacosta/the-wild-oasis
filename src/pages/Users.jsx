import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

import styled from "styled-components";

const StyledSignupUpForm = styled(SignupForm)`
  background-color: var(--color-grey-0);
`;

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <StyledSignupUpForm />
    </>
  );
}

export default NewUsers;
