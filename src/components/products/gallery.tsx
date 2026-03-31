import { type ReactNode, useState } from "react";
import { cn } from "#/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
	images: { url: string; order: number; alt: string }[];
	displayName: string;
};

export function Gallery({ images, displayName }: Props) {
	const [selectedImage, setSelectedImage] = useState(
		images.find((img) => img.order === 1) ?? images[0],
	);

	const MAX_VISIBLE = 4;
	const visibleImages = images.slice(0, MAX_VISIBLE);
	const extraCount = images.length - MAX_VISIBLE;

	return (
		<div className="flex flex-col-reverse gap-4 md:flex-row lg:col-span-2">
			{/* Thumbnails */}
			<aside className="flex flex-row gap-2 mx-auto md:flex-col md:gap-4">
				{visibleImages.map((image, index) => {
					const isLast = index === MAX_VISIBLE - 1;
					const showOverlay = isLast && extraCount > 0;

					const content = (
						<button
							type="button"
							key={`${image.order}`}
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
								alt={`Product ${image.alt}`}
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
						<GalleryModal
							key={displayName}
							displayName={displayName}
							images={images}
						>
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
					alt={`Product ${selectedImage.alt} selected image.`}
					className="object-contain object-center size-full"
				/>
			</figure>
		</div>
	);
}

export function GalleryModal({
	images,
	displayName,
	children,
}: {
	images: { url: string; alt: string; order: number }[];
	displayName: string;
	children: ReactNode;
}) {
	const [selectedImage, setSelectedImage] = useState(
		images.find((img) => img.order === 1) ?? images[0],
	);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="p-6 w-[80vw] lg:h-[90svh]">
				<div className="py-3 px-6">
					<section className="grid gap-10 lg:grid-cols-4">
						<figure className="overflow-hidden lg:col-span-3 aspect-6/5 lg:max-h-5/6">
							<img
								src={selectedImage.url}
								alt={`Product ${selectedImage.alt}`}
								className="object-contain size-full"
							/>
						</figure>

						<aside className="space-y-6">
							<DialogHeader>
								<DialogTitle className="text-lg leading-6 md:text-xl text-foreground font-heading">
									{displayName}
								</DialogTitle>
							</DialogHeader>

							<div className="flex flex-wrap gap-4 items-center">
								{images.map((image) => (
									<button
										type="button"
										key={`${image.order}`}
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
											alt={`Product ${image.alt}`}
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
