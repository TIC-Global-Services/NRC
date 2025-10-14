import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../Reusable/Container";
import { AdvisoryBouquetImg } from "@/assets/CorporateAdvisory";
import Image from "next/image";
import FlexibleHeading from "../ui/FlexibleHeading";

const AdvisoryBouquet = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      id: 0,
      title: "Private Capital Raise",
      number: "1",
      description:
        "With India increasingly becoming a favored destination for global private capital, we look to work with accomplished entrepreneurs and management teams who wish to rapidly scale up their business and help them find the right investment partners who share their vision. We also help assist private equity funds exit their investments through secondaries or via trade sales.",
      image: AdvisoryBouquetImg,
    },
    {
      id: 1,
      title: "Mergers & Acquisitions",
      number: "2",
      description:
        "Our M&A advisory services help businesses navigate complex transactions, from strategic acquisitions to comprehensive merger processes. We provide end-to-end support including valuation, due diligence, negotiation, and deal structuring to maximize value for all stakeholders.",
      image: AdvisoryBouquetImg,
    },
    {
      id: 2,
      title: "Valuation Advisory",
      number: "3",
      description:
        "We provide comprehensive valuation services for various corporate purposes including financial reporting, tax compliance, litigation support, and strategic planning. Our experienced team delivers accurate and defensible valuations across industries and asset classes.",
      image: AdvisoryBouquetImg,
    },
  ];

  const handleCardHover = (cardId: any) => {
    setActiveCard(cardId);
  };

  return (
    <Container disablePaddingBottomMobile className="bg-[#FFFFFF] pb-16 md:pb-0">
      <div className="min-h-screen">
        <div className="mx-auto">
          {/* Header */}


          <FlexibleHeading
            title="Our Advisory Bouquet"
            maxWidth="max-w-3xl"
            alignment="center"
            highlights={{
              Bouquet: "text-primary",
            }}
          />

          {/* Cards Container */}
          <div className="flex flex-col gap-4 lg:flex-row md:gap-6 min-h-[90vh] md:min-h-[70vh] lg:h-[90vh]">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="relative bg-[#F6F9FC] cursor-pointer overflow-hidden rounded-2xl "
                onHoverStart={() => handleCardHover(index)}
                onClick={() => handleCardHover(index)}
                layout
                animate={{
                  flex: activeCard === index ? 1 : 0.47,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between text-black">
                  {/* Top Section - Plus/Close Icon */}
                  <motion.div
                    className="flex flex-col items-start"
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence mode="wait">
                      {activeCard !== index ? (
                        <>
                          {/* Desktop Plus Icon */}
                          <motion.div
                            key="plus-desktop"
                            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl text-black/80 hidden lg:block"
                          >
                            <svg
                              width="33"
                              height="33"
                              viewBox="0 0 33 33"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.4222 17.8268H17.7555V24.4935C17.7555 24.8471 17.6151 25.1863 17.365 25.4363C17.115 25.6863 16.7758 25.8268 16.4222 25.8268C16.0686 25.8268 15.7294 25.6863 15.4794 25.4363C15.2293 25.1863 15.0889 24.8471 15.0889 24.4935V17.8268H8.4222C8.06858 17.8268 7.72944 17.6863 7.47939 17.4363C7.22934 17.1863 7.08887 16.8471 7.08887 16.4935C7.08887 16.1399 7.22934 15.8007 7.47939 15.5507C7.72944 15.3006 8.06858 15.1602 8.4222 15.1602H15.0889V8.49349C15.0889 8.13987 15.2293 7.80073 15.4794 7.55068C15.7294 7.30063 16.0686 7.16016 16.4222 7.16016C16.7758 7.16016 17.115 7.30063 17.365 7.55068C17.6151 7.80073 17.7555 8.13987 17.7555 8.49349V15.1602H24.4222C24.7758 15.1602 25.115 15.3006 25.365 15.5507C25.6151 15.8007 25.7555 16.1399 25.7555 16.4935C25.7555 16.8471 25.6151 17.1863 25.365 17.4363C25.115 17.6863 24.7758 17.8268 24.4222 17.8268Z"
                                fill="black"
                              />
                            </svg>
                          </motion.div>

                          {/* Tablet Plus Icon */}
                          <motion.div
                            key="plus-mobile"
                            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                            className="text-5xl text-black/80 absolute top-7 right-3 lg:hidden hidden md:block"
                          >
                            <svg
                              width="30"
                              height="43"
                              viewBox="7 -13 33 33"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.4222 17.8268H17.7555V24.4935C17.7555 24.8471 17.6151 25.1863 17.365 25.4363C17.115 25.6863 16.7758 25.8268 16.4222 25.8268C16.0686 25.8268 15.7294 25.6863 15.4794 25.4363C15.2293 25.1863 15.0889 24.8471 15.0889 24.4935V17.8268H8.4222C8.06858 17.8268 7.72944 17.6863 7.47939 17.4363C7.22934 17.1863 7.08887 16.8471 7.08887 16.4935C7.08887 16.1399 7.22934 15.8007 7.47939 15.5507C7.72944 15.3006 8.06858 15.1602 8.4222 15.1602H15.0889V8.49349C15.0889 8.13987 15.2293 7.80073 15.4794 7.55068C15.7294 7.30063 16.0686 7.16016 16.4222 7.16016C16.7758 7.16016 17.115 7.30063 17.365 7.55068C17.6151 7.80073 17.7555 8.13987 17.7555 8.49349V15.1602H24.4222C24.7758 15.1602 25.115 15.3006 25.365 15.5507C25.6151 15.8007 25.7555 16.1399 25.7555 16.4935C25.7555 16.8471 25.6151 17.1863 25.365 17.4363C25.115 17.6863 24.7758 17.8268 24.4222 17.8268Z"
                                fill="black"
                              />
                            </svg>
                          </motion.div>

                          {/* Mobile Plus Icon */}
                          <motion.div
                            key="plus-mobile2"
                            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl text-black/80 absolute top-7 right-3 md:hidden"
                          >
                            <svg
                              width="20"
                              height="33"
                              viewBox="7 0 33 33"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.4222 17.8268H17.7555V24.4935C17.7555 24.8471 17.6151 25.1863 17.365 25.4363C17.115 25.6863 16.7758 25.8268 16.4222 25.8268C16.0686 25.8268 15.7294 25.6863 15.4794 25.4363C15.2293 25.1863 15.0889 24.8471 15.0889 24.4935V17.8268H8.4222C8.06858 17.8268 7.72944 17.6863 7.47939 17.4363C7.22934 17.1863 7.08887 16.8471 7.08887 16.4935C7.08887 16.1399 7.22934 15.8007 7.47939 15.5507C7.72944 15.3006 8.06858 15.1602 8.4222 15.1602H15.0889V8.49349C15.0889 8.13987 15.2293 7.80073 15.4794 7.55068C15.7294 7.30063 16.0686 7.16016 16.4222 7.16016C16.7758 7.16016 17.115 7.30063 17.365 7.55068C17.6151 7.80073 17.7555 8.13987 17.7555 8.49349V15.1602H24.4222C24.7758 15.1602 25.115 15.3006 25.365 15.5507C25.6151 15.8007 25.7555 16.1399 25.7555 16.4935C25.7555 16.8471 25.6151 17.1863 25.365 17.4363C25.115 17.6863 24.7758 17.8268 24.4222 17.8268Z"
                                fill="black"
                              />
                            </svg>
                          </motion.div>
                        </>
                      ) : (
                        <motion.button
                          key="close"
                          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                          transition={{ duration: 0.4 }}
                          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCard(0);
                          }}
                        >
                          <svg
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.421875"
                              y="0.496094"
                              width="49"
                              height="49"
                              rx="24.5"
                              fill="#6A48E8"
                            />
                            <path
                              d="M24.9227 26.3969L20.0227 31.2969C19.8393 31.4802 19.606 31.5719 19.3227 31.5719C19.0393 31.5719 18.806 31.4802 18.6227 31.2969C18.4393 31.1135 18.3477 30.8802 18.3477 30.5969C18.3477 30.3135 18.4393 30.0802 18.6227 29.8969L23.5227 24.9969L18.6227 20.0969C18.4393 19.9135 18.3477 19.6802 18.3477 19.3969C18.3477 19.1135 18.4393 18.8802 18.6227 18.6969C18.806 18.5135 19.0393 18.4219 19.3227 18.4219C19.606 18.4219 19.8393 18.5135 20.0227 18.6969L24.9227 23.5969L29.8227 18.6969C30.006 18.5135 30.2393 18.4219 30.5227 18.4219C30.806 18.4219 31.0393 18.5135 31.2227 18.6969C31.406 18.8802 31.4977 19.1135 31.4977 19.3969C31.4977 19.6802 31.406 19.9135 31.2227 20.0969L26.3227 24.9969L31.2227 29.8969C31.406 30.0802 31.4977 30.3135 31.4977 30.5969C31.4977 30.8802 31.406 31.1135 31.2227 31.2969C31.0393 31.4802 30.806 31.5719 30.5227 31.5719C30.2393 31.5719 30.006 31.4802 29.8227 31.2969L24.9227 26.3969Z"
                              fill="white"
                            />
                          </svg>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Middle Section - Expanded Content */}
                  <AnimatePresence>
                    {activeCard === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 30, height: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.04, 0.62, 0.23, 0.98],
                          delay: 0.1,
                        }}
                        className="space-y-2 flex-1 mt-8"
                      >
                        {/* Description */}
                        <motion.p
                          className="text-secondary text-sm lg:text-base leading-[31px] text-left"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          {card.description}
                        </motion.p>

                        {/* Building Image */}
                        <motion.div
                          className="w-full h-48 bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <Image
                            src={card.image}
                            alt={`${card.title}`}
                            className="w-full h-full rounded-[10px] object-cover 2xl:w-[586px] 2xl:h-[181px]  lg:h-[150px]"
                            width={586}
                            height={181}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Section - Title (Always Visible) */}
                  <motion.div
                    className={`flex flex-row items-center gap-4 md:text-xl md:mt-6 lg:mt-0 ${activeCard !== index ? `` : `mt-6`} md:mt-0  2xl:text-2xl lg:pb-6 2xl:pb-8`}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-[#C0BCBC]">{card.number}.</h1>
                    <p>{card.title}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdvisoryBouquet;