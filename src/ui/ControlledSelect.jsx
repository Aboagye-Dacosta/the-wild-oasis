import PropTypes from "prop-types";
import { cloneElement } from "react";
import { Controller } from "react-hook-form";

const ControlledSelect = ({ children, control, message, name, onChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => cloneElement(children, { ...field })}
      rules={{
        required: {
          value: true,
          message,
        },
        onChange,
      }}
    />
  );
};

ControlledSelect.propTypes = {
  children: PropTypes.any,
  control: PropTypes.any,
  message: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
};
export default ControlledSelect;
