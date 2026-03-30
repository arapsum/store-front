import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartStoreActions, CartStoreState } from "@/types/cart";

const useCartStore = create<CartStoreState & CartStoreActions>()(
	persist(
		(set) => ({
			cart: [],
			hasHydrated: false,
			addToCart: (product) =>
				set((state) => {
					const existingIndex = state.cart.findIndex(
						(p) => p.id === product.id && p.option.id === product.option.id,
					);

					if (existingIndex !== -1) {
						const updatedCart = [...state.cart];
						updatedCart[existingIndex].quantity += product.quantity || 1;
						return { cart: updatedCart };
					}

					return {
						cart: [
							...state.cart,
							{
								...product,
								quantity: product.quantity || 1,
							},
						],
					};
				}),
			removeFromCart: (product) =>
				set((state) => ({
					cart: state.cart.filter(
						(p) => !(p.id === product.id && p.option.id === product.option.id),
					),
				})),
			clearCart: () => set({ cart: [] }),
		}),
		{
			name: "cart",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.hasHydrated = true;
				}
			},
		},
	),
);

export default useCartStore;
