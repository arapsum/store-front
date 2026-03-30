import { ArrowRightIcon } from "lucide-react";
import React, { type ReactNode } from "react";

interface SubmitButtonProps {
	children: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	showIcon?: boolean;
	icon?: ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
	children,
	loading = false,
	disabled = false,
	className = "",
	showIcon = true,
	icon: Icon = (
		<ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1 size-4 group-disabled:translate-x-0" />
	),
}) => {
	return (
		<button
			type="submit"
			disabled={disabled || loading}
			className={`group flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 text-white p-2 rounded-sm cursor-pointer ${className}`}
		>
			<span>{loading ? "Loading..." : children}</span>
			{showIcon && !loading && Icon}
		</button>
	);
};

export default SubmitButton;
