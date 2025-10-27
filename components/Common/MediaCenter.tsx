"use client";

import React, { useEffect, useState } from "react";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";

const MediaCentreSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoData = [
    { id: 1, url: "https://www.youtube.com/embed/7IZ-aXJS4RA" },
    { id: 2, url: "https://www.youtube.com/embed/29hjm14IC-E" },
    { id: 3, url: "https://www.youtube.com/embed/4fYsdi-RtiQ" },
    { id: 4, url: "https://www.youtube.com/embed/F2AdSKQXvSs" },
    { id: 5, url: "https://www.youtube.com/embed/irwJ-gKV-Kw" },
    { id: 6, url: "https://www.youtube.com/embed/nLVjZ71KLjE" },
  ];

  const videosPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(videoData.length / videosPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <Container className="py-12">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex md:justify-between justify-center items-center mb-6">
          <SlideUpText animationMode="once">
            <h2 className="text-[26px] text-center md:text-left leading-8 md:leading-[58px] md:text-5xl font-normal text-gray-900">
              Media <span className="text-primary">Centre</span>
            </h2>
          </SlideUpText>

          {/* Desktop Arrows */}
          <div className="hidden md:flex space-x-3">
            <button
              onClick={prevSlide}
              className="rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="64" height="64" rx="32" fill="#EFEFF5" />
                <path
                  d="M29.6302 36.9186L24.2969 31.5853M24.2969 31.5853L29.6302 26.252M24.2969 31.5853H40.2969"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="64" height="64" rx="32" fill="#EFEFF5" />
                <path
                  d="M34.9635 36.9186L40.2969 31.5853M40.2969 31.5853L34.9635 26.252M40.2969 31.5853H24.2969"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {videoData.map((video) => (
              <div
                key={video.id}
                className="md:w-1/2 w-full md:px-2 flex-shrink-0 flex justify-center"
              >
                <div className="rounded-2xl overflow-hidden w-full shadow-sm">
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.url}
                    className="rounded-[12px] w-full  h-[402px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center mt-6 space-x-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M14 6L8 12L14 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M10 6L16 12L10 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MediaCentreSection;
