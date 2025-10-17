import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
    image: StaticImageData;
    date: string;
    title: string;
    description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, date, title, description }) => {
    return (
      <Link
        href={`/insights/${title}`}
        key={title}
        className=" h-[392px] duration-300 cursor-pointer grid grid-rows-[65%_35%] "
      >
        <div className="relative w-full h-full mb-2">
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

        <div className="flex flex-col justify-center">
          <h3 className="lg:text-xl 2xl:text-2xl line-clamp-2">{title}</h3>
          <p className="text-secondary lg:text-sm 2xl:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </Link>
    );
};

export default BlogCard;