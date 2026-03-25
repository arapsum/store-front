import { createFileRoute } from "@tanstack/react-router";
import products from "#/data/products";
import RenderLaptop from "#/components/products/laptop";
import NotFoundError from "#/components/not-found";

export const Route = createFileRoute("/products/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return NotFoundError();
  }

  if (product.category === "laptop") {
    return RenderLaptop({ product });
  }

  return <div>{product.name}</div>;
}
