import styled, { css } from "styled-components";

const Space = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.space?.concat("rem") || css`0.25rem`};
  margin-left: ${(props) => props.space?.concat("rem") || css`0.25rem`};
`;

export default Space;
