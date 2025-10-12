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
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  description,
  imageUrl,
  linkedinUrl,
  isAdvisory,
}) => {
  return (
    <div
      className={`max-w-md mx-auto ${isAdvisory && "shadow"
        } relative bg-white  rounded-xl overflow-hidden z-20`}
    >
      {/* Header Image Section */}
      <div
        className="relative -mb-5 h-80 z-30"
      >
        <Image
          src={imageUrl}
          alt={`${name} - ${role}`}
          width={300}
          height={450}
          className="w-full h-full object-cover"
        />

        {/* Role Badge */}
        <div className="absolute top-6 right-6">
          <span className="bg-white px-4 py-2 rounded-lg text-gray-800 font-medium shadow-sm">
            {role}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 rounded-xl h-[280px] relative z-40   bg-white -mt-5">
        {/* Name */}
        <div >
          <h2 className="text-3xl font-light text-gray-900 mb-2 pt-5">
            <span className="text-black">{name.split(" ")[0]} </span>
            <span className="text-primary">{name.split(" ")[1]}</span>
          </h2>
        </div>

        {/* Description */}
        <div className="pr-3">
          <p className="text-secondary text-base leading-[24px]">{description}</p>
        </div>

        {/* LinkedIn Icon */}
        <div>
          {linkedinUrl && (
            <div className="absolute bottom-6 right-6">
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
    </div>
  );
};

export default ProfileCard;