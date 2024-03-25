import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import RolesDetails from "./RolesDetails";
import RoutesList from "./RoutesList";

const StyledRow = styled(Row)`
  background-color: var(--color-grey-0);
  padding: 2rem 3rem;
`;

const StyledHeading = styled.div`
  grid-column: 1/-1;
`;

function RoutesDetails() {
  return (
    <>
      <StyledHeading>
        <Heading>All App Routes</Heading>
      </StyledHeading>
      <StyledRow>
        <Heading as="h3">Routes</Heading>
        <RoutesList />
      </StyledRow>
      <div>
        <StyledRow>
          <Heading as="h3">Roles</Heading>
          <RolesDetails />
        </StyledRow>
      </div>
    </>
  );
}

export default RoutesDetails;
