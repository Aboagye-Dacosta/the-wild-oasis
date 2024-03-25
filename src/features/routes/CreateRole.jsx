import PropTypes from "prop-types"
import styled from "styled-components";

import { useState } from "react";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Row from "../../ui/Row";

const StyledRow = styled(Row)`
  padding: 0 1rem;
  box-shadow: var(--shadow-md);
`;

function CreateRole({ close }) {
  const [value, setValue] = useState("");
  return (
    <StyledRow>
      <FormRow label="Create role" id="role">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={"role"}
        />
      </FormRow>
      <ButtonGroup>
        <Button
          variation="secondary"
          onClick={() => {
            setValue("");
              setTimeout(() =>
              {
                close()
            },500)
          }}
        >
          cancel
        </Button>
        <Button>save</Button>
      </ButtonGroup>
    </StyledRow>
  );
}

CreateRole.propTypes = {
  close: PropTypes.func
}

export default CreateRole;
