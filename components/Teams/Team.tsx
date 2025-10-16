import React from "react";
import AssetManagementTeam from "./AssetManagementTeam";
import Hero from "../Common/Hero";
import CorporateAdvisoryTeam from "./AdvisoryTeam";
import MediaCentreSection from "../Common/MediaCenter";
import FounderComponent from "../Home/Founder";
import SlideUpText from "../ui/SlideUpText";
import ParallaxWrapper from "../ui/ParallaxSliderWrapper";
import LeadershipTeam from "./LeadershipTeam";

const Team = () => {
  return (
    <>
      <Hero
        title1="Meet Our Leadership"
        title2="&"
        title2Color=" Expert Teams"
      />
      <div className="w-full flex justify-center">
        <SlideUpText
          animationMode="always"
          className="md:pt-32 md:pb-[70px] pt-8 pb-56 text-[20px] leading-[31px] md:text-lg font-light text-center max-w-[80%] md:max-w-3xl"
        >
          At Nine Rivers Capital we bring together a diverse group of
          professionals with expertise in asset management and corporate
          advisory. Two dedicated teams, one shared mission: to deliver trusted
          solutions and sustainable growth for our clients.
        </SlideUpText>
      </div>
      {/* <FounderComponent /> */}
      <LeadershipTeam />
      <AssetManagementTeam />
      <CorporateAdvisoryTeam />
      <MediaCentreSection />
    </>
  );
};

export default Team;
