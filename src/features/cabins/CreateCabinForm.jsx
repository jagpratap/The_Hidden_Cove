import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(cabinToEdit?.id);

  const { isCreatingCabin, handleCreateCabin } = useCreateCabin();
  const { isEditingCabin, handleEditCabin } = useEditCabin();

  const isWorking = isEditSession ? isEditingCabin : isCreatingCabin;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      handleEditCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      handleCreateCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Cabin name */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* Cabin photo */}
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
