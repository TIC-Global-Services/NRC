import React from "react";
import FlexibleHeading from "../ui/FlexibleHeading";
import { Col2Row1, Col2Row2 } from "@/assets/PMS";
import Image from "next/image";
import Container from "../Reusable/Container";

const OurEdge = () => {
  return (
    <Container className="bg-[#FFFFFF]">
      <FlexibleHeading
        title="Small Caps : Our Flagship. Our Edge."
        description="This is where discovery, diligence, and discipline create extraordinary long-term wealth."
        maxWidth="max-w-3xl"
        highlights={{
          "Our Flagship. Our Edge.": "text-primary",
        }}
      />

      {/* Mobile Layout - Single Column */}
      <div className=" lg:hidden space-y-4 mt-12">
        <div className="grid grid-cols-[68%_28%] gap-4">
          {/* #1 Card */}
          <div className="bg-[#F6F9FC] rounded-2xl p-6 h-[131px] flex flex-col justify-between">
            <div className="text-2xl leading-6 font-bold">#1</div>
            <p className="text-xs text-black leading-5">
              Small-cap index was the best performing segment in 6 of the last 10
              years.
            </p>
          </div>

          {/* Landscape Image */}
          <div className="bg-white rounded-2xl overflow-hidden h-[131px]">
            <Image
              src={Col2Row1}
              alt="Mountain Road"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 80% Card */}
        <div className="bg-[#6A48E8] text-white rounded-2xl py-6 px-4 h-[207px] flex flex-col justify-between">
          <div className="text-2xl leading-6 font-bold mb-4">80%</div>
          <p className="text-sm leading-6 opacity-90">
            Of small caps cater to domestic demand, reducing global volatility
            impact.
          </p>
        </div>

        <div className="grid grid-cols-[28%_68%] gap-4">

          {/* Building Image */}
          <div className="bg-white rounded-2xl overflow-hidden h-[163px]">
            <Image
              src={Col2Row2}
              alt="Modern Buildings"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 70%+ Card */}
          <div className="bg-[#B8B5FF] text-black rounded-2xl py-6 px-4 h-[163px]">
            <div className="text-2xl leading-6 font-bold mb-4">70%+</div>
            <p className="text-sm leading-6 opacity-90">
              Of listed Indian companies are small caps — under-researched,
              under-owned.
            </p>
          </div>

          
        </div>
      </div>

      {/* Desktop Layout - Three Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-5 mt-16 h-[600px]">
        {/* Column 1 - Single large card */}
        <div className="bg-[#F6F9FC] rounded-2xl p-8 w-full h-full flex flex-col justify-between">
          <div className="text-[44px] font-bold text-black mb-6">#1</div>
          <p className="text-2xl leading-[36px] font-[400]">
            Small-cap index was the best performing segment in 6 of the last 10
            years.
          </p>
        </div>

        {/* Column 2 - Two rows with equal height */}
        <div className="flex flex-col gap-5 h-full">
          {/* Top: Landscape image - exactly half height */}
          <div className="bg-white rounded-2xl overflow-hidden h-[285px] w-full">
            <Image
              src={Col2Row1}
              alt="Mountain Road"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom: 80% purple card - exactly half height */}
          <div className="bg-primary text-white rounded-2xl p-6 h-[285px] w-full flex flex-col justify-between">
            <div  className="text-[44px] font-bold leading-[58px]">70%+</div>
            <p className="text-2xl opacity-90 leading-[36px] font-[400]">
              Of listed Indian companies are small caps — under-researched, under-owned
            </p>
          </div>
        </div>

        {/* Column 3 - Two rows with equal height */}
        <div className="flex flex-col gap-5 h-full">
          {/* Top: 70%+ purple card - exactly half height */}
          <div className="bg-primary text-white rounded-2xl p-6 h-[285px] w-full flex flex-col justify-between">
            <div className="text-[44px] font-bold leading-[58px]">80%</div>
            <p className="text-2xl opacity-90 leading-[36px] font-[400]">
              Of small caps cater to domestic demand, reducing global volatility impact.
            </p>
          </div>

          {/* Bottom: Building image - exactly half height */}
          <div className="bg-white rounded-2xl overflow-hidden h-[285px] w-full">
            <Image
              src={Col2Row2}
              alt="Modern Buildings"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Tablet Layout - Two Column Grid */}
      <div className="hidden md:block lg:hidden mt-12">
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* #1 Card - spans 2 columns */}
          <div className="col-span-2 bg-[#F6F9FC] rounded-2xl p-6 h-40">
            <div className="text-6xl font-bold text-black mb-4">#1</div>
            <p className="text-sm text-gray-600">
              Small-cap index was the best performing segment in 6 of the last
              10 years.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Left column */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl overflow-hidden h-48">
              <Image
                src={Col2Row1}
                alt="Mountain Road"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-purple text-white rounded-2xl p-6 h-48">
              <div className="text-5xl font-bold mb-4">70%+</div>
              <p className="text-sm opacity-90">
                Of listed Indian companies are small caps — under-researched,
                under-owned.
              </p>
            </div>
          </div>

          <div
          >
            {/* Right column */}
            <div className="space-y-5">
              <div className="bg-primary text-white rounded-2xl p-6 h-48">
                <div className="text-5xl font-bold mb-4">80%</div>
                <p className="text-sm opacity-90">
                  Of small caps cater to domestic demand, reducing global
                  volatility impact.
                </p>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden h-48">
                <Image
                  src={Col2Row2}
                  alt="Modern Buildings"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OurEdge;
