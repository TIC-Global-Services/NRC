"use client";

import Image from "next/image";
import Badge from "../ui/badge";
import { useState, useEffect } from "react";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";

const features = [
  "12+ Years Track Record",
  "Founder-led, PE pedigree",
  "High-conviction investing",
  "HNI & Family Office focus",
  "Alignment of interest",
  "Research-driven strategies",
  "Boutique, not mass-market",
  "Risk-first framework",
];

export default function SelectiveDesignSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className=" w-full bg-white">
      {/* Content Overlay */}
      <div className=" z-10 flex flex-col items-center justify-center pt-12">
        <Container isNavbar>
          {/* Header Section */}
          <div className="md:mb-14 mb-8 text-center">
            <Badge label="Why Nine Rivers" className="mb-4" />

            <SlideUpText animationMode="always">
              <h1 className="mb-2 text-[26px] md:text-5xl   font-[400] leading-8 md:leading-[58px]">
                Selective by Design.
              </h1>
            </SlideUpText>
            <SlideUpText animationMode="always">
              <p className="text-sm md:text-base text-secondary leading-6 md:leading-relaxed max-w-lg md:mx-auto font-[400]">
                We are not an asset-gatherer. We selectively partner with
                investors who share our long-term vision.
              </p>
            </SlideUpText>
          </div>

          {/* Features Grid */}
          <div className="grid w-full max-w-6xl items-center justify-center grid-cols-1 md:grid-cols-2 gap-4 sm:flex flex-col lg:flex xl:gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center justify-center">
              {features.slice(0, isMobile ? 2 : 4).map((feature, index) => (
                <div
                  key={index}
                  className="md:rounded-2xl w-full rounded-md self-center justify-self-center bg-[#F6F9FC] px-5  py-4 text-center   hover:scale-105  "
                >
                  <SlideUpText animationMode="always">
                    <p className="text-xs leading-8 font-medium text-black xl:text-lg">
                      {feature}
                    </p>
                  </SlideUpText>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center justify-center">
              {features
                .slice(isMobile ? 2 : 4, isMobile ? 4 : 8)
                .map((feature, index) => (
                  <div
                    key={index}
                    className="md:rounded-2xl w-full rounded-xl self-center justify-self-center bg-[#F6F9FC] px-5  py-4 text-center   hover:scale-105  "
                  >
                    <SlideUpText animationMode="always">
                      <p className="text-xs font-medium text-black xl:text-lg">
                        {feature}
                      </p>
                    </SlideUpText>
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 items-center justify-center">
              {features
                .slice(isMobile ? 4 : 8, isMobile ? 6 : 10)
                .map((feature, index) => (
                  <div
                    key={index}
                    className="md:rounded-2xl w-full rounded-xl self-center justify-self-center bg-[#F6F9FC] px-5  py-4 text-center   hover:scale-105  "
                  >
                    <SlideUpText animationMode="always">
                      <p className="text-xs font-medium text-black xl:text-lg">
                        {feature}
                      </p>
                    </SlideUpText>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 items-center justify-center md:hidden">
              {features.slice(6, 8).map((feature, index) => (
                <div
                  key={index}
                  className="md:rounded-2xl w-full rounded-xl self-center justify-self-center bg-[#F6F9FC] px-5  py-4 text-center   hover:scale-105  "
                >
                  <SlideUpText animationMode="always">
                    <p className="text-xs font-medium text-black sm:text-lg">
                      {feature}
                    </p>
                  </SlideUpText>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 items-center justify-center md:hidden">
              {features.slice(8, 10).map((feature, index) => (
                <div
                  key={index}
                  className="md:rounded-2xl w-full rounded-xl self-center justify-self-center bg-[#F6F9FC] px-5  py-4 text-center   hover:scale-105  "
                >
                  <SlideUpText animationMode="always">
                    <p className="text-xs font-medium text-black sm:text-lg">
                      {feature}
                    </p>
                  </SlideUpText>
                </div>
              ))}
            </div>
          </div>
        </Container>

        <Image
          src="/selectiveDesign.png"
          alt="Serene river flowing through lush green landscape"
          className="object-cover h-[212px] md:h-auto"
          width={1530}
          height={400}
        />
      </div>
    </section>
  );
}
