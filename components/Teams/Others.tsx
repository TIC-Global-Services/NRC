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
    name: "Sandhya Kabra",
    role: "Executive Director & CFO",
    description:
      "Sandhya is a result driven finance professional with over 23 years of industry experience in leading banking and financial services companies covering financial planning and control, MIS, forecasting, capital raising, performance management, ERP implementation, internal process streamlining and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedinUrl: "https://linkedin.com/in/arjunpatel",
  },
  {
    id: 2,
    name: "Vinay Khatu",
    role: "President",
    description:
      "Vinay has 30 years of transactional expertise with more than 40 successful transactions encompassing PE, domestic and international M&A, and corporate finance for both established and startup businesses.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedinUrl: "https://linkedin.com/in/vinaykhatu",
  },
  {
    id: 3,
    name: "Pragati Khadse",
    role: "Senior Portfolio Manager",
    description:
      "Pragati has over 20 years of public market experience in equity research across multiple sectors in India and Asia. She complements the company's research capabilities in evaluating investment opportunities in public markets.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedinUrl: "https://linkedin.com/in/pragatikhadse",
  },
  {
    id: 4,
    name: "Rahul Sharma",
    role: "Executive Director & CFO",
    description:
      "Rahul is a seasoned finance professional with over 25 years of experience in investment banking, private equity, and corporate finance. He has successfully led numerous high-profile transactions and strategic initiatives across various industry sectors.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedinUrl: "https://linkedin.com/in/rahulsharma",
  },
  {
    id: 5,
    name: "Arjun Patel",
    role: "President",
    description:
      "Arjun brings over 28 years of comprehensive experience in asset management and investment strategies. He has a proven track record of delivering exceptional returns and building long-term value for institutional and retail investors.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedinUrl: "https://linkedin.com/in/arjunpatel",
  },
  {
    id: 6,
    name: "Meera Singh",
    role: "Senior Portfolio Manager",
    description:
      "Meera is an accomplished portfolio manager with over 18 years of experience in equity markets and quantitative analysis. She specializes in emerging market investments and has consistently outperformed benchmark indices.",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
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
