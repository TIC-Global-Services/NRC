import React from 'react'
import Hero from '../Common/Hero'
import WhoWeAre from './WhoWeAre'
import NineRivers from './NineRivers'
import WealthFlows from './WealthFlows'
import OurValue from './OurValue'
import { useRouter } from 'next/navigation'
import RecentBlogs from '../CorporateAdvisory/RecentBlogs'

const About = () => {

    const router = useRouter();
    const CTAOneOnclick = () => {
        router.push("/contact")
    }
    
    return (
      <div className="bg-[#F6F9FC]">
        <Hero
          title1="Investing with conviction."
          title2Color="Guiding with clarity."
          desc1="Independent asset management and corporate advisory for HNIs & family offices —"
          desc2="focused on high-growth opportunities across new economy and traditional sectors."
          mobDes1="Independent asset management and corporate advisory "
          mobDes2="for HNIs & family offices focused on high-growth opportunities across new economy and traditional sectors."
          isCTA
          CTAOne="Speak with our team"
          CTAOneOnclick={CTAOneOnclick}
          hideCTATwo
          CTATwo="Download our capabilities"
        />
        <WhoWeAre />
        <NineRivers />
        <OurValue />
        <WealthFlows />
        <RecentBlogs />
      </div>
    );
}

export default About