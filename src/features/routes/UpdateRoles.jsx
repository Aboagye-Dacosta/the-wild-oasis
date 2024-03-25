import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styled, { css } from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Select from "../../ui/Select";
import { capitalize } from "../../utils/helpers";

const colors = {
  admin: "green",
  user: "blue",
  guest: "yellow",
  other: "orange",
};

const styles = {
  multiValue: (base, state) => {
    return {
      ...base,
      backgroundColor: `var(--color-${state.data.color}-100)`,
      borderRadius: "var(--border-radius-lg)",
    };
  },

  multiValueLabel: (base, state) => {
    return {
      ...base,
      color: `var(--color-${state.data.color}-700)`,
      paddingRight: 6,
    };
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const Custom = forwardRef(
  ({ roles = [], allRows = [], setNewOptionValue }, ref) => {
    const options = roles.map((role) => ({
      label: capitalize(role),
      value: role,
      isFixed: ["admin"].includes(role),
      color: colors[role],
    }));

    const allOptions = allRows.map((role) => ({
      label: capitalize(role.role),
      value: role.role,
      isFixed: roles.includes(role.role) && role.role == "admin",
      color: colors[role.role],
    }));

    const [value, setValue] = useState(orderOptions(options));

    const onChange = (newValue, actionMeta) => {
      switch (actionMeta.action) {
        case "remove-value":
        case "pop-value":
          if (actionMeta.removedValue.isFixed) {
            return;
          }
          break;
        case "clear":
          newValue = allOptions.filter((v) => v.isFixed);
          break;
      }

      setValue(orderOptions(newValue));
      setNewOptionValue(newValue);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValue(orderOptions(options));
      },
    }));

    return (
      <Select
        value={value}
        isMulti
        styles={styles}
        isClearable={value.some((v) => !v.isFixed)}
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
        options={allOptions}
      />
    );
  }
);

Custom.displayName = "Custom";

Custom.propTypes = {
  allRows: PropTypes.array,
  roles: PropTypes.array,
  setNewOptionValue: PropTypes.func,
};

const Holder = styled.div`
  flex: 1;
`;

const StyledRow = styled(Row)`
  &.main {
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    padding: 0.5rem 2rem;
  }
  ${(props) =>
    props.type === "horizontal"
      ? css`
          gap: 3rem;
          flex-wrap: wrap;
        `
      : css`
          gap: 0.7rem;
        `}
  padding: 1rem 0;
`;
function UpdateRoles({ route, roles, close }) {
  const [value, setValue] = useState(route.roles);
  const ref = useRef();

  const handleSetValues = (values) => {
    setValue(values.map((value) => value.value))
  };
    
   const handleSave =()=>{
    console.log(value)
   }


  return (
    <StyledRow className="main">
      <Heading as="h6">Update authorized roles</Heading>
      <StyledRow type="horizontal">
        <Holder>
          <Custom
            allRows={roles}
            roles={route.roles}
            setNewOptionValue={(values) => handleSetValues(values)}
            ref={ref}
          />
        </Holder>
        <ButtonGroup>
          <Button
            size="small"
            variation="secondary"
            onClick={() => {
              ref?.current?.reset?.();
              setTimeout(() => {
                close();
              }, 1000);
            }}
          >
            cancel
          </Button>
          <Button size="small" onClick={handleSave}>
            save
          </Button>
        </ButtonGroup>
      </StyledRow>
    </StyledRow>
  );
}

UpdateRoles.propTypes = {
  close: PropTypes.func,
  roles: PropTypes.array,
  route: PropTypes.shape({
    roles: PropTypes.any
  })
}

export default UpdateRoles;
