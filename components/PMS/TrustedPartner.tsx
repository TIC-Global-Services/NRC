"use client";

import { useState, useEffect } from "react";
import Container from "../Reusable/Container";
import AnimatedButton from "../ui/animatedButton";
import SlideUpText from "../ui/SlideUpText";
import {
  fetchPortfolioData as fetchPMSData,
  PortfolioRow,
  getDisplayData,
  sortDataChronologically,
} from "@/lib/config/PmsSheetConfig";

import {
  fetchPortfolioData as fetchASCOData,
} from "@/lib/config/HomeSheetConfig";

import { PMSAnimatedChart } from "../Reusable/Charts/PMSAnimatedChart";
import { AnimatedChart } from "../Reusable/Charts/HomeAnimatedChart";
import FlexibleHeading from "../ui/FlexibleHeading";

export default function TrustedPartner() {
  const [selectedFund, setSelectedFund] = useState("Aurum Multiplier Fund (AMP)");
  const [ampData, setAmpData] = useState<PortfolioRow[]>([]);
  const [ascoData, setAscoData] = useState<PortfolioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fundOptions = [
    "Aurum Small Cap Opportunities (ASCO)",
    "Aurum Multiplier Fund (AMP)",
  ];

  // Fetch AMP data on mount (default selection)
  useEffect(() => {
    const loadAMPData = async () => {
      try {
        setLoading(true);
        const data = await fetchPMSData();
        const sortedData = sortDataChronologically(data);
        setAmpData(sortedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching AMP data:", err);
        setError("Failed to load AMP data");
      } finally {
        setLoading(false);
      }
    };

    loadAMPData();
  }, []);

  // Fetch ASCO data when that fund is selected
  useEffect(() => {
    if (selectedFund === "Aurum Small Cap Opportunities (ASCO)" && ascoData.length === 0) {
      const loadASCOData = async () => {
        try {
          setLoading(true);
          const data = await fetchASCOData();
          const sortedData = sortDataChronologically(data);
          setAscoData(sortedData);
          setError(null);
        } catch (err) {
          console.error("Error fetching ASCO data:", err);
          setError("Failed to load ASCO data");
        } finally {
          setLoading(false);
        }
      };

      loadASCOData();
    } else if (selectedFund === "Aurum Multiplier Fund (AMP)" && ampData.length > 0) {
      // If switching back to AMP and data already exists, just stop loading
      setLoading(false);
    }
  }, [selectedFund, ascoData.length, ampData.length]);

  // Transform portfolio data for the chart with proper smart sampling
  const getChartData = () => {
    let portfolioData: PortfolioRow[] = [];

    if (selectedFund === "Aurum Multiplier Fund (AMP)") {
      portfolioData = ampData;
    } else if (selectedFund === "Aurum Small Cap Opportunities (ASCO)") {
      portfolioData = ascoData;
    }

    if (!portfolioData || portfolioData.length === 0) {
      return {
        title: selectedFund === "Aurum Small Cap Opportunities (ASCO)"
          ? "NRC Aurum SmallCap Portfolio Performance"
          : "Portfolio Performance vs Benchmark",
        benchmarkLabel: "S&P BSE 500 TR",
        data: [],
        benchmarkData: [],
      };
    }

    // Apply smart sampling to get optimal display data (max 20 points)
    const maxDisplayPoints = 20;
    const sampledData = getDisplayData(portfolioData, maxDisplayPoints, 'optimal');

    // Convert sampled data for chart
    const chartData = sampledData.map((row, index) => ({
      month: row.month,
      value: row.portfolio,
      percentage: index === sampledData.length - 1 ? row.portfolio : undefined,
    }));

    const benchmarkData = sampledData.map((row) => ({
      month: row.month,
      value: row.benchmark,
    }));

    return {
      title: selectedFund === "Aurum Small Cap Opportunities (ASCO)"
        ? "NRC Aurum SmallCap Portfolio Performance"
        : "Aurum Multiplier Portfolio Performance",
      benchmarkLabel: "S&P BSE 500 TR",
      data: chartData,
      benchmarkData: benchmarkData,
    };
  };

  return (
    <Container className="bg-[#F6F9FC]">
      <div className=" mx-auto">
        <div className="grid lg:grid-cols-[0.45fr_0.55fr] md:items-center items-start">
          {/* LEFT SIDE - Static with 'once' animation */}
          <div className=" lg:max-w-md max-w-md md:max-w-full">
            <div className="mt-4">
              {/* desktop */}
              <FlexibleHeading
                title="A Proven Journey<br/> A Trusted Partner."
                description="For more than a decade, our PMS has delivered differentiated
                    returns through market cycles — not by chasing trends, but
                    by backing scalable businesses early."
                alignment="left"
                mobileAlignment="center"
                highlights={{
                  "A Trusted Partner.": "text-primary",
                }}
                isMB={false}
                className="md:hidden lg:block"
              />

              {/* tablet */}
              <FlexibleHeading
                title="A Proven Journey A Trusted Partner."
                description="For more than a decade, our PMS has delivered differentiated
                    returns through market cycles — not by chasing trends, but
                    by backing scalable businesses early."
                alignment="left"
                highlights={{
                  "A Trusted Partner.": "text-primary",
                }}
                isMB={false}
                className="md:block lg:hidden hidden"
              />

              {/* Fund selector buttons - Desktop */}
              <div className="hidden lg:block md:mb-6 md:mt-6">
                <div className="space-y-3">
                  {fundOptions.map((fund, index) => (
                    <button
                      key={fund}
                      onClick={() => setSelectedFund(fund)}
                      className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg leading-[33px] text-lg transition-all duration-300 ${
                        selectedFund === fund
                          ? "bg-[#F6F9FC] text-black border border-[#ECF0F4]"
                          : "opacity-20 hover:opacity-40"
                      }`}
                    >
                      <span className="font-medium">
                        <SlideUpText
                          animationMode="once"
                          delay={0.3 + index * 0.1}
                        >
                          {fund}
                        </SlideUpText>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* tablet only */}
              <div className="hidden md:block lg:hidden md:mb-6 md:mt-6">
                <div className="space-y-3">
                  {fundOptions.map(
                    (fund, index) =>
                      fund === selectedFund && (
                        <button
                          key={fund}
                          onClick={() => setSelectedFund(fund)}
                          className={`w-full cursor-pointer text-center px-4 py-3 rounded-lg leading-[33px] text-lg transition-all duration-300 ${
                            selectedFund === fund
                              ? "bg-[#F0F2F4] text-black border border-[#A3A6AA]"
                              : "opacity-20 hover:opacity-40"
                          }`}
                        >
                          <span className="font-medium ">
                            <SlideUpText
                              animationMode="once"
                              delay={0.3 + index * 0.1}
                            >
                              {fund}
                            </SlideUpText>
                          </span>
                        </button>
                      )
                  )}
                </div>
              </div>

              {/* mobile only */}
              <div className="mt-6 md:mt-0 md:hidden flex  flex-row items-center justify-center mx-auto">
                <AnimatedButton
                  isBtnScale={false}
                  label="Detailed Performance Data"
                />
              </div>

              {/* desktop only */}
              <div className="mt-6 lg:block hidden">
                <SlideUpText animationMode="once" delay={0.5}>
                  <AnimatedButton
                    isBtnScale={false}
                    label="Detailed Performance Data"
                  />
                </SlideUpText>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Chart area */}
          <div className="mt-4 md:mt-12 mb-12 md:mb-0">
            {/* Fund selector buttons - Mobile */}
            <div className=" md:hidden mb-6">
              <div className="space-y-3">
                {fundOptions.map(
                  (fund, index) =>
                    fund === selectedFund && (
                      <button
                        key={fund}
                        onClick={() => setSelectedFund(fund)}
                        className={`w-full cursor-pointer text-center px-4 py-3 rounded-lg leading-[33px] text-lg transition-all duration-300 ${
                          selectedFund === fund
                            ? "bg-[#F0F2F4] text-black border border-[#A3A6AA]"
                            : "opacity-20 hover:opacity-40"
                        }`}
                      >
                        <span className="font-medium ">
                          <SlideUpText
                            animationMode="once"
                            delay={0.3 + index * 0.1}
                          >
                            {fund}
                          </SlideUpText>
                        </span>
                      </button>
                    )
                )}
              </div>
            </div>

            {/* Chart with consistent min-height */}
            <div className="w-full">
              {loading ? (
                <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg">
                  <div className="text-gray-500">Loading chart data...</div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg">
                  <div className="text-red-500">{error}</div>
                </div>
              ) : (
                <>
                  {/* Render different chart based on selected fund */}
                  {selectedFund === "Aurum Small Cap Opportunities (ASCO)" ? (
                    <AnimatedChart
                      data={getChartData()}
                      isActive={!loading}
                      maxXAxisPoints={20}
                      showQuarterlyLabels={false}
                    />
                  ) : (
                    <PMSAnimatedChart
                      data={getChartData()}
                      isActive={!loading}
                      maxXAxisPoints={20}
                      showQuarterlyLabels={false}
                    />
                  )}
                </>
              )}
            </div>

            <div className=" lg:hidden md:mb-6 mt-4">
              <div className="space-y-3">
                {fundOptions.map((fund, index) => (
                  <button
                    key={fund}
                    onClick={() => setSelectedFund(fund)}
                    className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg leading-[33px] text-lg transition-all duration-300 ${
                      selectedFund === fund
                        ? "bg-[#F6F9FC] text-black border border-[#ECF0F4]"
                        : "opacity-20 hover:opacity-40"
                    }`}
                  >
                    <span className="font-medium">
                      <SlideUpText
                        animationMode="once"
                        delay={0.3 + index * 0.1}
                      >
                        {fund}
                      </SlideUpText>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* tablet only */}
            <div className="my-6  lg:hidden hidden md:flex  flex-row items-center justify-start mx-auto">
              <AnimatedButton
                isBtnScale={false}
                label="Detailed Performance Data"
              />
            </div>
          </div>

          {/* Mobile description */}
          <div className="max-w-md md:hidden block">
            <p className="md:text-lg text-secondary leading-relaxed md:text-center mb-12">
              <SlideUpText animationMode="once">
                We have consistently delivered strong, risk
                <br className="md:block hidden" />
                -adjusted returns across market cycles.
              </SlideUpText>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}