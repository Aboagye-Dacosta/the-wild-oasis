import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import Select from "../../ui/Select";
import { capitalize } from "../../utils/helpers";
import { useRoles } from "../routes/useRoles";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

const StyledForm = styled(Form)`
  background-color: var(--color-grey-0);
  padding: 2rem 3rem;
`;

function SignupForm() {
  const { isSigningUp, signup } = useSignup();
  const { roles, isLoadingRoles } = useRoles();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signup({ ...data, role: data.role.value });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: {
              value: true,
              message: "Full name is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
      </FormRow>
      <FormRow label="User role" error={errors?.role?.message}>
        <ControlledSelect
          control={control}
          message="user role is required"
          name="role"
        >
          <Select
            options={
              isLoadingRoles
                ? [{ label: "loading...", value: "loading..." }]
                : roles.map((role) => ({
                    value: role.role,
                    label: capitalize(role.role),
                  }))
            }
          />
        </ControlledSelect>
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "Password Confirm is required",
            },
            validate: (value) => {
              return (
                getValues()?.password === value ||
                "password and password confirm must be the same"
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isSigningUp}>
          Create new user
        </Button>
      </FormRow>
    </StyledForm>
  );
}

export default SignupForm;
