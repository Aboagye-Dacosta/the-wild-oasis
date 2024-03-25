import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import RoutesListItem from "./RoutesListItem";
import { useRoles } from "./useRoles";
import { useRoutes } from "./useRoutes";

const List = styled.ul`
  & li {
    padding: 0.5rem 0;
  }
  & li:not(li:last-of-type) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  & span {
    font-size: 1rem;
  }
`;

function RoutesList() {
  const { isLoadingRoutes, routes } = useRoutes();
    const { isLoadingRoles, roles } = useRoles();
    
    if (isLoadingRoutes || isLoadingRoles) return <Spinner />;
 
  return (
    <List>
      {routes.map((route) => (
        <RoutesListItem key={route.id} route={route} roles={roles} />
      ))}
    </List>
  );
}

export default RoutesList;
