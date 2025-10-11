"use client";

import React from "react";
import ProfileCard from "./ProfileCard";
import Container from "@/components/Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import { FounderImg } from "@/assets/Home";
import { StaticImageData } from "next/image";

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
            "As the founder, I bring a passion for identifying undervalued small cap companies with strong fundamentals and compelling growth prospects. During my private equity career, prior to founding NRC, I witnessed firsthand the transformative power of several SMEs headed by dynamic entrepreneurs and it is this conviction that drives our investment philosophy. ",
        imageUrl:
            FounderImg,
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
    }
];

// Team Section Component
const LeadershipTeam: React.FC = () => {
    return (
        <section  >
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center w-[90%] md:w-[65%]">
                                {teamMembers.map((member) => (
                                    <ProfileCard
                                        key={member.id}
                                        name={member.name}
                                        role={member.role}
                                        description={member.description}
                                        imageUrl={member.imageUrl}
                                        linkedinUrl={member.linkedinUrl}
                                    />
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
