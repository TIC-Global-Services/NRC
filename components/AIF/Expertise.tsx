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
} from "@/assets/AIF";
import Image, { StaticImageData } from "next/image";

interface CustomCardProps {
  title: string;
  description: string;
  imageUrl?: StaticImageData;
  className?: string;
  cardIndex?:number
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
      className={`relative ${(cardIndex === 2 || cardIndex === 4) ? 'bg-[#C5C3FE]' : 'bg-[#F3F3F5]'} rounded-xl px-6 pt-8 overflow-hidden transition-all duration-300 cursor-pointer transform flex flex-col justify-between items-center gap-3 ${className}`}
      onClick={onClick}
    >
      {/* Card Content */}
      <div className="h-24">
        <h4 className="md:text-[24px] leading-[28px] font-[400]  mb-2 line-clamp-2">
          {title}
        </h4>
        <p className="md:text-base leading-[22px] font-[400] line-clamp-3">
          {description}
        </p>
      </div>

      {/* Card Image */}
      <div className=" overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={381}
            height={290}
            className="rounded-3 w-full h-full object-cover transition-transform duration-300 "
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

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Card data - 6 cards as requested
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
      title: "Focus on High-Growth Sectors:",
      description:
        "Showcase specific sectors of interest and examples of successful portfolio companies.",
      imageUrl: ExpertiseImg4,
    },
  ];

  const cardsPerScreen = isMobile ? 1 : 3; // 3 cards for desktop, 1 for mobile
  const totalSlides = cardData.length - cardsPerScreen + 1;

  const startIndex = currentSlide;
  const visibleCards = cardData.slice(startIndex, startIndex + cardsPerScreen);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCardClick = (card: any) => {
    console.log("Card clicked:", card.title);
    // Add your card click logic here
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
              Invest with Experience <br /> <span className="text-primary font-medium">and Expertise.</span>
            </h2>
          </SlideUpText>

          <div className="md:block hidden">
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
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
              className="flex transition-transform duration-500 ease-in-out space-x-5"
              style={{
                transform: `translateX(-${currentSlide * (100 / 3)}%)`, // shift 1/3 for each step
                width: `${(cardData.length / 3) * 100}%`, // ensures track spans enough
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="w-[32%] flex-shrink-0 flex justify-center"
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

        {/* tablet Cards - 2 at a time */}
        <div className="relative overflow-hidden hidden md:block lg:hidden">
          <div className="flex justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out space-x-5"
              style={{
                transform: `translateX(-${currentSlide * (100 / 2)}%)`, // shift 1/3 for each step
                width: `${(cardData.length / 2) * 100}%`, // ensures track spans enough
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="w-[48%] flex-shrink-0 flex justify-center"
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
                transform: `translateX(calc(-${currentSlide * 90}vw + 10%))`, 
                width: `${cardData.length * 90}%`,
              }}
            >
              {cardData.map((card) => (
                <div
                  key={card.id}
                  className="w-[90vw] flex-shrink-0 pr-4 flex justify-center"
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

        <div className="md:hidden flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.165527"
                  width="24"
                  height="24"
                  rx="12"
                  fill="#EFEFF5"
                />
                <path
                  d="M10.8151 14.6258L8.14844 11.9591M8.14844 11.9591L10.8151 9.29248M8.14844 11.9591H16.1484"
                  stroke="black"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.165527"
                  width="24"
                  height="24"
                  rx="12"
                  fill="#EFEFF5"
                />
                <path
                  d="M13.4818 14.6258L16.1484 11.9591M16.1484 11.9591L13.4818 9.29248M16.1484 11.9591H8.14844"
                  stroke="black"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
