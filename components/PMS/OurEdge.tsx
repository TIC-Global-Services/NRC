"use client";
import React from "react";
import Image from "next/image";
import Container from "../Reusable/Container";
import FlexibleHeading from "../ui/FlexibleHeading";
import { Col2Row1, Col2Row2 } from "@/assets/PMS";

const OurEdge = () => {
  return (
    <Container className="bg-[#FFFFFF]">

      {/* 🟣 Headings */}
      {/* Desktop */}
      <FlexibleHeading
        title="Small Caps : Our Flagship. Our Edge."
        description="This is where discovery, diligence, and discipline create extraordinary long-term wealth."
        maxWidth="max-w-3xl"
        highlights={{
          "Our Flagship. Our Edge.": "text-primary",
        }}
        className="hidden lg:block"
      />

      {/* Tablet / Mobile */}
      <FlexibleHeading
        title="Small Caps Our Flagship. <br/> Our Edge."
        description="This is where discovery, diligence, and discipline create extraordinary long-term wealth."
        maxWidth="max-w-3xl"
        highlights={{
          "Our Flagship.": "text-primary",
          "Our Edge.": "text-primary",
        }}
        className="block lg:hidden"
      />

      {/* 🟣 Mobile / Tablet Layout */}
      <div className="block lg:hidden space-y-4 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-[65%_30%] gap-4">

          {/* #1 Card */}
          <div className="bg-[#F6F9FC] rounded-2xl p-6 min-h-[140px] sm:min-h-[170px] flex flex-col justify-between">
            <div className="text-2xl sm:text-[32px] leading-none font-bold">#1</div>
            <p className="text-xs sm:text-sm md:text-base text-black leading-5 sm:leading-6 md:leading-[22px]">
              Small-cap index was the best performing segment in 6 of the last 10 years.
            </p>
          </div>

          {/* Image Right */}
          <div className="bg-white rounded-2xl overflow-hidden min-h-[140px] sm:min-h-[170px]">
            <Image
              src={Col2Row1}
              alt="Mountain Road"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 80% Card */}
        <div className="bg-[#6A48E8] text-white rounded-2xl p-6 sm:p-8 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between">
          <div className="text-2xl sm:text-[32px] leading-none font-bold mb-3">80%</div>
          <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-7 opacity-90">
            Of small caps cater to domestic demand, reducing global volatility impact.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-[30%_65%] gap-4">

          {/* Building Image */}
          <div className="bg-white rounded-2xl overflow-hidden min-h-[160px] sm:min-h-[180px]">
            <Image
              src={Col2Row2}
              alt="Modern Buildings"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 70%+ Card */}
          <div className="bg-[#B8B5FF] text-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[160px] sm:min-h-[180px]">
            <div className="text-2xl sm:text-[32px] leading-none font-bold mb-3">70%+</div>
            <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-7 opacity-90">
              Of listed Indian companies are small caps — under-researched, under-owned.
            </p>
          </div>
        </div>
      </div>

      {/* 🟣 Desktop / Large Layout */}
      <div className="hidden lg:grid grid-cols-3 gap-6  xl:gap-8 auto-rows-fr">

        {/* Column 1 */}
        <div className="bg-[#F6F9FC] rounded-2xl p-8 flex flex-col justify-between">
          <div className="text-[44px] font-bold text-black mb-4">#1</div>
          <p className="text-2xl leading-[36px] font-light">
            Small-cap index was the best performing segment in 6 of the last 10 years.
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {/* Top Image */}
          <div className="bg-white rounded-2xl overflow-hidden flex-1 min-h-[200px]">
            <Image
              src={Col2Row1}
              alt="Mountain Road"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Card */}
          <div className="bg-primary text-white rounded-2xl p-8 flex flex-col justify-between flex-1">
            <div className="text-[44px] font-bold leading-[58px]">70%+</div>
            <p className="text-2xl opacity-90 leading-[36px] font-light">
              Of listed Indian companies are small caps — under-researched, under-owned.
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          {/* Top Purple Card */}
          <div className="bg-primary text-white rounded-2xl p-8 flex flex-col justify-between flex-1">
            <div className="text-[44px] font-bold leading-[58px]">80%</div>
            <p className="text-2xl opacity-90 leading-[36px] font-light">
              Of small caps cater to domestic demand, reducing global volatility impact.
            </p>
          </div>

          {/* Bottom Image */}
          <div className="bg-white rounded-2xl overflow-hidden flex-1 min-h-[200px]">
            <Image
              src={Col2Row2}
              alt="Modern Buildings"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OurEdge;
