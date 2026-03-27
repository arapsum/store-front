import type { CartItem } from "#/types/cart";
import { LaptopCartItem } from "./laptop";

type Props = {
  item: CartItem;
  removeItem: (item: CartItem) => void;
};

export default function Cart({ item, removeItem }: Props) {
  switch (item.category) {
    case "laptop":
      return <LaptopCartItem item={item} removeItem={removeItem} quantity={item.quantity} />;
  }
}
