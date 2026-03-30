import { Link } from "@tanstack/react-router";
import { HeartIcon, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { colourToHex, getDiscount } from "#/lib/products";
import { cn } from "#/lib/utils";
import useCartStore from "#/store/store";
import type { AnyProduct } from "#/types/product";

type Props = {
	product: AnyProduct;
};

function ProductCard({ product }: Props) {
	const [isInWishlist, setIsInWishlist] = useState(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

	const { addToCart } = useCartStore();

	const { brand, name, id, images, options, modelNumber, year } = product;

	const selectedOption = options[selectedOptionIndex];
	const { price, salePrice, quantity, attributes } = selectedOption;

	const displayPrice = salePrice && salePrice < price ? salePrice : price;
	const discount = getDiscount(price, salePrice);
	const isLowStock = quantity > 0 && quantity <= 5;
	const isOutOfStock = quantity === 0;

	const unique = <T,>(arr: T[]) => [...new Set(arr)];

	// Collect unique colours across options for swatches
	const colourOptions = unique(
		options.map((opt) => (opt.attributes as any)?.colour as string),
	);

	const hasColours = colourOptions.length >= 1;

	// Pick up to 2 key specs to show as chips (storage, memory)
	const specChips: string[] = [];
	const attrs = attributes as any;
	if (attrs?.storage) specChips.push(attrs.storage);
	if (attrs?.memory) specChips.push(attrs.memory);

	return (
		<div className="flex overflow-hidden relative flex-col w-40  bg-white rounded-sm ease-in-out select-none hover:-translate-y-0.5 group min-[400px]:w-44 min-[680px]:w-48 min-[720px]:w-52 min-[900px]:w-56 min-[1200px]:w-64 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)] transition-[box-shadow,transform] duration-250 hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.14)]">
			{/* ── Image area ─────────────────────────────────────── */}
			<div className="flex relative justify-center items-center px-4 pt-6 pb-4 bg-linear-to-br from-[#F8F8F8] to-[#EFEFEF]">
				{/* Discount badge */}
				{discount && (
					<span className="absolute top-3 left-3 z-10 py-0.5 px-2 text-xs font-semibold text-white rounded-full bg-[#1A1A1A] tracking-[0.02em]">
						-{discount}%
					</span>
				)}

				{/* Wishlist */}
				<button
					type="button"
					className={cn(
						"absolute top-3 right-3 z-40 p-1.5 rounded-full transition-colors duration-200",
						isInWishlist ? "bg-red-500/8" : "bg-black/4",
					)}
					onClick={() => setIsInWishlist((prev) => !prev)}
					aria-label="Toggle wishlist"
				>
					<HeartIcon
						className={cn(
							"transition-all duration-300 size-4",
							isInWishlist
								? "fill-[#E53E53] text-[#E53E53] scale-[1.15]"
								: "fill-none text-gray-400 scale-100",
						)}
					/>
				</button>

				<Link to={`/products/$id`} params={{ id }}>
					<img
						src={images.sort((a, b) => a.order - b.order)[0].url}
						alt={`${brand} ${name}`}
						className="object-contain object-center transition-transform duration-300 ease-in-out h-34 hover:scale-[1.04]"
					/>
				</Link>
			</div>

			{/* ── Content area ───────────────────────────────────── */}
			<div className="flex flex-col gap-3 p-4">
				{/* Brand + year */}
				<div className="flex justify-between items-center">
					<span className="text-xs font-semibold tracking-widest uppercase text-[#6B7280]">
						{brand}
					</span>
					{year && <span className="text-xs text-[#9CA3AF]">{year}</span>}
				</div>

				{/* Name */}
				<a
					href={`/products/${id}`}
					className="flex justify-between items-center font-semibold leading-snug line-clamp-2"
				>
					<p className="text-sm text-[#111827]">{name}&nbsp;</p>
					<span className="hidden text-xs font-normal text-[#6B7280]">
						{modelNumber}
					</span>
				</a>

				{/* Spec chips */}
				{specChips.length > 0 && (
					<div className="flex flex-wrap gap-1.5">
						{specChips.map((chip) => (
							<span
								key={chip}
								className="py-0.5 px-2 text-xs font-medium border rounded-xs bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]"
							>
								{chip}
							</span>
						))}
					</div>
				)}

				{/* Colour swatches */}
				{hasColours && (
					<div className="flex gap-1.5 items-center">
						{colourOptions.map((colour, index) => (
							<button
								key={index}
								type="button"
								title={colour}
								onClick={() => setSelectedOptionIndex(index)}
								className="rounded-full transition-all duration-150 size-3.5"
								style={{
									background: colourToHex(colour!),
									border:
										selectedOptionIndex === index
											? "2px solid #1a1a1a"
											: "2px solid transparent",
									outline:
										selectedOptionIndex === index
											? "1.5px solid #1a1a1a"
											: "1.5px solid #d1d5db",
									outlineOffset: 1,
								}}
							/>
						))}
					</div>
				)}

				{/* Price row */}
				<div className="flex gap-2 items-baseline">
					<span className="text-lg font-bold md:text-xl text-[#111827] tracking-[-0.02em]">
						£{displayPrice.toFixed(2)}
					</span>
					{discount && (
						<span className="text-xs line-through md:text-sm text-[#9CA3AF]">
							£{price.toFixed(2)}
						</span>
					)}
				</div>

				{/* Stock notice */}
				{isOutOfStock ? (
					<p className="text-xs font-medium text-[#EF4444]">Out of stock</p>
				) : isLowStock ? (
					<p className="flex gap-1 items-center text-xs font-medium text-[#F59E0B]">
						<Zap className="size-3" />
						Only {quantity} left
					</p>
				) : null}

				{/* CTA */}
				<button
					type="button"
					disabled={isOutOfStock}
					className={cn(
						"flex gap-2 justify-center items-center py-2.5 px-4  mt-1 text-sm font-semibold rounded-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-[#111827] text-[#FFFFFF]",
						!isOutOfStock && "hover:bg-[#374151]",
					)}
					onMouseLeave={(e) => {
						(e.currentTarget as HTMLButtonElement).style.background = "#111827";
					}}
					onClick={() =>
						addToCart({ ...product, option: selectedOption, quantity: 1 })
					}
				>
					<ShoppingCart className="size-4" />
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
