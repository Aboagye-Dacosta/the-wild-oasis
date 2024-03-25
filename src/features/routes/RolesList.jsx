import styled from "styled-components"

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { useRoles } from "./useRoles";
import { capitalize } from "../../utils/helpers";


const List = styled.ul`
  & li {
    padding: 1rem 0;
  }
  & li:not(li:last-of-type) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & span {
    font-size: 1rem;
  }
`;

function RolesList() {
  const { roles, isLoadingRoles } = useRoles();
  if (isLoadingRoles) return <Spinner />;
  return (
    <List>
      {roles.map((role) => (
        <li key={role.id}>
          <Row type="horizontal">
            <Heading as="h6">{capitalize(role.role)}</Heading>
            <Button size="small" variation="danger">
              Delete
            </Button>
          </Row>
        </li>
      ))}
    </List>
  );
}

export default RolesList;
