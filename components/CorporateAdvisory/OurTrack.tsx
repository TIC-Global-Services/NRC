"use client";

import { useState } from "react";
import Container from "../Reusable/Container";
import FlexibleHeading from "../ui/FlexibleHeading";
import Image from "next/image";
import {
  TechImgOne, TechImgTwo, TechImgThree, TechImgFour, TechImgSix, TechImgSeven,
  TechImgEight, TechImgNine, TechImgTen, TechImgEleven, TechImgTwelve,
  CommerceImgOne, CommerceImgTwo, CommerceImgThree, CommerceImgFour, CommerceImgFive,
  CommerceImgSix, CommerceImgSeven, CommerceImgEight, CommerceImgNine, CommerceImgTen,
  CommerceImgEleven, CommerceImgTwelve,
  HealthcareImgOne, HealthcareImgTwo, HealthcareImgThree, HealthcareImgFour, HealthcareImgFive,
  HealthcareImgSix, HealthcareImgSeven, HealthcareImgEight, HealthcareImgNine,
  HealthcareImgTen, HealthcareImgEleven,
  IndustrialImgOne, IndustrialImgTwo, IndustrialImgThree, IndustrialImgFour,
  IndustrialImgFive, IndustrialImgSix, IndustrialImgSeven, IndustrialImgEight,
} from "@/assets/CorporateAdvisory";

const OurTrack = () => {
  const [activeLabel, setActiveLabel] = useState("Technology");

  const TrackRecord = [
    {
      id: 1,
      label: "Technology",
      desc: "Consumer Internet, B2B Technology, Frontier Technologies, IT Services & BPO, Digital Transformation & Cloud",
      logos: [
        TechImgOne, TechImgTwo, TechImgThree, TechImgFour, TechImgSix,
        TechImgSeven, TechImgEight, TechImgNine, TechImgTen, TechImgEleven, TechImgTwelve,
      ],
    },
    {
      id: 2,
      label: "Consumer",
      desc: "Consumer Brands, Products & Services, Logistics, Media, Education",
      logos: [
        CommerceImgOne, CommerceImgTwo, CommerceImgThree, CommerceImgFour, CommerceImgFive,
        CommerceImgSix, CommerceImgSeven, CommerceImgEight, CommerceImgNine,
        CommerceImgTen, CommerceImgEleven, CommerceImgTwelve,
      ],
    },
    {
      id: 3,
      label: "Healthcare",
      desc: "Healthcare delivery, Pharmaceuticals, Medical Devices, Health-tech, Veterinary Services",
      logos: [
        HealthcareImgOne, HealthcareImgTwo, HealthcareImgThree, HealthcareImgFour, HealthcareImgFive,
        HealthcareImgSix, HealthcareImgSeven, HealthcareImgEight, HealthcareImgNine,
        HealthcareImgTen, HealthcareImgEleven,
      ],
    },
    {
      id: 4,
      label: "Industrial",
      desc: "Auto Ancillary, Engineering Goods, Industrial Automation, Industrial Ancillaries, Specialty Chemicals.",
      logos: [
        IndustrialImgOne, IndustrialImgTwo, IndustrialImgThree, IndustrialImgFour,
        IndustrialImgFive, IndustrialImgSix, IndustrialImgSeven, IndustrialImgEight,
      ],
    },
  ];

  const currentTrack = TrackRecord.find((t) => t.label === activeLabel)!;

  // Split into 3 distinct sets for lanes
  const logos = currentTrack.logos;
  const groupSize = Math.ceil(logos.length / 3);
  const col1 = logos.slice(0, groupSize);
  const col2 = logos.slice(groupSize, groupSize * 2);
  const col3 = logos.slice(groupSize * 2);

  return (
    <>
      {/* ============= DESKTOP ============= */}
      <div className="hidden lg:block w-full">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Infinite vertical scrolls */
            @keyframes infiniteUp {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            @keyframes infiniteDown {
              0% { transform: translateY(-50%); }
              100% { transform: translateY(0); }
            }

            .lane {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 3rem;
            }

            .lane-wrapper {
              height: 100%;
              overflow: hidden;
              position: relative;
              mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
              -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
            }

            .scroll-up {
              animation: infiniteUp 25s linear infinite;
            }
            .scroll-down {
              animation: infiniteDown 25s linear infinite;
            }
          `,
          }}
        />

        <Container className="max-w-full px-8">
          <div className="grid grid-cols-[35%_65%] h-screen w-full overflow-hidden">
            {/* ==== LEFT SELECTION ==== */}
            <div className="pr-8 flex flex-col justify-center">
              <FlexibleHeading
                title="Our Track Record"
                maxWidth="max-w-3xl"
                alignment="left"
                highlights={{ Record: "text-primary" }}
              />

              <div className="space-y-4">
                {TrackRecord.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => setActiveLabel(track.label)}
                    className={`rounded-[12px] p-4 cursor-pointer transition-all duration-300 ${
                      activeLabel === track.label
                        ? "bg-white shadow-md"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`font-[400] text-lg md:text-xl ${
                        activeLabel === track.label ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {track.label}
                    </h3>
                    {activeLabel === track.label && (
                      <p className="text-base text-gray-600 mt-3 leading-[28px]">
                        {track.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ==== RIGHT THREE-LANE SCROLLER ==== */}
            <div className="relative flex justify-between h-full">
              {[
                { dir: "up", data: col1 },
                { dir: "down", data: col2 },
                { dir: "up", data: col3 },
              ].map((col, index) => (
                <div key={index} className="lane-wrapper w-[30%] flex justify-center">
                  {/* Two stacked copies of logos for perfect loop */}
                  <div
                    className={`scroll-${col.dir} absolute inset-0`}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="lane">
                      {col.data.map((logo, i) => (
                        <Image
                          key={`${index}-A-${i}`}
                          src={logo}
                          alt={`logo-${i}`}
                          className="w-[180px] h-10 object-contain opacity-90"
                        />
                      ))}
                    </div>
                    <div className="lane">
                      {col.data.map((logo, i) => (
                        <Image
                          key={`${index}-B-${i}`}
                          src={logo}
                          alt={`logo-${i}`}
                          className="w-[180px] h-10 object-contain opacity-90"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ============= MOBILE ============= */}
      <div className="lg:hidden">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes scrollHorizontalMobile {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .scroll-container-mobile {
              display: flex;
              animation: scrollHorizontalMobile 20s linear infinite;
            }
          `,
          }}
        />
        <Container disablePaddingTopMobile disablePaddingBottomDesktop>
          <div className="py-12">
            <FlexibleHeading
              title="Our Track Record"
              maxWidth="max-w-3xl"
              alignment="left"
              highlights={{ Record: "text-primary" }}
            />

            <div className="space-y-8 mt-8">
              {TrackRecord.map((track) => (
                <div
                  key={track.id}
                  className="bg-white py-8 px-4 rounded-[12px] space-y-4"
                >
                  <h3 className="font-[400] text-2xl">{track.label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {track.desc}
                  </p>

                  <div className="relative overflow-hidden w-full mt-4">
                    <div className="scroll-container-mobile">
                      {[...track.logos, ...track.logos].map((logo, index) => (
                        <div
                          key={`${track.id}-${index}`}
                          className="flex-shrink-0 w-32 h-12 pr-6 flex items-center justify-center"
                        >
                          <Image
                            src={logo}
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
