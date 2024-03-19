import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCheckOutAndIn = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCheckOutAndIn({
  resourceName,
  onConfirm,
  disabled,
  closeModal,
  message,
}) {
  return (
    <StyledConfirmCheckOutAndIn>
      <Heading as="h3">Confirm {resourceName}</Heading>
      <p>{message} permanently? This action cannot be undone.</p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={closeModal}>
          Cancel
        </Button>
        <Button variation="primary" disabled={disabled} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </StyledConfirmCheckOutAndIn>
  );
}

export default ConfirmCheckOutAndIn;
