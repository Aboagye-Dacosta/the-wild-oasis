import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UsersList from "../features/authentication/UsersList";
import { useUsers } from "../features/authentication/useUsers";
import ButtonText from "../ui/ButtonText";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

const StyledSignUpForm = styled(SignupForm)`
  background-color: var(--color-grey-0);
`;

const StyledUsers = styled.div`
  display: grid;
  grid-template-columns: 1fr 35rem;
  gap: 3rem;
`;
const StyledRow = styled(Row)`
  background-color: var(--color-grey-0);
  padding: 2rem 1rem;
`;

function Users() {
  const [userId, setUserId] = useState("");
  const [toggleUpdateUser, setToggleUpdateUser] = useState(false);

  const { users, isLoadingUsers } = useUsers();
  const { user, isLoadingUser } = useAuth();

  if (isLoadingUsers || isLoadingUser) return <Spinner />;

  const handleSetUserId = (userId) => {
    setUserId(userId);
    setToggleUpdateUser(true);
    console.log(userId);
  };

  return (
    <StyledUsers>
      <Row>
        <Row type="horizontal">
          <Heading as="h1">Create a new user</Heading>
          {toggleUpdateUser && (
            <ButtonText onClick={() => setToggleUpdateUser(false)}>
              &larr; Back
            </ButtonText>
          )}
        </Row>
        {!toggleUpdateUser ? (
          <StyledSignUpForm />
        ) : (
          <React.Fragment>
            <UpdateUserDataForm
              passedUser={users.find((user) => user.id == userId)}
            />
            {/* <ButtonText onClick={() => setToggleUpdateUser(false)}>
              update password
            </ButtonText> */}
          </React.Fragment>
        )}
      </Row>
      <div>
        <StyledRow>
          <Heading as="h3">All users</Heading>
          <UsersList
            users={users}
            setUserId={handleSetUserId}
            currentUser={user}
          />
        </StyledRow>
      </div>
    </StyledUsers>
  );
}

export default Users;
