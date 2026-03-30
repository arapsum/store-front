import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";
import { MinusIcon, PlusIcon, StarIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { CategoryKey, LaptopAttribute, Product } from "#/types/product";
import RenderSpecifications from "#/components/products/specifications";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import useCartStore from "#/store/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProductDetailsBreadcrumbs } from "@/components/products/breadcrumbs";

type Props = {
	product: Product<"laptop">;
};

function RenderLaptop({ product }: Props) {
	const images = product.images;
	const options = product.options;

	const [selectedImage, setSelectedImage] = useState(images[0]);
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [quantity, setQuantity] = useState(1);

	const { addToCart } = useCartStore();

	const attributes = selectedOption.attributes;

	const unique = <T,>(arr: T[]) => [...new Set(arr)];

	const availableColours = unique(
		options.map((option) => option.attributes.colour),
	);
	const availableMemory = unique(
		options.map((option) => option.attributes.memory),
	);
	const availableStorage = unique(
		options.map((option) => option.attributes.storage),
	);

	const isCompatible = (attr: Partial<LaptopAttribute>) => {
		return options.some(
			(o) =>
				(!attr.colour || o.attributes.colour === attr.colour) &&
				(!attr.memory || o.attributes.memory === attr.memory) &&
				(!attr.storage || o.attributes.storage === attr.storage),
		);
	};

	const displayPrice =
		selectedOption.salePrice && selectedOption.salePrice < selectedOption.price
			? selectedOption.salePrice
			: selectedOption.price;

	const selectAttribute = (attribute: Partial<LaptopAttribute>) => {
		const next = { ...selectedOption.attributes, ...attribute };

		let match = options.find(
			(opt) =>
				opt.attributes.colour === next.colour &&
				opt.attributes.memory === next.memory &&
				opt.attributes.storage === next.storage,
		);

		if (!match) {
			const changedKey = Object.keys(attribute)[0] as keyof LaptopAttribute;
			match = options.find(
				(o) => o.attributes[changedKey] === attribute[changedKey],
			);
		}

		if (match) setSelectedOption(match);
	};

	const colourHex: Record<string, string> = {
		graphite: "#474747",
		silver: "#C0C0C0",
		"jasper grey": "#808080",
		"scandinavian white": "#F2F3F4",
		"pure silver": "#d4d4d4",
		"mist green": "#b2c9b0",
		"sapphire blue": "#1f4f8f",
		"moonstone gray": "#9e9fa5",
		"platinum silver": "#e0e0dc",
		"space black": "#1c1c1e",
		oatmeal: "#d6cfc4",
		"tidal teal": "#3a7d7b",
		"cosmic blue": "#1e3a5f",
		platinum: "#e5e4e2",
		"pike silver": "#a8acb0",
	};

	const MAX_VISIBLE = 4;
	const visibleImages = images.slice(0, MAX_VISIBLE);
	const extraCount = images.length - MAX_VISIBLE;

	return (
		<section className="flex flex-col gap-0">
			<div className="hidden md:block">
				<ProductDetailsBreadcrumbs
					brand={product.brand}
					category={product.category}
				/>
			</div>

			<section className="py-4">
				<div className="px-4 space-y-8 md:px-6 lg:space-y-0">
					{/* Top section: Product images and Information */}
					<section className="grid gap-8 lg:grid-cols-3">
						{/* Image Galleria */}
						<div className="flex flex-col-reverse gap-4 md:flex-row lg:col-span-2">
							{/* Thumbnails */}
							<aside className="flex flex-row gap-2 mx-auto md:flex-col md:gap-4">
								{visibleImages.map((image, index) => {
									const isLast = index === MAX_VISIBLE - 1;
									const showOverlay = isLast && extraCount > 0;

									const content = (
										<button
											key={`idx-${index}-${image.order}`}
											onClick={() => !showOverlay && setSelectedImage(image)}
											className={cn(
												"relative size-20 shrink-0 overflow-hidden rounded-sm border-2 transition-all md:size-24",
												selectedImage.url === image.url
													? "border-foreground"
													: "border-border hover:border-muted-foreground",
											)}
										>
											<img
												src={image.url}
												alt={`Product ${product.brand} ${product.name} ${attributes.colour}`}
												className="object-contain object-center size-full"
											/>
											{showOverlay && (
												<div className="flex absolute inset-0 justify-center items-center rounded-sm pointer-events-none bg-black/60">
													<span className="text-sm font-semibold text-white">
														+{extraCount}
													</span>
												</div>
											)}
										</button>
									);

									return showOverlay ? (
										<GalleryModal product={product} attributes={attributes}>
											{content}
										</GalleryModal>
									) : (
										content
									);
								})}
							</aside>

							{/* Main Image */}
							<figure className="overflow-hidden flex-1 rounded-sm border aspect-5/6 md:aspect-square lg:max-h-4/5">
								<img
									src={selectedImage.url}
									alt={`Product ${product.brand} ${product.name} ${attributes.colour} selected image.`}
									className="object-contain object-center size-full"
								/>
							</figure>
						</div>

						{/* Product Information  */}
						<section className="flex flex-col space-y-6">
							<div className="space-y-2">
								<a
									href={`/?brand=${product.brand}`}
									className="text-base text-muted-foreground"
								>
									<span className="leading-6">{product.brand}</span>
								</a>

								<h1 className="text-xl leading-6 md:text-2xl text-foreground font-heading">
									{product.brand} {product.name} - {attributes.screenSize} -{" "}
									{attributes.processor} - {attributes.memory} RAM -{" "}
									{attributes.storage} Storage - {attributes.colour}
								</h1>

								<div className="flex gap-1">
									{Array.from({ length: 4 }).map((_, index) => (
										<StarIcon
											key={index}
											className="text-amber-500 size-4 fill-amber-500"
										/>
									))}
									<StarIcon className="size-4 text-muted-foreground" />
								</div>

								<Separator className="mt-2" />
							</div>

							<div className="flex gap-4 items-center">
								<span className="text-2xl font-semibold md:text-3xl text-foreground">
									£{displayPrice.toFixed(2)}
								</span>
								<span className="text-lg line-through text-muted-foreground">
									£{selectedOption.price.toFixed(2)}
								</span>
							</div>

							<Separator />
							{/* Product Options */}
							<div className="space-y-5 w-full">
								{/* Colour options */}
								<section className="flex gap-4 items-center">
									<h3 className="text-sm font-medium leading-4">Colours:</h3>
									<div className="flex gap-2 items-center lg:gap-4">
										{availableColours.map((colour) => {
											const compatible = isCompatible({ colour });
											const selected = attributes.colour === colour;

											return (
												<button
													key={colour}
													type="button"
													disabled={!compatible}
													onClick={() => selectAttribute({ colour })}
													className={cn(
														"size-8 rounded-full border-2 transition-all",
														selected
															? "border-foreground scale-110 shadow-md"
															: "border-transparent hover:border-muted-foreground",
														!compatible && "opacity-30 cursor-not-allowed",
													)}
													style={{
														backgroundColor:
															colourHex[colour.toLowerCase()] ?? "#888",
													}}
												/>
											);
										})}
									</div>
								</section>
								{/* Memory Options */}
								<section className="space-y-2">
									<h3 className="text-sm font-medium leading-4">RAM</h3>
									<div className="flex gap-2 items-center md:gap-6 lg:gap-4">
										{availableMemory.map((memory, index) => {
											const compatible = isCompatible({ memory });
											const selected = attributes.memory === memory;
											return (
												<button
													key={`${index}-${memory}`}
													type="button"
													disabled={!compatible}
													onClick={() => selectAttribute({ memory })}
													className={cn(
														"py-2 px-4 w-24 md:w-30 h-12 rounded-sm border-[1.5px] lg:w-28",
														selected
															? "border-black/60 text-black"
															: "border-[#D5D5D5] text-[#6F6F6F]",
														!compatible && "opacity-30 cursor-not-allowed",
													)}
												>
													<span className="font-medium">{memory}</span>
												</button>
											);
										})}
									</div>
								</section>
								{/* Storage Options */}
								<section className="space-y-2">
									<h3 className="text-sm font-medium leading-4">Storage</h3>
									<div className="flex gap-2 items-center md:gap-6 lg:gap-4">
										{availableStorage.map((storage, index) => {
											const compatible = isCompatible({ storage });
											const selected = attributes.storage === storage;
											return (
												<button
													key={`${index}-${storage}`}
													type="button"
													disabled={!compatible}
													onClick={() => selectAttribute({ storage })}
													className={cn(
														"py-2 px-4 w-24 md:w-30 h-12 rounded-sm border-[1.5px] lg:w-28",
														selected
															? "border-black/60 text-black"
															: "border-[#D5D5D5] text-[#6F6F6F]",
														!compatible && "opacity-30 cursor-not-allowed",
													)}
												>
													<span className="font-medium">{storage}</span>
												</button>
											);
										})}
									</div>
								</section>
							</div>

							<section className="grid gap-2">
								<Label htmlFor="quantity" className="text-base font-medium">
									Quantity
								</Label>
								<div className="flex gap-2 items-center">
									<Button
										variant="outline"
										type="button"
										size="icon"
										className="w-8 h-8 bg-transparent"
										onClick={() => {
											if (quantity === 1) {
												return;
											}
											setQuantity((prev) => (prev -= 1));
										}}
									>
										<MinusIcon className="w-4 h-4" />
										<span className="sr-only">Decrease quantity</span>
									</Button>
									<div className="flex justify-center items-center w-12 h-8 text-sm font-medium bg-white rounded-md border border-gray-200 dark:border-gray-800 dark:bg-gray-950">
										{quantity}
									</div>
									<Button
										variant="outline"
										size="icon"
										type="button"
										onClick={() => setQuantity((prev) => (prev += 1))}
										className="w-8 h-8 bg-transparent"
									>
										<PlusIcon className="w-4 h-4" />
										<span className="sr-only">Increase quantity</span>
									</Button>
								</div>
							</section>

							{/* Purchase and wishlist buttons */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
								<button
									type="button"
									className="py-3 px-6 h-14 rounded-sm transition-transform duration-300 border-black/40 border-[1.5px] hover:border-black/80"
								>
									<span>Add to Wishlist</span>
								</button>

								<button
									type="button"
									onClick={() => {
										addToCart({
											...product,
											option: selectedOption,
											quantity: quantity,
										});
										toast.success(
											`${quantity} ${product.brand} ${product.name} added to cart`,
											{
												id: "product-added-to-cart",
												position: "bottom-right",
											},
										);
									}}
									className="py-3 px-6 h-14 text-white bg-black rounded-sm border-transparent transition-transform duration-300 border-[1.5px] hover:bg-black/75"
								>
									<span>Add to Cart</span>
								</button>
							</div>
						</section>
					</section>
					{/* Product description and spectifications section */}
					<section className="py-10 px-4 mx-auto rounded-sm bg-[#FAFAFA]">
						<main className="flex flex-col gap-8 py-12 px-6 bg-white rounded-sm">
							{/* Header */}
							<div className="w-full">
								<h1 className="text-2xl font-medium leading-8 text-black">
									Details
								</h1>
							</div>
							{/* Description */}
							<div>
								<p className="text-sm font-medium leading-6 text-justify text-[#9D9D9D]">
									{product.description}
								</p>
							</div>
							{/* Specifications */}
							{product.specifications && (
								<section>
									<RenderSpecifications
										specifications={product.specifications}
										option={selectedOption}
									/>
								</section>
							)}
						</main>
					</section>
				</div>
			</section>
		</section>
	);
}

function GalleryModal<T extends CategoryKey>({
	product,
	attributes,
	children,
}: {
	product: Product<T>;
	attributes: LaptopAttribute;
	children: ReactNode;
}) {
	const images = product.images;

	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="p-6 w-[80vw] lg:h-[90svh]">
				<div className="py-3 px-6">
					<section className="grid gap-10 lg:grid-cols-4">
						<figure className="overflow-hidden lg:col-span-3 aspect-6/5 lg:max-h-5/6">
							<img
								src={selectedImage.url}
								alt={`Product ${product.brand} ${product.name} ${product.year}`}
								className="object-contain size-full"
							/>
						</figure>

						<aside className="space-y-6">
							<h1 className="text-lg leading-6 md:text-xl text-foreground font-heading">
								{product.brand} {product.name} - {attributes.screenSize} -{" "}
								{attributes.processor} - {attributes.memory} RAM -{" "}
								{attributes.storage} Storage - {attributes.colour}
							</h1>

							<div className="flex flex-wrap gap-4 items-center">
								{images.map((image, index) => (
									<button
										key={`idx-${index}-${image.order}`}
										onClick={() => setSelectedImage(image)}
										className={cn(
											"relative size-20 shrink-0 overflow-hidden rounded-sm border-2 transition-all md:size-24",
											selectedImage.url === image.url
												? "border-foreground"
												: "border-border hover:border-muted-foreground",
										)}
									>
										<img
											src={image.url}
											alt={`Product ${product.brand} ${product.name} ${attributes.colour}`}
											className="object-contain object-center size-full"
										/>
									</button>
								))}
							</div>
						</aside>
					</section>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default RenderLaptop;
