"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlexibleHeading from "../ui/FlexibleHeading";
import Container from "../Reusable/Container";
import { StrategiesImg, StrategiesTwo, StrategiesThree } from "@/assets/PMS/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Strategies: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const leftStrategyContent = [
    {
      subheading: "Objective",
      objective:
        "Capture the outsized wealth creation potential of emerging leaders in the ₹1,000–10,000 Cr market-cap range.",
    },
    {
      subheading: "Goal",
      objective:
        "Deep forensic diligence, governance-first screening, and concentrated allocations in 15–18 stocks.",
    },
    {
      subheading: "Mission",
      objective:
        "HNIs & Family Offices seeking high-alpha, long-horizon compounding.",
    },
  ];

  const rightStrategyContent = [
    {
      subheading: "Objective",
      objective:
        "Blend stability of large caps with the scalability of mid & small caps.",
    },
    {
      subheading: "Goal",
      objective:
        "A balanced portfolio of 18–20 stocks across the market-cap spectrum, designed for consistency across cycles.",
    },
    {
      subheading: "Mission",
      objective:
        "Investors seeking smoother compounding with lower volatility than a pure small-cap portfolio.",
    },
  ];

  const images = [StrategiesImg, StrategiesTwo, StrategiesThree];

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative bg-white">
      <Container
        disablePaddingTopDesktop
        disablePaddingBottomMobile
        disableYSpacing
        className=" flex flex-col justify-start items-center py-12 lg:py-0 lg:pb-20"
      >
        <FlexibleHeading
          title="Our PMS Strategies"
          highlights={{ Strategies: "text-primary" }}
          isMB={false}
          className="xl:mb-14 lg:mb-4"
        />

        {/* Cards + Image Grid */}
        <div className="flex flex-col lg:grid grid-cols-3 justify-start items-center gap-6 lg:gap-x-6 xl:gap-[21px] w-full">
          {/* Left Card */}
          <motion.div
            key={currentStep + "-left"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8 bg-[#ffffff] flex flex-col justify-between rounded-[12px] w-full h-[220px] md:h-[250px] lg:h-[400px]"
          >
            <h3 className="text-xl md:text-[24px] lg:text-[26px] text-[#000000] mb-3 lg:mb-4 leading-tight">
              Aurum Small <span className="text-primary">Cap Opportunities</span>
            </h3>
            <div className="overflow-hidden relative flex-1 flex flex-col justify-end">
              <h4 className="text-base md:text-[20px] lg:text-2xl text-[#000000] mb-2 font-medium">
                {leftStrategyContent[currentStep].subheading}
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-[#484848] leading-[22px] lg:leading-[31px]">
                {leftStrategyContent[currentStep].objective}
              </p>
            </div>
          </motion.div>

          {/* Center Image with Fade */}
          <div className="w-full h-[180px] md:h-[300px] lg:h-[400px] rounded-[12px] overflow-hidden bg-[#ffffff] relative flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentStep}
                src={
                  typeof images[currentStep] === "string"
                    ? (images[currentStep] as string)
                    : (images[currentStep] as any).src
                }
                alt={`strategy-${currentStep}`}
                className="absolute inset-0 w-full h-full object-cover rounded-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          {/* Right Card */}
          <motion.div
            key={currentStep + "-right"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8 bg-[#ffffff] flex flex-col justify-between rounded-[12px] w-full h-[220px] md:h-[250px] lg:h-[400px]"
          >
            <h3 className="text-xl md:text-[24px] lg:text-[26px] text-[#000000] mb-3 lg:mb-4 leading-tight">
              Aurum <span className="text-primary">Multiplier Portfolio</span>
            </h3>
            <div className="overflow-hidden relative flex-1 flex flex-col justify-end">
              <h4 className="text-base md:text-[20px] lg:text-2xl text-[#000000] mb-2 font-medium">
                {rightStrategyContent[currentStep].subheading}
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-[#484848] leading-[22px] lg:leading-[31px]">
                {rightStrategyContent[currentStep].objective}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gray-300 hover:border-primary flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </button>
          <div className="text-sm md:text-base text-gray-700 tracking-wide">
            {currentStep + 1} / {images.length}
          </div>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gray-300 hover:border-primary flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Strategies;
