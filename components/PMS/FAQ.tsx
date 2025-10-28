import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import FlexibleHeading from "../ui/FlexibleHeading";


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqData = [
    {
      id: 1,
      question: "What types of Portfolio Management Services (PMS) does Nine Rivers Capital offer?",
      answer: "Nine Rivers Capital offers Discretionary Portfolio Management Services, wherein investment decisions are made by our portfolio managers in line with the defined strategy objectives and SEBI regulations."
    },
    {
      id: 2,
      question: "Who can invest in a PMS?",
      answer: "PMS is open to Resident Individuals, NRIs, HUFs, Partnership Firms, Body Corporates and Trusts that meet SEBI's eligibility and KYC norms. Investors must fulfill the minimum investment threshold as prescribed by SEBI."
    },
    {
      id: 3,
      question: "What is the minimum investment amount for Nine Rivers' PMS strategies?",
      answer: "Aurum Small Cap Opportunities: ₹1 Crore | Aurum Multiplier Fund: ₹50 Lakh. These thresholds comply with SEBI's regulatory requirements and reflect the strategic intent of each portfolio."
    },
    {
      id: 4,
      question: "Are your PMS offerings approved and regulated by SEBI?",
      answer: "Yes. Nine Rivers Capital's PMS is registered with SEBI as a Portfolio Manager under SEBI (Portfolio Managers) Regulations, 2020, and operates under full regulatory supervision and disclosure norms."
    },
    {
      id: 5,
      question: "What strategies are offered under your PMS platform?",
      answer: "We currently offer two distinct equity-focused strategies: Aurum Multiplier Fund – a flexi-cap strategy focused on identifying scalable and high-quality businesses across market caps, and Aurum Small Cap Opportunities – targets high-conviction small-cap opportunities with sustainable earnings growth potential. Each strategy is designed with differentiated stock selection frameworks, risk parameters, and time horizons to deliver long-term compounding."
    },
    {
      id: 6,
      question: "What is the average holding period and portfolio churn in your PMS strategies?",
      answer: "Our investment philosophy emphasizes a long-term orientation, with an average holding period of approximately five years. Portfolio churn is moderate, reflecting our conviction-driven, buy-and-hold approach aimed at compounding capital over time."
    },
    {
      id: 7,
      question: "What is the level of risk associated with PMS investments?",
      answer: "PMS investments involve market risk, liquidity risk, and concentration risk. While our approach focuses on quality and risk management, capital values may fluctuate in line with market movements. Investors should assess their risk tolerance and investment horizon before investing."
    },
    {
      id: 8,
      question: "How are fees structured for PMS investors?",
      answer: "Our PMS fee structure comprises a management fee and a performance-linked component, aligned with SEBI's disclosure norms. Fee structures may vary based on the investment strategy and investor class, and are clearly detailed in the PMS Disclosure Document."
    },
    {
      id: 9,
      question: "What is the onboarding process for PMS investors?",
      answer: "Investors can onboard through Nine Rivers Capital directly (Direct Route) or via empanelled distributors. The process is currently partly physical but transitioning to a fully digital KYC and documentation experience in line with SEBI guidelines."
    },
    {
      id: 10,
      question: "Can Non-Resident Indians (NRIs) invest in Nine Rivers' PMS?",
      answer: "Yes, NRIs can invest through both NRE (Repatriable) and NRO (Non-Repatriable) accounts, subject to applicable RBI and SEBI regulations."
    },
    {
      id: 11,
      question: "What disclosures and documents are available for PMS investors?",
      answer: "All statutory documents — including the PMS Disclosure Document, audited financials, and strategy factsheets — are available under the "
    },
    {
      id: 12,
      question: "What types of reports are provided to PMS clients and how can they be accessed?",
      answer: "Investors receive quarterly portfolio statements, transaction reports, performance summaries, and tax packs. In addition, clients have access to a secure online portal that provides portfolio visibility."
    },
    {
      id: 13,
      question: "How can investors access PMS disclosures and updates on the website?",
      answer: "All PMS-related disclosures, regulatory filings, and performance updates can be accessed under the "
    }
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] justify-center items-start">
        {/* <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4 leading-[58px]">
            <SlideUpText animationMode="always">
              Frequently{" "}
              <span className="text-primary">Asked<br /> Questions</span>
            </SlideUpText>
          </h2>
        </div> */}

        {/* desktop */}
        <FlexibleHeading
          title="Frequently <br/>Asked Questions"
          alignment="left"
          mobileAlignment="center"
          highlights={{
            "Asked Questions": "text-primary",
          }}
          isMB={false}
          className="md:block hidden"
        />

        {/* mobile */}
        <FlexibleHeading
          title="Frequently <br/> Asked Questions"
          alignment="left"
          mobileAlignment="center"
          highlights={{
            "Questions": "text-primary",
          }}
          isMB={false}
          className="md:hidden block"
        />


        <div className="flex flex-col gap-6">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Gradient Border Container */}
              <div
                className="relative rounded-3xl p-[1px]"
                style={{
                  background:
                    openIndex === index
                      ? "linear-gradient(90deg, #8B7EFF 0%, #E8E3FF 100%)"
                      : "transparent",
                }}
              >
                {/* Main Content Container */}
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden"
                  style={{
                    boxShadow:
                      openIndex === index
                        ? "0 8px 32px rgba(139, 126, 255, 0.15)"
                        : "0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                  animate={{
                    boxShadow:
                      openIndex === index
                        ? `
                      0px 7px 33px 0px rgba(0, 0, 0, 0.10),
                      0px 30px 59px 0px rgba(0, 0, 0, 0.09),
                      0px 67px 80px 0px rgba(0, 0, 0, 0.05),
                      0px 119px 95px 0px rgba(0, 0, 0, 0.01),
                      0px 186px 104px 0px rgba(0, 0, 0, 0)
                    `
                          .replace(/\s+/g, " ")
                          .trim()
                        : "0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Question Header */}
                  <motion.button
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    whileHover={{
                      backgroundColor: "rgba(139, 126, 255, 0.02)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-medium text-gray-800 pr-4">
                      {item.question}
                    </h3>

                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="flex-shrink-0 ml-4"
                    >
                      {openIndex === index ? (
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.3145 13.1289H6.31445C6.04924 13.1289 5.79488 13.0235 5.60735 12.836C5.41981 12.6485 5.31445 12.3941 5.31445 12.1289C5.31445 11.8637 5.41981 11.6093 5.60735 11.4218C5.79488 11.2343 6.04924 11.1289 6.31445 11.1289H18.3145C18.5797 11.1289 18.834 11.2343 19.0216 11.4218C19.2091 11.6093 19.3145 11.8637 19.3145 12.1289C19.3145 12.3941 19.2091 12.6485 19.0216 12.836C18.834 13.0235 18.5797 13.1289 18.3145 13.1289Z"
                            fill="black"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 13.1289H13V18.1289C13 18.3941 12.8946 18.6485 12.7071 18.836C12.5196 19.0235 12.2652 19.1289 12 19.1289C11.7348 19.1289 11.4804 19.0235 11.2929 18.836C11.1054 18.6485 11 18.3941 11 18.1289V13.1289H6C5.73478 13.1289 5.48043 13.0235 5.29289 12.836C5.10536 12.6485 5 12.3941 5 12.1289C5 11.8637 5.10536 11.6093 5.29289 11.4218C5.48043 11.2343 5.73478 11.1289 6 11.1289H11V6.12891C11 5.86369 11.1054 5.60934 11.2929 5.4218C11.4804 5.23426 11.7348 5.12891 12 5.12891C12.2652 5.12891 12.5196 5.23426 12.7071 5.4218C12.8946 5.60934 13 5.86369 13 6.12891V11.1289H18C18.2652 11.1289 18.5196 11.2343 18.7071 11.4218C18.8946 11.6093 19 11.8637 19 12.1289C19 12.3941 18.8946 12.6485 18.7071 12.836C18.5196 13.0235 18.2652 13.1289 18 13.1289Z"
                            fill="black"
                          />
                        </svg>
                      )}
                    </motion.div>
                  </motion.button>

                  {/* Answer Content */}
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          className="px-6 pb-6"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        >
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;