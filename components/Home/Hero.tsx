"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../ui/animatedButton";
import { useHeroScroll } from "@/context/HeroScrollContext";

gsap.registerPlugin(ScrollTrigger);

// IndexedDB Cache Manager
class FrameCacheManager {
  private dbName = 'mountainAnimationCache_v1';
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
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const imgSeqRef = useRef({ frame: 0 });
  const cacheManagerRef = useRef<FrameCacheManager | null>(null);
  const loadingQueueRef = useRef<Set<number>>(new Set());
  const animationFrameRef = useRef<number | null>(null);
  const isIdleAnimatingRef = useRef<boolean>(false);
  const idleFrameRef = useRef<number>(0);
  const lastIdleTimeRef = useRef<number>(0);
  const gsapInstancesRef = useRef<any[]>([]);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);

  const totalFrames = 320;
  const idleFrameCount = 40;
  const idleFrameRate = 15;
  const idleFrameDelay = 1000 / idleFrameRate;
  const idleDirectionRef = useRef<'forward' | 'backward'>('forward');

  const { setHeroScrolled, setHeroContentRevealed } = useHeroScroll();

  // Track when hero section is scrolled past
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const heroBottom = rect.bottom;

      setHeroScrolled(heroBottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeroScrolled]);

  const currentFrame = (index: number) =>
    `/NRC_mountains/${(index + 1).toString().padStart(4, "0")}.png`;

  const priorityFrames = Array.from({ length: 64 }, (_, i) => i * 5);

  const render = useCallback((frameIndex: number) => {
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

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

  const animateIdle = useCallback((timestamp: number) => {
    if (!isIdleAnimatingRef.current) return;

    if (timestamp - lastIdleTimeRef.current >= idleFrameDelay) {
      if (idleDirectionRef.current === 'forward') {
        idleFrameRef.current++;
        if (idleFrameRef.current >= idleFrameCount - 1) {
          idleDirectionRef.current = 'backward';
        }
      } else {
        idleFrameRef.current--;
        if (idleFrameRef.current <= 0) {
          idleDirectionRef.current = 'forward';
        }
      }

      if (imagesRef.current[idleFrameRef.current]) {
        render(idleFrameRef.current);
      }

      lastIdleTimeRef.current = timestamp;
    }

    if (isIdleAnimatingRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateIdle);
    }
  }, [idleFrameCount, idleFrameDelay, render]);

  const startIdleAnimation = useCallback(() => {
    if (isIdleAnimatingRef.current) return;

    const currentFrame = idleFrameRef.current;
    if (currentFrame >= idleFrameCount - 1) {
      idleDirectionRef.current = 'backward';
    } else if (currentFrame <= 0) {
      idleDirectionRef.current = 'forward';
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

  const setupGSAPAnimations = useCallback(() => {
    gsap.set(".title-line", {
      y: "0%",
    });

    gsap.set(".description-line, .button-line", {
      y: "100%",
    });

    gsap.set(contentRef.current, {
      opacity: 1,
      visibility: "visible",
    });

    if (buttonWrapperRef.current) {
      buttonWrapperRef.current.style.visibility = "visible";
    }

    // Animation for description and button with content reveal tracking
    const anim2 = gsap.to(".description-line, .button-line", {
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
          // When animation is complete (progress >= 0.95), mark content as revealed
          if (self.progress >= 0.95) {
            setHeroContentRevealed(true);
          } else {
            setHeroContentRevealed(false);
          }
        },
      },
    });

    const anim3 = gsap.to(imgSeqRef.current, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const currentFrameNum = Math.round(imgSeqRef.current.frame);

          if (currentFrameNum >= idleFrameCount) {
            stopIdleAnimation();
          } else if (self.progress > 0 && self.getVelocity() === 0 && currentFrameNum < idleFrameCount) {
            if (!isIdleAnimatingRef.current) {
              idleFrameRef.current = currentFrameNum;
              startIdleAnimation();
            }
          } else if (self.getVelocity() !== 0) {
            stopIdleAnimation();
          }
        },
      },
      onUpdate: () => {
        const frameIndex = Math.round(imgSeqRef.current.frame);
        if (imagesRef.current[frameIndex]) {
          render(frameIndex);
        }
      },
    });

    gsapInstancesRef.current = [anim2, anim3];

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3000",
      onUpdate: (self) => {
        const currentFrameNum = Math.round(imgSeqRef.current.frame);

        if (self.getVelocity() === 0 && currentFrameNum < idleFrameCount && !isIdleAnimatingRef.current) {
          idleFrameRef.current = currentFrameNum;
          startIdleAnimation();
        }
      },
      onEnter: () => {
        const currentFrameNum = Math.round(imgSeqRef.current.frame);
        if (currentFrameNum < idleFrameCount) {
          idleFrameRef.current = currentFrameNum;
          startIdleAnimation();
        }
      },
      onLeaveBack: () => {
        idleFrameRef.current = 0;
        startIdleAnimation();
        // Reset content revealed when scrolling back to top
        setHeroContentRevealed(false);
      },
    });
  }, [render, startIdleAnimation, stopIdleAnimation, setHeroContentRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true
    });
    if (!context) return;

    contextRef.current = context;
    imagesRef.current = new Array(totalFrames).fill(null);

    canvas.width = 1920;
    canvas.height = 1080;

    const initializeAndLoad = async () => {
      try {
        const cacheManager = new FrameCacheManager();
        await cacheManager.init();
        cacheManagerRef.current = cacheManager;

        const loadImage = async (index: number, isPriority: boolean = false): Promise<void> => {
          if (loadingQueueRef.current.has(index)) return;
          loadingQueueRef.current.add(index);

          const framePath = currentFrame(index);

          try {
            let blob = await cacheManager.getFrame(index);

            if (!blob) {
              const response = await fetch(framePath, {
                priority: isPriority ? 'high' : 'low',
                cache: 'force-cache'
              } as any);

              if (!response.ok) throw new Error('Failed to fetch');
              blob = await response.blob();

              cacheManager.setFrame(index, blob);
            }

            const img = new Image();
            const url = URL.createObjectURL(blob);

            await new Promise<void>((resolve, reject) => {
              img.onload = () => {
                imagesRef.current[index] = img;
                URL.revokeObjectURL(url);
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

        await loadImage(0, true);

        if (imagesRef.current[0]) {
          render(0);
          setupGSAPAnimations();
        }

        const remainingIdleFrames = Array.from({ length: idleFrameCount - 1 }, (_, i) => i + 1);
        await Promise.all(remainingIdleFrames.map(idx => loadImage(idx, true)));

        startIdleAnimation();

        const loadPriorityFrames = async () => {
          const batchSize = 15;
          for (let i = 0; i < priorityFrames.length; i += batchSize) {
            const batch = priorityFrames.slice(i, i + batchSize);
            await Promise.allSettled(batch.map(idx => loadImage(idx, true)));
          }
        };

        const loadRemainingFrames = async () => {
          const remainingFrames = Array.from({ length: totalFrames }, (_, i) => i)
            .filter(i => i >= idleFrameCount && !priorityFrames.includes(i));

          const batchSize = 20;
          for (let i = 0; i < remainingFrames.length; i += batchSize) {
            const batch = remainingFrames.slice(i, i + batchSize);
            await Promise.allSettled(batch.map(idx => loadImage(idx, false)));
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        };

        Promise.all([loadPriorityFrames(), loadRemainingFrames()]);

      } catch (err) {
        console.error("Initialization error:", err);
      }
    };

    initializeAndLoad();

    return () => {
      stopIdleAnimation();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsapInstancesRef.current.forEach(anim => {
        if (anim && anim.kill) anim.kill();
      });
      // Reset content revealed on unmount
      setHeroContentRevealed(false);
    };
  }, [render, startIdleAnimation, stopIdleAnimation, setupGSAPAnimations, setHeroContentRevealed]);

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
        />

        <div
          ref={contentRef}
          style={{ opacity: 0, visibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-start mt-[40%] lg:mt-[14%] text-center px-4 z-30 gothicFont"
        >
          <div className="text-3xl md:text-[50px] lg:text-6xl font-light mb-2 md:mb-2 overflow-hidden gothicFont">
            <div className="flex lg:flex-row flex-col overflow-hidden">
              <span className="text-black inline-block font-[400] title-line leading-[120%]">
                {" "}
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

          <div ref={buttonWrapperRef} className="overflow-hidden" style={{ visibility: "hidden" }}>
            <div className="button-line">
              <AnimatedButton
                isBtnScale={false}
                label="Explore Our PMS"
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;