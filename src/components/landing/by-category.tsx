import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon, GamepadIcon } from "lucide-react";
import type { ElementType } from "react";
import { BsSmartwatch } from "react-icons/bs";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoMdLaptop } from "react-icons/io";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { RiSmartphoneLine } from "react-icons/ri";

const categories: Array<{ label: string; icon: ElementType; params: string }> =
	[
		{ label: "Phones", icon: RiSmartphoneLine, params: "phones" },
		{ label: "Smart Watches", icon: BsSmartwatch, params: "smart-watches" },
		{ label: "Laptops", icon: IoMdLaptop, params: "laptop" },
		{ label: "Headphones", icon: FaHeadphonesSimple, params: "headphones" },
		{ label: "Computers", icon: HiOutlineComputerDesktop, params: "computers" },
		{ label: "Gaming", icon: GamepadIcon, params: "gaming" },
	];

export function BrowseByCategory() {
	return (
		<section className="py-16 px-4 space-y-12 md:px-8 lg:px-16 lg:space-y-8 xl:py-20 xl:px-40 bg-[#FAFAFA]">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-medium leading-8 capitalize tracking-[0.01em]">
					Browse by category
				</h1>

				<div className="flex items-center space-x-4">
					<button type="button">
						<ChevronLeftIcon className="size-8" />
					</button>

					<button type="button">
						<ChevronRightIcon className="size-8" />
					</button>
				</div>
			</div>
			{/* category grid */}
			<div className="grid grid-cols-2 gap-4 space-y-4 xl:grid-cols-6 xl:gap-8">
				{categories.map(({ label, icon: Icon, params }) => (
					<Link
						key={label}
						from="/"
						to="/products"
						search={(prev) => ({
							...prev,
							category: params,
							page: 1,
						})}
						className="flex flex-col gap-2 justify-center items-center py-6 h-32 xl:w-40 bg-[#EDEDED] rounded-[15px]"
					>
						<Icon className="text-black size-12" />
						<p className="text-base font-medium leading-6 text-black">
							{label}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
