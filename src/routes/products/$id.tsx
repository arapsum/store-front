import { createFileRoute } from "@tanstack/react-router";
import NotFoundError from "#/components/errors/not-found";
import RenderLaptop from "#/components/products/laptop";
import products from "#/data/products";
import RenderSmartphone from "@/components/products/smartphone";

export const Route = createFileRoute("/products/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const product = products.find((p) => p.id === id);

	if (!product) {
		return NotFoundError();
	}

	switch (product.category) {
		case "laptop":
			return RenderLaptop({ product });

		case "phone":
			return RenderSmartphone({ product });

		default:
			return <div>{product.name}</div>;
	}
}
