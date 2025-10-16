import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import FlexibleHeading from "../ui/FlexibleHeading";
import Container from "../Reusable/Container";
import {
  PartnershipImg1,
  PartnershipImg2,
  // PartnershipImg3,
} from "@/assets/PMS";
import Image from "next/image";


// Reusable Partnership Card Component
interface PartnershipCardProps {
  image: any;
  alt: string;
  title: string;
  description: string;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({
  image,
  alt,
  title,
  description,
}) => {
  return (
    <div className="grid grid-rows-[65%_35%] h-full rounded-xl overflow-hidden">
      <div>
        <Image src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 bg-[#B8B5FF] flex flex-col items- justify-center">
        <h3 className="text-3xl leading-[31px] text-black mb-2">{title}</h3>
        <p className="text-lg leading-[31px] max-w-xs">{description}</p>
      </div>
    </div>
  );
};

const Partnerships = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [tabletIndex, setTabletIndex] = useState(0);
  const tabletSliderRef = useRef<HTMLDivElement>(null);

  // Partnership cards data array - 4 items
  const partnershipData = [
    {
      image: PartnershipImg1,
      alt: "Conviction",
      title: "Conviction",
      description: "18–25 stock portfolios, not index replicas",
    },
    {
      image: PartnershipImg2,
      alt: "Rigore",
      title: "Rigore",
      description: "PE-style diligence before every investment",
    },
    {
      image: PartnershipImg1,
      alt: "Risk",
      title: "Risk",
      description: "Liquidity, governance, and downside frameworks",
    },
    {
      image: PartnershipImg2,
      alt: "Alignment",
      title: "Alignment",
      description: "Skin in the game, alongside clients",
    },
  ];

  // Desktop navigation
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);

      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          x: `-${newIndex * (100 / 4)}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  const goToNext = () => {
    if (currentIndex < partnershipData.length - 3) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          x: `-${newIndex * (100 / 4)}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  // Mobile navigation - moves by 80vw (full card + gap)
  const goToPreviousMobile = () => {
    if (mobileIndex > 0) {
      const newIndex = mobileIndex - 1;
      setMobileIndex(newIndex);

      if (mobileSliderRef.current) {
        const cardWidth = 80; // 80vw per card
        gsap.to(mobileSliderRef.current, {
          x: `-${newIndex * cardWidth}vw`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  const goToNextMobile = () => {
    if (mobileIndex < partnershipData.length - 1) {
      const newIndex = mobileIndex + 1;
      setMobileIndex(newIndex);

      if (mobileSliderRef.current) {
        const cardWidth = 80; // 80vw per card
        gsap.to(mobileSliderRef.current, {
          x: `-${newIndex * cardWidth}vw`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };


  // Tablet navigation - shows 2 cards at a time
  const goToPreviousTablet = () => {
    if (tabletIndex > 0) {
      const newIndex = tabletIndex - 1;
      setTabletIndex(newIndex);

      if (tabletSliderRef.current) {
        gsap.to(tabletSliderRef.current, {
          x: `-${newIndex * (100 / 2)}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  const goToNextTablet = () => {
    if (tabletIndex < partnershipData.length - 2) {
      const newIndex = tabletIndex + 1;
      setTabletIndex(newIndex);

      if (tabletSliderRef.current) {
        gsap.to(tabletSliderRef.current, {
          x: `-${newIndex * (100 / 2)}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };


  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile>
      <FlexibleHeading
        title="Not Just Portfolios.Partnerships."
        mdTitle="Not Just Portfolios.Partnerships."
        mobileTitle="Not Just <br/>Portfolios.Partnerships."
        description="Our PMS is not about scale — it's about selectivity. We curate for a limited set of HNIs & Family Offices who value"
        highlights={{
          "Partnerships.": "text-primary",
        }}
        alignment="left"
        className="text-center md:text-left"
        mobileAlignment="center"
      />

      {/* Desktop View */}
      <div className="relative hidden lg:block">
        <div className="overflow-hidden">

          {/* old heights */}
          {/* md:h-[75vh] lg:h-[70vh] xl:h-[70vh] 2xl:h-[60vh] */}
          
          <div
            ref={sliderRef}
            className="grid grid-cols-4 gap-6 lg:h-[470px] 2xl:h-[549px]"
            style={{ width: `${partnershipData.length * (100 / 3)}%` }}
          >
            {partnershipData.map((card, index) => (
              <PartnershipCard
                key={index}
                image={card.image}
                alt={card.alt}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="64" height="64" rx="32" fill="#EFEFF5" />
              <path
                d="M29.8333 37.3327L24.5 31.9993M24.5 31.9993L29.8333 26.666M24.5 31.9993H40.5"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= partnershipData.length - 3}
            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="64" height="64" rx="32" fill="#EFEFF5" />
              <path
                d="M35.1667 37.3327L40.5 31.9993M40.5 31.9993L35.1667 26.666M40.5 31.9993H24.5"
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

      {/* Tablet View */}
      <div className="relative hidden md:block lg:hidden">
        <div className="overflow-hidden">
          <div
            ref={tabletSliderRef}
            className="grid grid-cols-4 gap-6 h-[40vh]"
            style={{ width: `${(partnershipData.length / 2) * 100}%` }}
          >
            {partnershipData.map((card, index) => (
              <PartnershipCard
                key={index}
                image={card.image}
                alt={card.alt}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Tablet Navigation Arrows */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={goToPreviousTablet}
            disabled={tabletIndex === 0}
            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#EFEFF5" />
              <path
                d="M26 30L21 25M21 25L26 20M21 25H35"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={goToNextTablet}
            disabled={tabletIndex >= partnershipData.length - 3}
            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="#EFEFF5" />
              <path
                d="M30 30L35 25M35 25L30 20M35 25H21"
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

      {/* Mobile View - Shows full card + 30% peek of next */}
      <div className="md:hidden">
        <div className="overflow-hidden w-full">
          <div
            ref={mobileSliderRef}
            className="flex"
            style={{
              width: `${partnershipData.length * 80}vw`,
            }}
          >
            {partnershipData.map((card, index) => (
              <div
                key={index}
                className="w-[80vw] flex-shrink-0 flex items-center justify-start pr-4"
              >
                <div className="w-full h-[450px]">
                  <PartnershipCard
                    image={card.image}
                    alt={card.alt}
                    title={card.title}
                    description={card.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={goToPreviousMobile}
            disabled={mobileIndex === 0}
            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#EFEFF5" />
              <path
                d="M22.6667 26.6654L20 23.9987M20 23.9987L22.6667 21.332M20 23.9987H28"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={goToNextMobile}
            disabled={mobileIndex >= partnershipData.length - 1}
            className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="24" fill="#EFEFF5" />
              <path
                d="M25.3333 26.6654L28 23.9987M28 23.9987L25.3333 21.332M28 23.9987H20"
                stroke="black"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Partnerships;