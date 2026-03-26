import ProductCard from "@/components/products/card";
import products from "@/data/products";


export function DiscountedProducts() {
  const discountedProducts = products.slice(10, 14);
  return (
    <section className="py-14 px-4 space-y-8 w-full bg-white md:px-36 lg:px-40 xl:py-20">
      {/* Header */}
      <h1 className="text-2xl font-medium leading-8 text-black">Discounts up to -50%</h1>
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {discountedProducts.map((item) => (
          <ProductCard key={item.name} product={item} />
        ))}
      </div>
    </section>
  );
}
