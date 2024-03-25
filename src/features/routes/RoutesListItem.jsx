import PropTypes from "prop-types";
import styled from "styled-components";

import React, { useState } from "react";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import { capitalize } from "../../utils/helpers";
import UpdateRoles from "./UpdateRoles";

const StyledTags = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 0.5rem;
  gap: 1rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
`;

function RoutesListItem({
  route: { id = "", route = "", roles = [] },
  roles: allRoles,
}) {
  const [edit, setEdit] = useState(false);
  console.log(allRoles, "from list item");
  return (
    <li key={id}>
      <Row type="horizontal">
        <Heading as="h6">{capitalize(route)}</Heading>
        <Button size="small" onClick={() => setEdit((state) => !state)}>
          {!edit ? "Edit" : "close"}
        </Button>
      </Row>
      <StyledTags>
        <span>Authorized users:</span>
        {roles.map((role) => (
          <React.Fragment key={role}>
            {role === "admin" && (
              <Tag type="green" key={role}>
                {role}
              </Tag>
            )}
            {role === "user" && (
              <Tag type="blue" key={role}>
                {role}
              </Tag>
            )}
            {role === "guest" && (
              <Tag type="yellow" key={role}>
                {role}
              </Tag>
            )}
          </React.Fragment>
        ))}
      </StyledTags>
      {edit && (
        <UpdateRoles
          route={{ id, route, roles }}
          roles={allRoles}
          close={() => setEdit(false)}
        />
      )}
    </li>
  );
}

RoutesListItem.propTypes = {
  roles: PropTypes.array,
  route: PropTypes.object
}

export default RoutesListItem;
