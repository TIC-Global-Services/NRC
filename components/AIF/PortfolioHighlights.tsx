import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { KinecoImg, TippingImg } from '@/assets/AIF';
import Container from '../Reusable/Container';

// TypeScript Interfaces
interface PortfolioItem {
  id: number;
  logo: StaticImageData;
  companyName: string;
  description: string;
}

interface PortfolioHighlightsProps {
  title?: string;
}

// Portfolio Data
const portfolioData: PortfolioItem[] = [
  {
    id:1,
    logo: KinecoImg,
    companyName: "Kineco Limited",
    description: "India's leading advanced composites manufacturer for aerospace, defense and railways."
  },
  {
    id:2,
    logo: TippingImg,
    companyName: "Tipping Mr Pink Pvt Ltd",
    description: "India's leading homegrown burger chain"
  }
];

// Reusable Portfolio Card Component
const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="bg-[#F2F3F6] rounded-[7px] md:px-7 2xl:px-12 px-5 py-10 flex md:flex-row flex-col md:items-center md:gap-12 gap-3.5 md:min-h-[280px]">
      {/* Logo */}
      <div className={`flex-shrink-0 w-32 ${item.id === 1 ? `md:w-44` : `md:w-36`} md:h-36 flex items-center justify-center relative`}>
        <Image
          src={item.logo}
          alt={`${item.companyName} logo`}
          width={192}
          height={192}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="md:text-2xl text-[20px] leading-9 font-medium mb-2">{item.companyName}</h3>
        <p className="md:text-base text-sm text-[#484848] leading-6 font-medium">{item.description}</p>
      </div>
    </div>
  );
};

// Main Component
const PortfolioHighlights: React.FC<PortfolioHighlightsProps> = ({
  title = "Portfolio Highlights"
}) => {
  return (
    <Container disableYSpacing className='md:pb-24 pb-14'>
      <h1 className="md:text-3xl text-2xl leading-9 font-normal mb-6 md:mb-5">{title}</h1>

      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-5">
        {portfolioData.map((item, index) => (
          <PortfolioCard key={index} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default PortfolioHighlights;