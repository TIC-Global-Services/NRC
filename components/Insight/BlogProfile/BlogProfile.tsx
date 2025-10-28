"use client"
import React from 'react';
import Image from 'next/image';
import Container from '@/components/Reusable/Container';
import AnimatedButton from '@/components/ui/animatedButton';


const BlogProfile = ({ blog }: any) => {
    return (
        <>
            <Container disableYSpacing disableXSpacingDesktop>
                {/* Title */}
                <h1 className="md:max-w-3xl mx-auto text-2xl md:text-[54px] leading-[120%] gothicFont font-bold text-center mb-3 md:mb-8 ">
                    {blog.title}
                </h1>

                {/* Subtitle/Description */}
                <p className="md:max-w-3xl mx-auto text-center mb-11 md:mb-20 leading-[154%] md:text-[20px] md:leading-[170%]">
                    {blog.description}
                </p>
            </Container>

            {/* Banner Image */}
            <div className="w-full mb-8">
                <Image
                    src={
                        typeof blog.banner === "string" ? blog.banner : blog.banner.src
                    }
                    alt={blog.title}
                    className="w-full lg:h-screen md:h-[80vh] h-[70vh]"
                    width={1000}
                    height={900}
                />
            </div>

            <Container disableYSpacing>
                {/* Author Info Section */}
                <div className="flex md:flex-row flex-col max-w-3xl mx-auto md:items-center justify-between mb-12 ">
                    <div className="flex md:flex-row flex-col md:items-center gap-4">
                        <Image
                            src={
                                typeof blog.userImage === "string"
                                    ? blog.userImage
                                    : blog.userImage.src
                            }
                            alt={blog.userName}
                            width={56}
                            height={56}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-bold text-base tracking-[5%] mb-2">
                                {blog.userName}
                            </p>
                            <p className="text-base leading-[100%] font-normal">
                                {blog.publishedDate} · {blog.readTime}
                            </p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div
                        className="flex mt-4 md:mt-0 w-36 border border-[#EAEAEA] bg-white rounded-[4px]"
                        style={{
                            boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        {blog.socialMedia?.twitter && (
                            <a
                                href={blog.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[70px] h-10 rounded-full flex items-center justify-center "
                            >
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.4219 0.291016C4.89911 0.291016 0.421875 4.76825 0.421875 10.2911C0.421875 15.2444 4.02709 19.3466 8.75412 20.1409V12.3774H6.34182V9.58356H8.75412V7.52352C8.75412 5.13328 10.214 3.83074 12.3466 3.83074C13.3679 3.83074 14.2457 3.90685 14.5005 3.94037V6.43881L13.0214 6.43952C11.8619 6.43952 11.6383 6.99041 11.6383 7.79908V9.58213H14.4051L14.0442 12.3759H11.6383V20.2078C16.5861 19.6056 20.4219 15.3989 20.4219 10.2882C20.4219 4.76825 15.9446 0.291016 10.4219 0.291016Z"
                                        fill="#010002"
                                    />
                                </svg>
                            </a>
                        )}
                        {blog.socialMedia?.linkedin && (
                            <a
                                href={blog.socialMedia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[70px] h-10 flex items-center justify-center border-l border-[#EAEAEA]"
                            >
                                <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.0388 0.258966C19.1849 0.861275 18.2395 1.32195 17.2389 1.62324C16.7019 1.00576 15.9882 0.568104 15.1943 0.369469C14.4005 0.170833 13.5648 0.220799 12.8002 0.512607C12.0357 0.804416 11.3792 1.32399 10.9196 2.00105C10.46 2.67812 10.2194 3.48001 10.2303 4.29827V5.18995C8.66334 5.23058 7.1106 4.88305 5.71043 4.17829C4.31026 3.47354 3.10611 2.43345 2.20523 1.15065C2.20523 1.15065 -1.36148 9.17575 6.66363 12.7425C4.82724 13.989 2.63962 14.614 0.421875 14.5258C8.44698 18.9842 18.2555 14.5258 18.2555 4.27152C18.2546 4.02315 18.2307 3.77539 18.1841 3.53143C19.0942 2.63395 19.7364 1.50082 20.0388 0.258966Z"
                                        fill="black"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Blog Content Sections */}
                <div className="prose prose-lg">
                    {blog.sections?.map((section: any, index: any) => {
                        if (section.type === "text") {
                            return (
                                <p
                                    key={index}
                                    className=" max-w-3xl mx-auto leading-[175%] md:leading-relaxed mb-6 text-base"
                                >
                                    {section.content}
                                </p>
                            );
                        }

                        if (section.type === "heading") {
                            return (
                                <h2
                                    key={index}
                                    className="md:text-[32px] text-[24px] md:leading-[160%] font-bold max-w-3xl mx-auto mt-6 mb-4"
                                >
                                    {section.content}
                                </h2>
                            );
                        }

                        if (section.type === "image") {
                            return (
                                <figure key={index} className="my-8 max-w-5xl mx-auto">
                                    <Image
                                        width={1000}
                                        height={400}
                                        src={
                                            typeof section.src === "string"
                                                ? section.src
                                                : section.src?.src
                                        }
                                        alt={section.caption || "Blog image"}
                                        className="w-full lg:h-[75vh] md:h-[60vh]  h-[50vh] mx-auto"
                                    />
                                    {section.caption && (
                                        <figcaption className="text-center text-base leading-[140%] mt-3 ">
                                            {section.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        }

                        return null;
                    })}
                </div>

                {/* Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className=" pt-8 flex flex-row md:items-start gap-2 text-base tracking-[3%] leading-[100%] font-normal  max-w-3xl mx-auto ">
                        <p className="">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag: any, idx: any) => (
                                <span
                                    key={idx}
                                    className="text-sm  hover:text-gray-900 cursor-pointer underline"
                                >
                                    {tag}
                                    {idx < blog.tags.length - 1 && ","}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center justify-center my-10">
                    <p className=" max-w-3xl mx-auto leading-[175%] md:leading-relaxed mb-6 text-base">
                        To learn more about Nine Rivers Capital's approach to
                        manufacturing and small-cap investing through its PMS and AIF
                        strategies, visit www.nineriverscapital.com
                    </p>
                    <a
                        href="https://www.nineriverscapital.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AnimatedButton className="mt-16" label="Contact Us" isBtnScale />
                    </a>
                </div>
            </Container>
        </>
    );
};

export default BlogProfile