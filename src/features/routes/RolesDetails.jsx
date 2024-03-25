import { useState } from "react";
import Button from "../../ui/Button";
import CreateRole from "./CreateRole";
import RolesList from "./RolesList";

function RolesDetails() {
  const [createRole, setCreateRole] = useState(false);
  return (
    <>
      <RolesList />
      <Button onClick={() => setCreateRole((state) => !state)}>
        {createRole ? "Close" : "Add new role"}
      </Button>
      {createRole && <CreateRole close={() => setCreateRole(false)} />}
    </>
  );
}

export default RolesDetails;
