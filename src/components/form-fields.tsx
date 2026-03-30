import { forwardRef, type InputHTMLAttributes } from "react";

// Form Field Component
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	error?: string;
	placeholder?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
	({ label, id, error, placeholder, type = "text", ...props }, ref) => {
		return (
			<div className="flex flex-col gap-1">
				<label htmlFor={id} className="text-xs font-medium text-gray-500">
					{label}
				</label>
				<input
					ref={ref}
					type={type}
					id={id}
					placeholder={placeholder}
					{...props}
					className="py-2 text-sm border-b border-gray-200 transition-colors duration-200 outline-none focus:border-gray-400"
				/>
				{error && <p className="text-xs text-red-500!">{error}</p>}
			</div>
		);
	},
);

FormField.displayName = "FormField";

export default FormField;
