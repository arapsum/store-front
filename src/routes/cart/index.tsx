import ShippingForm from "#/components/shipping-form";
import { cn } from "#/lib/utils";
import useCartStore from "#/store/store";
import type { ShippingFormType } from "#/types/cart";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRightIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
  validateSearch: (search) => ({
    step: Number(search.step ?? 1),
  }),
});

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

function RouteComponent() {
  const { step: activeStep } = Route.useSearch();

  const navigate = useNavigate({ from: "/cart/" });

  const { cart, removeFromCart } = useCartStore();

  const [shippingForm, setShippingForm] = useState<ShippingFormType | null>(null);

  const navigateTo = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        step: 3,
      }),
    });
  };

  return (
    <div className="flex flex-col gap-8 justify-between items-center mt-12 mb-12">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      <section className="flex flex-col gap-8 items-center lg:flex-row lg:gap-16">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 border-b-2 pb-4 transition-transform duration-300",
                isActive ? "border-gray-800" : "border-gray-400",
              )}
            >
              <span
                className={cn(
                  "size-6 rounded-full text-white p-4 flex items-center justify-center",
                  isActive ? "bg-gray-800" : "bg-gray-400",
                )}
              >
                {step.id}
              </span>
              <p
                className={cn("text-sm font-medium", isActive ? "text-gray-800" : "text-gray-400")}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </section>

      {/* Details */}
      <main className="flex flex-col gap-16 w-full lg:flex-row">
        {/* steps */}
        <section className="flex flex-col gap-8 p-8 w-full rounded-sm border lg:w-7/12 border-black/10">
          {activeStep === 1 ? (
            cart.map((item) => (
              <div
                className="flex justify-between items-center border-b border-dashed"
                key={item.id + item.option.id}
              >
                <div className="flex gap-8">
                  <figure className="overflow-hidden relative bg-gray-50 rounded-sm size-32">
                    <img
                      src={item.images[0].url}
                      alt={`Product ${item.brand} ${item.name} ${item.modelNumber}`}
                      className="object-contain"
                    />
                  </figure>
                  {/* Details */}
                  <section className="flex flex-col justify-between line-clamp-1">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        {item.brand}&nbsp;{item.name}&nbsp;-&nbsp;{item.option.attributes.memory}
                        &nbsp;-&nbsp;{item.option.attributes.storage}&nbsp;-&nbsp;
                        {item.option.attributes.processor}&nbsp;-&nbsp;
                        {item.option.attributes.screenSize}
                      </p>
                      <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        CPU: {item.option.attributes.processor}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        Storage: {item.option.attributes.storage}
                      </p>
                    </div>
                    <p className="font-medium">
                      £{(item.option.salePrice * item.quantity).toFixed(2)}
                    </p>
                  </section>
                </div>
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item)}
                  className="flex justify-center items-center text-red-400 bg-red-100 rounded-full transition-all duration-300 cursor-pointer hover:bg-red-200 size-8"
                >
                  <Trash2Icon className="size-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} navigateTo={navigateTo} />
          ) : activeStep === 3 && shippingForm ? (
            <div></div>
          ) : (
            <p className="text-sm text-gray-500">Please fill in the shipping form to continue</p>
          )}
        </section>

        {/* Cart Details */}
        <section className="flex flex-col gap-8 p-8 w-full rounded-sm border shadow-lg lg:w-5/12 border-black/10 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <main className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                £{cart.reduce((acc, item) => acc + item.option.price * item.quantity, 0).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount (10%)</p>
              <p className="font-medium">
                £
                {cart
                  .reduce((acc, item) => acc + (item.option.price - item.option.salePrice), 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">
                £
                {(
                  cart.reduce((acc, item) => acc + item.option.price * item.quantity, 0) * 0.05
                ).toFixed(2)}
              </p>
            </div>
            <hr className="border-gray-200" />

            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">Total</p>
              <p className="font-medium">
                £
                {(
                  cart.reduce((acc, item) => acc + item.option.price * item.quantity, 0) +
                  cart.reduce((acc, item) => acc + item.option.price * item.quantity, 0) * 0.05 -
                  cart.reduce(
                    (acc, item) =>
                      acc + (item.option.price - item.option.salePrice) * item.quantity,
                    0,
                  )
                ).toFixed(2)}
              </p>
            </div>
          </main>
          {activeStep === 1 && (
            <button
              type="button"
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    step: 2,
                  }),
                })
              }
              className="flex gap-2 justify-center items-center p-2 w-full text-white bg-gray-800 rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-900 group"
            >
              <span>Continue</span>
              <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1 size-4" />
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
