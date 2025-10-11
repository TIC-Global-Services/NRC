import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Award1,
  Award2,
  Award3,
} from "@/assets/PMS";
import Image from "next/image";

const Awards = () => {
  const awardsData = [
    { id: 0, image: Award1, name: "Best Portfolio Manager 2024" },
    { id: 1, image: Award2, name: "Excellence in Investment" },
    { id: 2, image: Award3, name: "Top Performing Fund" },
    { id: 3, image: Award1, name: "Client Choice Award" },
    { id: 4, image: Award2, name: "Innovation in Finance" },
    { id: 5, image: Award3, name: "Risk Management Excellence" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const textRefs = useRef<Map<number, HTMLHeadingElement>>(new Map());

  // Mobile refs
  const mobileItemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const mobileTextRefs = useRef<Map<number, HTMLHeadingElement>>(new Map());

  const setItemRef = (id: number) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  };

  const setTextRef = (id: number) => (el: HTMLHeadingElement | null) => {
    if (el) {
      textRefs.current.set(id, el);
    } else {
      textRefs.current.delete(id);
    }
  };

  const setMobileItemRef = (id: number) => (el: HTMLDivElement | null) => {
    if (el) {
      mobileItemRefs.current.set(id, el);
    } else {
      mobileItemRefs.current.delete(id);
    }
  };

  const setMobileTextRef = (id: number) => (el: HTMLHeadingElement | null) => {
    if (el) {
      mobileTextRefs.current.set(id, el);
    } else {
      mobileTextRefs.current.delete(id);
    }
  };

  // Get position of each award relative to current center
  const getPosition = (awardId: number) => {
    const diff = (awardId - currentIndex + awardsData.length) % awardsData.length;

    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'incoming';
    if (diff === awardsData.length - 1) return 'left';
    return 'hidden';
  };

  // Apply styles based on position - DESKTOP
  useEffect(() => {
    awardsData.forEach((award) => {
      const ref = itemRefs.current.get(award.id);
      const textRef = textRefs.current.get(award.id);
      if (!ref) return;

      const position = getPosition(award.id);

      let style;
      let fontSize;

      switch (position) {
        case 'left':
          style = { x: -400, scale: 0.564, opacity: 0.7, zIndex: 5 };
          fontSize = 14;
          break;
        case 'center':
          style = { x: 0, scale: 1, opacity: 1, zIndex: 10 };
          fontSize = 20;
          break;
        case 'right':
          style = { x: 400, scale: 0.564, opacity: 0.7, zIndex: 5 };
          fontSize = 14;
          break;
        case 'incoming':
          style = { x: 700, scale: 0.4, opacity: 0, zIndex: 1 };
          fontSize = 14;
          break;
        default:
          style = { x: -1000, scale: 0, opacity: 0, zIndex: 0 };
          fontSize = 14;
      }

      gsap.set(ref, style);
      if (textRef) {
        gsap.set(textRef, { fontSize });
      }
    });
  }, [currentIndex]);

  // Apply styles based on position - MOBILE
  useEffect(() => {
    awardsData.forEach((award) => {
      const ref = mobileItemRefs.current.get(award.id);
      const textRef = mobileTextRefs.current.get(award.id);
      if (!ref) return;

      const position = getPosition(award.id);

      let style;
      let fontSize;

      switch (position) {
        case 'left':
          style = { x: -150, scale: 0.5, opacity: 0.6, zIndex: 5 };
          fontSize = 12;
          break;
        case 'center':
          style = { x: 0, scale: 0.85, opacity: 1, zIndex: 10 };
          fontSize = 16;
          break;
        case 'right':
          style = { x: 150, scale: 0.5, opacity: 0.6, zIndex: 5 };
          fontSize = 12;
          break;
        case 'incoming':
          style = { x: 300, scale: 0.3, opacity: 0, zIndex: 1 };
          fontSize: 12;
          break;
        default:
          style = { x: -500, scale: 0, opacity: 0, zIndex: 0 };
          fontSize = 12;
      }

      gsap.set(ref, style);
      if (textRef) {
        gsap.set(textRef, { fontSize });
      }
    });
  }, [currentIndex]);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      // Get current positions
      const leftId = (currentIndex - 1 + awardsData.length) % awardsData.length;
      const centerId = currentIndex;
      const rightId = (currentIndex + 1) % awardsData.length;
      const incomingId = (currentIndex + 2) % awardsData.length;

      // Animate transitions - DESKTOP
      const leftRef = itemRefs.current.get(leftId);
      const centerRef = itemRefs.current.get(centerId);
      const rightRef = itemRefs.current.get(rightId);
      const incomingRef = itemRefs.current.get(incomingId);

      const leftTextRef = textRefs.current.get(leftId);
      const centerTextRef = textRefs.current.get(centerId);
      const rightTextRef = textRefs.current.get(rightId);

      // Animate transitions - MOBILE
      const mobileLeftRef = mobileItemRefs.current.get(leftId);
      const mobileCenterRef = mobileItemRefs.current.get(centerId);
      const mobileRightRef = mobileItemRefs.current.get(rightId);
      const mobileIncomingRef = mobileItemRefs.current.get(incomingId);

      const mobileLeftTextRef = mobileTextRefs.current.get(leftId);
      const mobileCenterTextRef = mobileTextRefs.current.get(centerId);
      const mobileRightTextRef = mobileTextRefs.current.get(rightId);

      // DESKTOP animations
      if (leftRef) {
        gsap.to(leftRef, {
          x: -700,
          scale: 0.4,
          opacity: 0,
          zIndex: 1,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      if (centerRef) {
        gsap.to(centerRef, {
          x: -400,
          scale: 0.564,
          opacity: 0.7,
          zIndex: 5,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }
      if (centerTextRef) {
        gsap.to(centerTextRef, {
          fontSize: 14,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      if (rightRef) {
        gsap.to(rightRef, {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 10,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }
      if (rightTextRef) {
        gsap.to(rightTextRef, {
          fontSize: 20,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      if (incomingRef) {
        gsap.to(incomingRef, {
          x: 400,
          scale: 0.564,
          opacity: 0.7,
          zIndex: 5,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      // MOBILE animations
      if (mobileLeftRef) {
        gsap.to(mobileLeftRef, {
          x: -300,
          scale: 0.3,
          opacity: 0,
          zIndex: 1,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      if (mobileCenterRef) {
        gsap.to(mobileCenterRef, {
          x: -150,
          scale: 0.5,
          opacity: 0.6,
          zIndex: 5,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }
      if (mobileCenterTextRef) {
        gsap.to(mobileCenterTextRef, {
          fontSize: 12,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      if (mobileRightRef) {
        gsap.to(mobileRightRef, {
          x: 0,
          scale: 0.85,
          opacity: 1,
          zIndex: 10,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }
      if (mobileRightTextRef) {
        gsap.to(mobileRightTextRef, {
          fontSize: 16,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      if (mobileIncomingRef) {
        gsap.to(mobileIncomingRef, {
          x: 150,
          scale: 0.5,
          opacity: 0.6,
          zIndex: 5,
          duration: 0.8,
          ease: "power1.inOut"
        });
      }

      // Update index after animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % awardsData.length);
      }, 850);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, awardsData.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-[26px] md:text-5xl font-normal text-black leading-tight">
            Awards
          </h2>
        </div>

        {/* DESKTOP */}
        <div className="relative overflow-hidden hidden md:block">
          <div className="flex justify-center items-center h-96 relative">
            {awardsData.map((award) => (
              <div
                key={award.id}
                ref={setItemRef(award.id)}
                className="absolute flex flex-col items-center"
                style={{ willChange: 'transform' }}
              >
                <div className="mb-6 relative">
                  <Image
                    src={award.image}
                    alt={award.name}
                    width={211}
                    height={211}
                    className="object-contain"
                    style={{ display: 'block' }}
                  />
                </div>
                <h3
                  ref={setTextRef(award.id)}
                  className="font-semibold text-center text-black max-w-60"
                >
                  {award.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="relative overflow-hidden md:hidden">
          <div className="flex justify-center items-center h-80 relative">
            {awardsData.map((award) => (
              <div
                key={`mobile-${award.id}`}
                ref={setMobileItemRef(award.id)}
                className="absolute flex flex-col items-center"
                style={{ willChange: 'transform' }}
              >
                <div className="mb-4 relative">
                  <Image
                    src={award.image}
                    alt={award.name}
                    width={150}
                    height={150}
                    className="object-contain"
                    style={{ display: 'block' }}
                  />
                </div>
                <h3
                  ref={setMobileTextRef(award.id)}
                  className="font-semibold text-center text-black max-w-40 px-2"
                >
                  {award.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;