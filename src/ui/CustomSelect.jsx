import PropTypes from "prop-types";
import Select, { components } from "react-select";

function CustomSelect({ render, options, style }) {
  return (
    <Select
      name="nationality"
      menuPlacement="top"
      styles={{
        control: ({ ...prop }) => ({
          ...prop,
          ...style,
        }),
      }}
      components={{
        // Control: ({ children, ...props }) => {
        //   const { getValue } = props;
        //   const option = getValue();

        //   return (
        //     <components.Control {...props}>
        //       {render(option.at(0), children)}
        //     </components.Control>
        //   );
        // },
        Option: ({ ...props }) => {
          const { value, label } = props;

          return (
            <components.Option {...props}>
              {render({ value, label })}
            </components.Option>
          );
        },
      }}
      options={options}
    />
  );
}

CustomSelect.propTypes = {
  options: PropTypes.array,
  render: PropTypes.func,
  style: PropTypes.object,
};

export default CustomSelect;
