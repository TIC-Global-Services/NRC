"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { gsap } from "gsap";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import {
  ExpertiseImg1,
  ExpertiseImg2,
  ExpertiseImg3,
  ExpertiseImg4,
  ExpertiseImg5,
} from "@/assets/AIF";
import Image, { StaticImageData } from "next/image";

// -------------------------
// Reusable Card Components
// -------------------------
interface CustomCardProps {
  title: string;
  description: string;
  imageUrl?: StaticImageData;
  cardIndex?: number;
  className?: string;
  onClick?: () => void;
}

const DeskCustomCard = memo(
  ({ title, description, imageUrl, cardIndex, className = "", onClick }: CustomCardProps) => (
    <div
      className={`relative ${
        cardIndex === 2 || cardIndex === 4 ? "bg-[#C5C3FE]" : "bg-[#F3F3F5]"
      } rounded-xl px-6 pt-8 overflow-hidden transition-all duration-300 cursor-pointer transform flex flex-col justify-between items-center gap-3 ${className}`}
      onClick={onClick}
    >
      <div className="h-24">
        <h4 className="md:text-[24px] leading-[28px] font-[400] mb-2 line-clamp-2">{title}</h4>
        <p className="md:text-base leading-[22px] font-[400] line-clamp-3">{description}</p>
      </div>

      <div className="overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={381}
            height={290}
            className="rounded-3 w-full h-full object-cover transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">{title.charAt(0)}</span>
          </div>
        )}
      </div>
    </div>
  )
);

const MobileCustomCard = memo(
  ({ title, description, imageUrl, className = "", onClick }: CustomCardProps) => (
    <div
      className={`relative bg-[#F3F3F5] hover:bg-[#C5C3FE] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full ${className}`}
      onClick={onClick}
    >
      <div className="grid grid-rows-[35%_65%] h-full">
        <div className="flex flex-col justify-center px-6">
          <h4 className="text-[20px] md:text-[24px] leading-[24px] md:leading-[28px] font-[400] mb-2">
            {title}
          </h4>
          <p className="text-[14px] md:text-base leading-[20px] md:leading-[22px] font-[400]">
            {description}
          </p>
        </div>
        <div className="overflow-hidden w-[85%] mx-auto rounded-t-[12px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={381}
              height={290}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">{title.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
);

// -------------------------
// Main Component
// -------------------------
const Expertise = () => {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const desktopSliderRef = useRef<HTMLDivElement>(null);
  const tabletSliderRef = useRef<HTMLDivElement>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const indexRef = useRef(0);
  const totalCards = 5;

  // Determine current viewport
  useEffect(() => {
    const updateViewport = () => {
      const w = window.innerWidth;
      if (w < 768) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("desktop");
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Card Data
  const cardData = useMemo(
    () => [
      {
        id: 1,
        title: "Track Record",
        description:
          "NRC has a sterling long term track record of delivering consistent, risk adjusted returns across market cycles.",
        imageUrl: ExpertiseImg1,
      },
      {
        id: 2,
        title: "Experienced Team",
        description: "100+ years of combined team experience in alternate investments.",
        imageUrl: ExpertiseImg2,
      },
      {
        id: 3,
        title: "Rigorous Investment Process",
        description:
          "Driven by a disciplined research intensive investment process flowing through multiple stages.",
        imageUrl: ExpertiseImg3,
      },
      {
        id: 4,
        title: "Focus on High-Growth Sectors",
        description:
          "Capturing opportunities riding tailwinds of the next wave of economic transformation.",
        imageUrl: ExpertiseImg4,
      },
      {
        id: 5,
        title: "Deal Flow Advantage",
        description:
          "Leveraging strong networks & industry relationships to secure proprietary, high quality deal flow.",
        imageUrl: ExpertiseImg5,
      },
    ],
    []
  );

  // -------------------------
  // Navigation (Fixed Logic)
  // -------------------------
  const moveSlider = useCallback(
    (direction: "next" | "prev") => {
      let visibleCards = 3;
      if (viewport === "tablet") visibleCards = 2;
      if (viewport === "mobile") visibleCards = 1;

      const sliderRef =
        viewport === "desktop"
          ? desktopSliderRef
          : viewport === "tablet"
          ? tabletSliderRef
          : mobileSliderRef;

      const maxIndex = totalCards - visibleCards;
      let newIndex = indexRef.current;

      if (direction === "next" && newIndex < maxIndex) newIndex++;
      else if (direction === "prev" && newIndex > 0) newIndex--;

      indexRef.current = newIndex;

      // Calculate the exact offset dynamically (no VW)
      const sliderEl = sliderRef.current;
      if (!sliderEl) return;

      const cardEl = sliderEl.children[0] as HTMLElement;
      if (!cardEl) return;

      const cardWidth = cardEl.offsetWidth;
      const gap = parseFloat(
        window.getComputedStyle(sliderEl).gap.replace("px", "")
      );

      const offset = newIndex * (cardWidth + gap);

      gsap.to(sliderEl, {
        x: -offset,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [viewport]
  );

  const handleCardClick = useCallback((card: any) => {
    console.log("Card clicked:", card.title);
  }, []);

  // -------------------------
  // Render
  // -------------------------
  return (
    <Container disablePaddingBottomMobile disablePaddingTopMobile className="py-12 w-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex md:justify-between justify-center items-center mb-2 md:mb-8">
          <SlideUpText animationMode="always">
            <h2 className="text-[26px] px-4 md:px-0 text-left leading-8 md:leading-[58px] md:text-5xl font-normal text-gray-900">
              Invest with Experience <br />
              <span className="text-primary font-medium">and Expertise.</span>
            </h2>
          </SlideUpText>

          {/* Desktop / Tablet Arrows */}
          <div className="md:block hidden">
            <div className="flex space-x-2">
              <button
                onClick={() => moveSlider("prev")}
                className="md:w-16 md:h-16 w-14 h-12 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={() => moveSlider("next")}
                className="md:w-16 md:h-16 w-14 h-12 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Desktop (3 cards visible) */}
        <div className="relative overflow-hidden hidden lg:block">
          <div
            ref={desktopSliderRef}
            className="grid grid-cols-5 gap-5"
            style={{ width: `${(cardData.length / 3) * 100}%` }}
          >
            {cardData.map((card) => (
              <DeskCustomCard
                key={card.id}
                {...card}
                cardIndex={card.id}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        </div>

        {/* Tablet (2 cards visible) */}
        <div className="relative overflow-hidden hidden md:block lg:hidden">
          <div
            ref={tabletSliderRef}
            className="grid grid-cols-5 gap-5"
            style={{ width: `${(cardData.length / 2) * 100}%` }}
          >
            {cardData.map((card) => (
              <DeskCustomCard
                key={card.id}
                {...card}
                cardIndex={card.id}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        </div>

        {/* Mobile (1 card visible) */}
        <div className="relative overflow-hidden md:hidden mt-7 md:mt-0">
          <div
            ref={mobileSliderRef}
            className="flex gap-4"
            style={{
              width: `${cardData.length * 90}vw`,
            }}
          >
            {cardData.map((card) => (
              <div key={card.id} className="w-[90vw] flex-shrink-0">
                <MobileCustomCard
                  {...card}
                  onClick={() => handleCardClick(card)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Arrows */}
        <div className="md:hidden flex justify-end mt-6 space-x-3">
          <button
            onClick={() => moveSlider("prev")}
            className="rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 w-14 h-14 bg-[#EFEFF5] cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={() => moveSlider("next")}
            className="rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 w-14 h-14 bg-[#EFEFF5] cursor-pointer"
          >
            →
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Expertise;
