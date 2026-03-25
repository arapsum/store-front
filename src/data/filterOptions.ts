const brandOptions: { label: string; count: number; checked?: boolean }[] = [
  { label: "Acer", count: 181 },
  { label: "Apple", count: 178 },
  { label: "Asus", count: 123 },
  { label: "Dell", count: 34 },
  { label: "HP", count: 15 },
  { label: "Lenovo", count: 97 },
  { label: "Samsung", count: 73 },
];

const ramOptions: { label: string; count: number; checked?: boolean }[] = [
  { label: "4GB", count: 89 },
  { label: "6GB", count: 156 },
  { label: "8GB", count: 234 },
  { label: "12GB", count: 198 },
  { label: "16GB", count: 127 },
  { label: "18GB", count: 45 },
  { label: "24GB", count: 12 },
];

const storageOptions: { label: string; count: number; checked?: boolean }[] = [
  { label: "128GB", count: 203 },
  { label: "256GB", count: 289 },
  { label: "512GB", count: 176 },
  { label: "1TB", count: 98 },
  { label: "2TB", count: 23 },
];

const cpuOptions: { label: string; count: number; checked?: boolean }[] = [
  { label: "AMD", count: 43 },
  { label: "Apple", count: 45 },
  { label: "Intel", count: 67 },
  { label: "Qualcomm", count: 78 },
];

const filterItems = [
  { value: "brand", trigger: "Brands", options: brandOptions },
  { value: "memory", trigger: "RAM", options: ramOptions },
  { value: "storage", trigger: "Storage size", options: storageOptions },
  { value: "processorBrand", trigger: "CPU", options: cpuOptions },
];

type FilterKey = (typeof filterItems)[number]["value"];

export { filterItems, cpuOptions, storageOptions, brandOptions, ramOptions };
export type { FilterKey };
