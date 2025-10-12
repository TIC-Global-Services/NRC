"use client";

import { useState } from "react";
import Container from "../Reusable/Container";
import FlexibleHeading from "../ui/FlexibleHeading";
import {
  // TrackRecordLogo1,
  // TrackRecordLogo2,
  // TrackRecordLogo3,
  // TrackRecordLogo4,
  // TrackRecordLogo5,
  // TrackRecordLogo6,

  // Tech
  TechImgOne,
  TechImgTwo,
  TechImgThree,
  TechImgFour,
  // TechImgFive,
  TechImgSix,
  TechImgSeven,
  TechImgEight,
  TechImgNine,
  TechImgTen,
  TechImgEleven,
  TechImgTwelve,

  // commerce
  CommerceImgOne,
  CommerceImgTwo,
  CommerceImgThree,
  CommerceImgFour,
  CommerceImgFive,
  CommerceImgSix,
  CommerceImgSeven,
  CommerceImgEight,
  CommerceImgNine,
  CommerceImgTen,
  CommerceImgEleven,
  CommerceImgTwelve,

  // healthcare
  HealthcareImgOne,
  HealthcareImgTwo,
  HealthcareImgThree,
  HealthcareImgFour,
  HealthcareImgFive,
  HealthcareImgSix,
  HealthcareImgSeven,
  HealthcareImgEight,
  HealthcareImgNine,
  HealthcareImgTen,
  HealthcareImgEleven,

  // industrial
  IndustrialImgOne,
  IndustrialImgTwo,
  IndustrialImgThree,
  IndustrialImgFour,
  IndustrialImgFive,
  IndustrialImgSix,
  IndustrialImgSeven,
  IndustrialImgEight,
} from "@/assets/CorporateAdvisory";
import Image from "next/image";

