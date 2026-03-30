const categoryOptions: { label: string; value: string; count: number }[] = [
	{ label: "Laptops", value: "laptop", count: 100 },
	{ label: "Smartphones", value: "smartphone", count: 200 },
	{ label: "Tablets", value: "tablet", count: 150 },
	{ label: "Smartwatches", value: "smartwatch", count: 50 },
];

const brandOptions: {
	label: string;
	value: string;
	count: number;
	checked?: boolean;
}[] = [
	{ label: "Acer", value: "acer", count: 181 },
	{ label: "Apple", value: "apple", count: 178 },
	{ label: "Asus", value: "asus", count: 123 },
	{ label: "Dell", value: "dell", count: 34 },
	{ label: "HP", value: "hp", count: 15 },
	{ label: "Lenovo", value: "lenovo", count: 97 },
	{ label: "Samsung", value: "samsung", count: 73 },
];

const ramOptions: { label: string; count: number; value: string }[] = [
	{ label: "4GB", count: 89, value: "4gb" },
	{ label: "6GB", count: 156, value: "6gb" },
	{ label: "8GB", count: 234, value: "8gb" },
	{ label: "12GB", count: 198, value: "12gb" },
	{ label: "16GB", count: 127, value: "16gb" },
	{ label: "18GB", count: 45, value: "18gb" },
	{ label: "24GB", count: 12, value: "24gb" },
];

const storageOptions: { label: string; count: number; value: string }[] = [
	{ label: "128GB", count: 203, value: "128gb" },
	{ label: "256GB", count: 289, value: "256gb" },
	{ label: "512GB", count: 176, value: "512gb" },
	{ label: "1TB", count: 98, value: "1tb" },
	{ label: "2TB", count: 23, value: "2tb" },
];

const cpuOptions: {
	label: string;
	value: string;
	count: number;
	checked?: boolean;
}[] = [
	{ label: "AMD", value: "amd", count: 43 },
	{ label: "Apple", value: "apple", count: 45 },
	{ label: "Intel", value: "intel", count: 67 },
	{ label: "Qualcomm", value: "qualcomm", count: 78 },
];

const filterItems = [
	{ value: "category", trigger: "Category", options: categoryOptions },
	{ value: "brand", trigger: "Brands", options: brandOptions },
	{ value: "memory", trigger: "RAM", options: ramOptions },
	{ value: "storage", trigger: "Storage size", options: storageOptions },
	{ value: "processorBrand", trigger: "CPU", options: cpuOptions },
];

type FilterKey = (typeof filterItems)[number]["value"];

export {
	filterItems,
	cpuOptions,
	storageOptions,
	brandOptions,
	ramOptions,
	categoryOptions,
};
export type { FilterKey };
