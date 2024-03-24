import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";

const StyledNotAuthorized = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function NotAuthorized() {
  const moveBack = useMoveBack();

  return (
    <StyledNotAuthorized>
      <Box>
        <Heading as="h1">
          You don&apos;t have permission to access the page you are looking for 😢.
          Contact your administrator for permissions
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </Box>
    </StyledNotAuthorized>
  );
}

export default NotAuthorized;
