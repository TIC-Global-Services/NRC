"use client";
import { motion } from "framer-motion";
import Container from "../Reusable/Container";
import Image from "next/image";
import {
  WhoweareImg1,
  WhoweareImg2,
  WhoweareImg3,
  WhoweareImg4,
} from "@/assets/Home";
import SlideUpText from "../ui/SlideUpText";

const WhoWeServeSection = () => {
  return (
    <Container disablePaddingBottomMobile disablePaddingTopMobile disablePaddingTopDesktop className="py-12 lg:py-0">
      <motion.section
        className="bg-primary overflow-hidden md:h-[90vh] lg:h-auto  rounded-[12px]  pb-32 md:p-4 lg:p-0 lg:pb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto lg:h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr] gap-8 lg:gap-12 items-center lg:h-full">
            {/* Left Content */}
            <motion.div
              className="space-y-8 relative p-6 lg:p-10 flex flex-col justify-between h-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-5">
                <div className="flex justify-center w-36 cursor-pointer text-white px-4 py-2 md:px-4 md:py-2 rounded-full md:text-base font-medium gap-2 md:gap-3 text-sm transition-colors duration-300 border border-[#8F8CF0]/100 shadow-[inset_0px_4px_4px_0px_#8263F6] bg-[#6A48E8]">
                  Who we serve
                </div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                  <h2 className="text-[26px] md:text-5xl  font-[400] text-white leading-8 md:leading-[58px]">
                    <SlideUpText animationMode="always">
                      Built for HNIs, Family Offices & Long-Term Thinkers
                    </SlideUpText>
                  </h2>
                </motion.div>
              </div>

              <svg
                className="absolute -bottom-16 md:left-1/2 xl:left-[60%] 2xl:left-[65%] -transalate-x-1/2 md:block hidden"
                width="435"
                height="357"
                viewBox="0 0 435 357"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M434.302 433.43H290.745V144.224L1.15893 144.604L0.96875 1.04699L434.302 0.476562V433.43Z"
                  fill="#8565FC"
                  fillOpacity="0.2"
                />
              </svg>

              <motion.div
                className="space-y-1 text-[#C3C4FC]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut"}}
              >
                {/* <div className="text-primary">
                                </div> */}
                <SlideUpText animationMode="always">
                  <p className="font-medium">We serve investors who seek:</p>
                </SlideUpText>
                
                    <SlideUpText animationMode="always">
                      • {" "} Long-term compounding with transparency
                    </SlideUpText>
                  
                
                    <SlideUpText animationMode="always">
                      • {" "} A boutique, high-touch partner
                    </SlideUpText>
                  
                
                    <SlideUpText animationMode="always">
                      • {" "} Disciplined research and access to under-researched
                      opportunities
                    </SlideUpText>
                  
              </motion.div>
            </motion.div>

            {/* Right Images Grid */}
            <motion.div
              className="relative  h-full lg:p-6 px-6 "
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <div className="flex  gap-4 h-full max-w-md mx-auto lg:ml-auto ">
                {/* First Column */}
                <div className="flex flex-col gap-9 -mb-20 md:mt-5 mt-24">
                  <div className=" rounded-lg ">
                    <Image
                      src={WhoweareImg1 || "/placeholder.svg"}
                      alt="Professional workspace with financial charts and calculator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className=" rounded-lg ">
                    <Image
                      src={WhoweareImg2 || "/placeholder.svg"}
                      alt="Modern corporate building architecture from below"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Second Column - offset upward */}
                <div className="flex flex-col gap-9  lg:-mt-9 ml-5">
                  <div className=" rounded-lg ">
                    <Image
                      src={WhoweareImg3 || "/placeholder.svg"}
                      alt="Professional workspace with financial charts and calculator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className=" rounded-lg ">
                    <Image
                      src={WhoweareImg4 || "/placeholder.svg"}
                      alt="Modern corporate building architecture from below"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Container>
  );
};

export default WhoWeServeSection;