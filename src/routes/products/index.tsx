import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProductCard from "@/components/products/card";
import ProductFilters, { MobileFilter, MobileFilterButtons } from "@/components/products/filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import products from "#/data/products";
import { filterItems, type FilterKey } from "#/data/filterOptions";

export const Route = createFileRoute("/products/")({
  validateSearch: (search) => {
    const normalise = (val: unknown) => (Array.isArray(val) ? val : val ? [val] : undefined);

    return {
      page: Number(search.page ?? 1),
      category: search.category ? (search.category as string) : undefined,
      brand: normalise(search.brand),
      memory: normalise(search.memory),
      storage: normalise(search.storage),
      processorBrand: normalise(search.processorBrand),
    };
  },
  component: RouteComponent,
});

type Search = { page: number; category?: string } & Record<FilterKey, string[]>;

function RouteComponent() {
  const search = Route.useSearch() as Search;

  const navigate = useNavigate({ from: Route.fullPath });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const goToPage = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    });
  };

  const toggleFilter = (key: string, value: string) => {
    navigate({
      search: (prev) => {
        const current = (prev[key as keyof typeof prev] as string[]) ?? [];

        const exists = current.includes(value);

        const next = exists ? current.filter((c: string) => c !== value) : [...current, value];

        return {
          ...prev,
          [key]: next.length > 0 ? next : undefined,
          page: 1,
        };
      },
    });
  };

  const filteredByCategory = search.category
    ? products.filter((product) => product.category === search.category)
    : products;

  const filteredProducts = filteredByCategory.filter((product) => {
    return filterItems.every((item) => {
      const selected = search[item.value];

      if (!selected || selected.length === 0) return true;

      if (item.value === "brand") {
        return selected.includes(product.brand);
      }

      return product.options.some((option) => {
        const value = option.attributes[item.value as keyof typeof option.attributes];

        return selected.includes(value);
      });
    });
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const start = (search.page - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(start, start + itemsPerPage);

  const grid = (
    <section className="space-y-10">
      <main className="space-y-6">
        <h3 className="flex items-center font-medium leading-4 tracking-[0.03em]">
          <span className="text-base text-[#6C6C6C]">Products Result:&nbsp;</span>
          <span className="text-xl text-black">{filteredProducts.length}</span>
        </h3>
        {/* Grid */}
        <main className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>

        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(Math.max(search.page - 1, 1))} />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;

              return (
                <PaginationItem key={p}>
                  <PaginationLink isActive={search.page === p} onClick={() => goToPage(p)}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next */}
            <PaginationItem>
              <PaginationNext onClick={() => goToPage(Math.min(search.page + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </section>
  );

  return (
    <section className="overflow-hidden space-y-12 bg-white border-t border-black/40">
      {/* Mobile Filters */}
      <MobileFilterButtons onFilterClick={() => setIsFilterOpen(true)} />
      {isFilterOpen && (
        <div className="overflow-y-auto fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out">
          <MobileFilter
            onClose={() => setIsFilterOpen(false)}
            search={search}
            onFilterChange={toggleFilter}
          />
        </div>
      )}

      {/* <div className="hidden lg:block"> */}
      {/*   <PageBreadcrumb /> */}
      {/* </div> */}

      {/* Product Grid */}
      <main className="flex items-start px-4 pb-10 mx-auto md:gap-6 md:px-6 md:pt-6 md:pb-14 xl:gap-10">
        <div className="hidden md:w-60 lg:block lg:w-[256px]">
          <ProductFilters search={search} onFilterChange={toggleFilter} />
        </div>
        {grid}
      </main>
    </section>
  );
}
