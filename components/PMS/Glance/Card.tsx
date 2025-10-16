// InfoCard.tsx
import React from "react";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  imageSrc,
  imageAlt = "Card illustration",
  className = "",
  imageWidth = 300,
  imageHeight = 200
}) => {
  return (
    <div className={`
      p-6 lg:p-8 
      text-center 
      bg-white 
      rounded-[8.5px]
      md:rounded-2xl 
      w-full 
      h-[340px] md:h-auto
      flex flex-col justify-between items-center
      ${className}
    `}>
      <div className="pb-8 lg:pb-12  2xl:mb-[70px] w-full flex-shrink-0 flex justify-center items-center h-[200px] md:h-[80%]">
        <div className="relative flex justify-center items-center w-full h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="object-contain"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '200px'
            }}
          />
        </div>
      </div>
      <h3 className="
        text-sm lg:text-lg 2xl:text-[20px] 
        font-[500] 
        text-black 
        leading-5 lg:leading-6 2xl:leading-[31px]
        flex-shrink-0
      ">
        {title}
      </h3>
    </div>
  );
};

export default InfoCard;