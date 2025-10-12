'use client'

import React, { useState } from "react";
import FlexibleHeading from "../ui/FlexibleHeading";
import Image from "next/image";
import AnimatedButton from "../ui/animatedButton";
import Container from "../Reusable/Container";
import {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
  Row1Col1,
  Row3,
  Row4Col1,
  Row5Col2
} from "@/assets/AIF";
import LogoScroll from "./LogoScroll";
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion"

interface CardData {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
  highlights?: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  type: "fund" | "investment" | "snapshot" | "why-invest";
  backgroundColor?: string;
}

interface TwoDistinctProps {
  className?: string;
}

const Card: React.FC<{ card: CardData; className?: string }> = ({
  card,
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden p-6 text-white ${className}`}
      style={{
        backgroundImage: card.backgroundImage
          ? `url(${card.backgroundImage})`
          : "none",
        backgroundColor: card.backgroundColor || "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-2 leading-tight">
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="text-sm lg:text-base text-gray-200 mb-4">
              {card.subtitle}
            </p>
          )}
          <p className="text-sm lg:text-base text-gray-100 mb-4">
            {card.description}
          </p>
        </div>

        {/* Highlights Section */}
        {card.highlights && card.highlights.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-3">Key Highlights</h4>
            <ul className="space-y-2">
              {card.highlights.map((highlight, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics Section */}
        {card.metrics && card.metrics.length > 0 && (
          <div className="mt-4 space-y-2">
            {card.metrics.map((metric, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-200">{metric.label}:</span>
                <span className="font-semibold">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Special content for different card types */}
        {card.type === "snapshot" && (
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-lg">$</span>
              </div>
              <h4 className="text-lg font-semibold">Fund Snapshot</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                • Fund Name: Aurum Rising India Fund (Cat II) - A Scheme of Nine
                Rivers AIF One Trust
              </p>
              <p>
                • Target Size: INR 300 Crores with a green-shoe option of up to
                INR 150 crores
              </p>
              <p>• Commitments Closed: INR 300 Crores</p>
              <p>• Investor Profile: UHNIs & Family Offices</p>
            </div>
          </div>
        )}

        {card.type === "why-invest" && (
          <div className="mt-4">
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">?</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TwoDistinctComponent: React.FC<TwoDistinctProps> = ({
  className = "",
}) => {

  const [showPortfolio, setShowPortfolio] = useState(false);
  const LogoList = [
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
    Logo7,
    Logo8,
    Logo9,
  ]

  return (
    <Container disableYSpacing className={`w-full mx-auto mb-32 md:pt-12 lg:pt-0 lg:mb-40  ${className}`}>

      {/* desktop */}
      <FlexibleHeading
        title="Two Distinct Strategies to <br/> Capitalize on India's Potential"
        maxWidth="max-w-xl"
        alignment="center"
        highlights={{
          "Capitalize on India's Potential": "text-primary",
        }}
        className="lg:block hidden"
      />

      {/* desktop */}
      <FlexibleHeading
        title="Two Distinct Strategies <br/> to Capitalize on India's <br/> Potential"
        maxWidth="max-w-xl"
        alignment="center"
        highlights={{
          "Capitalize on India's": "text-primary",
          "Potential": "text-primary",
        }}
        className="lg:hidden"
      />

      <div className="grid lg:grid-cols-2 lg:gap-x-5 gap-y-4 lg:gap-y-0">

        {/* Row1Col1 */}
        <div className="relative rounded-2xl h-[373px] lg:h-auto">
          <Image src={Row1Col1} alt="Aurum_SME_Fund_I" className="rounded-2xl h-full" />
          <div className="absolute bottom-0 left-0 text-white pl-6 pb-6">
            <h1 className="md:text-2xl md:leading-9 text-[20px] leading-7 font-normal mb-2 md:mb-0">Aurum SME Fund I (Category I AIF) -<br />Closed to Investors</h1>
            <p className="md:text-base text-sm leading-4 md:leading-6 font-normal text-[#C4BEBE]">A close-ended fund focused on early-stage companies in sunrise sectors.</p>
          </div>
        </div>

        {/* Row1Col2 */}
        <div className="bg-[#F3F3F5]  rounded-2xl px-6 py-6 flex flex-col justify-between items-start h-[506px] md:h-auto">
          <h1 className="text-2xl leading-9 font-normal">Key Highlights</h1>
          <ul className="text-base leading-8 font-normal space-y-2 text-[#484848]">
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Invests in listed SME board companies</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Targeting high-growth potential with a focus on profitability and scalability</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Vintage: March 2023</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Performance as of July 31, 2025:</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Multiple on Invested Capital (MOIC): 1.62x</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Total Value to Paid-in Capital (TVPI): 1.48x</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-[5px] h-[5px] bg-[#484848] rounded-full"></span>
              <span>Internal Rate of Return (XIRR): 29.75%</span>
            </li>
          </ul>


          <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 mt-3 md:justify-center md:items-center">
            <AnimatedButton
              label="Download Brochure"
              variant="default"
            />
            <AnimatedButton
              label="View Portfolio"
              variant="outline"
              onClick={() => setShowPortfolio(!showPortfolio)}
              className="border border-[#070708] shadow-[inset_0_4px_4px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              height: { duration: 0.4 }
            }}
            style={{ overflow: "hidden" }}
          >
            <LogoScroll logos={LogoList} />
          </motion.div>
        )}
      </AnimatePresence>


      {/* Row3 */}
      <div className={`relative rounded-2xl overflow-hidden h-[373px] lg:h-auto ${showPortfolio ? ` mt-0` : ` mt-8`}`}>
        <Image src={Row3} alt="Aurum_SME_Fund_I" className="h-full" />
        <div className="absolute bottom-0 left-0 text-white pl-6 pb-6">
          <h1 className="md:text-2xl md:leading-9 text-[20px] leading-7 font-normal w-[85%] md:w-auto mb-2 md:mb-0">Aurum Rising India Fund (Category II AIF) - Green Shoe Open</h1>
          <p className="md:text-base text-sm leading-4 md:leading-6 font-normal text-[#C4BEBE]">An open-ended fund investing in unlisted and listed companies with medium to late-stage growth.</p>
        </div>
      </div>


      {/* Row4 */}
      <div className="grid lg:grid-cols-2 mt-6 md:mt-8 gap-x-5 ">
        <div className="grid grid-cols-1 gap-y-5">
          {/* row1col1 */}
          <div className="bg-[#F3F3F5] rounded-2xl px-6 pt-8 h-[538px] overflow-hidden">
            <h1 className="text-2xl leading-9 font-normal mb-2 md:mb-0">
              <span className="text-primary">Investment</span> Focus
            </h1>
            <ul className="list-disc list-outside ml-5 text-base font-normal md:space-y-2 text-[#484848] leading-8 marker:text-[#484848]">
              <li className="pl-2">Primary Allocation: Unlisted medium to late-stage, pre-IPO, high-growth companies</li>
              <li className="pl-2">SME Board / PIPE Deals: Identify companies early in their growth cycle</li>
              <li className="pl-2">Opportunistic Special Situations: Seeking opportunities that offer disproportionate value unlocking</li>
            </ul>

            <Image src={Row4Col1} alt="Row4Col1" className="" width={433} height={330} />
          </div>

          {/* row2col1 */}
          <div className="bg-[#E1E1ED] rounded-2xl px-6 pt-8 lg:h-[285px] relative">
            <h1 className="text-2xl leading-9 font-normal mb-2 md:mb-0">
              Why <span className="text-primary">Invest</span>
            </h1>
            <ul className="list-disc list-outside ml-5 text-base font-normal md:space-y-2 text-[#484848] leading-8 marker:text-[#484848] pr-4 pb-8 lg:pb-0">
              <li className="pl-2">Capitalize on India&apos;s high-growth potential in the manufacturing sector</li>
              <li className="pl-2">Access to unique, early-stage growth companies.</li>
              <li className="pl-2">Benefit from the government&apos;s initiatives to support economic growth.</li>
              <li className="pl-2">Leverage NRC&apos;s proven track record in small-cap investing.</li>
            </ul>

            <svg width="96" height="154" className="absolute bottom-6 right-7 hidden lg:block" viewBox="0 0 96 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.666 1.44727C57.9357 1.44729 65.5401 2.70076 71.5 5.18359C77.3027 7.60084 81.8965 10.6268 85.3018 14.2568L85.6279 14.6104C88.8565 18.1766 91.1656 22.0484 92.5645 26.2383L92.832 27.0811C94.199 31.6338 94.8865 35.9527 94.8867 40.04C94.8867 43.8836 94.3437 47.4227 93.2744 50.667L93.0537 51.3125C91.8292 54.764 90.2813 57.9474 88.4121 60.8789C86.539 63.8166 84.3694 66.5992 81.915 69.2471C79.4451 71.9119 77.046 74.4252 74.7256 76.7861C72.9753 78.5669 71.1539 80.456 69.2617 82.4609C67.5854 84.224 66.0572 86.0767 64.668 88.0137L64.0811 88.8496C62.5346 91.1037 61.2383 93.4627 60.208 95.9404C59.1678 98.4418 58.6416 100.988 58.6416 103.574V106.242C58.6416 107.201 58.6882 108.07 58.7852 108.852H30.6963L26.252 105.857H30.5791L30.5469 105.327C30.5266 105.001 30.509 104.672 30.4961 104.336L30.4951 104.334L30.4463 102.999C30.4055 101.713 30.3897 100.573 30.3896 99.5752C30.3896 95.4716 30.8893 91.7834 31.8955 88.5059V88.5049C32.9012 85.2062 34.2298 82.1325 35.8867 79.2822V79.2812C37.5404 76.4173 39.4545 73.7447 41.6162 71.2441L41.6172 71.2451C43.792 68.7366 46.0445 66.2997 48.3613 63.9424C51.7176 60.5274 54.7833 57.1469 57.5645 53.8018L57.5654 53.8008C60.3957 50.379 61.8232 46.456 61.8232 42.043C61.8232 38.341 60.418 35.1806 57.6279 32.5664V32.5654L57.3594 32.3232C54.5508 29.8542 50.5348 28.6563 45.3896 28.6562C40.1022 28.6562 35.1094 29.3276 30.4062 30.6719H30.4053C25.752 32.0072 20.6133 34.138 14.9912 37.0586L10.3545 35.7012L13.5732 33.1045L13.8516 32.8799L13.7285 32.5439L6.47559 12.7012C12.03 9.13743 18.561 6.37749 26.085 4.4248C33.7578 2.43884 41.2847 1.44727 48.666 1.44727Z" stroke="#6A48E8" />
              <path d="M39.2881 27.7459C34.1048 27.7459 29.2165 28.3897 24.6161 29.6775C20.0086 30.9722 14.9026 33.0507 9.29779 35.913L0.230469 11.6218C5.84219 8.03862 12.4583 5.28129 20.0859 3.34266C27.7064 1.41114 35.1864 0.445312 42.5259 0.445312C51.7266 0.445312 59.3121 1.66303 65.282 4.09846C71.252 6.53389 75.9647 9.61312 79.4203 13.3433C82.8688 17.0734 85.2778 21.1535 86.6474 25.5974C88.0099 30.0413 88.6983 34.2684 88.6983 38.2785C88.6983 42.2955 88.0802 45.9836 86.8581 49.3499C85.636 52.7231 84.0909 55.8374 82.2227 58.7067C80.3545 61.576 78.1912 64.2914 75.747 66.8738C73.3029 69.4562 70.929 71.8916 68.6322 74.1801C66.9044 75.9017 65.1065 77.7282 63.2381 79.6668C61.3628 81.5984 59.6773 83.6419 58.1671 85.7904C56.6571 87.9459 55.3929 90.1993 54.3885 92.5648C53.3842 94.9302 52.8785 97.3306 52.8785 99.7661C52.8785 100.34 52.8785 101.201 52.8785 102.348C52.8785 103.496 52.9487 104.497 53.0962 105.358H24.6161C24.3211 103.923 24.1455 102.313 24.0752 100.522C23.998 98.7303 23.9698 97.1907 23.9698 95.896C23.9698 91.886 24.4685 88.2678 25.4798 85.0416C26.4842 81.8154 27.8116 78.806 29.4692 76.0137C31.1197 73.2144 33.03 70.6039 35.1863 68.1615C37.3425 65.7261 39.5759 63.3607 41.8727 61.0722C45.1808 57.776 48.2009 54.5147 50.94 51.2885C53.6651 48.0623 55.0347 44.3741 55.0347 40.2171C55.0347 36.7738 53.7072 33.8416 51.0454 31.3992C48.3834 28.9637 44.4644 27.7459 39.2881 27.7459Z" fill="#6A48E8" />
              <path d="M33.7812 125.617C38.8095 121.389 46.2555 120.448 52.1357 123.412C57.357 126.044 60.833 131.385 60.833 137.225C60.833 142.283 59.1955 146.125 55.9658 148.831V148.832C52.6888 151.583 48.9997 152.944 44.876 152.944C40.7465 152.944 37.0572 151.583 33.7803 148.832V148.831C30.5562 146.125 28.919 142.283 28.9189 137.225C28.9189 132.172 30.5563 128.329 33.7812 125.617Z" stroke="#6A48E8" />
              <path d="M55.6951 137.224C55.6951 142.401 54.0131 146.396 50.6491 149.214C47.2852 152.038 43.4835 153.444 39.2382 153.444C34.9872 153.444 31.1854 152.038 27.8214 149.214C24.4632 146.396 22.7812 142.401 22.7812 137.224C22.7812 132.053 24.4632 128.058 27.8214 125.234C31.1854 122.416 34.987 121.004 39.2382 121.004C43.4835 121.004 47.2852 122.416 50.6491 125.234C54.0131 128.058 55.6951 132.053 55.6951 137.224Z" fill="#6A48E8" />
            </svg>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-y-5 mt-5 lg:mt-0">
          {/* row1col2 */}
          <div className="px-8 pb-8 rounded-2xl bg-[#C5C3FE] lg:h-[373px] flex flex-col justify-between">

            <svg width="51" height="51" className="mt-8" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.2303 15.7461C19.9303 15.7461 15.5303 20.0461 15.5303 25.4461C15.5303 30.7461 19.8303 35.1461 25.2303 35.1461C30.6303 35.1461 34.9303 30.8461 34.9303 25.4461C34.9303 20.1461 30.5303 15.7461 25.2303 15.7461ZM25.2303 24.4461C27.2303 24.4461 28.9303 26.0461 28.9303 28.1461C28.9303 29.8461 27.8303 31.2461 26.2303 31.6461V32.2461C26.2303 32.8461 25.8303 33.2461 25.2303 33.2461C24.6303 33.2461 24.2303 32.8461 24.2303 32.2461V31.6461C22.7303 31.2461 21.5303 29.8461 21.5303 28.1461C21.5303 27.5461 21.9303 27.1461 22.5303 27.1461C23.1303 27.1461 23.5303 27.5461 23.5303 28.1461C23.5303 29.0461 24.2303 29.8461 25.2303 29.8461C26.2303 29.8461 26.9303 29.1461 26.9303 28.1461C26.9303 27.1461 26.1303 26.4461 25.2303 26.4461C23.2303 26.4461 21.5303 24.8461 21.5303 22.7461C21.5303 21.0461 22.6303 19.6461 24.2303 19.2461V18.6461C24.2303 18.0461 24.6303 17.6461 25.2303 17.6461C25.8303 17.6461 26.2303 18.0461 26.2303 18.6461V19.2461C27.7303 19.6461 28.9303 21.0461 28.9303 22.7461C28.9303 23.3461 28.5303 23.7461 27.9303 23.7461C27.3303 23.7461 26.9303 23.3461 26.9303 22.7461C26.9303 21.8461 26.2303 21.0461 25.2303 21.0461C24.2303 21.0461 23.5303 21.7461 23.5303 22.7461C23.5303 23.7461 24.3303 24.4461 25.2303 24.4461Z" fill="#6A48E8" />
              <path d="M41.5307 25.4445C41.5307 16.4445 34.2307 9.14453 25.2307 9.14453C16.2307 9.14453 8.93066 16.4445 8.93066 25.4445C8.93066 34.4445 16.2307 41.7445 25.2307 41.7445C34.2307 41.7445 41.5307 34.4445 41.5307 25.4445ZM25.2307 37.1445C18.8307 37.1445 13.5307 31.9445 13.5307 25.4445C13.5307 19.0445 18.7307 13.7445 25.2307 13.7445C31.7307 13.7445 36.9307 19.0445 36.9307 25.4445C36.9307 31.8445 31.6307 37.1445 25.2307 37.1445Z" fill="#6A48E8" />
              <path d="M1.23047 14.9453C1.83047 14.9453 2.23047 14.5453 2.23047 13.9453V2.44531H13.7305C14.3305 2.44531 14.7305 2.04531 14.7305 1.44531C14.7305 0.845312 14.3305 0.445312 13.7305 0.445312H1.23047C0.630469 0.445312 0.230469 0.845312 0.230469 1.44531V13.9453C0.230469 14.4453 0.630469 14.9453 1.23047 14.9453Z" fill="#6A48E8" />
              <path d="M13.7305 48.4453H2.23047V36.9453C2.23047 36.3453 1.83047 35.9453 1.23047 35.9453C0.630469 35.9453 0.230469 36.3453 0.230469 36.9453V49.4453C0.230469 50.0453 0.630469 50.4453 1.23047 50.4453H13.7305C14.3305 50.4453 14.7305 50.0453 14.7305 49.4453C14.7305 48.8453 14.2305 48.4453 13.7305 48.4453Z" fill="#6A48E8" />
              <path d="M49.2305 0.445312H36.7305C36.1305 0.445312 35.7305 0.845312 35.7305 1.44531C35.7305 2.04531 36.1305 2.44531 36.7305 2.44531H48.2305V13.9453C48.2305 14.5453 48.6305 14.9453 49.2305 14.9453C49.8305 14.9453 50.2305 14.5453 50.2305 13.9453V1.44531C50.2305 0.845312 49.8305 0.445312 49.2305 0.445312Z" fill="#6A48E8" />
              <path d="M49.2305 35.9453C48.6305 35.9453 48.2305 36.3453 48.2305 36.9453V48.4453H36.7305C36.1305 48.4453 35.7305 48.8453 35.7305 49.4453C35.7305 50.0453 36.1305 50.4453 36.7305 50.4453H49.2305C49.8305 50.4453 50.2305 50.0453 50.2305 49.4453V36.9453C50.2305 36.4453 49.8305 35.9453 49.2305 35.9453Z" fill="#6A48E8" />
            </svg>


            <div className="mt-2 lg:mt-0">
              <h1 className="text-2xl leading-9 font-normal mb-2">
                Fund <span className="text-primary">Snapshot</span>
              </h1>
              <ul className="list-disc list-outside ml-5 text-base font-normal lg:space-y-1 text-[#484848] leading-8">
                <li className="pl-2">Fund Name: Aurum Rising India Fund (Cat II) - A Scheme of Nine Rivers AIF One Trust</li>
                <li className="pl-2">Target Size: INR 300 Crores with a green-shoe option of up to INR 150 crores</li>
                <li className="pl-2">Commitments Closed: INR 300 Crores</li>
                <li className="pl-2">Investor Profile: UHNIs & Family Offices</li>
              </ul>
            </div>
          </div>

          {/* row2col2 */}
          <div className="lg:h-[450px] lg:block hidden">
            <Image src={Row5Col2} alt="Row5Col2" className="h-full" width={653} height={450} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TwoDistinctComponent;
