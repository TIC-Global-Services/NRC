import { WhyNRCImg } from "@/assets/CorporateAdvisory";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import MobileWhyNRC from "./MobileWhyNRC";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyNRC = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  const contentData = [
    {
      title: "Strong Legacy,\nEntrepreneurial Energy",
      description:
        "A combined team experience of 100+ years in deal\nmaking with the energy of a young firm.",
    },
    {
      title: "Client First\nApproach",
      description:
        "We take the long view and invest in relationships, not\nshort-term gains. We commit to our clients' long-term\ngoals.",
    },
    {
      title: "Rigor in the\nProcess",
      description:
        "Our engagement evaluates plans and questions all\nassumptions to yield superior advisory outcome and\nmore informed decision-making.",
    },
    {
      title: "Leverage\nour Network",
      description:
        "We create multiple possibilities for our clients through a\ndiverse network across investors and corporates",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const section = sectionRef.current;
    const leftSide = leftSideRef.current;
    const rightSide = rightSideRef.current;

    if (!section || !leftSide || !rightSide) return;

    const ctx = gsap.context(() => {
      const unpinPoint = rightSide.offsetHeight - window.innerHeight;

      // Pin the left side while right side scrolls
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${unpinPoint}`,
        pin: leftSide,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Create pin/hold effect for each content item at center
      const contentItems = rightSide.querySelectorAll('.content-item');
      contentItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "center center",
          end: "+=250vh", // Hold for 100vh of scroll
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <Container className="flex flex-row items-center justify-between min-h-screen ">
        <div>
          <SlideUpText animationMode="always" className="mb-4">
            <h1 className="text-[44px] leading-[58px] font-[400]">
              Why <span className="text-primary mb-4">NRC?</span>
            </h1>
          </SlideUpText>
          <div className="flex flex-col justify-between items-start">
            <Image
              src={WhyNRCImg}
              alt="Why NRC Building"
              className=""
              width={540}
              height={669}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start max-w-md">
          <h1 className="text-[44px] leading-[51px] font-[700] mb-8">
            {contentData[0].title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < contentData[0].title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-lg font-[400] leading-[31px]">
            {contentData[0].description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < contentData[0].description.split("\n").length - 1 && (
                  <br />
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-white md:py-28">
      <div className="md:min-h-screen ">
        <Container
          ref={sectionRef}
          disablePaddingBottomDesktop
          disablePaddingTopDesktop
          disableMarginBottomDesktop
          disableMarginBottomMobile
          disableMarginTopDesktop
          disableMarginTopMobile
          disablePaddingBottomMobile
          disablePaddingTopMobile
          isNavbar
          isFooter
          isHero
          className="hidden md:grid grid-cols-[4fr_6fr] justify-start items-start gap-x-32"
        >
          {/* Left Side - Fixed */}
          <div ref={leftSideRef} className="sticky top-0 h-screen flex flex-col justify-center">
            <SlideUpText animationMode="always" className=" mb-4">
              <h1 className="text-[44px] leading-[58px] font-[400]">
                Why <span className="text-primary ">NRC?</span>
              </h1>
            </SlideUpText>
            <div className="flex flex-col justify-between items-start h-[80vh]">
              <Image
                src={WhyNRCImg}
                alt="Why NRC Building"
                className=""
                width={540}
                height={669}
              />
            </div>
          </div>

          {/* Right Side - Scrollable Content */}
          <div ref={rightSideRef} className="py-0">
            {contentData.map((content, index) => (
              <div
                key={index}
                className="content-item h-screen flex flex-col justify-center max-w-xl"
              >
                <h1 className="text-[44px] leading-[51px] font-[700] mb-8">
                  {content.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < content.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h1>
                <p className="text-lg font-[400] leading-[31px]">
                  {content.description.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < content.description.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </Container>
        <MobileWhyNRC />
      </div>
    </div>
  );
};

export default WhyNRC;