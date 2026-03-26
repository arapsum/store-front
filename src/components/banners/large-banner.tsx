import React from "react";
import { OutlineButton } from ".";


export function LargeBannerMobile() {
  return (
    <section className="overflow-hidden px-4 pb-0 space-y-12 md:hidden pt-22 bg-linear-to-br from-[#211C24] to-[#211C24]">
      {/* Top section: Banner text & Call to Action btn */}
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="flex flex-col justify-center items-center space-y-4">
          <p className="font-semibold leading-8 text-[25px] text-white/50">Pro.Beyond</p>
          <h1 className="text-7xl text-center text-white leading-18 tracking-[-0.01em]">
            <span className="font-thin line-clamp-1">IPhone 14&nbsp;</span>
            <span className="font-bold">Pro</span>
          </h1>
          <p className="font-medium leading-6 text-center text-[19px] text-[#909090]">
            Created to change everything for the better. For everyone
          </p>
        </div>

        <OutlineButton />
      </div>
      {/* Image */}
      <div className="flex justify-center items-center">
        <img
          src="/banners/large-banner-mobile.png"
          alt="Apple iPhone 14 banner"
          width="321px"
          height="289px"
          className="object-contain object-center"
        />
      </div>
    </section>
  );
}

export function LargeBannerDesktop() {
  return (
    <section className="hidden overflow-hidden justify-between items-center md:flex md:px-8 lg:px-16 xl:px-40 bg-linear-to-br from-[#211C24] to-[#211C24] h-158">
      {/* Left section: Banner text & CTA Button */}
      <div className="flex flex-col gap-6 justify-start items-start">
        {/* Titles */}
        <div className="space-y-6">
          <p className="font-semibold leading-8 text-[25px] text-white/40">Pro.Beyond</p>
          <h1 className="text-7xl text-white xl:text-8xl leading-18 tracking-[-0.01em] text-start">
            <span className="font-thin">IPhone 14&nbsp;</span>
            <span className="font-bold">Pro</span>
          </h1>
        </div>

        <p className="font-medium leading-6 text-[18px] text-[#909090] text-start">
          Created to change everything for the better. For everyone
        </p>

        <OutlineButton />
      </div>
      {/* Banner image */}
      <div>
        <img
          alt="Apple iPhone 14 Banner deep purple"
          src="/banners/large-banner-desktop.png"
          width="406px"
          height="632px"
        />
      </div>
    </section>
  );
}

export function LargeBanner() {
  return (
    <React.Fragment>
      <LargeBannerMobile />
      <LargeBannerDesktop />
    </React.Fragment>
  );
}
