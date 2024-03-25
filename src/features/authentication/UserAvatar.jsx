import styled from "styled-components";
import { useUser } from "./useUser";
import Avatar from "../../ui/Avatar";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;


function UserAvatar() {
  const { user } = useUser();
  const { avatar, fullName } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        avatar={avatar}
        alt={`avatar for ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
