import React, { useState, useRef } from "react";
import { gsap } from "@/lib/gsap/gsapSetup";
import { useGsapAnimation } from "@/hooks/useGsapAnimation";
import { createHorizontalScroll } from "@/lib/gsap/animations/createHorizontalScroll";
import { ScrollManager } from "@/lib/gsap/scrollManager";

interface ProcessStep {
  topText?: string;
  bottomText?: string;
}

interface HorizontalScrollProgressProps {
  title?: string;
  steps: ProcessStep[];
}

const HorizontalScrollProgress: React.FC<HorizontalScrollProgressProps> = ({
  title = "Investment Process",
  steps,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<any>(null);

  const ref = useGsapAnimation(
    (ctx) => {
      // Use querySelector on ref.current, not ctx.selector
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

      // Create horizontal scroll using utility
      const trigger = createHorizontalScroll({
        trigger: wrapper,
        target: sections,
        pin: true,
        scrub: 0.5,
        start: "top top",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (progress: any) => {
          // Direct DOM manipulation (better performance than setState)
          gsap.set(progressLine, { width: `${progress * 100}%` });
          // Only setState for visual updates (dots)
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

  const getStepProgress = (index: number): boolean => {
    if (steps.length <= 1) return currentProgress > 0;
    const stepThreshold = index / (steps.length - 1);
    return currentProgress >= stepThreshold - 0.01;
  };

  return (
    <div ref={ref}>
      <div className="scroll-wrapper relative w-full h-screen overflow-hidden bg-white">
        {/* Fixed Title */}
        <div className="absolute top-20 md:top-36 left-8 md:left-14 z-20">
          <h1 className="text-2xl md:text-4xl leading-9 font-normal">
            {title}
          </h1>
        </div>

        <div className="scroll-sections flex h-full items-center mt-8">
          {/* Progress Line Section */}
          <section
            className="h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-14"
            style={{ width: `${steps.length * 50}vw` }}
          >
            <div className="w-full relative">
              {/* Gray Background Line */}
              <div className="relative h-2 w-full bg-gray-300 rounded-full">
                {/* Purple Progress Line */}
                <div
                  ref={progressLineRef}
                  className="absolute top-0 left-0 h-2 bg-indigo-500 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>

              {/* Steps */}
              <div
                className="absolute top-0 w-full left-0 right-0 flex justify-between"
                style={{ transform: "translateY(-50%)" }}
              >
                {steps.map((step, index) => {
                  const isProgressed = getStepProgress(index);

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col items-center"
                    >
                      {/* Top Text */}
                      {step.topText && (
                        <div className="absolute bottom-full mb-6 md:mb-8 left-0 text-left w-32 md:w-72">
                          <p className="text-xs md:text-base text-gray-700 leading-4 md:leading-7">
                            {step.topText}
                          </p>
                        </div>
                      )}

                      {/* Dot SVG */}
                      <div className="relative z-10 mt-2">
                        {isProgressed ? (
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="22.5"
                              cy="22.5"
                              rx="21.8711"
                              ry="21.8738"
                              fill="#B8B5FF"
                              fillOpacity="0.5"
                            />
                            <ellipse
                              cx="22.5"
                              cy="22.5"
                              rx="8.32867"
                              ry="8.32969"
                              fill="#6366F1"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="45"
                            height="45"
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
                        <div className="absolute top-full mt-6 md:mt-8 left-4 text-left w-32 md:w-72">
                          <p className="text-xs md:text-base text-gray-700 leading-4 md:leading-7">
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

export default HorizontalScrollProgress;
