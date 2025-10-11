"use client";

import React, { useEffect, useState } from "react";
import {
  EllipsisVertical,
} from "lucide-react";

import {
  VideoThum1,
  VideoThum2,
  ProfileIcon1,
  ProfileIcon2,
  PlayIcon,
} from "@/assets/Home";
import Image, { StaticImageData } from "next/image";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";

interface VideoCardProps {
  videoThumb: StaticImageData;
  profileIcon: StaticImageData;
  title: string;
  className?: string;
  onClick?: () => void;
}

const VideoCard = ({
  videoThumb,
  profileIcon,
  title,
  className = "",
  onClick,
}: VideoCardProps) => {
  return (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer transform  ${className}`}
      onClick={onClick}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <Image
          src={videoThumb}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 "
        />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80 ">
          <Image src={PlayIcon} alt="playIcon" className="w-12 h-10" />
        </div>

        {/* Title Overlay on Thumbnail */}
        <div className="absolute top-4 flex justify-between items-center w-full px-2">
          <div className="flex items-center space-x-2">
            <Image
              src={profileIcon}
              alt="Profile"
              className="md:w-5 md:h-5 w-4 h-4 object-cover"
            />
            <h3 className="text-white text-sm md:text-xl font-light leading-tight line-clamp-2 drop-shadow-lg">
              {title}
            </h3>
          </div>
          <EllipsisVertical className="text-white md:w-5 w-4 h-4 md:h-5" />
        </div>
      </div>
    </div>
  );
};

const MediaCentreSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Mock video data - replace with your actual data
  const videoData = [
    {
      id: 1,
      videoThumb: VideoThum1,
      profileIcon: ProfileIcon1,
      title: "Smart Strategies for Smarter Asset Management",
    },
    {
      id: 2,
      videoThumb: VideoThum2,
      profileIcon: ProfileIcon2,
      title: "Maximize Returns, Minimize Risks",
    },
    {
      id: 3,
      videoThumb: VideoThum2,
      profileIcon: ProfileIcon2,
      title: "Maximize Returns, Minimize",
    },
    {
      id: 4,
      videoThumb: VideoThum2,
      profileIcon: ProfileIcon2,
      title: "Maximize, Minimize Risks",
    },
  ];

  const videosPerScreen = 2;
  const totalSlides = videoData.length - videosPerScreen + 1;

  const startIndex = currentSlide;
  const visibleVideos = videoData.slice(
    startIndex,
    startIndex + videosPerScreen
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleVideoClick = (video: any) => {
    console.log("Playing video:", video.title);
    // Add your video play logic here
  };

  return (
    <Container disablePaddingBottomMobile disablePaddingTopMobile className="py-12">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex md:justify-between justify-center items-center mb-2 md:mb-8">
          <SlideUpText animationMode="once">
            <h2 className="text-[26px] text-center md:text-left leading-8 md:leading-[58px] lg:text-5xl font-normal text-gray-900">
              Media <span className="text-primary font-medium">Centre</span>
            </h2>
          </SlideUpText>

          <div className="md:block hidden">
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="md:w-16 w-14 md:h-16 h-12 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95"
              >
                {/* <MoveLeft  size={isMobile ? '25' : '30'} className="text-black" /> */}
                <svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.148438"
                    y="0.746094"
                    width="64"
                    height="64"
                    rx="32"
                    fill="#EFEFF5"
                  />
                  <path
                    d="M29.7786 37.6647L24.4453 32.3314M24.4453 32.3314L29.7786 26.998M24.4453 32.3314H40.4453"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="md:w-16 w-14 md:h-16 h-12 bg-[#EFEFF5] rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95"
              >
                <svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.148438"
                    y="0.746094"
                    width="64"
                    height="64"
                    rx="32"
                    fill="#EFEFF5"
                  />
                  <path
                    d="M35.112 37.6647L40.4453 32.3314M40.4453 32.3314L35.112 26.998M40.4453 32.3314H24.4453"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* desktop Video Cards  */}
        <div className="relative overflow-hidden hidden md:block">
          <div className="flex justify-center">
            <div
              className="flex transition-transform duration-500 ease-in-out space-x-4"
              style={{
                transform: `translateX(-${currentSlide * (100 / 2)}%)`, // shift half for each step
                width: `${(videoData.length / 2) * 100}%`, // ensures track spans enough
              }}
            >
              {videoData.map((video) => (
                <div
                  key={video.id}
                  className="w-[49%] flex-shrink-0 flex justify-center"
                >
                    <VideoCard
                      videoThumb={video.videoThumb}
                      profileIcon={video.profileIcon}
                      title={video.title}
                      onClick={() => handleVideoClick(video)}
                    />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
          <div className="relative overflow-hidden md:hidden">
            <div className="flex justify-center">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(calc(-${currentSlide * 90}% + 10%))`, // center active card
                  width: `${videoData.length * 90}%`,
                }}
              >
                {videoData.map((video) => (
                  <div
                    key={video.id}
                    className="w-[90%] flex-shrink-0 pr-4 flex justify-center"
                  >
                    <div >
                      <VideoCard
                        videoThumb={video.videoThumb}
                        profileIcon={video.profileIcon}
                        title={video.title}
                        onClick={() => handleVideoClick(video)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        <div className="md:hidden flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className=" rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95"
            >
              {/* <MoveLeft  size={isMobile ? '25' : '30'} className="text-black" /> */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.165527"
                  width="24"
                  height="24"
                  rx="12"
                  fill="#EFEFF5"
                />
                <path
                  d="M10.8151 14.6258L8.14844 11.9591M8.14844 11.9591L10.8151 9.29248M8.14844 11.9591H16.1484"
                  stroke="black"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className=" rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-200 text-base hover:scale-105 active:scale-95"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.165527"
                  width="24"
                  height="24"
                  rx="12"
                  fill="#EFEFF5"
                />
                <path
                  d="M13.4818 14.6258L16.1484 11.9591M16.1484 11.9591L13.4818 9.29248M16.1484 11.9591H8.14844"
                  stroke="black"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MediaCentreSection;