import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import ButtonText from "./ButtonText";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonText onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonText>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
