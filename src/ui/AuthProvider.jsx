import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  width: 100dvw;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { isLoadingUser, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigate("/login");
  }, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
