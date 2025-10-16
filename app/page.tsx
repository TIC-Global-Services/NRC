"use client";

import FounderComponent from "@/components/Home/Founder";
import Hero from "@/components/Home/Hero";
import MediaCentreSection from "@/components/Common/MediaCenter";
import WhoWeAre from "@/components/Home/Whoweare";
import SelectiveDesignSection from "@/components/Home/SelectiveDesign";
import PhilosophySection from "@/components/Home/PhilosophySection";
import TrackRecordSection from "@/components/Home/TrackRecord";
import WealthFlows from "@/components/Home/WealthFlows";
import StrategiesSection from "@/components/Home/StrategyCard";
import WhoWeServeSection from "@/components/Home/Whoweserve";
// import Commitment from "@/components/Home/Commitment";
// import Services from "@/components/Home/Services";
// import Services from "@/components/Home/Services";
// import Commitment from "@/components/Home/Commitment";

export default function Home() {
  return (
    <div className="bg-[#F6F9FC]">
      <Hero />
      <WhoWeAre />
      <StrategiesSection />
      <PhilosophySection />
      <SelectiveDesignSection />
      <TrackRecordSection />
      <WhoWeServeSection />
      <FounderComponent />
      <WealthFlows />
      <MediaCentreSection />
      {/* <Services/> */}
      {/* <Commitment/> */}
    </div>
  );
}
