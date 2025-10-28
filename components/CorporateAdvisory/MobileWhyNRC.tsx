import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import FlexibleHeading from "../ui/FlexibleHeading";
import Container from "../Reusable/Container";
import {
    PartnershipImg1,
    PartnershipImg2,
    // PartnershipImg3,
} from "@/assets/PMS";
import Image from "next/image";
import { WhyNRCImg } from "@/assets/CorporateAdvisory";


// Reusable Partnership Card Component
interface PartnershipCardProps {
    image: any;
    alt: string;
    title: string;
    description: string;
}

const PartnershipCard: React.FC<PartnershipCardProps> = ({
    image,
    alt,
    title,
    description,
}) => {
    return (
        <div className="grid grid-rows-[35%_65%] md:grid-rows-[30%_70%] h-full rounded-xl overflow-hidden">
            <div className="flex flex-col items- justify-center mb-7 md:mb-0">
                <h3 className="md:text-3xl text-base leading-[23px] md:leading-[31px] text-black mb-[10px] font-bold max-w-[220px] md:max-w-full">{title}</h3>
                <p className="md:text-lg text-sm leading-4 font-normal md:leading-[31px] max-w-xs md:max-w-xl">{description}</p>
            </div>
            <div>
                <Image src={image} alt={alt} className="w-full rounded-xl h-full object-cover" />
            </div>
        </div>
    );
};

const MobileWhyNRC = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const mobileSliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mobileIndex, setMobileIndex] = useState(0);

    // Partnership cards data array - 4 items
    const partnershipData = [
        {
            image: WhyNRCImg,
            alt: "Conviction",
            title: "Strong Legacy, Entrepreneurial Energy",
            description: "A combined team experience of 100+ years in deal making with the energy of a young firm.",
        },
        {
            image: WhyNRCImg,
            alt: "Rigore",
            title: "Client First Approach",
            description: "We take the long view and invest in relationships, not short-term gains. We commit to our clients’ long-term goals.",
        },
        {
            image: WhyNRCImg,
            alt: "Risk",
            title: "Rigor in the Process",
            description: "Our engagement evaluates plans and questions all assumptions to yield superior advisory outcome and more informed decision-making.",
        },
        {
            image: WhyNRCImg,
            alt: "Alignment",
            title: "Leverage our Network",
            description: "We create multiple possibilities for our clients through a diverse network across investors and corporates.",
        },
    ];


    // Mobile navigation - moves by 80vw (full card + gap)
    const goToPreviousMobile = () => {
        if (mobileIndex > 0) {
            const newIndex = mobileIndex - 1;
            setMobileIndex(newIndex);

            if (mobileSliderRef.current) {
            const cardWidth = 98; // 80vw per card
                gsap.to(mobileSliderRef.current, {
                    x: `-${newIndex * cardWidth}vw`,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        }
    };

    const goToNextMobile = () => {
        if (mobileIndex < partnershipData.length - 1) {
            const newIndex = mobileIndex + 1;
            setMobileIndex(newIndex);

            if (mobileSliderRef.current) {
                const cardWidth = 98; // 80vw per card
                gsap.to(mobileSliderRef.current, {
                    x: `-${newIndex * cardWidth}vw`,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        }
    };

    return (
        <Container disablePaddingTopMobile disablePaddingBottomMobile className="lg:hidden block bg-white py-12">
            <FlexibleHeading
                title="Why NRC?"
                mdTitle="Why NRC?"
                mobileTitle="Why NRC?"
                highlights={{
                    "NRC?": "text-primary",
                }}
                alignment="left"
                className="text-center lg:text-left"
                mobileAlignment="left"
            />

            {/* Mobile View - Shows full card + 30% peek of next */}
            <div className="lg:hidden">
                <div className="overflow-hidden w-full">
                    <div
                        ref={mobileSliderRef}
                        className="flex"
                        style={{
                            width: `${partnershipData.length * 98}vw`,
                        }}
                    >
                        {partnershipData.map((card, index) => (
                            <div
                                key={index}
                                className="w-[98vw] flex-shrink-0 flex items-center justify-start pr-4"
                            >
                                <div className="w-[98%] h-[450px] md:h-[600px]">
                                    <PartnershipCard
                                        image={card.image}
                                        alt={card.alt}
                                        title={card.title}
                                        description={card.description}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Navigation Arrows */}
                <div className="flex justify-start gap-4 mt-6">
                    <button
                        onClick={goToPreviousMobile}
                        disabled={mobileIndex === 0}
                        className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-14 h-14 bg-[#EFEFF5] rounded-full flex items-center justify-center"
                    >
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="24" fill="#EFEFF5" />
                            <path d="M22.6667 26.6654L20 23.9987M20 23.9987L22.6667 21.332M20 23.9987H28" stroke="black" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNextMobile}
                        disabled={mobileIndex >= partnershipData.length - 1}
                        className="hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-14 h-14 bg-[#EFEFF5] rounded-full flex items-center justify-center"
                    >
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="24" fill="#EFEFF5" />
                            <path d="M25.3333 26.6654L28 23.9987M28 23.9987L25.3333 21.332M28 23.9987H20" stroke="black" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default MobileWhyNRC;