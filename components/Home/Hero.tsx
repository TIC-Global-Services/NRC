"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "@/lib/gsap/gsapSetup";
import { ScrollManager } from "@/lib/gsap/scrollManager";
import AnimatedButton from "../ui/animatedButton";
import { useHeroScroll } from "@/context/HeroScrollContext";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const imgSeqRef = useRef({ frame: 0 });
  const loadingQueueRef = useRef<Set<number>>(new Set());
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const mountedRef = useRef<boolean>(true);

  const animationFrameRef = useRef<number | null>(null);
  const isIdleAnimatingRef = useRef<boolean>(false);
  const idleFrameRef = useRef<number>(0);
  const lastIdleTimeRef = useRef<number>(0);
  const idleDirectionRef = useRef<"forward" | "backward">("forward");

  const gsapContextRef = useRef<gsap.Context | null>(null);

  const totalFrames = 320;
  const idleFrameCount = 40;
  const idleFrameRate = 15;
  const idleFrameDelay = 1000 / idleFrameRate;

  const router = useRouter();
  const { setHeroScrolled, setHeroContentRevealed } = useHeroScroll();

  const currentFrame = (index: number) =>
    `/NRC_mountains/${(index + 1).toString().padStart(4, "0")}.png`;

  const priorityFrames = useRef(Array.from({ length: 64 }, (_, i) => i * 5));

  // Cleanup object URLs
  const cleanupObjectUrls = useCallback(() => {
    objectUrlsRef.current.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {
        // Ignore errors
      }
    });
    objectUrlsRef.current.clear();
  }, []);

  // Render function
  const render = useCallback((frameIndex: number) => {
    if (!mountedRef.current) return;

    const img = imagesRef.current[frameIndex];
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!img || !img.complete || !canvas || !context) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (imgWidth === 0 || imgHeight === 0) return;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = canvasWidth / 2 - (imgWidth / 2) * scale;
    const y = canvasHeight / 2 - (imgHeight / 2) * scale;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      x,
      y,
      imgWidth * scale,
      imgHeight * scale
    );
  }, []);

  // Idle animation
  const animateIdle = useCallback(
    (timestamp: number) => {
      if (!isIdleAnimatingRef.current || !mountedRef.current) return;

      if (timestamp - lastIdleTimeRef.current >= idleFrameDelay) {
        if (idleDirectionRef.current === "forward") {
          idleFrameRef.current++;
          if (idleFrameRef.current >= idleFrameCount - 1) {
            idleDirectionRef.current = "backward";
          }
        } else {
          idleFrameRef.current--;
          if (idleFrameRef.current <= 0) {
            idleDirectionRef.current = "forward";
          }
        }

        if (imagesRef.current[idleFrameRef.current]) {
          render(idleFrameRef.current);
        }

        lastIdleTimeRef.current = timestamp;
      }

      if (isIdleAnimatingRef.current && mountedRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateIdle);
      }
    },
    [idleFrameCount, idleFrameDelay, render]
  );

  const startIdleAnimation = useCallback(() => {
    if (isIdleAnimatingRef.current || !mountedRef.current) return;

    const currentFrame = idleFrameRef.current;
    if (currentFrame >= idleFrameCount - 1) {
      idleDirectionRef.current = "backward";
    } else if (currentFrame <= 0) {
      idleDirectionRef.current = "forward";
    }

    isIdleAnimatingRef.current = true;
    lastIdleTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animateIdle);
  }, [animateIdle, idleFrameCount]);

  const stopIdleAnimation = useCallback(() => {
    isIdleAnimatingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // GSAP animations setup
  const setupGSAPAnimations = useCallback(() => {
    if (!mountedRef.current) return null;

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".title-line", { y: "0%" });
      gsap.set(".description-line, .button-line", { y: "100%" });
      gsap.set(contentRef.current, { opacity: 1, visibility: "visible" });

      if (buttonWrapperRef.current) {
        buttonWrapperRef.current.style.visibility = "visible";
      }

      // Description and button animation
      gsap.to(".description-line, .button-line", {
        y: "0%",
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=1200",
          end: "+=1800",
          scrub: 1,
          onUpdate: (self) => {
            if (mountedRef.current) {
              setHeroContentRevealed(self.progress >= 0.95);
            }
          },
        },
      });

      // Frame animation
      gsap.to(imgSeqRef.current, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            if (!mountedRef.current) return;

            const currentFrameNum = Math.round(imgSeqRef.current.frame);

            if (currentFrameNum >= idleFrameCount) {
              stopIdleAnimation();
            } else if (
              self.progress > 0 &&
              self.getVelocity() === 0 &&
              currentFrameNum < idleFrameCount
            ) {
              if (!isIdleAnimatingRef.current) {
                idleFrameRef.current = currentFrameNum;
                startIdleAnimation();
              }
            } else if (self.getVelocity() !== 0) {
              stopIdleAnimation();
            }
          },
          onLeaveBack: () => {
            if (mountedRef.current) {
              idleFrameRef.current = 0;
              startIdleAnimation();
              setHeroContentRevealed(false);
            }
          },
        },
        onUpdate: () => {
          if (!mountedRef.current) return;
          const frameIndex = Math.round(imgSeqRef.current.frame);
          if (imagesRef.current[frameIndex]) {
            render(frameIndex);
          }
        },
      });
    }, sectionRef);

    return ctx;
  }, [
    render,
    startIdleAnimation,
    stopIdleAnimation,
    setHeroContentRevealed,
    idleFrameCount,
    totalFrames,
  ]);

  // Track hero scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !mountedRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setHeroScrolled(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setHeroScrolled]);

  // Main initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    mountedRef.current = true;

    const context = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false,
    });

    if (!context) return;

    contextRef.current = context;
    imagesRef.current = new Array(totalFrames).fill(null);

    canvas.width = 1920;
    canvas.height = 1080;

    const initializeAndLoad = async () => {
      try {
        const loadImage = async (
          index: number,
          isPriority: boolean = false
        ): Promise<void> => {
          if (!mountedRef.current || loadingQueueRef.current.has(index)) return;

          loadingQueueRef.current.add(index);
          const framePath = currentFrame(index);

          try {
            const response = await fetch(framePath, {
              priority: isPriority ? "high" : "low",
              cache: "force-cache",
            } as any);

            if (!response.ok || !mountedRef.current) {
              throw new Error("Failed to fetch or component unmounted");
            }

            const blob = await response.blob();
            if (!mountedRef.current) return;

            const img = new Image();
            const url = URL.createObjectURL(blob);
            objectUrlsRef.current.add(url);

            await new Promise<void>((resolve, reject) => {
              img.onload = () => {
                if (mountedRef.current) {
                  imagesRef.current[index] = img;
                }
                resolve();
              };
              img.onerror = reject;
              img.src = url;
            });
          } catch (err) {
            if (mountedRef.current) {
              console.error(`Frame ${index} failed:`, err);
            }
          } finally {
            loadingQueueRef.current.delete(index);
          }
        };

        // PHASE 1: Load first frame
        await loadImage(0, true);

        if (!mountedRef.current) return;

        if (imagesRef.current[0]) {
          render(0);
          setIsInitialized(true);
          gsapContextRef.current = setupGSAPAnimations();
        }

        // PHASE 2: Load idle frames
        const remainingIdleFrames = Array.from(
          { length: idleFrameCount - 1 },
          (_, i) => i + 1
        );

        await Promise.allSettled(
          remainingIdleFrames.map((idx) => loadImage(idx, true))
        );

        if (mountedRef.current) {
          startIdleAnimation();
        }

        // PHASE 3: Load priority frames in batches
        const loadPriorityFrames = async () => {
          const batchSize = 15;
          for (
            let i = 0;
            i < priorityFrames.current.length && mountedRef.current;
            i += batchSize
          ) {
            const batch = priorityFrames.current.slice(i, i + batchSize);
            await Promise.allSettled(batch.map((idx) => loadImage(idx, true)));
            if (mountedRef.current) {
              await new Promise((resolve) => setTimeout(resolve, 5));
            }
          }
        };

        // PHASE 4: Load remaining frames
        const loadRemainingFrames = async () => {
          const remainingFrames = Array.from(
            { length: totalFrames },
            (_, i) => i
          ).filter(
            (i) => i >= idleFrameCount && !priorityFrames.current.includes(i)
          );

          const batchSize = 20;
          for (
            let i = 0;
            i < remainingFrames.length && mountedRef.current;
            i += batchSize
          ) {
            const batch = remainingFrames.slice(i, i + batchSize);
            await Promise.allSettled(batch.map((idx) => loadImage(idx, false)));
            if (mountedRef.current) {
              await new Promise((resolve) => setTimeout(resolve, 20));
            }
          }
        };

        await loadPriorityFrames();
        if (mountedRef.current) {
          loadRemainingFrames();
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };

    initializeAndLoad();

    return () => {
      mountedRef.current = false;

      stopIdleAnimation();

      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }

      ScrollManager.killAll();

      cleanupObjectUrls();

      imagesRef.current = [];
      loadingQueueRef.current.clear();

      setHeroContentRevealed(false);
      setIsInitialized(false);
    };
  }, [
    render,
    setupGSAPAnimations,
    startIdleAnimation,
    stopIdleAnimation,
    cleanupObjectUrls,
    setHeroContentRevealed,
    idleFrameCount,
    totalFrames,
  ]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-screen object-cover z-10"
          style={{
            opacity: isInitialized ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        <div
          ref={contentRef}
          style={{ opacity: 0, visibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-start mt-[40%] lg:mt-[14%] text-center px-4 z-30 gothicFont"
        >
          <div className="text-3xl md:text-[50px] lg:text-6xl font-light mb-2 md:mb-2 overflow-hidden gothicFont">
            <div className="flex lg:flex-row flex-col overflow-hidden">
              <span className="text-black inline-block font-[400] title-line leading-[120%]">
                Investing For Long Term&#160;
              </span>
              <span className="text-[#8B5CF6] font-normal inline-block title-line leading-[120%]">
                Value Creation
              </span>
            </div>
          </div>

          <div className="text-sm md:text-lg lg:text-[20px] font-light md:leading-[24px] lg:leading-[34px] mb-6 overflow-hidden">
            <div className="text-[#484848] overflow-hidden">
              <div className="description-line">
                At Nine Rivers Capital, we apply private-equity rigor to{" "}
                <br className="md:hidden" /> public markets with{" "}
                <br className="md:block hidden" />
                curated portfolio strategies for HNIs and Family Offices.
              </div>
            </div>
          </div>

          <div
            ref={buttonWrapperRef}
            className="overflow-hidden"
            style={{ visibility: "hidden" }}
          >
            <div className="button-line">
              <AnimatedButton
                isBtnScale={false}
                label="Explore Our PMS"
                delay={0.5}
                onClick={() => router.push("/pms")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
