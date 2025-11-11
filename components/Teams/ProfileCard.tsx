import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaLinkedin } from "react-icons/fa";

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string | StaticImageData;
  linkedinUrl?: string;
  isAdvisory?: boolean;
  highlightWords?: string[]; 
  highlightColor?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  description,
  imageUrl,
  linkedinUrl,
  isAdvisory,
  highlightWords = [],
  highlightColor = "text-primary",
}) => {

  const nameParts = name.split(" ");

  return (
    <div
      className={`max-w-md mx-auto ${
        isAdvisory && "shadow-xl"
      } relative bg-white rounded-xl overflow-hidden z-20 lg:pb-6`}
    >
      {/* Header Image Section */}
      <div className="relative -mb-5 h-80 z-30">
        <Image
          src={imageUrl}
          alt={`${name} - ${role}`}
          width={600}
          height={750}
          quality={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-3">
          <span className="bg-white px-4 py-2 rounded-lg text-gray-800 font-medium shadow-sm text-sm">
            {role}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 rounded-xl h-auto pb-16 md:pb-0 md:h-[300px] lg:h-[280px] relative z-40 bg-white -mt-5">
        {/* Name */}
        <h2 className="md:text-3xl text-[20px] leading-[25px] md:leading-[33px] font-light text-gray-900 mb-2 sfPro">
          {nameParts.map((word, idx) => (
            <span
              key={idx}
              className={
                highlightWords.includes(word) ? highlightColor : "text-black"
              }
            >
              {word}
              {idx < nameParts.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        {/* Description */}
        <div className=" ">
          <p className="text-secondary text-sm leading-[18px] md:text-base md:leading-[24px] w-[96%]">
            {description}
          </p>
        </div>

        {/* LinkedIn Icon */}
        {linkedinUrl && (
          <div className="absolute bottom-4 lg:-bottom-2 right-4">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ECECEF] transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
