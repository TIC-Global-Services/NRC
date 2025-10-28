import React, { useRef, useState } from "react";
import { gsap } from "@/lib/gsap/gsapSetup";
import { useGsapAnimation } from "@/hooks/useGsapAnimation";
import { createHorizontalScroll } from "@/lib/gsap/animations/createHorizontalScroll";
import { ScrollManager } from "@/lib/gsap/scrollManager";

// TypeScript Interfaces
interface ProcessStep {
  topText?: string;
  bottomText?: string;
}

interface MobileScrollProgressProps {
  title?: string;
  steps: ProcessStep[];
}

const MobileScrollProgress: React.FC<MobileScrollProgressProps> = ({
  title = "Investment Process",
  steps,
}) => {
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const scrollTriggerInstance = useRef<any>(null);

  const ref = useGsapAnimation(
    (ctx) => {
      const container = ref.current;
      if (!container) return;

      const wrapper = container.querySelector(".scroll-wrapper") as HTMLElement;
      const sections = container.querySelector(
        ".scroll-sections"
      ) as HTMLElement;
      const progressLine = progressLineRef.current;

      if (!wrapper || !sections || !progressLine) return;

      // Kill existing trigger
      if (scrollTriggerInstance.current) {
        ScrollManager.kill(scrollTriggerInstance.current);
      }

      // Create horizontal scroll animation
      const trigger = createHorizontalScroll({
        trigger: wrapper,
        target: sections,
        pin: true,
        scrub: 1,
        start: "top top",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (progress: any) => {
          // Direct DOM manipulation for better performance
          progressLine.style.width = `${progress * 100}%`;
          setCurrentProgress(progress);
        },
      });

      scrollTriggerInstance.current = trigger;

      // Cleanup function
      return () => {
        if (scrollTriggerInstance.current) {
          ScrollManager.kill(scrollTriggerInstance.current);
          scrollTriggerInstance.current = null;
        }
      };
    },
    [steps.length]
  );

  return (
    <div ref={ref}>
      <div
        className="scroll-wrapper relative w-full overflow-hidden"
        style={{ height: "60vh" }}
      >
        {/* Fixed Title */}
        <div className="absolute top-20 lg:top-36 left-8 md:left-14 z-20">
          <h1 className="text-2xl lg:text-4xl leading-9 font-normal">
            {title}
          </h1>
        </div>

        <div
          className="scroll-sections flex items-center will-change-transform"
          style={{ height: "60vh" }}
        >
          {/* Progress Line Section */}
          <section
            className="flex-shrink-0 flex flex-col justify-center px-6"
            style={{ width: `${steps.length * 50}vw`, height: "60vh" }}
          >
            <div className="w-full relative">
              {/* Gray Background Line */}
              <div className="relative h-1.5 w-full bg-gray-300 rounded-full">
                {/* Purple Progress Line */}
                <div
                  ref={progressLineRef}
                  className="absolute top-0 left-0 h-1.5 bg-[#6366F1] rounded-full transition-all duration-100"
                  style={{ width: "0%" }}
                />
              </div>

              {/* Steps */}
              <div
                className="absolute top-[3px] w-full left-0 right-0 flex justify-between"
                style={{ transform: "translateY(-50%)" }}
              >
                {steps.map((step, index) => {
                  const stepProgress =
                    steps.length === 1 ? 0 : index / (steps.length - 1);
                  const isProgressed =
                    currentProgress * 100 >= stepProgress * 100;

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col items-center"
                    >
                      {/* Top Text */}
                      {step.topText && (
                        <div className="absolute bottom-full mb-2 left-0 text-left w-[120px]">
                          <p className="text-xs text-gray-700 leading-tight">
                            {step.topText}
                          </p>
                        </div>
                      )}

                      {/* Dot SVG - Smaller for mobile */}
                      <div className="relative z-10">
                        {isProgressed ? (
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="22.6338"
                              cy="22.823"
                              rx="21.8711"
                              ry="21.8738"
                              fill="#B8B5FF"
                              fillOpacity="0.5"
                            />
                            <ellipse
                              cx="22.6343"
                              cy="22.8238"
                              rx="8.32867"
                              ry="8.32969"
                              fill="#6A48E8"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="22.5"
                              cy="22.5"
                              rx="21.8711"
                              ry="21.8738"
                              fill="#484848"
                              fillOpacity="0.2"
                            />
                            <ellipse
                              cx="22.5"
                              cy="22.5"
                              rx="8.33"
                              ry="8.33102"
                              fill="#B4B0B0"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Bottom Text */}
                      {step.bottomText && (
                        <div className="absolute top-full mt-2 left-3 text-left w-[120px]">
                          <p className="text-xs text-gray-700 leading-tight">
                            {step.bottomText}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MobileScrollProgress;