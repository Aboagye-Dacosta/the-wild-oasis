import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const icons = {
  dashboard: <HiOutlineHome />,
  bookings: <HiOutlineCalendarDays />,
  cabins: <HiOutlineHomeModern />,
  guests: <HiOutlineHomeModern />,
  users: <HiOutlineUsers />,
  settings: <HiOutlineCog6Tooth />,
};

function MainNav() {
  const { role, routes, isLoadingRoutes, isLoadingUser } = useAuth();

  if (isLoadingRoutes || isLoadingUser) return <Spinner />;

  const displayRoutes = routes
    .filter((route) => route.roles.includes(role))
    .map((route) => (
      <li key={route.id}>
        <StyledNavLink to={`/${route.route}`}>
          {icons[route.route]}
          <span>{route.route}</span>
        </StyledNavLink>
      </li>
    ));

  console.log(displayRoutes);

  return (
    <nav>
      <NavList>
    
        {displayRoutes}
      </NavList>
    </nav>
  );
}

export default MainNav;
