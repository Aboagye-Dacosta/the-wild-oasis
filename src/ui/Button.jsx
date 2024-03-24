import PropTypes from "prop-types"
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button.attrs(({ size, variation, tooltip }) => ({
  size: size || "medium",
  variation: variation || "primary",
  tooltip: tooltip || null,
}))`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  /* white-space: nowrap; */

  ${(props) => {
    switch (props.size) {
      case "small":
        return sizes.small;
      case "medium":
        return sizes.medium;
      case "large":
        return sizes.large;
    }
  }}

  ${(props) => {
    switch (props.variation) {
      case "primary":
        return variations.primary;
      case "secondary":
        return variations.secondary;
      case "danger":
        return variations.danger;
    }
  }}
`;

const StyledTooltip = styled.span.attrs(({ tooltip }) => ({
  tooltip: tooltip || null,
}))`
  position: absolute;
  top: 130%;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  height: 3rem;
  padding: 0.5rem;
  background-color: var(--color-grey-0);
  display: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
  color: var(--color-grey-400);
  text-transform: lowercase;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 10px;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
    background-color: var(--color-grey-0);
    border-bottom: none;
  }

  ${(props) =>
    props.tooltip
      ? css`
          .btn:hover & {
            display: flex;
          }
        `
      : null}
`;

function Tooltip({ tooltip }) {
  return <StyledTooltip tooltip={tooltip}>{tooltip}</StyledTooltip>;
}

Tooltip.propTypes = {
  tooltip: PropTypes.any
}

function Button({
  children,
  tooltip,
  ...props
}) {
  return (
    <StyledButton {...props}>
      <Tooltip tooltip={tooltip} />
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  tooltip: PropTypes.any
}

export default Button;
