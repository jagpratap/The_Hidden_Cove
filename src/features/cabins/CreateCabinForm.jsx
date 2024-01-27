import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

function CreateCabinForm() {
  const { isCreating, handleCreateCabin } = useCreateCabin();

  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    handleCreateCabin(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Cabin name */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Maximum capacity */}
      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      {/* Regular price */}
      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isCreating}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      {/* Discount */}
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const regularPrice = getValues().regular_price;
              if (value && regularPrice) {
                return (
                  Number(value) < Number(regularPrice) ||
                  "Discount should be less than regular price"
                );
              }
            },
          })}
        />
      </FormRow>

      {/* Description */}
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
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Cabin photo */}
      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
