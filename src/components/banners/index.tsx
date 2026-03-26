import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils.ts";

const OutlineButton = ({ className }: { className?: string }) => (
  <a href="/products">
    <Button
      variant="outline"
      className={cn("gap-2 py-4 px-14 h-14 text-white rounded-sm transition-transform duration-300 bg-inherit border-[1.5px] border-white/40", className)}
    >
      <span className="font-medium leading-6">Shop Now</span>
    </Button>
  </a>
);

export { OutlineButton };
export * from "./large-banner.tsx";
export * from "./small-banners.tsx";
export * from "./big-banners.tsx";
