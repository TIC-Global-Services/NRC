"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProcessStep {
  topText?: string;
  bottomText?: string;
}

interface VerticalZigZagProgressProps {
  title?: string;
  steps: ProcessStep[];
}

const VerticalZigZagProgress: React.FC<VerticalZigZagProgressProps> = ({
  title = "Investment Process",
  steps,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.8"],
  });

  // Line progress height (0% → 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setCurrentIndex(Math.round(v * (steps.length - 1)));
    });
    return unsubscribe;
  }, [scrollYProgress, steps.length]);

  return (
    <div ref={containerRef} className="relative bg-white py-24">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-normal text-center mb-16">
        {title}
      </h1>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gray-300 h-full rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-indigo-500 rounded-full origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-24 relative z-10">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0; // zig-zag pattern
            const isActive = index <= currentIndex;

            return (
              <div
                key={index}
                className={`relative flex items-center ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Text Block */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`w-1/2 px-4 md:px-8 ${
                    isLeft ? "text-right pr-6 md:pr-10" : "text-left pl-6 md:pl-10"
                  }`}
                >
                  {step.topText && (
                    <p className="text-sm md:text-lg text-gray-700 mb-3">
                      {step.topText}
                    </p>
                  )}
                  {step.bottomText && (
                    <p className="text-sm md:text-lg text-gray-700 mb-3">
                      {step.bottomText}
                    </p>
                  )}
                </motion.div>

                {/* Dot */}
                <div className="relative z-20 flex items-center justify-center">
                  {isActive ? (
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="z-20"
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
                      className="z-20"
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

                {/* Empty Spacer to balance layout */}
                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalZigZagProgress;
