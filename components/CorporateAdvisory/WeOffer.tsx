"use client";

import {
  WeOfferImg1,
  WeOfferImg2,
  WeOfferImg3,
} from "@/assets/CorporateAdvisory";
import Image from "next/image";
import React from "react";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import { motion, useAnimation } from "framer-motion";

const Images = [WeOfferImg1, WeOfferImg2, WeOfferImg3];

const WeOffer = () => {
  return (
    <Container
      disablePaddingTopMobile
      disablePaddingBottomMobile
      className="w-full py-[74px] lg:py-0"
    >
      <SlideUpText animationMode="once">
        <h1 className="lg:text-[38px] md:text-3xl text-[26px] leading-[34px] md:leading-[40px] lg:leading-[60px] 2xl:px-28 md:mb-12 mb-7 text-center mx-auto max-w-7xl">
          We offer{" "}
          <span className="text-primary">
            big firm capabilities with a boutique firm
          </span>{" "}
          feel where relationships score over transactional opportunism.
        </h1>
      </SlideUpText>

      {/* ✅ Desktop view (smooth expand on hover) */}
      <div className="hidden md:flex items-center gap-5 w-full">
        {Images.map((img, i) => {
          const controls = useAnimation();

          const handleHoverStart = async () => {
            await controls.start({ flex: 2, transition: { duration: 0.5 } });
          };

          const handleHoverEnd = async () => {
            await controls.start({ flex: 1, transition: { duration: 0.5 } });
          };

          return (
            <motion.div
              key={i}
              animate={controls}
              initial={{ flex: 1 }}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              className="relative h-[318px] overflow-hidden rounded-lg"
            >
              <Image
                src={img}
                alt={`We Offer ${i}`}
                fill
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </motion.div>
          );
        })}
      </div>

      {/* ✅ Mobile view (static) */}
      <div className="md:hidden relative h-[300px] w-full">
        <Image
          src={Images[0]}
          alt="We Offer"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </Container>
  );
};

export default WeOffer;
