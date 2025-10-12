// Glance.tsx
import React, { useEffect, useRef } from "react";
import FlexibleHeading from "../../ui/FlexibleHeading";
import InfoCard from "./Card";
import { GlanceSVG1, GlanceSVG2, GlanceSVG3 } from "@/assets/PMS/index";
import Container from "@/components/Reusable/Container";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import AnimatedButton from "@/components/ui/animatedButton";

// Register GSAP plugin
gsap.registerPlugin(Draggable);

const Glance = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);

  // Card data
  const cards = [
    {
      id: 1,
      title: "12+ Years of live PMS history",
      imageSrc: GlanceSVG1.src || GlanceSVG1,
      imageAlt: "PMS History Illustration",
      imageWidth: 298,
      imageHeight: 175,
    },
    {
      id: 2,
      title: "2 Strategies (Small Cap & Flexi-Cap)",
      imageSrc: GlanceSVG2.src || GlanceSVG2,
      imageAlt: "Portfolio Strategy",
      imageWidth: 250,
      imageHeight: 185,
    },
    {
      id: 3,
      title: "SEBI-Registered | Independent | Founder-led",
      imageSrc: GlanceSVG3.src || GlanceSVG3,
      imageAlt: "Risk Analytics",
      imageWidth: 210,
      imageHeight: 201,
    },
  ];

  // Get screen width for mobile
  const getScreenWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 375; // fallback width
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;

    if (!slider || !container) return;

    // Only initialize draggable on mobile
    const checkMobile = () => window.innerWidth < 768;

    if (checkMobile()) {
      const cardWidth = getScreenWidth() * 0.8; // 80% of screen width
      const maxX = 0;
      const minX = -(cardWidth * (cards.length - 1));

      const draggable = Draggable.create(slider, {
        type: "x",
        bounds: {
          minX: minX,
          maxX: maxX,
        },
        inertia: true,
        snap: {
          x: function (endValue) {
            const snapIndex = Math.round(-endValue / cardWidth);
            currentIndexRef.current = Math.max(
              0,
              Math.min(snapIndex, cards.length - 1)
            );
            return -currentIndexRef.current * cardWidth;
          },
        },
        onDrag: function () {
          // Optional: Add any drag feedback here
        },
        onThrowUpdate: function () {
          // Optional: Handle throw updates
        },
        onComplete: function () {
          // Snap completed
        },
      });

      return () => {
        draggable[0].kill();
      };
    }
  }, [cards.length]);

  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile className="py-12 lg:py-0">
      <FlexibleHeading
        title="Our PMS at a Glance."
        description="Our PMS is built for discerning investors who want long-term compounding, not index hugging. Every portfolio is curated with high conviction, disciplined risk frameworks, and skin in the game."
        maxWidth="max-w-xl"
        highlights={{
          "Glance.": "text-primary",
        }}
        isMB={false}
      />

      <div className="flex items-center justify-center pt-6 pb-10 md:hidden">
        <AnimatedButton label="Discover Nine Rivers" className="mx-auto" />
      </div>

      {/* Desktop Grid */}
      <div className="md:grid md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-[22px] justify-items-center hidden mt-12">
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

      {/* Mobile Slider */}
      <div className="md:hidden">
        <div ref={containerRef} className="overflow-hidden w-full">
          <div
            ref={sliderRef}
            className="flex"
            style={{
              width: `${cards.length * 80}vw`,
            }}
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
      </div>
    </Container>
  );
};

export default Glance;