import React from "react";
import { motion } from "framer-motion";
import Container from "../Reusable/Container";
import Image from "next/image";
import { FounderImg, FounderImgTablet } from "@/assets/Home";
import SlideUpText from "../ui/SlideUpText";

const FounderComponent = () => {
  return (
    <Container isNavbar className="sfPro md:pt-16">
      <motion.section
        className=""
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.8,
            staggerChildren: 0.2,
          },
        }}
      >
        <div className="max-w-7xl mx-auto sfPro">
          <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] items-center ">
            {/* Left side - Image */}
            <motion.div className="relative h-[100%]">
              <h1 className="text-2xl md:text-5xl leading-8 lg:hidden block text-center mb-5 md:mb-8">
                From The Founder&apos;s Desk
              </h1>
              <div className=" md:rounded-2xl rounded-[8px] overflow-hidden ">
                <Image
                  src={FounderImg}
                  alt="Sandeep Daga - Founder, MD & CIO"
                  className="w-full md:h-[45vh] lg:h-[100vh] 2xl:h-[90vh] object-cover md:rounded-2xl rounded-[8px]  md:hidden lg:block"
                />
                <Image
                  src={FounderImgTablet}
                  alt="Sandeep Daga - Founder, MD & CIO"
                  className="w-full md:h-[45vh] lg:h-[100vh] 2xl:h-[90vh] object-cover md:rounded-2xl rounded-[8px] hidden md:block lg:hidden"
                />
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              }}
              className="flex flex-col justify-between rounded-r-[20px] md:bg-[#F5F5F7] h-[94%] pl-[5%] pr-[3%] py-[3%]"
            >
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
                className="lg:block hidden"
              >
                <SlideUpText animationMode="always">
                  <h2 className="text-4xl lg:text-5xl font-medium md:leading-[54px]">
                    From
                    <br />
                    <span className="">The Founder&apos;s</span>
                    <br />
                    <span className="">Desk</span>
                  </h2>
                </SlideUpText>
              </motion.div>

              {/* Quote/Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                {/* Founder Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                    },
                  }}
                  className="md:mb-6 mb-3"
                >
                  <SlideUpText animationMode="always">
                    <h3 className="text-2xl leading-7 md:leading-[51px] md:text-3xl font-normal ">
                      Sandeep <span className="text-primary">Daga</span>
                    </h3>
                  </SlideUpText>
                  <SlideUpText animationMode="always">
                    <p className="text-secondary text-base leading-6 md:text-lg font-normal">
                      Founder, MD & CIO
                    </p>
                  </SlideUpText>
                </motion.div>

                <SlideUpText animationMode="always">
                  <p className="text-secondary font-[400] text-sm leading-6 md:text-lg lg:text-base md:leading-relaxed">
                    As the founder, I bring a passion for identifying
                    undervalued small cap companies with strong fundamentals and
                    compelling growth prospects. During my private equity
                    career, prior to founding NRC, I witnessed firsthand the
                    transformative power of several SMEs headed by dynamic
                    entrepreneurs and it is this conviction that drives our
                    investment philosophy. We believe that through meticulous
                    research, rigorous diligence and a comprehensive
                    understanding of market dynamics it is possible to identify
                    investment themes and companies that exhibit exponential
                    growth prospects.
                  </p>
                </SlideUpText>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Container>
  );
};

export default FounderComponent;