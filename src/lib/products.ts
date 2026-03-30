export function colourToHex(colour: string): string {
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

export function getDiscount(price: number, salePrice: number): number | null {
	if (!salePrice || salePrice >= price) return null;
	return Math.round(((price - salePrice) / price) * 100);
}

export const unique = <T>(arr: T[]) => [...new Set(arr)];
