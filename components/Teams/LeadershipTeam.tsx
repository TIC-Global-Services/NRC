"use client";

import React, { useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import Container from "@/components/Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import { StaticImageData } from "next/image";
import { founderImg, sandhyakabra } from "@/assets/Teams";
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
    name: "Sandeep Daga",
    role: "Founder, MD & CIO",
    description:
      "As the founder, I bring a passion for identifying undervalued small cap companies with strong fundamentals and compelling growth prospects. During my private equity career, prior to founding NRC, I witnessed firsthand the transformative power of several SMEs headed by dynamic entrepreneurs and it is this conviction that drives our investment philosophy.",
    imageUrl: founderImg,
    linkedinUrl: "https://linkedin.com/in/arjunpatel",
  },
  {
    id: 2,
    name: "Sandhya Kabra",
    role: "Executive Director & CFO",
    description:
      "Sandhya is a result driven finance professional with over 23 years of industry experience in leading banking and financial services companies covering financial planning and control, MIS, forecasting, capital raising, performance management, ERP implementation, internal process streamlining and more.",
    imageUrl: sandhyakabra,
    linkedinUrl: "https://linkedin.com/in/vinaykhatu",
  },
];

// Team Section Component
const LeadershipTeam: React.FC = () => {
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
    <section>
      <Container isNavbar>
        <section className="py-16 ">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
                <SlideUpText animationMode="always">
                  Leadership <span className="text-primary">Team</span>
                </SlideUpText>
              </h1>
            </div>

            {/* Team Grid */}
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center w-[90%] md:w-[100%] lg:w-[65%]">
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
          </div>
        </section>
      </Container>
    </section>
  );
};

export default LeadershipTeam;