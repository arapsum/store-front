import { PackageSearchIcon } from "lucide-react";

type Props = {
  onClearFilters?: () => void;
};

export default function EmptyProducts({ onClearFilters }: Props) {
  return (
    <div className="flex flex-col justify-center items-center py-24 px-6 w-full select-none min-h-[50vh]">
      <section className="relative mb-10">
        <div className="absolute inset-0 rounded-sm border translate-x-3 translate-y-3 border-black/10 bg-black/5" />
        <div className="absolute inset-0 rounded-sm border translate-x-1.5 translate-y-1.5 border-black/15 bg-black/4" />

        <main className="flex relative z-10 justify-center items-center bg-white rounded-sm border-2 border-black size-28">
          <PackageSearchIcon className="size-12 text-black/30" strokeWidth={1.2} />

          <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-black/40" />
          <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-black/40" />
          <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-black/40" />
          <span className="absolute right-2 bottom-2 w-2 h-2 border-r-2 border-b-2 border-black/40" />
        </main>
      </section>

      <div className="space-y-2 max-w-xs text-center">
        <h3 className="text-xl font-semibold tracking-tight text-black">No products found</h3>
        <p className="text-sm leading-relaxed text-[#6C6C6C]">
          Your current filters don't match any products. Try adjusting or clearing them to see more
          results.
        </p>
      </div>

      <div className="flex gap-3 items-center my-8 w-full max-w-50">
        <span className="flex-1 h-px bg-black/15" />
        <span className="font-medium uppercase text-[10px] tracking-[0.15em] text-black/30">
          or
        </span>
        <span className="flex-1 h-px bg-black/15" />
      </div>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex relative gap-2 justify-center items-center py-2.5 px-6 mx-auto w-48 h-14 text-sm font-medium tracking-wide text-black rounded-sm border-2 transition-all duration-150 hover:text-white hover:bg-black active:scale-95 border-black/60 group"
        >
          Clear all filters
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
        </button>
      )}
    </div>
  );
}
