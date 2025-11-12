"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../ui/animatedButton";

// ✅ Detect Safari or iOS
const isSafariOrIOS = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isSafari =
    /Safari/.test(ua) &&
    !/Chrome/.test(ua) &&
    !/Chromium/.test(ua) &&
    !/CriOS/.test(ua);

  return isIOS || isSafari;
};


interface HeroProps {
  isContact?: boolean;
  title1?: string;
  title1Color?: string;
  title2?: string;
  title2Color?: string;
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
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [videoReady, setVideoReady] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mountedRef = useRef<boolean>(true);

  const safari = isSafariOrIOS();

  // ✅ Image Sequence Animation (for Safari/iOS)
  useEffect(() => {
    if (!safari) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const totalFrames = 250;
    const folderPath = "/Wave_Image_Sequence";
    const image = new Image();
    let animationId: number;
    let lastTime = 0;
    const fps = 30; // Adjust speed (30fps = smooth but not too heavy)
    const frameDuration = 1000 / fps;

    const drawFrame = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;

      if (delta >= frameDuration) {
        image.src = `${folderPath}/${String(frame + 1).padStart(4, "0")}.webp`;
        image.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        frame = (frame + 1) % totalFrames;
        lastTime = timestamp;
      }

      animationId = requestAnimationFrame(drawFrame);
    };

    requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(animationId);
  }, [safari]);

  // ✅ Video playback logic for non-Safari browsers
  useEffect(() => {
    if (safari) return;

    const video = videoRef.current;
    if (!video) return;

    mountedRef.current = true;
    setIsInitialized(true);

    const safePlay = async (v: HTMLVideoElement) => {
      try {
        await v.play();
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Video play failed:", err);
      }
    };

    const handleLoadedData = () => {
      if (mountedRef.current) {
        setVideoReady(true);
        safePlay(video);
      }
    };

    const handleError = (e: Event) => {
      if (mountedRef.current) {
        console.error("Video error:", e);
        setError("Failed to load video");
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.load();
    safePlay(video);

    return () => {
      mountedRef.current = false;
      video.pause();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, [safari]);

  // ✅ Pause/resume when tab hidden
  useEffect(() => {
    if (safari) return;
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else if (videoReady) video.play();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [videoReady, safari]);

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

  // ✅ Mobile/desktop title logic
  const hasMobileTitles =
    mobileTitle1 !== undefined ||
    mobileTitle1Color !== undefined ||
    mobileTitle2 !== undefined ||
    mobileTitle2Color !== undefined;

  const effectiveMobileTitle1 = hasMobileTitles ? mobileTitle1 || "" : title1;
  const effectiveMobileTitle1Color = hasMobileTitles
    ? mobileTitle1Color || ""
    : title1Color;
  const effectiveMobileTitle2 = hasMobileTitles ? mobileTitle2 || "" : title2;
  const effectiveMobileTitle2Color = hasMobileTitles
    ? mobileTitle2Color || ""
    : title2Color;

  return (
    <section
      className="w-full relative h-screen overflow-hidden"
      style={{
        background: `radial-gradient(circle at top, #C5BAF6 0%, #DAD4F1 36%, #FCFAF2 100%)`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        {/* 🧩 Video (desktop) or Canvas (Safari/iOS fallback) */}
        <div
          className="absolute bg-transparent -bottom-[35%] md:-bottom-[40%] w-full z-0"
          style={{
            height: "100vh",
            zIndex: 0,
            transform: "translateZ(0)",
            willChange: "transform",
            WebkitTransform: "none",
          }}
        >
          {safari ? (
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              className="w-full h-full object-cover pointer-events-none [transform:none] [will-change:auto]"
              style={{ zIndex: 0 }}
            >
              <source
                src="/Wave_Video/NRC_Wave_Enhanced.webm"
                type="video/webm"
              />
            </video>
          )}
        </div>

        <motion.div
          className={`absolute inset-0 flex flex-col md:mt-20 2xl:mt-0 items-center ${
            isContact && "md:mt-28"
          } justify-center md:justify-start lg:justify-center md:pt-[25%] lg:pt-0 text-center px-4 gothicFont relative z-[5]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-3xl md:text-5xl lg:text-6xl font-light mb-8 overflow-hidden gothicFont">
            <motion.div
              className="flex flex-col -gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {/* Desktop Titles */}
              <div className="hidden md:block">
                <motion.div
                  className="text-black font-[400]"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
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
                    animate={{ y: "0%" }}
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
                  animate={{ y: "0%" }}
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
                    animate={{ y: "0%" }}
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

              {/* Desktop Desc */}
              <div className="text-sm md:text-lg lg:text-[20px] font-light md:leading-[24px] lg:leading-[34px] mt-5 md:mt-5 max-w-5xl mb-7 overflow-hidden mx-auto md:block hidden">
                <motion.div
                  className="text-[#484848]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
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

              {/* Mobile Desc */}
              <div className="text-sm md:text-base lg:text-[20px] font-light md:leading-[24px] lg:leading-[34px] mt-5 md:mt-5 max-w-5xl mb-7 overflow-hidden mx-auto md:hidden">
                <motion.div
                  className="text-[#484848]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
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

              {/* CTA Buttons */}
              {isCTA && (
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex flex-row gap-4 justify-center items-center"
                >
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
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
