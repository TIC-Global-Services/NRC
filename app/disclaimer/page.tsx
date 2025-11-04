"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Reusable/Container";

const DisclaimerPage = () => {
  return (
    <div className="bg-white pt-24 pb-20">
      <Container disableYSpacing>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <h1 className="text-[28px] md:text-[40px] font-normal mb-8 leading-tight">
            General <span className="text-primary">Disclaimer</span>
          </h1>

          {/* Divider line */}
          <div className="h-[2px] w-20 bg-primary mx-auto mb-12 opacity-60"></div>

          {/* Content */}
          <div className="text-left">
            <p className="text-secondary text-base md:text-lg leading-8 mb-6">
              The content of this Website is for general information purposes only and under no
              circumstances is the information herein to be used or considered as constituting an
              offer to buy or sell, or solicitation of any offer to buy or offer or recommendation
              to acquire or dispose of any security, commodity or investment or to engage in any
              other transaction.
            </p>

            <p className="text-secondary text-base md:text-lg leading-8 mb-6">
              The information contained herein is not to be used for any other purpose or made
              available to anyone not directly associated with the determination of any such
              interest.
            </p>

            <p className="text-secondary text-base md:text-lg leading-8 mb-6">
              The information contained in this website is not intended for any person who is a
              resident of the United States of America or a resident of a jurisdiction, the laws of
              which impose prohibition on soliciting the advisory business in that jurisdiction
              without going through the registration requirements and/or prohibit the use of any
              information contained in this website.
            </p>

            <p className="text-secondary text-base md:text-lg leading-8">
              If any person accesses this website by giving false declaration, he/she shall be
              solely liable/responsible for any adverse consequences suffered, legally as well as
              financially, pursuant to use of any information contained in this website.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default DisclaimerPage;
