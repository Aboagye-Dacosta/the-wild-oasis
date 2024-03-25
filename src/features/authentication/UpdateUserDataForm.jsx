import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import FormWithBackground from "../../ui/FormWithBackground";
import Select from "../../ui/Select";
import { capitalize } from "../../utils/helpers";
import { useRoles } from "../routes/useRoles";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

function UpdateUserDataForm({ passedUser }) {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { roles, isLoadingRoles } = useRoles();

  const curUser = passedUser ? passedUser : user;
  const {
    id,
    email,
    user_metadata: { fullName: currentFullName, role: passedRole = "" },
  } = curUser;

  console.log(curUser);
  const {
    id: currentUserId,
    user_metadata: { role },
  } = user;

  const { updateUser, isUpdatingUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [userRole, setUserRole] = useState(passedRole);

  useEffect(() => {
    if (passedUser) {
      const {
        user_metadata: { fullName: newFullName = "", role: newRole = "" },
      } = passedUser;
      setFullName(newFullName);
      setUserRole(newRole);
    }
  }, [passedUser]);

  const reset = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    console.log({ fullName, avatar, role: userRole });

    updateUser({ fullName, avatar, role: userRole });
  }

  return (
    <FormWithBackground onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdatingUser || (id !== currentUserId && role == "admin")}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      {role === "admin" && (
        <FormRow label="User Role">
          <Select
            value={{ value: userRole, label: capitalize(userRole) }}
            options={
              isLoadingRoles
                ? [{ label: "loading...", value: "loading..." }]
                : roles.map((role) => ({
                    label: capitalize(role.role),
                    value: role.role,
                  }))
            }
            onChange={(option) => setUserRole(option.value)}
          />
        </FormRow>
      )}
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          disabled={isUpdatingUser}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdatingUser}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUpdatingUser}>
          Update account
        </Button>
      </FormRow>
    </FormWithBackground>
  );
}

UpdateUserDataForm.propTypes = {
  passedUser: PropTypes.object,
};

export default UpdateUserDataForm;
