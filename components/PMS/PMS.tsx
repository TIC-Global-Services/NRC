import React from "react";
import Hero from "../Common/Hero";
import Glance from "./Glance/Glance";
import OurEdge from "./OurEdge";
import Strategies from "./Strategies";
import Partnerships from "./Partnerships";
import TrustedPartner from "./TrustedPartner";
import FamilyOffices from "./FamilyOffices";
import FAQ from "./FAQ";
import WealthFlows from "./WealthFlows";
import Awards from "./Awards";

const PMS = () => {
  React.useEffect(() => {
    function logScreenHeight() {
      console.log(`Viewport height: ${window.innerHeight}px`);
    }

    // Initial log
    logScreenHeight();

    // Update on resize
    window.addEventListener("resize", logScreenHeight);

    return () => window.removeEventListener("resize", logScreenHeight);
  }, []);
  return (
    <div className="bg-[#F6F9FC]">
      <Hero
        title1="Portfolio Management"
        title2Color="Services"
        desc1="Trusted by HNIs & Family Offices for over 12 years, our PMS strategies combine"
        desc2="private-equity style diligence with public-market opportunity — with Small"
        desc3="Caps as our flagship expertise"

        mobDes1="Trusted by HNIs & Family Offices for over 12 years,"
        mobDes2="our PMS strategies combine private-equity style diligence"
        mobDes3="with public-market opportunity — with Small Caps as our flagship expertise"
        isCTA
        // CTAOne="Request Factsheet"
        hideCTAOne
        CTATwo="Schedule a Call"
      />
      <Glance />
      <OurEdge />
      <Strategies />
      <Partnerships />
      <TrustedPartner />
      <FamilyOffices />
      <Awards />
      <FAQ />
      <WealthFlows />
    </div>
  );
};

export default PMS;
