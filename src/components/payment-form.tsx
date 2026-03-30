import { paymentFormSchema, type PaymentFormInput } from "#/types/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormField from "./form-fields";
import SubmitButton from "./submit-button";
import { ShoppingCartIcon } from "lucide-react";

const formFields: Array<{
	label: string;
	type: HTMLInputElement["type"];
	id: keyof PaymentFormInput;
	placeholder?: string;
}> = [
	{
		label: "Name on Card",
		type: "text",
		id: "cardHolder",
		placeholder: "Enter your name on the card",
	},
	{
		label: "Card Number",
		type: "text",
		id: "cardNumber",
		placeholder: "Enter your card number",
	},
	{
		label: "Expiration Date",
		type: "text",
		id: "expirationDate",
		placeholder: "MM/YY",
	},
	{
		label: "CVV",
		type: "text",
		id: "cvv",
		placeholder: "Enter your CVV",
	},
];

const images: { link: string; alt: string }[] = [
	{ link: "/klarna.png", alt: "Klarna" },
	{ link: "/cards.png", alt: "Cards" },
	{ link: "/stripe.png", alt: "Stripe" },
];

export default function PaymentForm() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<PaymentFormInput>({
		resolver: zodResolver(paymentFormSchema),
	});

	const onSubmit: SubmitHandler<PaymentFormInput> = (data) => {
		console.table(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			{formFields.map((field) => (
				<FormField
					key={field.id}
					{...field}
					{...register(field.id)}
					error={errors[field.id]?.message}
				/>
			))}

			<section className="flex items-center gap-2 mt-4">
				{images.map((image) => (
					<img
						key={image.link}
						src={image.link}
						alt={image.alt}
						width={"50"}
						height={"25"}
						className="rounded-sm"
					/>
				))}
			</section>

			<SubmitButton
				loading={isSubmitting}
				disabled={isSubmitting}
				icon={<ShoppingCartIcon className="size-4" />}
			>
				Checkout
			</SubmitButton>
		</form>
	);
}
