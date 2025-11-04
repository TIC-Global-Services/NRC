"use client";

import { Whoweare, WhoweareWider } from "@/assets/About";
import Image from "next/image";
import React, { useRef } from "react";
import SlideUpText from "../ui/SlideUpText";

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col lg:grid lg:grid-cols-[45%_55%] mx-auto 
      px-4 md:px-8 lg:px-16 py-12 md:py-20 lg:py-28 gap-y-10 lg:gap-x-12"
    >
      {/* Left: Image (Top on mobile) */}
      <div
        ref={imageRef}
        className="relative w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={WhoweareWider}
          alt="Who we are"
          className="block lg:hidden w-full h-[320px] md:h-[450px] object-cover rounded-xl"
          width={800}
          height={450}
          priority
        />
        <Image
          src={Whoweare}
          alt="Who we are"
          className="hidden lg:block w-full h-auto rounded-xl aspect-4/3 object-cover"
          width={720}
          height={820}
          priority
        />
      </div>

      {/* Right: Text (Pinned on Desktop) */}
      <div
        ref={contentRef}
        className="relative lg:self-center bg-white/0"
        style={{ willChange: "transform" }}
      >
        <SlideUpText className="text-[26px] md:text-[36px] lg:text-[44px] font-normal leading-[1.2] md:leading-[1.3] text-black mb-5">
          Who <span className="text-primary">we are</span>
        </SlideUpText>

        <SlideUpText className="text-secondary text-base md:text-lg lg:text-[20px] leading-[1.7] max-w-xl">
          Nine Rivers Capital is an independent asset management and corporate
          advisory group that helps high-net-worth individuals and family offices
          build, preserve and grow wealth through bespoke PMS and AIF strategies
          and strategic corporate advisory. We combine long-term,
          research-driven investing with active stewardship to identify
          asymmetric, mid-market, and growth opportunities across sectors.
        </SlideUpText>
      </div>
    </section>
  );
};

export default WhoWeAre;
