import PropTypes from "prop-types";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useRoutes } from "../features/routes/useRoutes";
import { useUser } from "../features/authentication/useUser";

import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  width: 100dvw;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

const AuthContext = createContext();

function useAuthContext() {
  const { isLoadingUser, user, isAuthenticated } = useUser();
  const { isLoadingRoutes, routes } = useRoutes();
  const role = user?.user_metadata?.role;

  console.log(routes);
  return {
    isLoadingUser,
    role,
    isAuthenticated,
    isLoadingRoutes,
    routes,
    user,
  };
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === "null")
    throw new Error("You are using auth outside of auth provider");
  return context;
}

function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={useAuthContext()}>
      {children}
    </AuthContext.Provider>
  );
}

function AuthenticationProvider({ children }) {
  const navigate = useNavigate();
  const { isLoadingUser, isAuthenticated, isLoadingRoutes } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigate("/login");
  }, [isAuthenticated, isLoadingRoutes, isLoadingUser, navigate]);

  if (isLoadingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

function ProtectedRoute({ element: Element, route = "guest" }) {
  const navigate = useNavigate();
  const { isAuthenticated, role, routes, isLoadingRoutes, isLoadingUser } =
    useAuth();

  if (!isAuthenticated && !isLoadingUser) navigate("/login");

  useEffect(() => {
    if (
      !isLoadingRoutes &&
      routes &&
      !routes.find((item) => item.route === route)["roles"].includes(role)
    )
      return navigate("/not-authorized");
  }, [isLoadingRoutes, navigate, route, routes, role]);

  if (
    routes &&
    routes.find((item) => item.route === route)["roles"].includes(role)
  )
    return <Element />;
}

ProtectedRoute.propTypes = {
  accessibleRoles: PropTypes.array,
  element: PropTypes.any,
  path: PropTypes.string,
  route: PropTypes.string,
};

AuthenticationProvider.propTypes = {
  children: PropTypes.array,
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export { AuthenticationProvider, AuthProvider, ProtectedRoute, useAuth };
