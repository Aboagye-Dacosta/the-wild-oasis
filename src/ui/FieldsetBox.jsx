import PropTypes from "prop-types";
import styled from "styled-components";

const StyledFieldset = styled.div`
  background-color: var(--color-grey-50);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2.2rem;
  position: relative;
  margin-top: 2rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;

    width: 0.5rem;
    background-color: var(--color-brand-500);
  }
`;

const FieldsetTitle = styled.div`
  position: absolute;
  top: -5%;
  left: 0;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  font-weight: bold;
  text-transform: uppercase;
`;

function FieldsetBox({ children, title }) {
  return (
    <StyledFieldset>
      {title && <FieldsetTitle>{title}</FieldsetTitle>}
      {children}
    </StyledFieldset>
  );
}

FieldsetBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
};

export default FieldsetBox;
