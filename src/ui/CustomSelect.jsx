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
        //   console.log(children);
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

export default CustomSelect;