const OurTrack = () => {
  const [activeLabel, setActiveLabel] = useState("Technology");

  const handleLabelSelection = (label: any) => {
    setActiveLabel(label);
  };

  const TrackRecord = [
    {
      id: 1,
      label: "Technology",
      desc: "Consumer Internet, B2B Technology, Frontier Technologies, IT Services & BPO, Digital Transformation & Cloud",
      leftLogs: [
        TechImgOne,
        TechImgTwo,
        TechImgThree,
        TechImgFour,
        // TechImgFive,
        TechImgSix,

      ],
      rightLogs: [
        TechImgSeven,
        TechImgEight,
        TechImgNine,
        TechImgTen,
        TechImgEleven,
        TechImgTwelve,
      ],
    },
    {
      id: 2,
      label: "Consumer",
      desc: "Consumer Brands, Products & Services, Logistics, Media, Education",
      leftLogs: [
        CommerceImgOne,
        CommerceImgTwo,
        CommerceImgThree,
        CommerceImgFour,
        CommerceImgFive,
      ],
      rightLogs: [
        CommerceImgSix,
        CommerceImgSeven,
        CommerceImgEight,
        CommerceImgNine,
        CommerceImgTen,
        CommerceImgEleven,
        CommerceImgTwelve,
      ],
    },
    {
      id: 3,
      label: "Healthcare",
      desc: "Healthcare delivery, Pharmaceuticals, Medical Devices, Health-tech, Veterinary Services",
      leftLogs: [
        HealthcareImgOne,
        HealthcareImgTwo,
        HealthcareImgThree,
        HealthcareImgFour,
        HealthcareImgFive,
      ],
      rightLogs: [
        HealthcareImgSix,
        HealthcareImgSeven,
        HealthcareImgEight,
        HealthcareImgNine,
        HealthcareImgTen,
        HealthcareImgEleven,
      ],
    },
    {
      id: 4,
      label: "Industrial",
      desc: "Industrial automation and IoT solutions transforming manufacturing and operations.",
      leftLogs: [
        IndustrialImgOne,
        IndustrialImgTwo,
        IndustrialImgThree,
        IndustrialImgFour,
      ],
      rightLogs: [
        IndustrialImgFive,
        IndustrialImgSix,
        IndustrialImgSeven,
        IndustrialImgEight,
      ],
    },
  ];

  const currentTrack = TrackRecord.find((track) => track.label === activeLabel);

  return (
    <>
      {/* Desktop */}
      <div className="lg:block hidden w-full">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes riverFlowLeft {
            0% {
              transform: translateY(-150px) translateX(0px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            25% {
              transform: translateY(25vh) translateX(-60px);
            }
            50% {
              transform: translateY(50vh) translateX(40px);
            }
            75% {
              transform: translateY(75vh) translateX(-80px);
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) translateX(30px);
              opacity: 0;
            }
          }
          
          @keyframes riverFlowRight {
            0% {
              transform: translateY(-100px) translateX(0px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            25% {
              transform: translateY(25vh) translateX(80px);
            }
            50% {
              transform: translateY(50vh) translateX(-40px);
            }
            75% {
              transform: translateY(75vh) translateX(60px);
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) translateX(-30px);
              opacity: 0;
            }
          }
          
          .river-logo-left {
            animation: riverFlowLeft 6s linear infinite;
            animation-fill-mode: both;
          }
          
          .river-logo-right {
            animation: riverFlowRight 6s linear infinite;
            animation-fill-mode: both;
          }
        `,
          }}
        />

        <Container className="max-w-full px-8">
          <div className="grid grid-cols-[40%_60%] h-screen w-full overflow-hidden">
            {/* Selection part */}
            <div >
              <FlexibleHeading
                title=" Our Track Record"
                maxWidth="max-w-3xl"
                alignment="left"
                highlights={{
                  Record: "text-primary",
                }}
              />

              {TrackRecord.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleLabelSelection(track.label)}
                  className={`rounded-[12px] px-4 py-8 mb-3 cursor-pointer transition-all duration-300 hover:shadow-md ${activeLabel === track.label
                      ? "bg-white  "
                      : " hover:bg-gray-50"
                    }`}
                >
                  <div>
                    <h3
                      className={`font-[400] text-2xl ${activeLabel === track.label ? "" : "text-secondary"
                        }`}
                    >
                      {track.label}
                    </h3>
                    {activeLabel === track.label && (
                      <p className="text-base text-gray-600 mt-3 leading-[31px]">
                        {track.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Animation container with proper overflow handling */}
            <div className="relative h-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-around">
                {/* Left river column */}
                <div className="relative w-1/2 h-full overflow-hidden">
                  {currentTrack?.leftLogs.map((logo, index) => (
                    <div
                      key={`left-${index}-${activeLabel}`}
                      className="river-logo-right absolute rounded-xl"
                      style={{
                        animationDelay: `${index * 0.9}s`,
                        left: "50%",
                        marginLeft: "-86px",
                        top: "0",
                      }}
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt={`Technology ${index}`}
                        className="w-[250px] h-12 object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Right river column */}
                <div className="relative w-1/2 h-full overflow-hidden">
                  {currentTrack?.rightLogs.map((logo, index) => (
                    <div
                      key={`right-${index}-${activeLabel}`}
                      className="river-logo-right absolute rounded-xl"
                      style={{
                        animationDelay: `${index * 0.9}s`,
                        left: "50%",
                        marginLeft: "-86px",
                        top: "0",
                      }}
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt={`Technology ${index}`}
                        className="w-[250px] h-14 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes scrollHorizontalMobile {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .scroll-container-mobile {
            display: flex;
            animation: scrollHorizontalMobile 20s linear infinite;
            will-change: transform;
          }
        `,
          }}
        />

        <Container disablePaddingTopMobile disablePaddingBottomDesktop>
          <div className="lg:py-8 py-12">
            <FlexibleHeading
              title=" Our Track Record"
              maxWidth="max-w-3xl"
              alignment="left"
              highlights={{
                Record: "text-primary",
              }}
            />

            <div className="space-y-6 mt-8">
              {TrackRecord.map((track) => (
                <div key={track.id} className="space-y-4 bg-white py-8 lg:px-0 rounded-[12px]">
                  {/* Card Header */}
                  <div className="space-y-2  px-4 ">
                    <h3 className="font-[400] text-2xl">{track.label}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>

                  {/* Scrolling Logos */}
                  <div className="relative overflow-hidden w-full">
                    <div className="scroll-container-mobile">
                      {/* Duplicate logos for seamless infinite loop */}
                      {[...track.leftLogs, ...track.leftLogs].map((logo, index) => (
                        <div
                          key={`${track.id}-${index}`}
                          className="flex-shrink-0 w-32 h-12 pr-7 flex items-center justify-center"
                        >
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt={`${track.label} logo ${index}`}
                            className="w-full h-full object-contain"
                            width={128}
                            height={48}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default OurTrack;