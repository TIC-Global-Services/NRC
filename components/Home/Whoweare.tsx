// import React from "react";
// import { motion } from "framer-motion";
// import Container from "../Reusable/Container";
// import { NRCLogo } from "@/assets/Home/Whoweare/WhoweareSVGs";
// import Image from "next/image";
// import {
//   WhoweareImg1,
//   WhoweareImg2,
//   WhoweareImg3,
//   WhoweareImg4,
// } from "@/assets/Home";

// const WhoWeServeSection = () => {
//   return (
//     <Container>
//       <motion.section
//         className=" bg-primary  overflow-hidden rounded-[12px]"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className=" mx-auto">
//           <div className="grid grid-cols-1 relative lg:grid-cols-[0.6fr_0.4fr] items-center h-full">
//             {/* Left Content */}
//             <motion.div
//               className="space-y-8 flex-1 flex flex-col justify-between h-full p-10"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               <div className="flex flex-col gap-5">
//                 {/* Badge */}
//                 <motion.div
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
//                 >
//                   <div className="inline-flex items-center px-6 py-3 rounded-full border-1 border-[#B5A4F4] backdrop-blur-sm">
//                     <span className="text-white/90 text-sm font-medium">
//                       Who we serve
//                     </span>
//                   </div>
//                 </motion.div>

//                 {/* Main Heading */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
//                 >
//                   <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
//                     Built for HNIs, Family Offices &{" "}
//                     <br className="hidden lg:block" />
//                     Long-Term Thinkers
//                   </h2>
//                 </motion.div>
//               </div>

//               {/* Description */}
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
//               >
//                 <p className="text-[#C3C4FC] text-lg lg:text-xl leading-tight max-w-2xl">
//                   At the very core, we are deeply committed to delivering
//                   superior value to our clients and our success is intrinsically
//                   tied to creating successful outcomes for our clients. We take
//                   pride in the trust our clients place in us and strive to
//                   maintain the highest levels of professionalism, transparency
//                   and integrity.
//                 </p>
//               </motion.div>
//             </motion.div>

//             <div className="absolute left-1/2 -translate-x-1/2 top-[35%]">
//               <NRCLogo />
//             </div>

//             {/* Right Images Grid */}
//             <motion.div
//               className="relative h-[500px]"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
//             >
//               <div className="flex gap-8 h-full items-center justify-end absolute top-0 right-8">
//                 <div className="flex flex-col gap-8 items-center w-[200px] mt-36">
//                   <Image
//                     src={WhoweareImg1}
//                     alt="Professional workspace with financial charts and calculator"
//                     className="w-full h-full object-cover"
//                   />

//                   <Image
//                     src={WhoweareImg2}
//                     alt="Modern corporate building architecture from below"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-8 items-center w-[200px] -mt-10">
//                   <Image
//                     src={WhoweareImg3}
//                     alt="Professional workspace with financial charts and calculator"
//                     className="w-full h-full object-cover"
//                   />

//                   <Image
//                     src={WhoweareImg4}
//                     alt="Modern corporate building architecture from below"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>

//             </motion.div>
//           </div>
//         </div>
//       </motion.section>
//     </Container>
//   );
// };
// export default WhoWeServeSection;

import React from "react";
import Badge from "../ui/badge";
import AnimatedButton from "../ui/animatedButton";
import Container from "../Reusable/Container";
import Image from "next/image";
import { PaperFoldTitle } from "../Reusable/FramerMotion/TitleReveal";
import SlideUpText from "../ui/SlideUpText";
import CustomDottedBorder from "../ui/CustomDottedBorder";

export default function WealthCreationSection() {
  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile className="pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-y-5 md:gap-20 w-full min-h-screen">
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col justify-center lg:py-16 ">
          <PaperFoldTitle>
            {/* Who We Are Button */}
            <Badge label="Who We Are" className="mb-4" />

            {/* Main Heading */}

            <h1 className="text-[26px] md:text-[40px] xl:text-5xl  font-[400] text-black leading-tight ">
              A Boutique Partner in
            </h1>
            <h1 className="text-[26px] md:text-[40px] xl:text-5xl font-[400] text-primary leading-tight ">
              Wealth Creation
            </h1>

            {/* Description */}
            <div className="mb-6 max-w-2xl mt-2 md:mt-0">
              <p className="text-[#484848] text-sm md:text-base leading-relaxed">
                <SlideUpText animationMode="always" delay={0.7}>
                  We are an independent, owner-managed investment house offering
                  SEBI-registered Portfolio Management Services. Over the last
                  12+ years, we have built a reputation for disciplined
                  research, concentrated portfolios, and transparent client
                  partnerships.
                </SlideUpText>
              </p>
            </div>

            <AnimatedButton label="Discover Nine Rivers" />
          </PaperFoldTitle>
        </div>

        {/* Right Side - Images */}
        <div className=" flex flex-col">
          {/* Top Image with Text Overlays */}
          <div className="">
            <Image
              src="/whoweareImg1.png"
              alt="Desert road stretching into distance"
              className="w-full max-h-80  object-cover rounded-[12px]"
              width={500}
              height={303}
            />

            {/* Text Overlays */}
            <div className="flex md:flex-row flex-col items-center my-2.5 md:my-5 gap-2 md:gap-3">
              {/* desktop */}
              <CustomDottedBorder
                width="100%"
                height={60}
                className="md:flex hidden items-center justify-center max-w-lg"
                strokeColor="#6A48E8"
                strokeWidth={1}
                borderRadius={5}
              >
                <div className="text-center text-sm xl:text-base">
                  <p>12+ years of live PMS track record</p>
                </div>
              </CustomDottedBorder>
              <CustomDottedBorder
                width="100%"
                height={60}
                className="md:flex hidden items-center justify-center max-w-lg"
                strokeColor="#6A48E8"
                strokeWidth={1}
                borderRadius={5}
              >
                <div className="text-center text-sm xl:text-base">
                  <p>Founder-led with skin in the game</p>
                </div>
              </CustomDottedBorder>


              {/* mobile */}
              <CustomDottedBorder
                width="100%"
                height={40}
                className="flex md:hidden items-center justify-center max-w-lg"
                strokeColor="#6A48E8"
                strokeWidth={1}
                borderRadius={5}
              >
                <div className="text-center text-sm xl:text-base">
                  <p>12+ years of live PMS track record</p>
                </div>
              </CustomDottedBorder>
              <CustomDottedBorder
                width="100%"
                height={40}
                className="flex md:hidden items-center justify-center max-w-lg"
                strokeColor="#6A48E8"
                strokeWidth={1}
                borderRadius={5}
              >
                <div className="text-center text-sm xl:text-base">
                  <p>Founder-led with skin in the game</p>
                </div>
              </CustomDottedBorder>
            </div>
          </div>

          {/* Bottom Image */}
          <div className=" ">
            <Image
              src="/whoweareImg2.png"
              alt="Two people walking on a desert road"
              className="w-full max-h-80 object-cover rounded-[12px]"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
