import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
      return;
    }
    createCabin({ ...data, image: image }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  const onError = (errors) => toast.error(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", {
          required: "Cabin name is required",
          min: {
            value: 1,
            message: "Cabin name must be at least 1 characters",
          },
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", {
          required: "Capacity is required",
          min: {
            value: 1,
            message: "Capacity must be at least 1",
          },
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required: "Regular price is required",
          min: { value: 1, message: "Price must be at least 1" },
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", {
          required: "Discount is required",
          validate: (value) => {
            const discount = Number(value);
            const regularPrice = Number(getValues().regularPrice);

            if (discount < 0 || discount >= regularPrice) {
              return "Discount should be less than the regular price";
            }
          },
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking} {...register("description", {
          required: "Description is required",
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image", {
          required: isEditSession ? false : "Image is required",
        })} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form >
  );
}

export default CreateCabinForm;
