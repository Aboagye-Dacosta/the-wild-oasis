import styled from "styled-components";

import { Error } from "./FormRow";

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;

  & input,
  button {
    width: 100%;
  }

  & input {
    border: 1px solid var(--color-grey-100);
  }
`;

function FormRowVertical({ children, error, label }) {
  return (
    <StyledRow>
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledRow>
  );
}

export default FormRowVertical;
