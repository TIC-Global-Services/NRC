import Image from "next/image";

// NewspaperCard Component (similar styling to BlogCard)
const NewspaperCard = ({ image, date, title, description }: any) => {
    return (
      <div className="rounded-[12px] h-[392px] duration-300 cursor-pointer grid grid-rows-[65%_35%]">
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
          <h3 className="lg:text-xl 2xl:text-2xl mb-3 line-clamp-2">{title}</h3>
          <p className="text-gray-600 lg:text-sm 2xl:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    );
};


export default NewspaperCard