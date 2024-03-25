import PropTypes from "prop-types"
import styled from "styled-components"

const StyledAvatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function Avatar({ avatar, alt }) {
  return (
    <StyledAvatar src={avatar || "./default-user.jpg"} alt={alt} />
  );
}

Avatar.propTypes = {
  alt: PropTypes.string,
  avatar: PropTypes.string
}

export default Avatar;
