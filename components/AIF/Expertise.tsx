"use client";

import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import ParallaxWrapper from "../ui/ParallaxSliderWrapper";
import {
  ExpertiseImg1,
  ExpertiseImg2,
  ExpertiseImg3,
  ExpertiseImg4,
  ExpertiseImg5,
} from "@/assets/AIF";
import Image, { StaticImageData } from "next/image";

interface CustomCardProps {
  title: string;
  description: string;
  imageUrl?: StaticImageData;
  className?: string;
  cardIndex?: number;
  onClick?: () => void;
}

const DeskCustomCard = ({
  title,
  description,
  imageUrl,
  cardIndex,
  className = "",
  onClick,
}: CustomCardProps) => {
  return (
    <div
      className={`relative ${
        cardIndex === 2 || cardIndex === 4 ? "bg-[#C5C3FE]" : "bg-[#F3F3F5]"
      } rounded-xl px-6 pt-8 overflow-hidden transition-all duration-300 cursor-pointer transform flex flex-col justify-between items-center gap-3 ${className}`}
      onClick={onClick}
    >
      {/* Card Content */}
      <div className="h-24">
        <h4 className="md:text-[24px] leading-[28px] font-[400] mb-2 line-clamp-2">
          {title}
        </h4>
        <p className="md:text-base leading-[22px] font-[400] line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Image */}
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
            <span className="text-white text-4xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const MobileCustomCard = ({
  title,
  description,
  imageUrl,
  className = "",
  onClick,
}: CustomCardProps) => {
  return (
    <div
      className={`relative bg-[#F3F3F5] hover:bg-[#C5C3FE] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full ${className}`}
      onClick={onClick}
    >
      {/* Card divided into 35% content and 65% image */}
      <div className="grid grid-rows-[35%_65%] h-full">
        {/* Card Content */}
        <div className="flex flex-col justify-center px-6">
          <h4 className="text-[20px] md:text-[24px] leading-[24px] md:leading-[28px] font-[400] mb-2">
            {title}
          </h4>
          <p className="text-[14px] md:text-base leading-[20px] md:leading-[22px] font-[400]">
            {description}
          </p>
        </div>

        {/* Card Image */}
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
              <span className="text-white text-4xl font-bold">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Expertise = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Card data - 5 cards
  const cardData = [
    {
      id: 1,
      title: "Track Record",
      description:
        "NRC has a sterling long-term track record in small-cap investing, having delivered top decile returns over the last 12 years.",
      imageUrl: ExpertiseImg1,
    },
    {
      id: 2,
      title: "Experienced Team",
      description:
        "Showcase the team's collective experience (100+ years in alternate investment). Highlight key team members and their backgrounds.",
      imageUrl: ExpertiseImg2,
    },
    {
      id: 3,
      title: "Rigorous Investment Process",
      description:
        "Explain the focus on fundamental research, risk management, and identifying unique opportunities.",
      imageUrl: ExpertiseImg3,
    },
    {
      id: 4,
      title: "Focus on High-Growth Sectors",
      description:
        "Showcase specific sectors of interest and examples of successful portfolio companies.",
      imageUrl: ExpertiseImg4,
    },
    {
      id: 5,
      title: "Deal Flow Advantage",
      description:
        "Explain NRC's competitive advantage in sourcing deals (organic network, co-investors).",
      imageUrl: ExpertiseImg5,
    },
  ];

  // Calculate cards per screen based on viewport
  const cardsPerScreen = isMobile ? 1 : isTablet ? 2 : 3;
  const totalSlides = cardData.length - cardsPerScreen + 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCardClick = (card: any) => {
    console.log("Card clicked:", card.title);
  };

  return (
    <Container
      disablePaddingBottomMobile
      disablePaddingTopMobile
      className="py-12 w-screen"
    >
      <div className="mx-auto">
        {/* Header */}
        <div className="flex md:justify-between justify-center items-center mb-2 md:mb-8">
          <SlideUpText animationMode="always">
            <h2 className="text-[26px] px-4 md:px-0 text-left leading-8 md:leading-[58px] md:text-5xl font-normal text-gray-900">
              Invest with Experience <br />{" "}
              <span className="text-primary font-medium">and Expertise.</span>
            </h2>
          </SlideUpText>

          <div className="md:block hidden">
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="md:w-16 md:h-16 w-14 h-12 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.148438"
                    y="0.746094"
                    width="64"
                    height="64"
                    rx="32"
                    fill="#EFEFF5"
                  />
                  <path
                    d="M29.7786 37.6647L24.4453 32.3314M24.4453 32.3314L29.7786 26.998M24.4453 32.3314H40.4453"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="md:w-16 w-14 md:h-16 h-12 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.148438"
                    y="0.746094"
                    width="64"
                    height="64"
                    rx="32"
                    fill="#EFEFF5"
                  />
                  <path
                    d="M35.112 37.6647L40.4453 32.3314M40.4453 32.3314L35.112 26.998M40.4453 32.3314H24.4453"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Cards - 3 at a time */}
        <div className="relative overflow-hidden hidden lg:block">
          <div className="flex justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-5"
              style={{
                transform: `translateX(-${currentSlide * (100 / 3 + 1.67)}%)`,
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0"
                  style={{ width: "calc(33.333% - 13.33px)" }}
                >
                  <DeskCustomCard
                    title={card.title}
                    cardIndex={card.id}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    onClick={() => handleCardClick(card)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Cards - 2 at a time */}
        <div className="relative overflow-visible hidden md:block lg:hidden">
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-5"
              style={{
                transform: `translateX(-${currentSlide * 50 + 2.3}%)`,
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0"
                  style={{ width: "calc(50% - 10px)" }}
                >
                  <DeskCustomCard
                    title={card.title}
                    cardIndex={card.id}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    onClick={() => handleCardClick(card)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="relative overflow-hidden md:hidden mt-7 md:mt-0">
          <div className="flex justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentSlide * 90}vw - ${
                  currentSlide * 16
                }px + 5vw))`,
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0 pr-4"
                  style={{ width: "90vw" }}
                >
                  <MobileCustomCard
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    onClick={() => handleCardClick(card)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden flex justify-end mt-6">
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.421875"
                  width="48"
                  height="48"
                  rx="24"
                  fill="#EFEFF5"
                />
                <path
                  d="M23.0885 26.6654L20.4219 23.9987M20.4219 23.9987L23.0885 21.332M20.4219 23.9987H28.4219"
                  stroke="black"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.421875"
                  width="48"
                  height="48"
                  rx="24"
                  fill="#EFEFF5"
                />
                <path
                  d="M25.7552 26.6654L28.4219 23.9987M28.4219 23.9987L25.7552 21.332M28.4219 23.9987H20.4219"
                  stroke="black"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Expertise;
