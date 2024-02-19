import styled, { css } from "styled-components";

const Row = styled.div.attrs(({ type }) => ({
  type: type || "vertical",
}))`
  display: flex;

  ${(props) => {
    switch (props.type) {
      case "horizontal":
        return css`
          align-items: center;
          justify-content: space-between;
        `;
      case "vertical":
        return css`
          flex-direction: column;
          gap: 1.6rem;
        `;
    }
  }}
`;

export default Row;
