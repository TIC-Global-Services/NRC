// PartnershipCard.tsx
import React from "react";
import Image from "next/image";

interface PartnershipCardProps {
  image: any; // StaticImageData or string
  alt: string;
  title: string;
  description: string;
  backgroundColor?: string;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({
  image,
  alt,
  title,
  description,
  backgroundColor = "bg-[#B8B5FF]"
}) => {
  return (
    <div className="grid grid-rows-[65%_35%] h-full rounded-xl overflow-hidden">
      <div>
        <Image
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`p-6 ${backgroundColor} flex flex-col items-start`}>
        <h3 className="text-3xl leading-[31px] text-black mb-2">
          {title}
        </h3>
        <p className="text-lg leading-[31px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PartnershipCard;