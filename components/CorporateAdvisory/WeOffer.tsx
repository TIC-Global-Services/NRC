import {
  WeOfferImg1,
  WeOfferImg2,
  WeOfferImg3,
} from "@/assets/CorporateAdvisory";
import Image from "next/image";
import React, { useState } from "react";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";

const Images = [WeOfferImg1, WeOfferImg2, WeOfferImg3];

const WeOffer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile className="w-full py-[74px] md:py-0">
      <SlideUpText animationMode="once">
        <h1 className="md:text-[44px] text-[26px] leading-[34px] md:leading-[60px] 2xl:px-28 md:mb-12 mb-7 text-center mx-auto">
          We offer{" "}
          <span className="text-primary">
            big firm capabilities with a boutique firm
          </span>{" "}
          feel where relationships score over transactional opportunism.
        </h1>
      </SlideUpText>

      {/* Desktop view (animated flex gallery) */}
      <div className="hidden md:flex items-center gap-5 w-full">
        {Images.map((img, i) => (
          <div
            key={i}
            className={`relative h-[318px] transition-all duration-500 ease-in-out ${hoveredIndex === null
                ? "flex-1"
                : hoveredIndex === i
                  ? "flex-[2]"
                  : "flex-[0.7]"
              }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={img}
              alt={`We Offer ${i}`}
              fill
              className="object-cover rounded-lg transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>

      {/* Mobile view (single static image) */}
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