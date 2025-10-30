"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "@/lib/gsap/gsapSetup";
import { ScrollManager } from "@/lib/gsap/scrollManager";
import AnimatedButton from "../ui/animatedButton";
import { useHeroScroll } from "@/context/HeroScrollContext";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global cache for ImageBitmaps to persist across navigations
const framesCache = new Array(320).fill(null) as (ImageBitmap | null)[];
let isGloballyLoading = false;
let globalLoadPromise: Promise<void> | null = null;

const Hero = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);

  const imgSeqRef = useRef({ frame: 0 });
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
    `/NRC_Renders/${(index + 1).toString().padStart(4, "0")}.webp`;

  // Render function
  const render = useCallback((frameIndex: number) => {
    if (!mountedRef.current) return;

    const bitmap = framesCache[frameIndex];
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!bitmap || !canvas || !context) return;

    const imgWidth = bitmap.width;
    const imgHeight = bitmap.height;

    if (imgWidth === 0 || imgHeight === 0) return;

    const canvasWidth = 1920;
    const canvasHeight = 1080;
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;
    const x = canvasWidth / 2 - scaledWidth / 2;
    const y = canvasHeight / 2 - scaledHeight / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(
      bitmap,
      0,
      0,
      imgWidth,
      imgHeight,
      x,
      y,
      scaledWidth,
      scaledHeight
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

        if (framesCache[idleFrameRef.current]) {
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

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const ctx = gsap.context(() => {
      gsap.set(".title-line", { y: "0%" });
      gsap.set(".description-line, .button-line", { y: "100%" });
      gsap.set(contentRef.current, { opacity: 1, visibility: "visible" });

      if (buttonWrapperRef.current) {
        buttonWrapperRef.current.style.visibility = "visible";
      }

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
          if (framesCache[frameIndex]) {
            render(frameIndex);
          }
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

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
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3000",
      scrub: 1,
      onUpdate: (self) => {
        if (self.progress >= 0.5 && self.direction === 1) {
          setHeroScrolled(true);
        } else if (self.progress < 0.5 && self.direction === -1) {
          setHeroScrolled(false);
        }
      },
    });

    return () => trigger.kill();
  }, [setHeroScrolled]);

  // Ultra-fast parallel loading function
  const loadAllFramesUltraFast = useCallback(async () => {
    const BATCH_SIZE = 40; // Load 40 images simultaneously
    const TOTAL_BATCHES = Math.ceil(totalFrames / BATCH_SIZE);
    
    let loadedCount = 0;

    const loadImage = async (index: number): Promise<void> => {
      if (framesCache[index]) {
        loadedCount++;
        return;
      }

      const framePath = currentFrame(index);

      try {
        // Use fetch with high priority for critical frames
        const response = await fetch(framePath, {
          priority: index < idleFrameCount ? 'high' : 'auto'
        } as RequestInit);
        
        const blob = await response.blob();
        
        if (!mountedRef.current) return;

        const bitmap = await createImageBitmap(blob, {
          premultiplyAlpha: 'none',
          colorSpaceConversion: 'none',
          resizeQuality: 'pixelated'
        });
        
        framesCache[index] = bitmap;
        loadedCount++;
        
        if (mountedRef.current) {
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        }
      } catch (err) {
        if (mountedRef.current) {
          console.error(`Frame ${index} failed:`, err);
        }
        loadedCount++;
      }
    };

    // Load in optimized batches
    for (let batchIndex = 0; batchIndex < TOTAL_BATCHES; batchIndex++) {
      const startIdx = batchIndex * BATCH_SIZE;
      const endIdx = Math.min(startIdx + BATCH_SIZE, totalFrames);
      
      const batchPromises = [];
      for (let i = startIdx; i < endIdx; i++) {
        batchPromises.push(loadImage(i));
      }
      
      // Load batch in parallel
      await Promise.all(batchPromises);
      
      if (!mountedRef.current) break;
    }
  }, [totalFrames, idleFrameCount]);

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

    canvas.width = 1920;
    canvas.height = 1080;

    const initializeAndLoad = async () => {
      // If already loading globally, wait for it
      if (isGloballyLoading && globalLoadPromise) {
        setShowLoading(false); // Don't show loading if already cached/loading
        await globalLoadPromise;
        
        if (mountedRef.current && framesCache[0]) {
          render(0);
          setIsInitialized(true);
          gsapContextRef.current = setupGSAPAnimations();
          startIdleAnimation();
        }
        return;
      }

      // Check if frames are already cached
      const allFramesCached = framesCache.every(frame => frame !== null);
      
      if (allFramesCached) {
        // All frames already loaded, skip loading screen
        setShowLoading(false);
        if (mountedRef.current && framesCache[0]) {
          render(0);
          setIsInitialized(true);
          gsapContextRef.current = setupGSAPAnimations();
          startIdleAnimation();
        }
        return;
      }

      // Show loading only if frames need to be loaded
      setShowLoading(true);

      // Start global loading
      isGloballyLoading = true;
      
      globalLoadPromise = (async () => {
        const startTime = performance.now();
        console.log('🚀 Starting ultra-fast image loading...');
        
        await loadAllFramesUltraFast();
        
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        console.log(`✅ Loaded all ${totalFrames} frames in ${duration}s`);
      })();

      await globalLoadPromise;
      
      isGloballyLoading = false;

      if (!mountedRef.current) return;

      // Initialize after loading
      if (framesCache[0]) {
        render(0);
        setIsInitialized(true);
        gsapContextRef.current = setupGSAPAnimations();
        startIdleAnimation();
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
      setHeroContentRevealed(false);
      setIsInitialized(false);
    };
  }, [
    render,
    setupGSAPAnimations,
    startIdleAnimation,
    stopIdleAnimation,
    setHeroContentRevealed,
    loadAllFramesUltraFast,
    totalFrames,
  ]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Loading indicator */}
        {showLoading && !isInitialized && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-white">
            <div className="text-2xl font-light mb-4 gothicFont">
              Loading Experience
            </div>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#8B5CF6] transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600">{loadProgress}%</div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-screen object-cover z-10"
          style={{
            opacity: isInitialized ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
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
                Investing For Long Term&nbsp;
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