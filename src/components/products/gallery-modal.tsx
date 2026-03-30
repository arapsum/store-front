import { type ReactNode, useState } from "react";
import { cn } from "#/lib/utils";
import type { CategoryKey, LaptopAttribute, Product } from "#/types/product";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function GalleryModal<T extends CategoryKey>({
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
							<DialogHeader>
								<DialogTitle className="text-lg leading-6 md:text-xl text-foreground font-heading">
									{product.brand} {product.name} - {attributes.screenSize} -{" "}
									{attributes.processor} - {attributes.memory} RAM -{" "}
									{attributes.storage} Storage - {attributes.colour}
								</DialogTitle>
							</DialogHeader>

							<div className="flex flex-wrap gap-4 items-center">
								{images.map((image, index) => (
									<button
										type="button"
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
