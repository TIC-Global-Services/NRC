"use client";

import React, { useEffect, useRef } from "react";
import FlexibleHeading from "../../ui/FlexibleHeading";
import InfoCard from "./Card";
import { GlanceImg1, GlanceImg2, GlanceImg3 } from "@/assets/PMS/index";
import Container from "@/components/Reusable/Container";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import AnimatedButton from "@/components/ui/animatedButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(Draggable);

const Glance = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const currentIndexRef = useRef(0);

  const cards = [
    {
      id: 1,
      title: "12+ Years of live PMS history",
      imageSrc: GlanceImg1.src || GlanceImg1,
      imageAlt: "PMS History Illustration",
      imageWidth: 298,
      imageHeight: 175,
    },
    {
      id: 2,
      title: "2 Strategies (Small Cap & Flexi-Cap)",
      imageSrc: GlanceImg2.src || GlanceImg2,
      imageAlt: "Portfolio Strategy",
      imageWidth: 250,
      imageHeight: 185,
    },
    {
      id: 3,
      title: "SEBI-Registered | Independent | Founder-led",
      imageSrc: GlanceImg3.src || GlanceImg3,
      imageAlt: "Risk Analytics",
      imageWidth: 210,
      imageHeight: 201,
    },
  ];

  const getScreenWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 375;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (window.innerWidth < 768) {
      const cardWidth = getScreenWidth() * 0.8;
      const maxX = 0;
      const minX = -(cardWidth * (cards.length - 1));

      const draggable = Draggable.create(slider, {
        type: "x",
        bounds: { minX, maxX },
        inertia: true,
        throwResistance: 1000,
        edgeResistance: 0.8,
        snap: {
          x: (endValue) => {
            const snapIndex = Math.round(-endValue / cardWidth);
            currentIndexRef.current = Math.max(
              0,
              Math.min(snapIndex, cards.length - 1)
            );
            return -currentIndexRef.current * cardWidth;
          },
        },
        onDragEnd: function () {
          // Keep current index updated on manual drag
          const newIndex = Math.round(-this.x / cardWidth);
          currentIndexRef.current = Math.max(
            0,
            Math.min(newIndex, cards.length - 1)
          );
        },
      })[0];

      draggableRef.current = draggable;
    }

    return () => {
      draggableRef.current?.kill();
    };
  }, [cards.length]);

  /** ✅ Smooth programmatic scroll (linked to Draggable) */
  const scrollToCard = (index: number) => {
    const cardWidth = getScreenWidth() * 0.8;
    const targetX = -index * cardWidth;

    if (!sliderRef.current || !draggableRef.current) return;

    gsap.to(sliderRef.current, {
      x: targetX,
      duration: 0.6, // slightly longer for smoother feel
      ease: "power2.out",
      onUpdate: () => {
        draggableRef.current?.update();
      }, // keeps internal sync
    });

    currentIndexRef.current = index;
  };

  // ✅ Move to previous card
  const handlePrev = () => {
    const prevIndex = Math.max(0, currentIndexRef.current - 1);
    scrollToCard(prevIndex);
  };

  // ✅ Move to next card
  const handleNext = () => {
    const nextIndex = Math.min(cards.length - 1, currentIndexRef.current + 1);
    scrollToCard(nextIndex);
  };

  return (
    <Container
      disablePaddingTopMobile
      disablePaddingBottomMobile
      className="py-12 lg:py-0"
    >
      <FlexibleHeading
        title="Our PMS at a Glance."
        description="Our PMS is built for discerning investors who want long-term compounding, not index hugging. Every portfolio is curated with high conviction, disciplined risk frameworks, and skin in the game."
        maxWidth="max-w-xl"
        highlights={{
          "Glance.": "text-primary",
        }}
        isMB={false}
      />

      {/* CTA button (mobile only) */}
      <div className="flex items-center justify-center pt-6 pb-10 md:hidden">
        <AnimatedButton label="Discover Nine Rivers" className="mx-auto" />
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-[22px] justify-items-center mt-12">
        {cards.map((card) => (
          <InfoCard
            key={card.id}
            title={card.title}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            imageWidth={card.imageWidth}
            imageHeight={card.imageHeight}
          />
        ))}
      </div>

      {/* ✅ Mobile Slider with Bottom Arrows */}
      <div className="md:hidden flex flex-col items-center">
        {/* Slider */}
        <div className="overflow-hidden w-full">
          <div
            ref={sliderRef}
            className="flex"
            style={{ width: `${cards.length * 80}vw` }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-[80vw] flex-shrink-0 flex items-center justify-start pr-4"
              >
                <div className="w-full">
                  <InfoCard
                    title={card.title}
                    imageSrc={card.imageSrc}
                    imageAlt={card.imageAlt}
                    imageWidth={card.imageWidth}
                    imageHeight={card.imageHeight}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Arrows below slider */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            onClick={handlePrev}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md active:scale-95 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md active:scale-95 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Glance;
