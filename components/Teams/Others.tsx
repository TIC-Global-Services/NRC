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
  narayan,
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
  highlightWords?: string[];
}


const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Roshni Vaid",
    role: "Senior Portfolio Manager",
    description:
      "Pragati has over 20 years of public market experience in equity research across multiple sectors in India and Asia. She complements the company’s research capabilities in evaluating investment opportunities in public markets.",
    imageUrl: roshini,
    linkedinUrl: "https://linkedin.com/in/arjunpatel",
    highlightWords: ["Vaid"],
  },
  {
    id: 2,
    name: "Narayan Nimkar",
    role: "VP – Operations & Compliance",
    description:
      "Narayan has 32+ years of experience in the Indian stock market, including 17 years on the buy side. He has held key roles at ICICI Prudential, PGIM India, and Cholamandalam Securities, and holds a PGPMS from Welingkar’s Institute.",
    imageUrl: narayan,
    linkedinUrl: "https://linkedin.com/in/meerasingh",
    highlightWords: ["Nimkar"],
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center w-[90%] md:w-[100%] lg:w-[65%] mx-auto">
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

export default OthersSection;
