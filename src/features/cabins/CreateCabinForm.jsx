import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { createCabin, updateCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinForEdit = {} }) {
  const { id: editId, ...editDefault } = cabinForEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editDefault : {} });

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: isEditSession ? updateCabin : createCabin,
    onMutate: () => {
      queryClient.cancelQueries({
        queryKey: ["cabins"],
      });

      const newData = {
        id: uuidv4(),
        ...getValues(),
      };

      const previousQueryData = queryClient.getQueriesData({
        queryKey: ["cabins"],
      });

      queryClient.setQueriesData(["cabins"], [...previousQueryData, newData]);
      return { id: newData.id };
    },
    onSuccess: (data) => {
      toast.success(
        `Successfully ${isEditSession ? "updated" : "created"} cabin ${
          data[0].name
        }`,
        {
          id: "createCabin",
        }
      );
      reset();
    },
    onError: (error, _, context) => {
      toast.error(error.message + " " + getValues().name, {
        id: "createCabin",
      });
      const currentQueryData = queryClient.getQueriesData({
        queryKey: ["cabins"],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["cabins"],
        },
        currentQueryData.filter((data) => data.id !== context.id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  const onSubmitForm = (cabin) => {
    mutate(
      isEditSession
        ? { ...cabin, id: editId, image: cabinForEdit.image }
        : { ...cabin, image: cabin.image[0] }
    );
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating && <span className="loader"></span>}
          {isEditSession ? "Update cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
CreateCabinForm.propTypes = {
  cabinForEdit: PropTypes.object,
};
export default CreateCabinForm;
