import type { CartItem } from "#/types/cart";
import type { CartProduct } from "#/types/product";
import { Trash2Icon } from "lucide-react";

type Props = {
  item: CartProduct<"laptop">;
  quantity: number;
  removeItem: (item: CartItem) => void;
};

export function LaptopCartItem({ item, quantity, removeItem }: Props) {
  return (
    <div className="flex justify-between items-center gap-3 pb-4 sm:items-center sm:gap-0">
      <div className="flex gap-3 sm:gap-8">
        <figure className="overflow-hidden shrink-0 relative bg-gray-50 rounded-sm size-20 sm:size-32">
          <img
            src={item.images[0].url}
            alt={`Product ${item.brand} ${item.name} ${item.modelNumber}`}
            className="object-contain size-full"
          />
        </figure>
        {/* Details */}
        <section className="flex flex-col justify-between min-w-0">
          <div className="flex flex-col gap-1">
            <p className="sm:text-sm text-xs leading-snug font-medium">
              {item.brand}&nbsp;{item.name}&nbsp;-&nbsp;
              {item.option.attributes.memory}
              &nbsp;-&nbsp;{item.option.attributes.storage}
              &nbsp;-&nbsp;
              {item.option.attributes.processor}&nbsp;-&nbsp;
              {item.option.attributes.screenSize}
            </p>
            <p className="text-xs text-gray-500">Quantity: {quantity}</p>
            <p className="text-xs text-gray-500 capitalize">
              CPU: {item.option.attributes.processor}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              Storage: {item.option.attributes.storage}
            </p>
          </div>
          <p className="font-medium mt-2 text-sm sm:text-base">
            £{(item.option.salePrice * quantity).toFixed(2)}
          </p>
        </section>
      </div>
      {/* Remove Button */}
      <button
        type="button"
        onClick={() => removeItem({ ...item, quantity })}
        className="flex shrink-0 justify-center items-center text-red-400 bg-red-100 rounded-full transition-all duration-300 cursor-pointer hover:bg-red-200 size-8"
      >
        <Trash2Icon className="size-3" />
      </button>
    </div>
  );
}
