import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

const StyledForm = styled(Form)`
  background-color: var(--color-grey-0);
  padding: 2rem 3rem;
`;

function SignupForm() {
  const { isSigningUp, signup } = useSignup();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    signup(data);
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
              console.log(value);
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
