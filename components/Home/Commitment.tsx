import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { CenterLogo } from "@/assets/Home";
import {
  TopRightIcon,
  TopCenterIcon,
  TopLeftIcon,
  BottomCenterIcon,
  BottomRightIcon,
  BottomLeftIcon,
} from "@/assets/Home/Commitment/IconsSVGs";
import Image from "next/image";
import Container from "../Reusable/Container";
import AnimatedButton from "../ui/animatedButton";
import SlideUpText from "../ui/SlideUpText";

const Commitment = () => {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // SVG data with better positioning
  const svgData = [
    {
      id: 1,
      svg: TopLeftIcon,
      position: { top: "30%", left: "10%" },
      order: 0,
      name: "TopLeft",
    },
    {
      id: 2,
      svg: TopCenterIcon,
      position: { top: "24%", left: "35%" },
      order: 1,
      name: "TopCenter",
    },
    {
      id: 3,
      svg: TopRightIcon,
      position: { top: "10%", right: "5%" },
      order: 2,
      name: "TopRight",
    },
    {
      id: 4,
      svg: BottomLeftIcon,
      position: { bottom: "10%", left: "5%" },
      order: 3,
      name: "BottomLeft",
    },
    {
      id: 5,
      svg: BottomCenterIcon,
      position: { bottom: "5%", left: "50%" },
      order: 4,
      name: "BottomCenter",
    },
    {
      id: 6,
      svg: BottomRightIcon,
      position: { bottom: "10%", right: "5%" },
      order: 5,
      name: "BottomRight",
    },
  ];

  // Calculate current step based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const step = Math.min(
        Math.floor(progress * (svgData.length + 1)),
        svgData.length
      );
      setCurrentStep(step);
    });
    return unsubscribe;
  }, [scrollYProgress, svgData.length]);

  return (
    <div ref={containerRef} className="h-[400vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden ">
        <Container isNavbar={true} className="mt-16">
          <div className="h-full flex items-center justify-center ">
            {/* Main Content Container */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-12 items-center">
              {/* Left Content Section */}
              <div className="flex flex-col justify-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <SlideUpText animationMode="always">
                    <h1 className="text-4xl lg:text-5xl font-light text-black mb-4 leading-tight">
                      Our <span className="text-primary">Commitment</span>
                    </h1>
                  </SlideUpText>

                  <SlideUpText animationMode="always">
                    <p className="text-base text-[#63636A] leading-relaxed mb-4 max-w-lg">
                      At the heart of everything we do is a strong commitment to
                      delivering exceptional value to our clients. We believe
                      our success is defined by the success of those we serve.
                      With trust as our foundation, we uphold the highest
                      standards of professionalism, transparency, and integrity
                      in every step of our journey.
                    </p>
                  </SlideUpText>
                  <AnimatedButton label="Know More" delay={0.6} />
                </motion.div>
              </div>

              {/* Right Animation Area */}
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Center Logo */}
                <motion.div
                  className="absolute top-1/2 left-1/2 p-8 bg-[#F2F3FD] border border-[#D8D9DE] rounded-lg transform -translate-x-1/2 -translate-y-1/2 z-30 "
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                >
                  <Image
                    src={CenterLogo}
                    alt="Img"
                    className=""
                    width={100}
                    height={100}
                  />
                </motion.div>

                {/* Animated SVG Icons */}
                {svgData.map((item, index) => {
                  const isVisible = index < currentStep;
                  const IconComponent = item.svg;

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute z-20"
                      style={{
                        ...item.position,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0.5,
                        y: isVisible ? 0 : 20,
                      }}
                      transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 150,
                        delay: index * 0.1,
                      }}
                    >
                      <div className="transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <IconComponent />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Commitment;