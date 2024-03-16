import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { id: editId, ...editDefault } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editDefault : {} });

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, editCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const onSubmitForm = (cabin) => {
    const image = typeof cabin.image == "string" ? cabin.image : cabin.image[0];
    if (isEditSession) {
      editCabin(
        {
          newCabin: { ...cabin, image },
          id: editId,
          image: editDefault.image,
        },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    } else
      createCabin(
        { newCabin: { ...cabin, image } },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm, onError)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: {
              value: true,
              message: "Cabin name is required",
            },
            maxLength: {
              value: 3,
              message: "Cabin name must be 3 letters",
            },
            minLength: {
              value: 3,
              message: "Cabin name must be 3 letters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: {
              value: true,
              message: "Cabin capacity is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: {
              value: true,
              message: "Cabin regular price is required",
            },
            min: {
              value: 1,
              message: "Cabin price cannot be 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            validate: (value) =>
              Number(value) < getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: {
              value: true,
              message: "Cabin description is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: {
              value: !isEditSession,
              message: "Cabin image is required",
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isWorking && <span className="loader"></span>}
          {isEditSession ? "Update cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  closeModal: PropTypes.func,
};
export default CreateCabinForm;
