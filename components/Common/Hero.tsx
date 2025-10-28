"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../ui/animatedButton";

interface HeroProps {
  isContact?: boolean;
  title1?: string;
  title1Color?: string;
  title2?: string;
  title2Color?: string;
  // Mobile-specific titles (optional)
  mobileTitle1?: string;
  mobileTitle1Color?: string;
  mobileTitle2?: string;
  mobileTitle2Color?: string;
  desc1?: string;
  desc2?: string;
  desc3?: string;
  mobDes1?: string;
  mobDes2?: string;
  mobDes3?: string;
  isCTA?: boolean;
  CTAOne?: string;
  CTATwo?: string;
  hideCTAOne?: boolean;
  hideCTATwo?: boolean;
  CTATwoOnclick?: () => void;
  CTAOneOnclick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  isContact,
  title1,
  title1Color,
  title2,
  title2Color,
  mobileTitle1,
  mobileTitle1Color,
  mobileTitle2,
  mobileTitle2Color,
  desc1,
  desc2,
  desc3,
  mobDes1,
  mobDes2,
  mobDes3,
  isCTA,
  CTAOne,
  CTATwo,
  hideCTAOne,
  hideCTATwo,
  CTAOneOnclick,
  CTATwoOnclick,
}) => {
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isRenderingRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const loadingQueueRef = useRef<Set<number>>(new Set());
  const mountedRef = useRef<boolean>(true);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  const totalFrames: number = 249;
  const frameRate: number = 30;
  const frameDelay: number = 1000 / frameRate;

  // Priority frames - load every 3rd frame initially
  const priorityFrames = useRef(Array.from({ length: 83 }, (_, i) => i * 3));

  // Check if mobile-specific titles are provided
  const hasMobileTitles =
    mobileTitle1 !== undefined ||
    mobileTitle1Color !== undefined ||
    mobileTitle2 !== undefined ||
    mobileTitle2Color !== undefined;

  // Use mobile titles if ANY mobile title prop is provided, otherwise use desktop titles
  const effectiveMobileTitle1 = hasMobileTitles ? mobileTitle1 || "" : title1;
  const effectiveMobileTitle1Color = hasMobileTitles
    ? mobileTitle1Color || ""
    : title1Color;
  const effectiveMobileTitle2 = hasMobileTitles ? mobileTitle2 || "" : title2;
  const effectiveMobileTitle2Color = hasMobileTitles
    ? mobileTitle2Color || ""
    : title2Color;

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

  const render = useCallback((frameIndex: number): void => {
    if (!mountedRef.current || isRenderingRef.current) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const currentImage = framesRef.current[frameIndex];

    if (!canvas || !context || !currentImage || !currentImage.complete) return;

    isRenderingRef.current = true;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (!mountedRef.current) {
        isRenderingRef.current = false;
        return;
      }

      try {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

        const displayWidth = rect.width;
        const displayHeight = rect.height;

        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;

        context.scale(dpr, dpr);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const imgWidth = currentImage.naturalWidth || currentImage.width;
        const imgHeight = currentImage.naturalHeight || currentImage.height;

        const scaleX = displayWidth / imgWidth;
        const scaleY = displayHeight / imgHeight;
        const baseScale = Math.max(scaleX, scaleY);
        const scale = baseScale * 2.2;

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const x = (displayWidth - scaledWidth) / 2;
        const y = (displayHeight - scaledHeight) / 2;

        context.clearRect(0, 0, displayWidth, displayHeight);
        context.drawImage(currentImage, x, y, scaledWidth, scaledHeight);
      } catch (err) {
        console.error("Render error:", err);
      } finally {
        isRenderingRef.current = false;
      }
    });
  }, []);

  const animateFrames = useCallback(
    (timestamp: number) => {
      if (!mountedRef.current || !isPlaying || !isAnimatingRef.current) return;

      if (timestamp - lastFrameTimeRef.current >= frameDelay) {
        setCurrentFrame((prevFrame) => {
          const nextFrame = (prevFrame + 1) % totalFrames;

          let frameToRender = nextFrame;
          let attempts = 0;
          while (!framesRef.current[frameToRender] && attempts < totalFrames) {
            frameToRender = (frameToRender + 1) % totalFrames;
            attempts++;
          }

          if (framesRef.current[frameToRender]) {
            render(frameToRender);
          }

          return nextFrame;
        });

        lastFrameTimeRef.current = timestamp;
      }

      if (isAnimatingRef.current && mountedRef.current) {
        requestAnimationFrame(animateFrames);
      }
    },
    [isPlaying, frameDelay, totalFrames, render]
  );

  useEffect(() => {
    if (!isPlaying || !isInitialized || !mountedRef.current) {
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = true;
    lastFrameTimeRef.current = performance.now();
    requestAnimationFrame(animateFrames);

    return () => {
      isAnimatingRef.current = false;
    };
  }, [isPlaying, isInitialized, animateFrames]);

  // Main initialization and loading effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    mountedRef.current = true;

    const initializeAndLoad = async () => {
      try {
        const context = canvas.getContext("2d", {
          alpha: true,
          desynchronized: true,
          willReadFrequently: false,
        });

        if (!context) {
          setError("Canvas context not supported");
          return;
        }

        contextRef.current = context;
        framesRef.current = new Array(totalFrames).fill(null);

        // Optimized image loader using browser cache
        const loadImage = async (
          index: number,
          isPriority: boolean = false
        ): Promise<void> => {
          if (!mountedRef.current || loadingQueueRef.current.has(index)) return;

          loadingQueueRef.current.add(index);

          const frameNo = index.toString();
          const framePath = `/NRC_wave_output/${frameNo}.webp`;

          try {
            // Use fetch with cache control - browser handles caching automatically
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
                  framesRef.current[index] = img;
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

        // PHASE 1: Load and render first frame
        await loadImage(0, true);

        if (!mountedRef.current) return;

        if (framesRef.current[0]) {
          render(0);
          setIsInitialized(true);
          setIsPlaying(true);
        }

        // PHASE 2: Load priority frames in batches
        const loadPriorityFrames = async () => {
          const priorityBatchSize = 12;
          const frames = priorityFrames.current;

          for (
            let i = 0;
            i < frames.length && mountedRef.current;
            i += priorityBatchSize
          ) {
            const batch = frames.slice(i, i + priorityBatchSize);
            await Promise.allSettled(batch.map((idx) => loadImage(idx, true)));
            // Small delay to prevent blocking
            if (mountedRef.current) {
              await new Promise((resolve) => setTimeout(resolve, 5));
            }
          }
        };

        // PHASE 3: Load remaining frames
        const loadRemainingFrames = async () => {
          const remainingFrames = Array.from(
            { length: totalFrames },
            (_, i) => i
          ).filter((i) => !priorityFrames.current.includes(i) && i !== 0);

          const batchSize = 15;
          for (
            let i = 0;
            i < remainingFrames.length && mountedRef.current;
            i += batchSize
          ) {
            const batch = remainingFrames.slice(i, i + batchSize);
            await Promise.allSettled(batch.map((idx) => loadImage(idx, false)));
            // Prevent blocking
            if (mountedRef.current) {
              await new Promise((resolve) => setTimeout(resolve, 20));
            }
          }
        };

        // Run priority and remaining loads in sequence
        await loadPriorityFrames();
        if (mountedRef.current) {
          loadRemainingFrames();
        }
      } catch (err) {
        console.error("Initialization error:", err);
        if (mountedRef.current) {
          setError("Failed to initialize animation");
        }
      }
    };

    initializeAndLoad();

    return () => {
      mountedRef.current = false;
      isAnimatingRef.current = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Cleanup object URLs
      cleanupObjectUrls();

      // Clear frames
      framesRef.current = [];
      loadingQueueRef.current.clear();
    };
  }, [render, cleanupObjectUrls]);

  // Handle window resize with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (mountedRef.current && framesRef.current[currentFrame]) {
          render(currentFrame);
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [currentFrame, render]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!mountedRef.current) return;

      if (document.hidden) {
        isAnimatingRef.current = false;
      } else if (isPlaying && isInitialized) {
        isAnimatingRef.current = true;
        lastFrameTimeRef.current = performance.now();
        requestAnimationFrame(animateFrames);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, isInitialized, animateFrames]);

  if (error) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-xl mb-2">Animation Error</div>
          <div className="text-sm opacity-75">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full relative h-screen overflow-hidden"
      style={{
        background: `radial-gradient(circle at top, #C5BAF6 0%, #DAD4F1 36%, #FCFAF2 100%)`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        <div
          className="absolute bg-transparent bottom-0 w-full"
          style={{ height: "100vh" }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-[100%]"
            style={{
              maxWidth: "100vw",
              display: "block",
              opacity: isInitialized ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </div>

        <motion.div
          className={`absolute inset-0 flex flex-col md:mt-20 2xl:mt-0 items-center ${
            isContact && "md:mt-28"
          } justify-center md:justify-start lg:justify-center md:pt-[25%] lg:pt-0 text-center px-4 z-10 gothicFont`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInitialized ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-3xl md:text-5xl lg:text-6xl font-light mb-8 overflow-hidden gothicFont">
            <motion.div
              className="flex flex-col -gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInitialized ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {/* Desktop Titles */}
              <div className="hidden md:block">
                <motion.div
                  className="text-black font-[400]"
                  initial={{ y: "100%" }}
                  animate={{ y: isInitialized ? "0%" : "100%" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {title1}{" "}
                  {title1Color && (
                    <span className="text-primary">{title1Color}</span>
                  )}
                </motion.div>

                {(title2 || title2Color) && (
                  <motion.div
                    className="font-normal"
                    initial={{ y: "100%" }}
                    animate={{ y: isInitialized ? "0%" : "100%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {title2}
                    {title2Color && (
                      <span className="text-[#8B5CF6]">{title2Color}</span>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Mobile Titles */}
              <div className="block md:hidden">
                <motion.span
                  className="text-black inline-block font-[400]"
                  initial={{ y: "100%" }}
                  animate={{ y: isInitialized ? "0%" : "100%" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {effectiveMobileTitle1}{" "}
                  {effectiveMobileTitle1Color && (
                    <span className="text-primary">
                      {effectiveMobileTitle1Color}
                    </span>
                  )}
                </motion.span>

                {(effectiveMobileTitle2 || effectiveMobileTitle2Color) && (
                  <motion.span
                    className="font-normal inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: isInitialized ? "0%" : "100%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {effectiveMobileTitle2}
                    {effectiveMobileTitle2Color && (
                      <span className="text-[#8B5CF6]">
                        {effectiveMobileTitle2Color}
                      </span>
                    )}
                  </motion.span>
                )}
              </div>

              {/* Desktop - Subheading */}
              <div className="text-sm md:text-lg lg:text-[20px] font-light md:leading-[24px] lg:leading-[34px] mt-5 md:mt-5 max-w-5xl mb-7 overflow-hidden mx-auto md:block hidden">
                <motion.div
                  className="text-[#484848]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: isInitialized ? "0%" : "100%",
                    opacity: isInitialized ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {desc1 && (
                    <>
                      {desc1}
                      <br />
                    </>
                  )}
                  {desc2 && (
                    <>
                      {desc2}
                      <br />
                    </>
                  )}
                  {desc3}
                </motion.div>
              </div>

              {/* Mobile desc */}
              <div className="text-sm md:text-base lg:text-[20px] font-light md:leading-[24px] lg:leading-[34px] mt-5 md:mt-5 max-w-5xl mb-7 overflow-hidden mx-auto md:hidden">
                <motion.div
                  className="text-[#484848]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: isInitialized ? "0%" : "100%",
                    opacity: isInitialized ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {mobDes1 && (
                    <>
                      {mobDes1}
                      <br />
                    </>
                  )}
                  {mobDes2 && (
                    <>
                      {mobDes2}
                      <br />
                    </>
                  )}
                  {mobDes3}
                </motion.div>
              </div>

              {isCTA && (
                <div className="flex flex-row gap-4 justify-center items-center">
                  {!hideCTAOne && CTAOne && (
                    <AnimatedButton
                      isBtnScale={false}
                      onClick={CTAOneOnclick}
                      label={CTAOne}
                    />
                  )}

                  {!hideCTATwo && CTATwo && (
                    <AnimatedButton
                      isBtnScale={false}
                      label={CTATwo}
                      onClick={CTATwoOnclick}
                      variant="outline"
                      className="border border-[#070708] shadow-[inset_0_4px_4px_rgba(255,255,255,0.3)]"
                    />
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
