"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsapSetup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../ui/animatedButton";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const router = useRouter();

  // Refs for animation targets
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, descRef.current, btnRef.current], {
        opacity: 0,
        y: 40,
      });

      // Timeline for smooth staggered intro
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.to(titleRef.current, { opacity: 1, y: 0 })
        .to(descRef.current, { opacity: 1, y: 0 }, "-=0.9")
        .to(btnRef.current, { opacity: 1, y: 0 }, "-=0.8");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden"
    >
      {/* === Background Video === */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        playsInline
        autoPlay
        loop
        muted
        preload="auto"
      >
        <source src="/Hero/NRC_River_Enhanced1.mp4" type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* === Overlay Content === */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 flex flex-col items-center justify-start text-center px-4 z-30 gothicFont w-full">
        <div
          ref={titleRef}
          className="font-light mb-3 md:mb-4"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            lineHeight: "1.2",
          }}
        >
          <span className="text-black font-[400]">
            Investing For Long Term&nbsp;
          </span>
          <span className="text-[#8B5CF6] font-normal">Value Creation</span>
        </div>

        <div
          ref={descRef}
          className="font-light text-[#484848] mb-6"
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)",
            lineHeight: "clamp(1.4rem, 2vw, 2rem)",
            maxWidth: "700px",
          }}
        >
          At Nine Rivers Capital, we apply private-equity rigor to public
          markets with curated portfolio strategies for HNIs and Family Offices.
        </div>

        <div ref={btnRef}>
          <AnimatedButton
            isBtnScale={false}
            label="Explore Our PMS"
            delay={0.5}
            onClick={() => router.push("/pms")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
