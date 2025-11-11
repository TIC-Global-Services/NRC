import React from "react";
import Hero from "../Common/Hero";
import SlideUpText from "../ui/SlideUpText";
import Expertise from "./Expertise";
import TwoDistinct from "./TwoDistinct";
import InvestmentStrategy from "./InvestmentStrategy";
import InvestmentProcess from "./InvestmentProcess";
import PortfolioHighlights from "./PortfolioHighlights";
import RecentBlogs from "../CorporateAdvisory/RecentBlogs";

const AIF = () => {
  return (
    <div className="bg-[#F6F9FC] overflow-x-hidden">
      <Hero
        title1="Investing in India's "
        title2Color="Growth Story"
        mobileTitle1="Investing in India's "
        mobileTitle2Color="Growth Story"
        desc1="Nine Rivers Capital offers unique opportunities to participate in the dynamic growth of the"
        desc2="Indian economy through our AIF funds."
        mobDes1="Nine Rivers Capital offers unique opportunities to"
        mobDes2="participate in the dynamic growth of the Indian"
        mobDes3="economy through our AIF funds."
      />
      <div className="flex items-center justify-center text-center">
        <SlideUpText
          animationMode="always"
          className="pt-32 md:text-lg font-light text-center max-w-[80%] md:max-w-3xl mx-auto lg:pb-0 pb-12"
        >
          As India&apos;s influence in the global economy strengthens, Nine
          Rivers Capital identifies and supports outstanding Indian founders
          with global aspirations. Our AIF funds provide access to high-growth
          potential companies across various sectors, leveraging our extensive
          experience and rigorous investment process.
        </SlideUpText>
      </div>
      <Expertise />
      <TwoDistinct />
      <InvestmentStrategy />
      <InvestmentProcess />
      <PortfolioHighlights />
      <RecentBlogs />
    </div>
  );
};

export default AIF;
