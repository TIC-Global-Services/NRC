'use client'

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from "framer-motion"

interface BlogCardProps {
  image: StaticImageData;
  date: string;
  title: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, date, title, description }) => {
  return (
    <motion.a
      href={`/insights/${title}`}
      key={title}
      className="duration-300 cursor-pointer flex flex-col"
      whileTap={{
        scale: 0.8
      }}
    >
      {/* Image Section */}
      <div className="relative w-full mb-2 aspect-[16/10]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-[12px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 bg-white rounded-md p-[10px] text-xs leading-[13px] font-medium">
          {date}
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center pl-1">
        <h3 className="lg:text-xl 2xl:text-2xl text-[20px] md:leading-[36px] pb-1 line-clamp-2">{title}</h3>
        <p className="text-secondary text-sm lg:text-sm 2xl:text-base leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </motion.a>
  );
};

export default BlogCard;