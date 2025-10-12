import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlexibleHeading from "../ui/FlexibleHeading";
import Container from "../Reusable/Container";
import { StrategiesImg, StrategiesTwo, StrategiesThree } from "@/assets/PMS/index";

gsap.registerPlugin(ScrollTrigger);

const Strategies: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const leftTextRef = useRef<HTMLParagraphElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const leftSubRef = useRef<HTMLHeadingElement>(null);
  const rightSubRef = useRef<HTMLHeadingElement>(null);

  const imgRefs = useRef<HTMLImageElement[]>([]);

  const [currentStep, setCurrentStep] = useState(0);

  const leftStrategyContent = [
    { subheading: "Objective", objective: "Capture the outsized wealth creation potential of emerging leaders in the ₹1,000–10,000 Cr market-cap range." },
    { subheading: "Goal", objective: "Deep forensic diligence, governance-first screening, and concentrated allocations in 15–18 stocks." },
    { subheading: "Mission", objective: "HNIs & Family Offices seeking high-alpha, long-horizon compounding." }
  ];

  const rightStrategyContent = [
    { subheading: "Objective", objective: "Blend stability of large caps with the scalability of mid & small caps." },
    { subheading: "Goal", objective: "A balanced portfolio of 18–20 stocks across the market-cap spectrum, designed for consistency across cycles." },
    { subheading: "Mission", objective: "Investors seeking smoother compounding with lower volatility than a pure small-cap portfolio." }
  ];

  const images = [StrategiesImg, StrategiesTwo, StrategiesThree];

  useEffect(() => {
    // Preload images
    images.forEach((img) => {
      const src = typeof img === "string" ? img : (img as any).src;
      const image = new Image();
      image.src = src;
    });

    const section = sectionRef.current;
    const wrapper = contentWrapperRef.current;
    if (!section || !wrapper) return;

    // Set initial state - first image visible, others hidden
    imgRefs.current.forEach((img, i) => {
      if (img) {
        gsap.set(img, { opacity: i === 0 ? 1 : 0 });
      }
    });

    const totalSteps = images.length;
    const scrollHeight = window.innerHeight * totalSteps;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollHeight}`,
        scrub: 1,
        pin: wrapper,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const step = Math.min(Math.floor(progress * totalSteps), totalSteps - 1);

          if (step !== currentStep) {
            setCurrentStep(step);
          }
        }
      }
    });

    // Animate between each step
    for (let i = 0; i < totalSteps - 1; i++) {
      const startProgress = i / totalSteps;

      // Fade out current image, fade in next image
      tl.to(imgRefs.current[i], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, startProgress)
        .to(imgRefs.current[i + 1], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut"
        }, startProgress);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("*");
    };
  }, [currentStep]);

  return (
    <div ref={sectionRef} className="relative">
      <Container
        disablePaddingTopDesktop
        disablePaddingBottomMobile
        disableYSpacing
        ref={contentWrapperRef as any}
        className="min-h-screen lg:pt-24 lg:mt-24 flex flex-col justify-start items-center py-12 lg:py-0"
      >
        <FlexibleHeading
          title="Our PMS Strategies"
          highlights={{ Strategies: "text-primary" }}
          isMB={false}
          className="xl:mb-14 lg:mb-4"
        />

        <div className="flex flex-col lg:grid grid-cols-3 justify-start items-center gap-3 lg:gap-x-4 xl:gap-[21px]">
          {/* Left Card */}
          <div className="p-6 md:p-8 bg-[#ffffff] flex flex-col justify-between rounded-[12px] w-full h-[196px] md:h-[250px] lg:h-[400px]">
            <h3 className="text-xl md:text-[24px] lg:text-[26px] text-[#000000] mb-3 lg:mb-4 leading-tight">
              Aurum Small <span className="text-primary">Cap Opportunities</span>
            </h3>
            <div className="overflow-hidden relative flex-1 flex flex-col justify-end">
              <h4 ref={leftSubRef} className="text-base md:text-[20px] lg:text-2xl text-[#000000] mb-2 font-medium">
                {leftStrategyContent[currentStep].subheading}
              </h4>
              <p ref={leftTextRef} className="text-sm md:text-base lg:text-lg text-[#484848] leading-[22px] lg:leading-[31px]">
                {leftStrategyContent[currentStep].objective}
              </p>
            </div>
          </div>

          {/* Center Images */}
          <div className="w-full h-[168px] md:h-[300px] lg:h-[400px] rounded-[12px] overflow-hidden bg-[#ffffff] relative flex-shrink-0">
            {images.map((img, i) => (
              <img
                key={i}
                ref={(el) => {
                  if (el) imgRefs.current[i] = el;
                }}
                src={typeof img === "string" ? img : (img as any).src}
                alt={`strategy-${i}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  pointerEvents: "none"
                }}
              />
            ))}
          </div>

          {/* Right Card */}
          <div className="p-6 md:p-8 bg-[#ffffff] flex flex-col justify-between rounded-[12px] w-full h-[196px] md:h-[250px] lg:h-[400px]">
            <h3 className="text-xl md:text-[24px] lg:text-[26px] text-[#000000] mb-3 lg:mb-4 leading-tight">
              Aurum <span className="text-primary">Multiplier Portfolio</span>
            </h3>
            <div className="overflow-hidden relative flex-1 flex flex-col justify-end">
              <h4 ref={rightSubRef} className="text-base md:text-[20px] lg:text-2xl text-[#000000] mb-2 font-medium">
                {rightStrategyContent[currentStep].subheading}
              </h4>
              <p ref={rightTextRef} className="text-sm md:text-base lg:text-lg text-[#484848] leading-[22px] lg:leading-[31px]">
                {rightStrategyContent[currentStep].objective}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Strategies;