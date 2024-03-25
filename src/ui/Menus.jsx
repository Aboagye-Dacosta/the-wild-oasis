/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineMoreVert } from "react-icons/md";
import styled from "styled-components";
import { useCloseClickOutside } from "../hooks/useCloseClickOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;
                    
  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// menu context for menu
const MenusContext = createContext();
function Menus({ children }) {
  const [menuId, setMenuId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [element, setElement] = useState(null);

  const closeMenu = () => setMenuId("");
  const openMenu = setMenuId;
  const setMenuPosition = (position) => setPosition(position);
  const open = setIsOpen;

  return (
    <MenusContext.Provider
      value={{
        isOpen,
        menuId,
        position,
        element,
        closeMenu,
        openMenu,
        setMenuPosition,
        open,
        setElement,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function ToggleButton({ id }) {
  const { menuId, openMenu, closeMenu, setMenuPosition, setElement } =
    useContext(MenusContext);

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const position = {
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    };

    setMenuPosition(position);
    setElement(e);
    menuId === "" || id !== menuId ? openMenu(id) : closeMenu();
  };

  return (
    <StyledToggle onClick={handleToggleMenu}>
      <MdOutlineMoreVert />
    </StyledToggle>
  );
}

function List({ children, id }) {
  let { position, menuId, closeMenu } =
    useContext(MenusContext);
  const ref = useCloseClickOutside(closeMenu, false);

  // useEffect(() => {
  //   const screenPosition = element?.target?.getBoundingClientRect();
  //   const positionRelativeToDocument =
  //     screenPosition?.top + document.documentElement.scrollTop + 40;
  //   setMenuPosition((state) => ({ ...state, y: positionRelativeToDocument }));
  // }, [element, setMenuPosition]);

  if (id !== menuId) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { closeMenu } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    closeMenu();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.ToggleButton = ToggleButton;
Menus.Button = Button;
Menus.List = List;
Menus.Menu = Menu;

export default Menus;
