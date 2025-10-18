"use client";

import { Whoweare, WhoweareWider } from "@/assets/About";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const WhoWeAre = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Early return if GSAP not available
    if (typeof window === "undefined") return;

    let scrollTriggerInstance: any = null;
    let matchMediaInstance: any = null;

    const initAnimation = async () => {
      // Dynamic imports for better code splitting
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      matchMediaInstance = gsap.matchMedia();

      matchMediaInstance.add("(min-width: 768px)", () => {
        if (!sectionRef.current || !contentRef.current || !imageRef.current)
          return;

        // Force layout calculation
        const forceReflow = () => {
          void imageRef.current!.offsetHeight;
          void contentRef.current!.offsetHeight;
        };

        const createScrollTrigger = () => {
          // Kill existing instance
          if (scrollTriggerInstance) {
            scrollTriggerInstance.kill();
          }

          forceReflow();

          const imageHeight = imageRef.current!.offsetHeight;
          const contentHeight = contentRef.current!.offsetHeight;
          const scrollDistance = Math.max(0, imageHeight - contentHeight);

          // Only create if there's actual distance to scroll
          if (scrollDistance > 50) {
            scrollTriggerInstance = ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: contentRef.current,
              pinSpacing: false,
              scrub: true, // Use true instead of 0.1 for smoother performance
              anticipatePin: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              preventOverlaps: true,
              // Performance optimizations
              refreshPriority: 1,
              onRefresh: (self) => {
                forceReflow();
                const newImageHeight = imageRef.current!.offsetHeight;
                const newContentHeight = contentRef.current!.offsetHeight;
                const newScrollDistance = Math.max(
                  0,
                  newImageHeight - newContentHeight
                );

                if (newScrollDistance > 50) {
                  self.vars.end = `+=${newScrollDistance}`;
                }
              },
            });
          }
        };

        // Wait for images to load
        const images = imageRef.current!.querySelectorAll("img");
        const imageLoadPromises = Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        });

        Promise.all(imageLoadPromises).then(() => {
          // Small delay to ensure layout is stable
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              createScrollTrigger();
              ScrollTrigger.refresh();
            });
          });
        });

        // Optimized resize handler with RAF
        let resizeRAF: number | null = null;
        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
          // Cancel pending animations
          if (resizeRAF) {
            cancelAnimationFrame(resizeRAF);
          }

          clearTimeout(resizeTimeout);

          // Debounce the actual refresh
          resizeTimeout = setTimeout(() => {
            resizeRAF = requestAnimationFrame(() => {
              createScrollTrigger();
              ScrollTrigger.refresh();
            });
          }, 150);
        };

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
          window.removeEventListener("resize", handleResize);
          clearTimeout(resizeTimeout);
          if (resizeRAF) cancelAnimationFrame(resizeRAF);
          if (scrollTriggerInstance) scrollTriggerInstance.kill();
        };
      });
    };

    initAnimation();

    return () => {
      // Comprehensive cleanup
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (matchMediaInstance) {
        matchMediaInstance.revert();
      }

      // Kill all ScrollTriggers associated with this component
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === sectionRef.current) {
              st.kill();
            }
          });
        });
      }
    };
  }, []);

  return (
    <div className="md:pt-24 md:pb-32 pt-11 pb-40 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      <div
        ref={sectionRef}
        className="lg:grid lg:grid-cols-[40%_55%] flex flex-col-reverse items-start gap-x-10"
      >
        {/* Mobile Image */}
        <Image
          src={WhoweareWider}
          alt="Who we are"
          className="lg:hidden block h-[384px] md:h-[50%] w-full rounded-xl object-cover"
          width={532}
          height={384}
          loading="eager"
        />

        {/* Desktop Image */}
        <div ref={imageRef} className="lg:block hidden">
          <Image
            src={Whoweare}
            alt="Who we are"
            className="rounded-xl w-full h-auto"
            width={532}
            height={610}
            priority
            loading="eager"
          />
        </div>

        {/* Content - Sticky on Desktop */}
        <div className="mb-3 lg:mb-0 lg:h-auto">
          <div
            ref={contentRef}
            className="will-change-transform"
            style={{
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              perspective: 1000,
            }}
          >
            <h1 className="lg:text-[44px] md:text-5xl text-[26px] leading-8 lg:leading-[3.5rem] font-normal mb-4">
              Who <span className="text-primary">we are</span>
            </h1>
            <p className="lg:text-[20px] md:text-lg text-base leading-7 lg:leading-8 text-secondary font-normal">
              Nine Rivers Capital is an independent asset management and
              corporate advisory group that helps high-net-worth individuals and
              family offices build, preserve and grow wealth through bespoke PMS
              and AIF strategies and strategic corporate advisory. We combine
              long-term, research-driven investing with active stewardship to
              identify asymmetric, mid-market and growth opportunities across
              sectors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;