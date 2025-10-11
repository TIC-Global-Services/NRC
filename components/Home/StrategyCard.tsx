import { ArrowUpRight } from "lucide-react";
import Badge from "../ui/badge";
import Container from "../Reusable/Container";
import Image from "next/image";
import SlideUpText from "../ui/SlideUpText";
import ParallaxWrapper from "../ui/ParallaxSliderWrapper";
import React from "react";

interface StrategyCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  sections: {
    heading: string;
    description: string;
  }[];
  index?: number; // ADD THIS
  hasInteracted?: boolean; // ADD THIS
  onHover?: () => void; // ADD THIS
}

function StrategyCard({
  title,
  subtitle,
  imageUrl,
  sections,
  index = 0, // ADD THIS
  hasInteracted = false, // ADD THIS
  onHover, // ADD THIS
}: StrategyCardProps) {
  return (
    <div
      className={`bg-white max-w-[572px] rounded-2xl pt-5 md:pt-7 px-5 md:px-7 pb-20 hover:shadow-[16px_6px_93px_0px_rgba(0,0,0,0.25)] border border-gray-100 relative transition-shadow duration-500 ${!hasInteracted && index === 0 ? 'shadow-[16px_6px_93px_0px_rgba(0,0,0,0.25)]' : ''
        }`}
      onMouseEnter={onHover} // ADD THIS
    >
      {/* Header Image */}
      <div className="md:mb-6 mb-4">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-32 md:h-48 object-cover rounded-xl"
          width={400}
          height={250}
        />
      </div>

      {/* Title */}
      <SlideUpText animationMode="always" delay={0.4}>
        <h3 className="md:text-2xl text-lg leading-[34px] md:leading-12 font-[400] text-gray-900  mb-4 md:mb-2">
          {title} <span className="text-primary">{subtitle}</span>
        </h3>
      </SlideUpText>

      {/* Sections */}
      <div className="flex flex-col">
        <SlideUpText animationMode="always" delay={0.4}>
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className={`md:text-lg text-sm leading-3 md:leading-6 font-[400] text-gray-900 mb-2 ${index === 1 ? `mt-4` : ``}`}>
                {section.heading}
              </h4>
              <p className="text-gray-600 font-[400] md:leading-6 md:text-base text-xs leading-3.5">
                {section.description}
              </p>
            </div>
          ))}
        </SlideUpText>
      </div>

      {/* Arrow Icon */}
      <div className="absolute bottom-6 right-6">
        {/* mobile */}
        <svg
          className="md:hidden "
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="18" fill="#F1F1F2" />
          <g clipPath="url(#clip0_140_3490)">
            <g clipPath="url(#clip1_140_3490)">
              <path
                d="M14.8615 22L14 21.1385L19.9077 15.2308H14.6154V14H22V21.3846H20.7692V16.0923L14.8615 22Z"
                fill="#1C1B1F"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_140_3490">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(9.36523 9.36499)"
              />
            </clipPath>
            <clipPath id="clip1_140_3490">
              <rect
                width="17.27"
                height="17.27"
                fill="white"
                transform="translate(9.36523 9.36499)"
              />
            </clipPath>
          </defs>
        </svg>

        {/* desktop */}
        <svg
          className="md:block hidden"
          width="62"
          height="63"
          viewBox="0 0 62 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.166016" width="62" height="62" rx="31" fill="#F1F1F2" />
          <g clipPath="url(#clip0_140_1093)">
            <g clipPath="url(#clip1_140_1093)">
              <g clipPath="url(#clip2_140_1093)">
                <path
                  d="M24.7094 39.1846L22.9824 37.4576L34.8247 25.6153H24.216V23.1482H39.0189V37.951H36.5517V27.3423L24.7094 39.1846Z"
                  fill="#1C1B1F"
                />
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_140_1093">
              <rect
                width="17.27"
                height="17.27"
                fill="white"
                transform="translate(22.3652 22.531)"
              />
            </clipPath>
            <clipPath id="clip1_140_1093">
              <rect
                width="17.27"
                height="17.27"
                fill="white"
                transform="translate(22.3652 22.531)"
              />
            </clipPath>
            <clipPath id="clip2_140_1093">
              <rect
                width="17.27"
                height="17.27"
                fill="white"
                transform="translate(22.3652 22.531)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function StrategiesSection() {

  const [hasInteracted, setHasInteracted] = React.useState(false);

  const strategies = [
    {
      title: "Portfolio Management",
      subtitle: "Services (PMS)",
      imageUrl: "/whatwedoImg1.png",
      sections: [
        {
          heading: "Aurum Small Cap Opportunities",
          description:
            "We are non-consensus investors focused on finding mispriced opportunities through our proprietary 'Private Equity Approach'.",
        },
        {
          heading: "Aurum Multiplier Fund",
          description:
            "A diversified strategy across market caps, balancing stability with growth and designed for smoother compounding.",
        },
      ],
    },
    {
      title: "Alternative Investment",
      subtitle: "Funds (AIF)",
      imageUrl: "/whatwedoImg2.png",
      sections: [
        {
          heading: "Category I – SME Fund (Closed)",
          description:
            "Focused on nurturing promising small and medium enterprises at the cusp of scale. (Now closed for new investors.)",
        },
        {
          heading:
            "Category II – Growth Opportunities Fund (Green-shoe option open)",
          description:
            "A selective AIF for HNIs & Family Offices, targeting differentiated opportunities beyond traditional PMS mandates.",
        },
      ],
    },
  ];

  return (
    <Container disableYSpacing className="bg-[#F3F2F5] pt-16 pb-12 relative">

      <div className="absolute top-0 left-0 right-0 h-32 z-20 bg-gradient-to-b from-[#F6F9FC] via-[#F3F2F5] to-[#F3F2F5] backdrop-blur-sm" />

      <section className="z-50 relative">
        <div className="max-w-7xl mx-auto ">
          {/* Header */}
          <div className="text-center mb-8 md:mb-11">
            <Badge label="What We Do" className="mb-4" />
            <SlideUpText animationMode="always">
              <h2 className="text-[26px] md:text-5xl font-[400] text-black mb-3 text-balance leading-[34px] md:leading-[58px] ">
                Multiple Strategies.{" "}
                <span className="text-primary">One <br className="md:hidden"/> Discipline.</span>
              </h2>
            </SlideUpText>
            <SlideUpText animationMode="always" delay={0.4}>
              <p className="text-sm md:text-base text-secondary font-[400] max-w-4xl mx-auto leading-[23px] md:leading-relaxed">
                Nine Rivers Capital offers a select suite of SEBI-registered PMS
                and AIF strategies. Each is crafted with
                <br className="md:block hidden" />
                the same DNA — rigorous diligence, conviction-driven investing,
                and long-term alignment.
              </p>
            </SlideUpText>
          </div>

          {/* Strategy Cards */}
          <div className="md:grid md:grid-cols-2 flex flex-col-reverse gap-4 md:gap-8">
            {strategies.map((strategy, index) => (
              <StrategyCard
                key={index}
                index={index}
                hasInteracted={hasInteracted}
                onHover={() => setHasInteracted(true)}
                title={strategy.title}
                subtitle={strategy.subtitle}
                imageUrl={strategy.imageUrl}
                sections={strategy.sections}
              />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}