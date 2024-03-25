import PropTypes from "prop-types";
import SelectComponent from "react-select";
import { useDarkMode } from "../context/DarkModeContext";

function Select({ styles, ...props }) {
  const { isDarkMode } = useDarkMode();
  return (
    <SelectComponent
      {...props}
      styles={{
        ...styles,
        control: (props) => ({
          ...props,
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
          border: "none",
          boxShadow: "var(--shadow-md)",
        }),
        menu: (props) => ({
          ...props,
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
          border: "none",
        }),
        option: (styles, { isSelected }) => ({
          ...styles,
          backgroundColor: isSelected
            ? "var(--color-brand-700)"
            : "var(--color-grey-0)",
          color:
            isSelected && isDarkMode
              ? "var(--color-grey-700)"
              : isSelected && !isDarkMode
              ? "var(--color-grey-0)"
              : "var(--color-grey-700)",
          // border: "none",
          ":hover": {
            backgroundColor: "var(--color-brand-700)",
            color: "#fff",
          },
        }),
        singleValue: (styles) => ({
          ...styles,
          color: "var(--color-grey-700)",
          fontSize: "inherit",
        }),
      }}
    />
  );
}

Select.propTypes = {
  styles: PropTypes.object,
};

export default Select;
