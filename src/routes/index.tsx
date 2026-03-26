import { createFileRoute } from "@tanstack/react-router";
import { LargeBanner, SmallBanners, BigBanners } from "#/components/banners";
import { BrowseByCategory, BrowseByProducts, DiscountedProducts } from "#/components/landing"

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="p-0 page-wrap">
      <LargeBanner />
      <SmallBanners />
      <BrowseByCategory />
      <BrowseByProducts />
      <BigBanners />
      <DiscountedProducts />
    </main>
  );
}
