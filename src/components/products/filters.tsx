import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";
import { BsSliders } from "react-icons/bs";
import { filterItems } from "#/data/filterOptions";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

function FilterCheckbox({
	label,
	count,
	checked,
	onChange,
}: {
	label: string;
	count: number;
	checked?: boolean;
	onChange: (checked: boolean) => void;
}) {
	return (
		<FieldGroup>
			<Field className="flex gap-2" orientation="horizontal">
				<Checkbox
					checked={checked}
					onCheckedChange={(value) => onChange?.(value === true)}
				/>
				<FieldLabel className="flex leading-6">
					<span className="text-sm font-medium text-black capitalize">
						{label}
					</span>
					<span className="text-xs text-[#929292]">{count}</span>
				</FieldLabel>
			</Field>
		</FieldGroup>
	);
}

function RadioBox({
	label,
	value,
	checked,
	onChange,
}: {
	label: string;
	value: string;
	checked: boolean;
	onChange: (val: string) => void;
}) {
	return (
		<FieldGroup>
			<Field className="flex gap-2" orientation="horizontal">
				<Checkbox
					checked={checked}
					onCheckedChange={() => {
						onChange(value);
					}}
				/>
				<FieldLabel className="flex leading-6">
					<span className="text-sm font-medium text-black capitalize">
						{label}
					</span>
				</FieldLabel>
			</Field>
		</FieldGroup>
	);
}
export function PriceFilter({ from, to }: { from: number; to: number }) {
	return (
		<AccordionItem value="price" className="space-y-6">
			<AccordionTrigger>Price</AccordionTrigger>
			<AccordionContent className="flex flex-col space-y-6">
				{/* From-To */}
				<div className="flex flex-col space-y-2">
					<div className="flex justify-between items-center">
						<p className="text-sm font-normal leading-6 tracking-[-0.005em] text-[#A7A7A7]">
							From
						</p>

						<p className="text-sm font-normal leading-6 tracking-[-0.005em] text-[#A7A7A7]">
							To
						</p>
					</div>
					<div className="flex justify-between items-center">
						<input
							value={from}
							className="py-2 pr-16 pl-2 bg-white rounded-sm border border-[#9F9F9F] w-27.25"
						/>

						<input
							value={to}
							className="py-2 pr-16 pl-2 bg-white rounded-sm border border-[#9F9F9F] w-27.25"
						/>
					</div>
				</div>
				{/* Slider */}
				<main>
					<Slider max={to} min={from} step={1} />
				</main>
			</AccordionContent>
		</AccordionItem>
	);
}

export function Filter({
	filterKey,
	options,
	onChange,
	selected,
}: {
	filterKey: string;
	options: { label: string; value: string; count: number }[];
	selected: string | string[];
	onChange: (key: string, value: string) => void;
}) {
	return (
		<ScrollArea className="flex flex-col space-y-6 w-full max-h-84 md:w-62 md:max-w-62">
			<div className="py-2 px-2 mx-auto">
				<input
					type="search"
					className="py-2 px-4 w-full rounded-md lg:w-56 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#F5F5F5]"
					placeholder="Search..."
				/>
			</div>

			<div className="flex flex-col px-2 space-y-4">
				{filterKey === "category" && selected instanceof String
					? options.map(({ value, label }) => {
							return (
								<RadioBox
									key={value}
									label={label}
									value={value}
									checked={selected === value}
									onChange={(val) => onChange(filterKey, val)}
								/>
							);
						})
					: options.map(({ value, label, count }) => (
							<FilterCheckbox
								key={value}
								checked={selected.includes(value)}
								onChange={() => onChange(filterKey, value)}
								label={label}
								count={count}
							/>
						))}
			</div>
		</ScrollArea>
	);
}

export function MobileFilter({
	search,
	onFilterChange,
	onClose,
}: {
	onClose: () => void;
	onFilterChange: (key: string, value: string) => void;
	search: Record<string, string[]>;
}) {
	return (
		<section className="py-8 px-4 space-y-8">
			<div className="flex gap-4 items-center w-full">
				<button
					type="button"
					className="flex justify-center items-center"
					onClick={onClose}
				>
					<ChevronLeftIcon className="size-8" />
				</button>
				<h1 className="text-2xl font-medium leading-8 tracking-[0.01em]">
					Filters
				</h1>
			</div>
			{/* main */}
			<main className="flex flex-col gap-6 px-4">
				<Accordion type="multiple" defaultValue={["category"]}>
					<div className="space-y-6">
						<PriceFilter from={655} to={1659} />
						{filterItems.map((item) => (
							<AccordionItem key={item.value} value={item.value}>
								<AccordionTrigger>{item.trigger}</AccordionTrigger>
								<AccordionContent>
									<Filter
										options={item.options}
										onChange={onFilterChange}
										selected={search[item.value] ?? []}
										filterKey={item.value}
									/>
								</AccordionContent>
							</AccordionItem>
						))}
					</div>
				</Accordion>
			</main>
			{/* Nutton */}
			<div>
				<Button
					variant="default"
					className="w-full h-14 rounded-md"
					onClick={() => {
						// do somige filtering then close
						setTimeout(onClose, 1500);
					}}
				>
					<span>Apply</span>
				</Button>
			</div>
		</section>
	);
}

export function MobileFilterButtons({
	onFilterClick,
}: {
	onFilterClick: () => void;
}) {
	return (
		<section className="grid grid-cols-2 gap-4 px-4 pt-10 lg:hidden">
			<Button
				variant={"outline"}
				onClick={onFilterClick}
				className="flex justify-between items-center py-4 px-4 w-full h-14"
			>
				<span className="font-normal leading-4 text-[15px] tracking-[-0.005em]">
					Filters
				</span>
				<BsSliders className="size-6" />
			</Button>
			{/* Dropdown */}
			<Button
				variant={"outline"}
				className="flex justify-between items-center py-4 px-4 w-full h-14"
			>
				<span className="font-normal leading-4 text-[15px] tracking-[-0.005em]">
					By Rating
				</span>
				<ChevronDownIcon className="size-r" />
			</Button>
		</section>
	);
}

export default function ProductFilters({
	search,
	onFilterChange,
}: {
	search: Record<string, string[]>;
	onFilterChange: (key: string, value: string) => void;
}) {
	return (
		<Accordion
			type="multiple"
			defaultValue={["category"]}
			className="flex flex-col gap-6 max-w-62"
		>
			{filterItems.map((item) => (
				<AccordionItem key={item.value} value={item.value}>
					<AccordionTrigger>{item.trigger}</AccordionTrigger>
					<AccordionContent>
						<Filter
							options={item.options}
							filterKey={item.value}
							selected={search[item.value] ?? []}
							onChange={onFilterChange}
						/>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
