"use client";

import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../ui/animatedButton";
import { useHeroScroll } from "@/context/HeroScrollContext";

interface HeroProps {
  isContact?: boolean;
  title1?: string;
  title1Color?: string;
  title2?: string;
  title2Color?: string;
  desc1?: string;
  desc2?: string;
  desc3?: string;
  isCTA?: boolean;
  CTAOne?: string;
  CTATwo?: string;
}

// IndexedDB Cache Manager
class FrameCacheManager {
  private dbName = 'heroAnimationCache_v1';
  private storeName = 'frames';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async getFrame(index: number): Promise<Blob | null> {
    if (!this.db) return null;
    
    return new Promise((resolve) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(index);
      
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  }

  async setFrame(index: number, blob: Blob): Promise<void> {
    if (!this.db) return;
    
    return new Promise((resolve) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      store.put(blob, index);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    });
  }

  async clearCache(): Promise<void> {
    if (!this.db) return;
    
    return new Promise((resolve) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      store.clear();
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    });
  }
}

const Hero: React.FC<HeroProps> = ({
  isContact,
  title1,
  title1Color,
  title2,
  title2Color,
  desc1,
  desc2,
  desc3,
  isCTA,
  CTAOne,
  CTATwo,
}) => {
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isRenderingRef = useRef<boolean>(false);
  const lastFrameTimeRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const cacheManagerRef = useRef<FrameCacheManager | null>(null);
  const loadingQueueRef = useRef<Set<number>>(new Set());

  const totalFrames: number = 249;
  const frameRate: number = 30;
  const frameDelay: number = 1000 / frameRate;
  
  const { setHeroScrolled } = useHeroScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      // When rect.bottom < 0 → hero is scrolled past → white navbar
      // When rect.bottom > 0 → hero is visible → glass navbar
      setHeroScrolled(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeroScrolled]);


  // Aggressive priority loading - load every 3rd frame initially (83 frames)
  const priorityFrames = Array.from({ length: 83 }, (_, i) => i * 3);

  const render = useCallback((frameIndex: number): void => {
    if (isRenderingRef.current) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const currentImage = framesRef.current[frameIndex];

    if (!canvas || !context || !currentImage) return;

    isRenderingRef.current = true;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      try {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

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
      if (!isPlaying || !isAnimatingRef.current) return;

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

      if (isAnimatingRef.current) {
        requestAnimationFrame(animateFrames);
      }
    },
    [isPlaying, frameDelay, totalFrames, render]
  );

  useEffect(() => {
    if (!isPlaying) {
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = true;
    lastFrameTimeRef.current = performance.now();
    requestAnimationFrame(animateFrames);

    return () => {
      isAnimatingRef.current = false;
    };
  }, [isPlaying, animateFrames]);

  // Ultra-optimized loading with immediate start
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeAndLoad = async () => {
      try {
        const context = canvas.getContext("2d", { 
          alpha: true,
          desynchronized: true // Better performance
        });
        
        if (!context) {
          setError("Canvas context not supported");
          return;
        }

        contextRef.current = context;
        framesRef.current = new Array(totalFrames).fill(null);

        // Initialize cache
        const cacheManager = new FrameCacheManager();
        await cacheManager.init();
        cacheManagerRef.current = cacheManager;

        // Ultra-fast image loader with cache
        const loadImage = async (index: number): Promise<void> => {
          if (loadingQueueRef.current.has(index)) return;
          loadingQueueRef.current.add(index);

          const frameNo = index.toString();
          const framePath = `/NRC_wave/${frameNo}.png`;

          try {
            // Try cache first
            let blob = await cacheManager.getFrame(index);
            
            if (!blob) {
              // Fetch with priority hint
              const response = await fetch(framePath, {
                priority: priorityFrames.includes(index) ? 'high' : 'low',
                cache: 'force-cache'
              } as any);
              
              if (!response.ok) throw new Error('Failed to fetch');
              blob = await response.blob();
              
              // Cache asynchronously (don't wait)
              cacheManager.setFrame(index, blob);
            }
            
            // Create image from blob
            const img = new Image();
            const url = URL.createObjectURL(blob);
            
            await new Promise<void>((resolve, reject) => {
              img.onload = () => {
                framesRef.current[index] = img;
                URL.revokeObjectURL(url);
                
                // Start playing as soon as first frame loads
                if (!isPlaying && index === 0) {
                  render(0);
                  setIsPlaying(true);
                }
                
                resolve();
              };
              img.onerror = () => {
                URL.revokeObjectURL(url);
                reject();
              };
              img.src = url;
            });
          } catch (err) {
            console.error(`Frame ${index} failed:`, err);
          } finally {
            loadingQueueRef.current.delete(index);
          }
        };

        // PHASE 1: Load first frame immediately for instant display
        await loadImage(0);

        // PHASE 2: Load priority frames with high concurrency
        const priorityBatchSize = 15; // High concurrency for speed
        const loadPriorityFrames = async () => {
          for (let i = 0; i < priorityFrames.length; i += priorityBatchSize) {
            const batch = priorityFrames.slice(i, i + priorityBatchSize);
            await Promise.allSettled(batch.map(idx => loadImage(idx)));
          }
        };

        // PHASE 3: Load remaining frames in background
        const loadRemainingFrames = async () => {
          const remainingFrames = Array.from({ length: totalFrames }, (_, i) => i)
            .filter(i => !priorityFrames.includes(i) && i !== 0);

          const batchSize = 20;
          for (let i = 0; i < remainingFrames.length; i += batchSize) {
            const batch = remainingFrames.slice(i, i + batchSize);
            await Promise.allSettled(batch.map(idx => loadImage(idx)));
            // Tiny delay to prevent blocking
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        };

        // Run priority and remaining loads in parallel
        Promise.all([loadPriorityFrames(), loadRemainingFrames()]);

      } catch (err) {
        console.error("Initialization error:", err);
        setError("Failed to initialize animation");
      }
    };

    initializeAndLoad();

    return () => {
      isAnimatingRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render, isPlaying]);

  // Handle window resize
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (framesRef.current[currentFrame]) {
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
      if (document.hidden) {
        isAnimatingRef.current = false;
      } else if (isPlaying) {
        isAnimatingRef.current = true;
        lastFrameTimeRef.current = performance.now();
        requestAnimationFrame(animateFrames);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, animateFrames]);

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
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </div>

        <motion.div
          className={`absolute inset-0 bg-transparent flex flex-col md:mt-20 2xl:mt-0 items-center ${
            isContact && "md:mt-28"
          } justify-center text-center px-4 z-10 gothicFont`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Heading with line mask reveal */}
          <div className="text-3xl md:text-[40px] lg:text-6xl font-light mb-8 overflow-hidden gothicFont">
            <motion.div
              className="flex flex-col -gap-5"
              initial={{ opacity: 0 }} // Separate entrance opacity
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.span
                className="text-black inline-block font-[400]"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {title1} <span className="text-primary">{title1Color}</span>
              </motion.span>

              {!title2 && !title2Color ? (
                <></>
              ) : (
                <motion.span
                  className=" font-normal inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                    {title2 && title2}
                  <span className="text-[#8B5CF6]">{title2Color}</span>
                </motion.span>
              )}

              {/* Subheading with line reveals */}
              <div className="text-sm md:text-base lg:text-[20px] font-light md:leading-[24px] lg:leading-[34px] mt-5 md:mt-5 max-w-5xl mb-7 overflow-hidden mx-auto">
                <motion.div
                  className="text-[#484848]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {desc1}
                  <br />
                  {desc2}
                  <br />
                  {desc3}
                </motion.div>
              </div>

              {isCTA && (
                <div className="flex flex-row gap-4 justify-center items-center">
                  <AnimatedButton isBtnScale={false} label={CTAOne ? CTAOne : ""} />

                  <AnimatedButton
                    isBtnScale={false}
                    label={CTATwo ? CTATwo : ""}
                    variant="outline"
                    className="border border-[#070708] shadow-[inset_0_4px_4px_rgba(255,255,255,0.3)]"
                  />
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