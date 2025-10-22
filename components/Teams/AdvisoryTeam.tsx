"use client";

import React, { useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import Container from "@/components/Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nitinjain, pratik, satyajit } from "@/assets/Teams";
import { StaticImageData } from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Team Member Interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: StaticImageData;
  linkedinUrl?: string;
}

// Demo Data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Nitin Jain",
    role: "Senior Portfolio Manager",
    description:
      "Nitin has about three decades of deal making experience across sectors with a special focus on healthcare & lifesciences. Nitin leads the Pharma, Healthcare and Chemicals/Industrials practice at NRC.",
    imageUrl: nitinjain,
    linkedinUrl: "https://linkedin.com/in/meerasingh",
  },
  {
    id: 2,
    name: "Pratik Singhi",
    role: "Managing Director",
    description:
      "Pratik is a finance professional with 25+ years of experience in corporate finance and valuations. He founded Lakshya Consulting, later integrated with NRC’s advisory arm, and has worked with leading firms like Zee Telefilms, BDO, EDS, and ICICI Bank.",
    imageUrl: pratik,
    linkedinUrl: "https://linkedin.com/in/meerasingh",
  },
  {
    id: 3,
    name: "Satyajit Chakraborty",
    role: "Director",
    description:
      "Satyajit has about 18 years of experience in Investment Banking and Management Consulting. He has advised clients in Technology (Both SaaS and Consumer Internet), Digital Commerce, Fintech, Digital Media and Education sectors on fund raising and M&A transactions.",
    imageUrl: satyajit,
    linkedinUrl: "https://linkedin.com/in/meerasingh",
  },
];

// Team Section Component
const CorporateAdvisoryTeam: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
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
    <section id="advisory" className="bg-[#ffffff]">
      <Container isNavbar>
        <section className="py-16 ">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
                <SlideUpText animationMode="always">
                  Corporate <span className="text-primary">Advisory Team</span>
                </SlideUpText>
              </h1>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                >
                  <ProfileCard
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    imageUrl={member.imageUrl}
                    linkedinUrl={member.linkedinUrl}
                    isAdvisory
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

export default CorporateAdvisoryTeam;
