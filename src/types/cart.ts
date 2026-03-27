import { type AnyCartProduct } from "./product";
import { z } from "zod";

export type CartItem = AnyCartProduct & {
  quantity: number;
};

export type CartItems = CartItem[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone requires 7 characters.")
    .max(10, "Phone must be under 10 characters")
    .regex(/^\d+$/, "Phone must only be numbers"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export type ShippingFormType = z.infer<typeof shippingFormSchema>;

export type CartStoreState = {
  cart: CartItems;
  hasHydrated: boolean;
};

export type CartStoreActions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
};

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z.string().min(16, "Card Number is required!").max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format!"),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInput = z.infer<typeof paymentFormSchema>;
