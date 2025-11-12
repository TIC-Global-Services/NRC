import React from "react";
import Badge from "../ui/badge";
import AnimatedButton from "../ui/animatedButton";
import Container from "../Reusable/Container";
import Image from "next/image";
import { PaperFoldTitle } from "../Reusable/FramerMotion/TitleReveal";
import SlideUpText from "../ui/SlideUpText";
import CustomDottedBorder from "../ui/CustomDottedBorder";
import { useRouter } from "next/navigation";

export default function WealthCreationSection() {
  const router = useRouter();
  const RedirectToAbout = () => {
    router.push("/about");
  }

  return (
    <Container
      disablePaddingTopMobile
      disablePaddingBottomMobile
      disablePaddingBottomDesktop
      className="pt-16 lg:pb-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-y-5 md:gap-20 w-full xl:min-h-screen">
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col justify-center lg:py-16 ">
          <PaperFoldTitle>
            {/* Who We Are Button */}
            <Badge label="Who We Are" className="mb-4" />

            {/* Main Heading */}

            <h1 className="text-[26px] md:text-5xl xl:text-5xl  font-[400] text-black leading-tight ">
              A Boutique Partner in
            </h1>
            <h1 className="text-[26px] md:text-5xl xl:text-5xl font-[400] text-primary leading-tight ">
              Wealth Creation
            </h1>

            {/* Description */}
            <div className="mb-6 max-w-2xl mt-2 md:mt-0">
              <p className="text-[#484848] text-sm md:text-base leading-relaxed">
                <SlideUpText animationMode="always">
                  We are an independent, owner-managed investment house offering
                  SEBI-registered Portfolio Management Services. Over the last
                  12+ years, we have built a reputation for disciplined
                  research, concentrated portfolios, and transparent client
                  partnerships.
                </SlideUpText>
              </p>
            </div>

            <AnimatedButton
              onClick={RedirectToAbout}
              label="Discover Nine Rivers"
            />
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
                <div className="text-center text-base xl:text-base">
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
                <div className="text-center text-base xl:text-base">
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
                <div className="text-center text-base xl:text-base">
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
                <div className="text-center text-base xl:text-base">
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
