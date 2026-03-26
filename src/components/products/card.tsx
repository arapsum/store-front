import type { AnyProduct } from "#/types/product";
import { HeartIcon, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import useCartStore from "#/store/store";

type Props = {
  product: AnyProduct;
};

// Derive a hex-ish colour from an attribute colour string for the swatch dot
function colourToHex(colour: string): string {
  const map: Record<string, string> = {
    black: "#1a1a1a",
    white: "#f5f5f5",
    silver: "#c0c0c0",
    gold: "#d4af37",
    blue: "#3b6fd4",
    red: "#e53e3e",
    green: "#38a169",
    purple: "#805ad5",
    pink: "#ed64a6",
    yellow: "#ecc94b",
    orange: "#ed8936",
    grey: "#718096",
    gray: "#718096",
    midnight: "#191970",
    starlight: "#f0ead6",
    titanium: "#878681",
    "space gray": "#6b7280",
    "rose gold": "#b76e79",
    "pacific blue": "#1c7da0",
    "sierra blue": "#a2c0d4",
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
  return map[colour.toLowerCase()] ?? "#d1d5db";
}

function getDiscount(price: number, salePrice: number): number | null {
  if (!salePrice || salePrice >= price) return null;
  return Math.round(((price - salePrice) / price) * 100);
}

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
  const colourOptions = unique(options.map((opt) => (opt.attributes as any)?.colour as string));

  const hasColours = colourOptions.length >= 1;

  // Pick up to 2 key specs to show as chips (storage, memory)
  const specChips: string[] = [];
  const attrs = attributes as any;
  if (attrs?.storage) specChips.push(attrs.storage);
  if (attrs?.memory) specChips.push(attrs.memory);

  return (
    <div
      className="flex overflow-hidden relative flex-col bg-white rounded-sm select-none group w-45 md:w-58 lg:w-65"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        fontFamily: "Inter, 'DM Sans', system-ui, sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.14)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* ── Image area ─────────────────────────────────────── */}
      <div
        className="flex relative justify-center items-center"
        style={{
          background: "linear-gradient(135deg, #f8f8f8 0%, #efefef 100%)",
          height: 192,
          padding: "24px 16px 16px",
        }}
      >
        {/* Discount badge */}
        {discount && (
          <span
            className="absolute top-3 left-3 py-0.5 px-2 text-xs font-semibold text-white rounded-full"
            style={{ background: "#1a1a1a", letterSpacing: "0.02em" }}
          >
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          className="absolute top-3 right-3 z-40 p-1.5 rounded-full transition-colors duration-200"
          style={{
            background: isInWishlist ? "rgba(255,60,60,0.08)" : "rgba(0,0,0,0.04)",
          }}
          onClick={() => setIsInWishlist((prev) => !prev)}
          aria-label="Toggle wishlist"
        >
          <HeartIcon
            className="transition-all duration-300 size-4"
            style={{
              fill: isInWishlist ? "#e53e3e" : "none",
              color: isInWishlist ? "#e53e3e" : "#9ca3af",
              transform: isInWishlist ? "scale(1.15)" : "scale(1)",
            }}
          />
        </button>

        <Link to={`/products/$id`} params={{ id }}>
          <img
            src={images.sort((a, b) => a.order - b.order)[0].url}
            alt={`${brand} ${name}`}
            className="object-contain object-center"
            style={{
              height: 136,
              width: "100%",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
            }
          />
        </Link>
      </div>

      {/* ── Content area ───────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-4">
        {/* Brand + year */}
        <div className="flex justify-between items-center">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#6b7280", letterSpacing: "0.1em" }}
          >
            {brand}
          </span>
          {year && (
            <span className="text-xs" style={{ color: "#9ca3af" }}>
              {year}
            </span>
          )}
        </div>

        {/* Name */}
        <a
          href={`/products/${id}`}
          className="flex justify-between items-center font-semibold leading-snug line-clamp-2"
        >
          <p className="text-sm" style={{ color: "#111827" }}>
            {name}&nbsp;
          </p>
          <span className="hidden text-xs" style={{ color: "#6b7280", fontWeight: 400 }}>
            {modelNumber}
          </span>
        </a>

        {/* Spec chips */}
        {specChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specChips.map((chip) => (
              <span
                key={chip}
                className="py-0.5 px-2 text-xs rounded-sm"
                style={{
                  background: "#f3f4f6",
                  color: "#374151",
                  fontWeight: 500,
                  border: "1px solid #e5e7eb",
                }}
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
                className="rounded-full transition-all duration-150"
                style={{
                  width: 14,
                  height: 14,
                  background: colourToHex(colour!),
                  border:
                    selectedOptionIndex === index ? "2px solid #1a1a1a" : "2px solid transparent",
                  outline:
                    selectedOptionIndex === index ? "1.5px solid #1a1a1a" : "1.5px solid #d1d5db",
                  outlineOffset: 1,
                }}
              />
            ))}
          </div>
        )}

        {/* Price row */}
        <div className="flex gap-2 items-baseline">
          <span
            className="text-lg font-bold md:text-xl"
            style={{ color: "#111827", letterSpacing: "-0.02em" }}
          >
            £{displayPrice.toFixed(2)}
          </span>
          {discount && (
            <span className="text-xs line-through md:text-sm" style={{ color: "#9ca3af" }}>
              £{price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock notice */}
        {isOutOfStock ? (
          <p className="text-xs font-medium" style={{ color: "#ef4444" }}>
            Out of stock
          </p>
        ) : isLowStock ? (
          <p className="flex gap-1 items-center text-xs font-medium" style={{ color: "#f59e0b" }}>
            <Zap className="size-3" />
            Only {quantity} left
          </p>
        ) : null}

        {/* CTA */}
        <button
          type="button"
          disabled={isOutOfStock}
          className="flex gap-2 justify-center items-center py-2.5 px-4 mt-1 text-sm font-semibold rounded-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "#111827",
            color: "#ffffff",
          }}
          onMouseEnter={(e) => {
            if (!isOutOfStock) (e.currentTarget as HTMLButtonElement).style.background = "#374151";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#111827";
          }}
          onClick={() => addToCart({ ...product, option: selectedOption, quantity: 1 })}
        >
          <ShoppingCart className="size-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
