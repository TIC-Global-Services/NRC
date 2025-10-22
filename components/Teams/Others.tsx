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
  pratik,
  roshini,
  satyajit,
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
}

// Demo Data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Roshni",
    role: "Senior Portfolio Manager",
    description:
      "Pragati has over 20 years of public market experience in equity research across multiple sectors in India and Asia. She complements the company’s research capabilities in evaluating investment opportunities in public markets.",
    imageUrl: roshini,
    linkedinUrl: "https://linkedin.com/in/arjunpatel",
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
const OthersSection: React.FC = () => {
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
    <section id="assets" className="bg-[#F5F5F7]">
      <Container isNavbar>
        <section className="py-16 ">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
                <SlideUpText animationMode="always">
                                  {/* Asset <span className="text-primary">Management Team</span> */}
                                  Others
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
                  }}
                >
                  <ProfileCard
                    name={member.name}
                    role={member.role}
                    description={member.description}
                    imageUrl={member.imageUrl}
                    linkedinUrl={member.linkedinUrl}
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

export default OthersSection;
