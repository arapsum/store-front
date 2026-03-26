"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ShippingFormType, shippingFormSchema } from "@/types/cart";
import FormField from "./form-fields";
import SubmitButton from "./submit-button";

const formFields: Array<{
  label: string;
  id: keyof ShippingFormType;
  placeholder: string;
  type: string;
}> = [
  { label: "Name", id: "name", placeholder: "Nick Wilde", type: "text" },
  {
    label: "Email",
    id: "email",
    placeholder: "nickwilde@example.com",
    type: "text",
  },
  { label: "Phone", id: "phone", placeholder: "0712345678", type: "text" },
  {
    label: "Address",
    id: "address",
    placeholder: "Kenyatta Road",
    type: "text",
  },
  { label: "City", id: "city", placeholder: "Nairobi", type: "text" },
];

interface Props {
  setShippingForm: (data: ShippingFormType) => void;
  navigateTo: () => void;
}

export default function ShippingForm({ setShippingForm, navigateTo }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(shippingFormSchema as any),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<ShippingFormType> = (data) => {
    console.log(data);
    setShippingForm(data);
    navigateTo();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {formFields.map((field) => (
        <FormField
          key={field.id}
          label={field.label}
          type={field.type}
          id={field.id}
          placeholder={field.placeholder}
          {...register(field.id)}
          error={errors[field.id]?.message}
        />
      ))}
      <SubmitButton loading={isSubmitting} disabled={isSubmitting}>
        Continue
      </SubmitButton>
    </form>
  );
}
