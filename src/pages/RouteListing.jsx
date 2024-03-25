import styled from "styled-components";
import RoutesDetails from "../features/routes/RoutesDetails";

const StyledRouteListing = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5rem 1fr;
  gap: 3rem;
`;

function RouteListing() {
  return (
    <StyledRouteListing>
      <RoutesDetails />
    </StyledRouteListing>
  );
}

export default RouteListing;
