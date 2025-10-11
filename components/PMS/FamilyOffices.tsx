import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FamilyOfficeImg1,
  FamilyOfficeImg2,
  FamilyOfficeImg3,
  FamilyOfficesImg4,
} from "@/assets/PMS";
import Image from "next/image";
import FlexibleHeading from "../ui/FlexibleHeading";
import Container from "../Reusable/Container";


// Sample data for demonstration
const FamilyOfficesContent = [
  {
    id: 1,
    title: "Minimum investment of 1 Cr",
    image: FamilyOfficeImg1,
  },
  {
    id: 2,
    title: "Long-term wealth creation with high transparency",
    image: FamilyOfficeImg2,
  },
  {
    id: 3,
    title: "Boutique partner, not a mass-market fund manager",
    image: FamilyOfficeImg3,
  },
  {
    id: 4,
    title: "Disciplined, research-led investing with risk-first frameworks",
    image: FamilyOfficesImg4,
  },
];

const FamilyOfficeCard = ({ id, image, title, isActive, position }: any) => {
  const getCardVariants = () => {
    switch (position) {
      case "center":
        return {
          scale: 1,
          x: 0,
          opacity: 1,
          zIndex: 10,
        };
      case "left":
        return {
          scale: 0.85,
          x: -300,
          opacity: 0.7,
          zIndex: 5,
        };
      case "right":
        return {
          scale: 0.85,
          x: 300,
          opacity: 0.7,
          zIndex: 5,
        };
      default:
        return {
          scale: 0.7,
          x: position === "far-left" ? -600 : 600,
          opacity: 0,
          zIndex: 1,
        };
    }
  };

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={getCardVariants()}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        type: "tween",
      }}
      style={{
        perspective: "1000px",
      }}
      key={id}
    >
      <div
        className="relative bg-white overflow-hidden shadow-lg"
        style={{
          width: "426px",
          height: "355.91px",
          borderRadius: "13.65px",
          border: "1px solid transparent",
        }}
      >
        {/* Gradient Border */}
        <div
          className="absolute inset-0"
          style={{
            background: isActive
              ? "linear-gradient(180deg, #6A48E8 0%, #E0D9FC 100%)"
              : "linear-gradient(180deg, #E5E7EB 0%, #F3F4F6 100%)",
            padding: "1px",
            borderRadius: "13.65px",
          }}
        >
          <div
            className="w-full h-full bg-white"
            style={{ borderRadius: "12.65px" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {/* Number Badge */}

          {/* Image/Icon */}
          <div className="grid grid-cols-[20%_80%] h-full justify-between items-start ">
            <h3 className="text-3xl">{id}.</h3>
            <div className="text-6xl flex items-center justify-end h-full">
              <Image
                src={image}
                alt={`${image}`}
                className="w-[240px] h-[223px]"
                width={240}
                height={223}
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-[400] leading-[38px]">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const FamilyOffices = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FamilyOfficesContent.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getCardPosition = (index: any, activeIndex: any, totalCards: any) => {
    const diff = index - activeIndex;

    if (diff === 0) return "center";
    if (diff === 1 || diff === -(totalCards - 1)) return "right";
    if (diff === -1 || diff === totalCards - 1) return "left";
    if (diff > 1 || diff < -(totalCards - 1)) return "far-right";
    return "far-left";
  };

  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile className="">
      {/* <FlexibleHeading
        key="family-offices-heading"
        title="Built Exclusively for HNIs & Family Offices."
        highlights={{
          "Family Offices.": "text-primary",
        }}
      /> */}
      <div className="text-center mb-12 md:mb-0">
        <h2 className="text-[26px] md:text-5xl font-normal text-black leading-tight">
          Built Exclusively for HNIs & <br className="md:hidden "/> <span className="text-primary">Family Offices.</span>
        </h2>
      </div>

      {/* desktop */}
      <div className="relative md:flex hidden h-[500px] w-full justify-center items-center overflow-hidden">
        <div className="relative w-full flex justify-center items-center">
          {FamilyOfficesContent.map((content, index) => {
            const position = getCardPosition(
              index,
              activeIndex,
              FamilyOfficesContent.length
            );
            return (
              <div
                key={content.id}
              >
                <FamilyOfficeCard
                  key={content.id}
                  id={content.id}
                  image={content.image}
                  title={content.title}
                  isActive={index === activeIndex}
                  position={position}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden flex flex-col gap-4 px-4">
        {FamilyOfficesContent.map((content) => (
          <div
            key={content.id}
            className="relative bg-white overflow-hidden shadow-lg"
            style={{
              width: "100%",
              minHeight: "144px",
              borderRadius: "13.65px",
            }}
          >
            {/* Gradient Border */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, #6A48E8 0%, #E0D9FC 100%)",
                padding: "1px",
                borderRadius: "13.65px",
              }}
            >
              <div
                className="w-full h-full bg-white"
                style={{ borderRadius: "12.65px" }}
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-row justify-between">
              {/* Number and Image */}
              <div className="flex flex-col h-full justify-between items-start mb-4">
                <h3 className="text-2xl mb-4 leading-8">{content.id}.</h3>
                {/* Title */}
                <h3 className="text-sm font-[400] leading-[28px]">
                  {content.title}
                </h3>
              </div>

              <div className="flex items-center justify-end h-full">
                <Image
                  src={content.image}
                  alt={`${content.title}`}
                  className="w-[98px] h-[96px] object-contain"
                  width={98}
                  height={96}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FamilyOffices;
