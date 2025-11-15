import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Youtube, Twitter, MapPin } from 'lucide-react';
import Container from './Container';
import { Location } from '@/assets/CommonSVGs';
import Link from 'next/link';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="md:pb-16 pb-6  bg-[#F6F9FC]">
      <Container
        disableYSpacing
        disableMarginTopMobile
        disableMarginBottomDesktop
        disableMarginBottomMobile
        disableMarginTopDesktop
        disablePaddingBottomDesktop
        disablePaddingTopDesktop
        disablePaddingTopMobile
        disablePaddingBottomMobile
      >
        <motion.footer
          className="text-white lg:py-20 md:py-14 py-8 bg-primary px-6 md:px-10 lg:px-16 rounded-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-end lg:grid-cols-4 gap-5 md:gap-8 mb-8 md:mb-12">
              {/* Company Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="md:text-xl text-lg font-medium mb-3">Company</h3>{" "}
                {/* Increased margin */}
                <div className="md:space-y-3 space-y-1 text-[#FFFFFF] opacity-[60%]">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    About us
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Investors
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Insights
                  </motion.div>
                </div>
              </motion.div>

              {/* Services Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="md:text-xl text-lg font-medium mb-3">
                  Services
                </h3>
                <div className="md:space-y-3 space-y-1 text-[#FFFFFF] opacity-[60%]">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Asset Management
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Corporate Advisory
                  </motion.div>
                </div>
              </motion.div>

              {/* Legal Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="md:text-xl text-lg font-medium mb-3">Legal</h3>
                <div className="md:space-y-3 space-y-1 text-[#FFFFFF] opacity-[60%]">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Terms and Conditions
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </motion.div>
                </div>
              </motion.div>

              {/* Connect Section */}
              <motion.div
                variants={itemVariants}
                className="space-y-4 flex flex-col md:items-end justify-start"
              >
                <h3 className="md:text-xl text-lg font-medium mb-3">
                  Connect with us
                </h3>
                <div className="flex space-x-4">
                  {" "}
                  {/* Increased spacing */}
                  <motion.a
                    href="https://in.linkedin.com/company/nine-rivers-capital"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors" // Increased size
                  >
                    <svg
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20.7969" cy="20.9473" r="20" fill="#7E79EA" />
                      <path
                        d="M26.4452 14.2794H15.1519C15.0249 14.2776 14.8989 14.3009 14.7809 14.3478C14.663 14.3948 14.5554 14.4645 14.4644 14.5531C14.3734 14.6416 14.3007 14.7472 14.2505 14.8638C14.2003 14.9804 14.1736 15.1058 14.1719 15.2327V26.6594C14.1736 26.7863 14.2003 26.9117 14.2505 27.0283C14.3007 27.1449 14.3734 27.2505 14.4644 27.339C14.5554 27.4276 14.663 27.4973 14.7809 27.5443C14.8989 27.5912 15.0249 27.6145 15.1519 27.6127H26.4452C26.5722 27.6145 26.6982 27.5912 26.8162 27.5443C26.9341 27.4973 27.0417 27.4276 27.1327 27.339C27.2237 27.2505 27.2964 27.1449 27.3465 27.0283C27.3967 26.9117 27.4235 26.7863 27.4252 26.6594V15.2327C27.4235 15.1058 27.3967 14.9804 27.3465 14.8638C27.2964 14.7472 27.2237 14.6416 27.1327 14.5531C27.0417 14.4645 26.9341 14.3948 26.8162 14.3478C26.6982 14.3009 26.5722 14.2776 26.4452 14.2794ZM18.1919 25.4394H16.1919V19.4394H18.1919V25.4394ZM17.1919 18.5994C16.9161 18.5994 16.6515 18.4898 16.4565 18.2948C16.2614 18.0997 16.1519 17.8352 16.1519 17.5594C16.1519 17.2836 16.2614 17.019 16.4565 16.824C16.6515 16.629 16.9161 16.5194 17.1919 16.5194C17.3383 16.5028 17.4867 16.5173 17.6271 16.562C17.7676 16.6067 17.897 16.6805 18.007 16.7787C18.1169 16.8769 18.2049 16.9972 18.2651 17.1317C18.3254 17.2662 18.3565 17.412 18.3565 17.5594C18.3565 17.7068 18.3254 17.8525 18.2651 17.9871C18.2049 18.1216 18.1169 18.2419 18.007 18.3401C17.897 18.4383 17.7676 18.5121 17.6271 18.5568C17.4867 18.6015 17.3383 18.616 17.1919 18.5994ZM25.4052 25.4394H23.4052V22.2194C23.4052 21.4127 23.1185 20.8861 22.3919 20.8861C22.167 20.8877 21.948 20.9582 21.7644 21.0882C21.5809 21.2181 21.4415 21.4012 21.3652 21.6127C21.313 21.7694 21.2904 21.9344 21.2985 22.0994V25.4327H19.2985V19.4327H21.2985V20.2794C21.4802 19.9641 21.7445 19.7044 22.0628 19.5282C22.3812 19.352 22.7416 19.266 23.1052 19.2794C24.4385 19.2794 25.4052 20.1394 25.4052 21.9861V25.4394Z"
                        fill="white"
                      />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/nineriverscapital/"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <circle cx="20" cy="20" r="20" fill="#7E79EA" />
                      <rect
                        x="10"
                        y="10"
                        width="20"
                        height="20"
                        fill="url(#pattern0_365_1276)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_365_1276"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_365_1276"
                            transform="scale(0.02)"
                          />
                        </pattern>
                        <image
                          id="image0_365_1276"
                          width="50"
                          height="50"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACXklEQVR4nO2ZTU4UQRSAe9ZO9A6KAoaF/OjGC5h4ApQ7uGJE3CCwd6+gCf4kEwNq4kITYMW4V08Awh1oInzkJc9YKaelqnq6qyT9JZNMZvpV9Zepeu9NdZY1NDQ09AOYApaBr8BPIKc8uY7VA5aAiawqgJvANvXRA24PWuIBcEz9nAALQKusQAtYJT4rpWSAx6TDXKjErUjLqQi5l8kQkTo39m8Ogc/AfsH3W74Sk8Thjs5/CTgouMY9NWsuj8FF4x6+FFyz6CMixS4GT0UGuPuPQtvzEdkrcTNyA11gGhgGLuhrWD/rluwGdn1EQidaBy47jH8F2AicI/cRCUmNs84T/JmnE5LiswpF/pIArgOPgJf6kvejBTJJiKxbsZI632qfZCOfvTGzk8a8jy2Sm3tCJX44xH23Uu0QcBRTpGvFyS/hyisr9l1MkWlrT/RbTkWcmHsGuB9T5JoRM0+JjlbrTDSRthEjmcmXVSO+nYrIiwCRFSNeWpNoIudmad0zYkY9N7tU9BEjfial9CvFzpW1lNJvLg2gtc6l2J3FN6sgXo1dEIUNK1ZkXhcsM1lOa5aEnNR8xIOsIhGh02cM2TMPjaaxY+4J47o538myCkWO+8mcMUdLRStt43PCkC52yGF82RMf6vhjtUc4R5qBpHca0Yrd1qU2o985b+yyf3VjHT64sOMjski6LPwPB3Qu3HAWUZlN0mPbS8J4MpXSIfYvYNxbRGXk5CMVZoMkjKL1PLYB8CxYIqVHb9kgAcaATzVKbFb9dHdc68yOdgCDejwtY8mYT4I3dUNDw/nnFG5RY3M84bRLAAAAAElFTkSuQmCC"
                        />
                      </defs>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://x.com/9RiversCapital"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                  >
                    <svg
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="20.7969" cy="20.9473" r="20" fill="#7E79EA" />
                      <g clipPath="url(#clip0_781_795)">
                        <path
                          d="M25.3975 13.7168H27.8509L22.4909 19.8435L28.7969 28.1788H23.8595L19.9929 23.1228L15.5675 28.1788H13.1129L18.8462 21.6255L12.7969 13.7175H17.8595L21.3549 18.3388L25.3975 13.7168ZM24.5369 26.7108H25.8962L17.1209 15.1081H15.6622L24.5369 26.7108Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_781_795">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(12.7969 12.9473)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Officer Information */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.7fr_0.7fr_2fr] xl:grid-cols-[0.9fr_0.9fr_1.9fr] gap-8 mb-8 md:mb-0">
              {/* Principal Officer */}
              <motion.div
                variants={itemVariants}
                className="md:space-y-3 space-y-1"
              >
                {" "}
                {/* Increased spacing */}
                <h4 className="md:text-xl text-lg font-medium mb-3">
                  Principal Officer
                </h4>
                <div className="text-[#FFFFFF] opacity-[60%] space-y-2">
                  {" "}
                  {/* Increased spacing */}
                  <p>Sandeep Daga</p>
                  <p>sandeep@ninriverscapital.com</p>
                  <p>+91 22 4063 2801</p>
                </div>
              </motion.div>

              {/* Compliance Officer 1 */}
              <motion.div
                variants={itemVariants}
                className="md:space-y-3 space-y-1"
              >
                <h4 className="md:text-xl text-lg font-medium mb-3">
                  Compliance Officer
                </h4>
                <div className="text-[#FFFFFF] opacity-[60%] space-y-2">
                  <p>Sandhya Kabra</p>
                  <p>sandhya@ninriverscapital.com</p>
                  <p>+91 22 4063 2816</p>
                </div>
              </motion.div>

              {/* Compliance Officer 2 */}
              <motion.div
                variants={itemVariants}
                className="md:space-y-3 space-y-1 md:col-span-2 lg:col-span-1"
              >
                <h4 className="md:text-xl text-lg font-medium mb-3">
                  Registered as:
                </h4>
                <div className="text-[#FFFFFF] opacity-[60%] space-y-2 text-base">
                  <p>
                    Corporate Identification Number(CIN): U65993MH2007PTC175592
                  </p>
                  <p>1. Portfolio Manager Registration Number INP000004169</p>
                  <p>
                    2. Aurum SME Fund I - CAT I with Registration Number
                    IN/AIF1/18-19/0641
                  </p>
                  <p>
                    3. Aurum Rising India Fund – CAT II with Registration Number
                    IN/AIF2/24-25/1630
                  </p>
                  <p className="mt-4 leading-6">
                    {" "}
                    {/* Increased margin and line height */}
                    Investment in securities market are subject to market risks.
                    Read all the related documents carefully before investing.
                    Registration granted by SEBI and certification of NISM is in
                    no way a guarantee of performance of the intermediary nor
                    provides any assurance of returns to investors.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="mb-12 md:mt-8 lg:-mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
            >
              {" "}
              {/* Increased margin */}
              <div className="flex items-start space-x-2 md:space-x-4">
                {" "}
                {/* Increased spacing */}
                <div>
                  <div className="flex flex-row mb-3 space-x-1 items-center">
                    <Location />
                    <h4 className="md:text-xl text-lg font-medium">Location</h4>
                  </div>{" "}
                  {/* Increased margin */}
                  <div className="text-[#FFFFFF] opacity-[60%] space-y-1">
                    <p>509-510, Meadows, Sahar Plaza,</p>
                    <p>Andheri-Kurla Road, Andheri (East),</p>
                    <p>Mumbai - 400 059, India.</p>
                    <p>Landmark: Near J.B. Nagar Metro</p>
                    <p>Station.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-[#FFFFFF] text-base">
                {" "}
                {/* Made responsive */}
                <motion.span
                  whileHover={{ color: "#ffffff" }}
                  className="cursor-pointer underline opacity-[60%]"
                >
                  <Link href={'/disclaimer'}>
                  
                  Disclaimer
                  </Link>
                </motion.span>
                <motion.span
                  whileHover={{ color: "#ffffff" }}
                  className="cursor-pointer underline opacity-[60%]"
                >
                  <Link href={'/disclosure'}>
                  
                  Disclosure
                  </Link>
                </motion.span>
              </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              variants={itemVariants}
              className="border-t border-purple-400/30 pt-8"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-1 md:space-y-3 lg:space-y-0 lg:space-x-8 text-[#FFFFFF] opacity-[60%] text-sm md:text-base text-center lg:text-left">
                {" "}
                {/* Increased spacing and added text alignment */}
                <p>
                  Copyright 2025, Nine Rivers Capital Holdings Pvt. Ltd. | Nine
                  Rivers Capital Advisors LLP
                </p>
                <Link
                  target="_blank"
                  href={"https://www.theinternetcompany.one/"}
                >
                  Designed & Developed by TIC
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.footer>
      </Container>
    </div>
  );
};

export default Footer;