"use client";

import React, { useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import Container from "@/components/Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import {
  kavithasingh,
  kunaljadhwani,
  kunalsabnis,
  mustafaarif,
  nitinjain,
  pragatikhadse,
  vallabh,
} from "@/assets/Teams";
import { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Team Member Interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string | StaticImageData;
  linkedinUrl?: string;
  highlightWords?: string[]; 
}


const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Pragati Khadse",
    role: "Senior Portfolio Manager",
    description:
      "Sandhya is a result driven finance professional with over 23 years of industry experience in leading banking and financial services companies covering financial planning and control, MIS, forecasting, capital raising, performance management, ERP implementation, internal process streamlining and more.",
    imageUrl: pragatikhadse,
    highlightWords: ["Khadse"],
    linkedinUrl: "https://linkedin.com/in/vinaykhatu",
  },
  {
    id: 2,
    name: "Kunal Sabnis CFA",
    role: "Portfolio Manager",
    description:
      "Kunal has over 15 years of experience in financial markets and has spent more than a decade in Equities in buy side roles. After a brief stint with ARCIL (an Asset Reconstruction Company) valuing non-performing loans, Kunal moved to a domestic brokerage house as an analyst tracking Banks and NBFCs.",
    imageUrl: kunalsabnis,
    highlightWords: ["Sabnis", "CFA"],
    linkedinUrl: "https://linkedin.com/in/vinaykhatu",
  },
  {
    id: 3,
    name: "Kunal Jadhwani",
    role: "Vice President - Research",
    description:
      "Kunal brings over 14 years of equity research experience across multiple sectors as an Analyst and Fund Manager at Motilal Oswal AMC and ENAM Family Office. He also had a brief stint as entrepreneur and seeded a consumer brand. Kunal is a Management Graduate from Mumbai University.",
    imageUrl: kunaljadhwani,
    highlightWords: ["Jadhwani"],
    linkedinUrl: "https://linkedin.com/in/vinaykhatu",
  },
  {
    id: 4,
    name: "Vallabh Daga",
    role: "Executive Director & CFO",
    description:
      "Vallabh brings diverse experience from the technology and ecommerce sectors to his role as a Research Analyst at Nine Rivers Capital. With a strong background in project management, sales support, and business optimization, he has developed a keen ability to analyze complex data and identify opportunities for growth.",
    imageUrl: vallabh,
    linkedinUrl: "https://linkedin.com/in/rahulsharma",
    highlightWords: ["Daga"],
  },
  {
    id: 5,
    name: "Mustafa Arif",
    role: "President",
    description:
      "Vinay has 30 years of transactional expertise with more than 40 successful transactions encompassing PE, domestic and international M&A, and corporate finance for both established and startup businesses.",
    imageUrl: mustafaarif,
    highlightWords: ["Arif"],
    linkedinUrl: "https://linkedin.com/in/vinaykhatu",
  },
  {
    id: 6,
    name: "Nitin Jain",
    role: "Senior Portfolio Manager",
    description:
      "Pragati has over 20 years of public market experience in equity research across multiple sectors in India and Asia. She complements the company's research capabilities in evaluating investment opportunities in public markets.",
    imageUrl: nitinjain,
    linkedinUrl: "https://linkedin.com/in/meerasingh",
    highlightWords: ["Jain"],
  },
];

const AssetManagementTeam: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.1,
          }
        );
      }
    });
  }, []);

  return (
    <section id="assets" className="bg-[#F5F5F7]">
      <Container isNavbar>
        <section className="py-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
                <SlideUpText animationMode="always">
                  Asset <span className="text-primary">Management Team</span>
                </SlideUpText>
              </h1>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                    return undefined;
                  }}
                >
                  <ProfileCard
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    imageUrl={member.imageUrl}
                    linkedinUrl={member.linkedinUrl}
                    highlightWords={member.highlightWords}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default AssetManagementTeam;
