import type {
	CategoryKey,
	Option,
	Specification,
	SpecificationEntry,
} from "#/types/product";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

type Props<T extends CategoryKey> = {
	specifications: Specification<T>;
	option: Option<T>;
};

function RenderSpecifications<T extends CategoryKey>({
	specifications,
	option,
}: Props<T>) {
	const specsEntries = Object.entries(specifications);
	const attributes = option.attributes;

	const [entries, setEntries] = useState(2);

	const visibleSpecs = specsEntries.slice(0, entries);

	return (
		<div className="space-y-8">
			<section className="flex flex-col gap-10">
				{visibleSpecs.map(
					(
						[key, value]: [string, Record<string, SpecificationEntry<T>>],
						index: number,
					) => (
						<div key={`${key}-${index}`} className="flex flex-col gap-4">
							<div>
								<h5 className="font-medium leading-6 text-black capitalize text-[20px]">
									{key}
								</h5>
							</div>
							<div className="flex flex-col gap-6">
								{Object.entries(value).map(([spec, entry], index) => (
									<div
										key={`idx-${index}-${spec}`}
										className="flex justify-between items-center border-b border-dotted border-black/40"
									>
										<span className="font-normal leading-6 text-gray-700 text-[16px]">
											{spec}
										</span>
										<span className="leading-6 text-gray-700 text-[15px]">
											{entry.derivedFrom && entry.derivedFrom in attributes
												? (attributes[entry.derivedFrom] as string)
												: entry.value}
										</span>
									</div>
								))}
							</div>
						</div>
					),
				)}
			</section>

			<div className="flex justify-center items-center">
				<Button
					type="button"
					variant="outline"
					className="flex gap-2 items-center py-3 px-14 h-12 w-54"
					onClick={() => setEntries(specsEntries.length)}
				>
					<span className="font-medium leading-6 text-[14px]">View more</span>
					<ChevronDownIcon className="size-6" />
				</Button>
			</div>
		</div>
	);
}

export default RenderSpecifications;
