import React from 'react'
import Hero from '../Common/Hero'
import WeOffer from './WeOffer'
import RecentBlogs from './RecentBlogs'
import WhyNRC from './WhyNRC'
import AdvisoryBouquet from './AdvisoryBouquet'
import OurTrack from './OurTrack'
import { useRouter } from 'next/navigation'

const CorporateAdvisory = () => {
    const router = useRouter();
    const handleRedirectTo = (route: string) => {
        router.push(route);
    }
    return (
      <div className="bg-[#F6F9FC]">
        <Hero
          title1="Corporate"
          title1Color="Advisory"
          desc1="Our Corporate Advisory practice is led by senior bankers who have advised"
          desc2="marquee clients across a wide range of industries."
          mobDes1="Our Corporate Advisory practice is led by "
          mobDes2="senior bankers who have advised marquee clients across a wide range of industries."
          isCTA
          // CTAOne="Request Factsheet"
          hideCTAOne
          CTATwo="Schedule a Call"
          CTATwoOnclick={()=>handleRedirectTo("/contact")}
        />
        <WeOffer />
        <AdvisoryBouquet />
        <OurTrack />
        <WhyNRC />
        <RecentBlogs />
      </div>
    );
}

export default CorporateAdvisory