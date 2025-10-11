import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../Reusable/Container';

const Services = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform for second card to slide over the first
  const secondCardY = useTransform(scrollYProgress, [0, 1], ['120%', '0%']);

  const servicesData = [
    {
      title: "Asset Management",
      description: "We are non-consensus investors focused on finding mispriced opportunities through our proprietary ‘Private Equity Approach’. We tend to challenge conventional wisdom in determining the quality as well as value of the business. Our focus is small and mid-cap public equities. We strive to generate superior risk adjusted return over the long term.",
      subCards: [
        {
          title: "PMS",
          description: "We are non-consensus investors focused on finding mispriced opportunities through our proprietary 'Private Equity Approach'."
        },
        {
          title: "AIF",
          description: "We are non-consensus investors focused on finding mispriced opportunities through our proprietary 'Private Equity Approach'."
        }
      ],
      bgColor: "bg-[#D9D8FB]"
    },
    {
      title: "Corporate Advisory",
      description: "Our Corporate Advisory practice is led by senior bankers who have advised marquee clients. We offer bespoke advisory solutions to our clients seeking support for equity capital raise, M&A, and valuations. We act as trusted independent advisors to our clients and combine sector expertise and sharp execution to deliver successful outcomes.",
      subCards: [],
      bgColor: "bg-[#D9D8FB]"
    }
  ];

  return (
    <div ref={containerRef} className="h-[200vh] mt-32">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Container isNavbar>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full items-center">

            {/* Left Side - Static Image */}
            <div className="relative md:h-[95vh] 2xl:h-[90vh] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop"
                alt="Modern Office"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Card Container */}
            <div className="relative md:h-[95vh] 2xl:h-[90vh] w-full">

              {/* First Card - Asset Management */}
              <div className={`absolute w-full h-full flex flex-col ${servicesData[0].bgColor} rounded-3xl px-7 py-7 `}>
                <h2 className="text-4xl font-light text-black mb-4">
                  {servicesData[0].title}
                </h2>
                <p className="text-secondary mb-6 leading-relaxed text-base">
                  {servicesData[0].description}
                </p>

                <div className="grid grid-cols-2 gap-4 flex-1 items-stretch">
                  {servicesData[0].subCards.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="bg-white rounded-2xl p-4 grid grid-cols-1 "
                    >
                      <div className=" mb-3">
                        <h3 className="font-light text-lg">{card.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                      </div>
                      <div className='justify-self-end self-end bg-[#F5F5F5] rounded-full w-7 h-7 flex flex-col items-center justify-center'>
                        <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity " />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Second Card - Corporate Advisory (slides over first card) */}
              {/* ${servicesData[1].bgColor} */}
              <motion.div
                style={{ y: secondCardY }}
                className={`absolute inset-0 bg-white  rounded-3xl p-8 border border-[#ECEBEB]`}
              >
                <h2 className="text-4xl font-light text-primary mb-4">
                  {servicesData[1].title}
                </h2>
                <p className="text-secondary mb-6 leading-relaxed text-base">
                  {servicesData[1].description}
                </p>

                <div className="absolute bottom-8 right-8">
                  <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center cursor-pointer transition-colors">
                    <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default Services;