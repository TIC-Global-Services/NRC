import React from 'react';
import Container from '../Reusable/Container';

// TypeScript Interfaces
interface InvestmentCardProps {
  number: string;
  title: string;
  items: string[];
}

interface InvestmentStrategyItem {
  number: string;
  title: string;
  items: string[];
}

// Reusable Card Component
const InvestmentCard: React.FC<InvestmentCardProps> = ({ number, title, items }) => {
  return (
    <div className="bg-[#F3F3F5] rounded-2xl px-6 lg:pt-8 lg:pb-8 py-7 lg:py-0 lg:h-[287px] flex flex-col justify-center">
      <h2 className="lg:text-4xl text-2xl leading-9 font-normal text-primary mb-6">{number}</h2>
      <h3 className="lg:text-2xl text-base leading-9 font-normal mb-2">{title}</h3>
      <ul className="lg:text-base text-sm font-normal lg:space-y-2 text-[#484848] leading-8">
        {items.map((item, index) => (
          <li key={index} className="flex">
            <span className="mr-2">•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Investment Strategy Data
const investmentStrategyData: InvestmentStrategyItem[] = [
  {
    number: "1.",
    title: "Thesis",
    items: [
      "Growth capital for emerging companies",
      "Stage flexible – Pre-IPO to Listed",
      "Typical cheque size Rs 15-30 crs"
    ]
  },
  {
    number: "2.",
    title: "Theme",
    items: [
      "Growth companies with high visibility of cashflows in sunrise sectors",
      "Low access to small cheque PE but with large potential to unlock opportunities to scale"
    ]
  },
  {
    number: "3.",
    title: "Criteria",
    items: [
      "Large addressable market with a solid business franchise",
      "Management with execution track record",
      "Profitable growth, strong cashflows, operating leverage and healthy return ratios"
    ]
  }
];

// Main Component
const InvestmentStrategy: React.FC = () => {
  return (
    <Container disableYSpacing>
      <h1 className="text-3xl font-normal mb-8">Investment Strategy</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {investmentStrategyData.map((card, index) => (
          <InvestmentCard
            key={index}
            number={card.number}
            title={card.title}
            items={card.items}
          />
        ))}
      </div>
    </Container>
  );
};

export default InvestmentStrategy;