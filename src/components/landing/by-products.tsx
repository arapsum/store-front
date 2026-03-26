import { useState } from "react";
import ProductCard from "@/components/products/card";
import products from "@/data/products";

const tags = [
  { name: "New Arrival", value: "new-arrivals", isActive: true },
  { name: "Bestseller", value: "bestseller", isActive: false },
  { name: "Featured Products", value: "featured", isActive: false },
];

export function BrowseByProducts() {
  const [activeTag, setActiveTag] = useState("new-arrivals");

  return (
    <section className="py-14 px-4 space-y-8 md:px-8 lg:px-16 xl:px-40">
      {/* Header tabs */}
      <div className="flex gap-8 justify-between items-center md:justify-start">
        {tags.map((tag) => (
          <button
            type="button"
            onClick={() => setActiveTag(tag.value)}
            key={tag.value}
            className="transition-transform duration-300 hover:text-black/75"
          >
            <h1
              className={`font-medium text-base leading-8 ${activeTag === tag.value ? "underlined-text text-black" : "text-[#8B8B8B]"}`}
            >
              {tag.name}
            </h1>
          </button>
        ))}
      </div>
      {/* Product Grids */}
      <div className="grid grid-cols-2 gap-4 space-y-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((item) => (
          <ProductCard key={item.name} product={item} />
        ))}
        <div className="hidden sm:block md:block lg:hidden">
          {products.slice(8, 9).map((item) => (
            <ProductCard key={item.name} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
