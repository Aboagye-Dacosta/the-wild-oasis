import PropTypes from "prop-types";
import styled from "styled-components";

import Avatar from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";

const StyledUserList = styled.ul`
  overflow: auto;
`;

const ListItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 0.7rem;
  height: max-content;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const ListItemDescription = styled.p`
  display: flex;
  flex-direction: column;
`;
const Divider = styled.div`
  background-color: var(--color-grey-200);
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 0.3rem;
  width: 100%;
`;
function UsersList({ users = [], currentUser = {}, setUserId }) {
  const id = currentUser.id;
  const { avatar, fullName, role } = currentUser.user_metadata;

  return (
    <StyledUserList>
      <li>
        <ListItem>
          <div>
            <Avatar avatar={avatar} alt={`avatar for ${fullName}`} />
          </div>

          <ListItemDescription>
            <Heading as="h6">{fullName}</Heading>
            {role == "user" && <Tag type="blue">{role}</Tag>}
            {role == "admin" && <Tag type="green">{role}</Tag>}
            {role == "guest" && <Tag type="yellow">{role}</Tag>}
          </ListItemDescription>
        </ListItem>
      </li>
      <li>
        <Divider />
      </li>
      {users
        .filter((user) => user.id !== id)
        .map((user) => {
          const { avatar, fullName, role, email } = user.user_metadata;
          return (
            <li key={email}>
              <ListItem onClick={() => setUserId(user.id)}>
                <div>
                  <Avatar avatar={avatar} alt={`avatar for ${fullName}`} />
                </div>
                <ListItemDescription>
                  <Heading as="h6">{fullName}</Heading>
                  {role == "user" && <Tag type="blue">{role}</Tag>}
                  {role == "admin" && <Tag type="green">{role}</Tag>}
                  {role == "guest" && <Tag type="yellow">{role}</Tag>}
                </ListItemDescription>
              </ListItem>
            </li>
          );
        })}
    </StyledUserList>
  );
}

UsersList.propTypes = {
  currentUser: PropTypes.object,
  setUserId: PropTypes.func,
  users: PropTypes.array,
};

export default UsersList;
