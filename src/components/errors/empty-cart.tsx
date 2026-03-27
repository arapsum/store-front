import { Link } from "@tanstack/react-router";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 gap-6 text-center">
      <div className="relative flex items-center justify-center size-28 rounded-full bg-gray-100">
        <ShoppingCart className="text-gray-400" strokeWidth={1.5} size={48} />
        <span className="absolute top-3 right-3 flex items-center justify-center size-6 rounded-full bg-white border border-gray-200 text-gray-400">
          <span className="text-lg leading-none font-light">+</span>
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-gray-800">Your cart is empty</h2>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          Looks like you haven't added anything yet. Start exploring and find something you love.
        </p>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-sm transition-all duration-300 hover:bg-gray-900 group"
      >
        Browse products
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
