"use client";

import { useState, useEffect } from "react";
import Badge from "../ui/badge";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import { AnimatedChart } from "../Reusable/Charts/HomeAnimatedChart";
import {
  fetchPortfolioData as fetchASCOData,
  PortfolioRow,
  getDisplayData,
  sortDataChronologically,
} from "@/lib/config/HomeSheetConfig";
import { fetchPortfolioData as fetchAMPData } from "@/lib/config/PmsSheetConfig";
import { AMP } from "../Reusable/Charts/AMP"; 

export default function TrackRecordSection() {
  const [selectedFund, setSelectedFund] = useState(
    "Aurum Small Cap Opportunities (ASCO)"
  );

  // Separate state for each fund's data
  const [ascoData, setAscoData] = useState<PortfolioRow[]>([]);
  const [ampData, setAmpData] = useState<PortfolioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fundOptions = [
    "Aurum Small Cap Opportunities (ASCO)",
    "Aurum Multiplier Fund (AMP)",
    "Aurum SME Trust",
    "Aurum Rising India Fund (ARIF)",
  ];

  // Fetch ASCO data on mount
  useEffect(() => {
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
  }, []);

  // Fetch AMP data when that fund is selected
  useEffect(() => {
    if (
      selectedFund === "Aurum Multiplier Fund (AMP)" &&
      ampData.length === 0
    ) {
      const loadAMPData = async () => {
        try {
          setLoading(true);
          const data = await fetchAMPData();
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
    }
  }, [selectedFund, ampData.length]);

  // Get chart data based on selected fund
  const getChartData = () => {
    let portfolioData: PortfolioRow[] = [];

    if (selectedFund === "Aurum Small Cap Opportunities (ASCO)") {
      portfolioData = ascoData;
    } else if (selectedFund === "Aurum Multiplier Fund (AMP)") {
      portfolioData = ampData;
    }

    if (!portfolioData || portfolioData.length === 0) {
      return {
        title: "Portfolio Performance vs Benchmark",
        benchmarkLabel: "S&P BSE 500 TR",
        data: [],
        benchmarkData: [],
      };
    }

    const maxDisplayPoints = 20;
    const sampledData = getDisplayData(
      portfolioData,
      maxDisplayPoints,
      "optimal"
    );

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
      title: `NRC Aurum SmallCap Portfolio Performance`,
      benchmarkLabel: "S&P BSE 500 TR",
      data: chartData,
      benchmarkData: benchmarkData,
    };
  };

  // Render chart based on selected fund
  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg">
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg">
          <div className="text-red-500">Error loading data</div>
        </div>
      );
    }

    // Render based on selected fund
    switch (selectedFund) {
      case "Aurum Small Cap Opportunities (ASCO)":
        return (
          <AnimatedChart
            data={getChartData()}
            isActive={true}
            maxXAxisPoints={20}
            showQuarterlyLabels={false}
          />
        );

      case "Aurum Multiplier Fund (AMP)":
        return (
          <AMP
            data={getChartData()}
            isActive={true}
            maxXAxisPoints={20}
            showQuarterlyLabels={false}
          />
        );

      case "Aurum SME Trust":
      case "Aurum Rising India Fund (ARIF)":
        return (
          <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-500 text-lg font-medium mb-2">
                {selectedFund}
              </p>
              <p className="text-gray-400 text-sm">Chart data coming soon</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Container
      disablePaddingBottomMobile
      disablePaddingTopMobile
      className="bg-[#F6F9FC] py-12 lg:py-0"
    >
      <section className="">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <div className="max-w-2xl md:hidden block">
              <Badge label="Our Track Record" />
              <h2 className="text-[26px]  mt-4 md:text-5xl font-[400] leading-8 md:leading-[58px] ">
                Focused on Value,
                <br />{" "}
                <span className="text-primary">Powered by Experience</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.45fr_0.55fr] items-end ">
            {/* Desktop */}
            <div className="hidden md:block lg:max-w-md">
              <div className="mb-3">
                <Badge label="Our Track Record" />
                <div className="lg:max-w-2xl mt-4 ">
                  <h2 className="text-[26px] md:text-5xl font-[400] leading-8 md:leading-[58px] md:block hidden">
                    Focused on Value,
                    <br className="hidden lg:block" />{" "}
                    <span className="text-primary">
                      Powered&#160;by&#160;Experience
                    </span>
                  </h2>
                </div>
              </div>
              <p className="text-sm md:text-lg text-secondary leading-6 md:leading-[31px] lg:max-w-lg font-[400] lg:mb-16 md:mb-4">
                <SlideUpText animationMode="always" delay={0.4}>
                  We have consistently delivered strong, risk
                  <br className="lg:block hidden" />
                  -adjusted returns across market cycles.
                </SlideUpText>
              </p>
              <h3 className="text-lg font-medium text-black mb-5">
                <SlideUpText animationMode="always" delay={0.2}>
                  Offerings
                </SlideUpText>
              </h3>

              {/* desktop only */}
              <div className="space-y-3 lg:block md:hidden">
                {fundOptions.map((fund) => (
                  <button
                    key={fund}
                    onClick={() => setSelectedFund(fund)}
                    className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg leading-[33px] text-lg ${
                      selectedFund === fund
                        ? "bg-[#F6F9FC] text-black border border-[#ECF0F4]"
                        : "opacity-20"
                    }`}
                  >
                    <span className="font-medium">
                      <SlideUpText animationMode="always" delay={0.2}>
                        {fund}
                      </SlideUpText>
                    </span>
                  </button>
                ))}
              </div>

              {/* tablet only */}
              <div className="space-y-3 md:block lg:hidden">
                {selectedFund && (
                  <div className="w-full px-4 py-3 rounded-lg leading-[33px] md:text-lg bg-[#F0F2F4] text-[#000000] border border-[#A3A6AA] shadow-sm">
                    <span className="font-medium w-full flex justify-center">
                      <SlideUpText
                        animationMode="always"
                        delay={0.2}
                        className="text-center"
                      >
                        {selectedFund}
                      </SlideUpText>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div className="block md:hidden max-w-md">
              <p className="text-sm md:text-lg text-secondary leading-6 md:leading-[31px] max-w-lg font-[400] mb-4">
                <SlideUpText animationMode="always" delay={0.4}>
                  We have consistently delivered strong, risk
                  <br />
                  -adjusted returns across market cycles.
                </SlideUpText>
              </p>
              <h3 className="text-lg font-medium text-black mb-5">
                <SlideUpText animationMode="always" delay={0.2}>
                  Offerings
                </SlideUpText>
              </h3>
              {selectedFund && (
                <div className="w-full px-4 py-3 rounded-lg leading-[33px] md:text-lg bg-[#F0F2F4] text-[#000000] border border-[#A3A6AA] shadow-sm">
                  <span className="font-medium w-full flex justify-center">
                    <SlideUpText
                      animationMode="always"
                      delay={0.2}
                      className="text-center"
                    >
                      {selectedFund}
                    </SlideUpText>
                  </span>
                </div>
              )}
            </div>

            {/* Chart - dynamically renders based on selection */}
            <div className="mt-4 md:mt-12 mb-12 md:mb-0">
              <p className="text-secondary font-medium md:mb-3.5 mb-2 md:text-center md:text-lg md:leading-[23px] text-xs leading-[18px] text-center">
                <SlideUpText animationMode="always" delay={0.7}>
                  Performance-related information is not verified by SEBI; as
                  prescribed,
                  <br className="md:block hidden" /> individual portfolio
                  performance under the Equity strategy may vary.
                </SlideUpText>
              </p>

              {renderChart()}
            </div>

            {/* Mobile – only inactive options, clickable */}
            <div className="block lg:hidden max-w-md md:max-w-full md:mt-12">
              <div className="space-y-3">
                {fundOptions
                  .filter((fund) => fund !== selectedFund)
                  .map((fund, index) => (
                    <button
                      key={fund}
                      onClick={() => setSelectedFund(fund)}
                      className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg leading-[33px] md:text-lg ${
                        index === 0
                          ? "bg-[#EFEEF2] text-[#000000] opacity-80"
                          : "opacity-20"
                      }`}
                    >
                      <span className="font-medium">
                        <SlideUpText animationMode="always" delay={0.2}>
                          {fund}
                        </SlideUpText>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}