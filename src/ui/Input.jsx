import styled from "styled-components";

const Input = styled.input.attrs((type, ...rest) => ({
  ...rest,
  type: type || "text",
}))`
  width: 20rem;
  padding: 0.7rem 1rem;
  border: none;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-sm);
`;


export default Input;
