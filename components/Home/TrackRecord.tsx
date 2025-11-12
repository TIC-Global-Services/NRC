"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "../ui/badge";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";
import { AnimatedChart } from "../Reusable/Charts/HomeAnimatedChart";
import { PMSAnimatedChart } from "../Reusable/Charts/PMSAnimatedChart";
import SMEPerformanceCard from "../Reusable/Charts/SMEPerformanceCard";
import {
  fetchPortfolioData,
  PortfolioRow,
  getDisplayData,
  sortDataChronologically,
} from "@/lib/config/fetchPortfolioData"; // ← unified version

export default function TrackRecordSection() {
  const [selectedFund, setSelectedFund] = useState(
    "Aurum Small Cap Opportunities (ASCO)"
  );

  const [ascoData, setAscoData] = useState<PortfolioRow[]>([]);
  const [ampData, setAmpData] = useState<PortfolioRow[]>([]);
  const [meta, setMeta] = useState<{
    lastUpdated?: string;
    sheetName?: string;
  }>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fundOptions = [
    "Aurum Small Cap Opportunities (ASCO)",
    "Aurum Multiplier Fund (AMP)",
    "Aurum SME Trust",
    "Aurum Rising India Fund (ARIF)",
  ];

  // 🔹 Reusable data loader
  const loadFundData = useCallback(async (type: "home" | "pms") => {
    try {
      setLoading(true);
      const { data, lastUpdated, sheetName } = await fetchPortfolioData(type);
      const sortedData = sortDataChronologically(data);

      if (type === "home") setAscoData(sortedData);
      else setAmpData(sortedData);

      setMeta({ lastUpdated, sheetName });
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${type} data:`, err);
      setError(`Failed to load ${type.toUpperCase()} data`);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔸 Load ASCO initially
  useEffect(() => {
    loadFundData("home");
  }, [loadFundData]);

  // 🔸 Load AMP only when selected and not already loaded
  useEffect(() => {
    if (
      selectedFund === "Aurum Multiplier Fund (AMP)" &&
      ampData.length === 0
    ) {
      loadFundData("pms");
    }
  }, [selectedFund, ampData.length, loadFundData]);

  // 🔹 Prepare chart data
  const getChartData = useCallback(() => {
    let portfolioData: PortfolioRow[] = [];

    if (selectedFund === "Aurum Small Cap Opportunities (ASCO)") {
      portfolioData = ascoData;
    } else if (selectedFund === "Aurum Multiplier Fund (AMP)") {
      portfolioData = ampData;
    }

    if (!portfolioData.length) {
      return {
        title: "Portfolio Performance vs Benchmark",
        benchmarkLabel: "S&P BSE 500 TR",
        data: [],
        benchmarkData: [],
      };
    }

    const sampled = getDisplayData(portfolioData, 20, "optimal");

    const chartData = sampled.map((row, index) => ({
      month: row.month,
      value: row.portfolio,
      percentage: index === sampled.length - 1 ? row.portfolio : undefined,
    }));

    const benchmarkData = sampled.map((row) => ({
      month: row.month,
      value: row.benchmark,
    }));

    return {
      title: selectedFund,
      benchmarkLabel: "S&P BSE 500 TR",
      data: chartData,
      benchmarkData,
    };
  }, [selectedFund, ascoData, ampData]);

  // 🔹 Chart Renderer
  const renderChart = () => {
    if (loading) {
      return (
        <div className="h-[220px] md:h-[320px] bg-white rounded-xl p-4 animate-pulse overflow-hidden">
          <div className="h-full flex flex-col justify-between">
            <div className="w-1/3 h-5 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-end justify-between flex-1 space-x-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 md:w-8 bg-gray-200 rounded-t"
                  style={{ height: `${Math.random() * 60 + 40}%` }}
                ></div>
              ))}
            </div>
            <div className="mt-4 h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg">
          <div className="text-red-500">{error}</div>
        </div>
      );
    }

    const chartProps = getChartData();

    switch (selectedFund) {
      case "Aurum Small Cap Opportunities (ASCO)":
        return (
          <AnimatedChart
            data={chartProps}
            isActive={true}
            maxXAxisPoints={20}
            showQuarterlyLabels={false}
            lastUpdated={meta.lastUpdated}
          />
        );

      case "Aurum Multiplier Fund (AMP)":
        return (
          <PMSAnimatedChart
            data={chartProps}
            isActive={true}
            maxXAxisPoints={20}
            showQuarterlyLabels={false}
            lastUpdated={meta.lastUpdated}
          />
        );

      case "Aurum SME Trust":
        return <SMEPerformanceCard />;

      case "Aurum Rising India Fund (ARIF)":
        return (
          <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-white rounded-lg">
            <div className="text-center">
              <p className="text-secondary text-2xl font-medium mb-2">
                Capturing India’s growth story — <br /> rising opportunities,
                rising returns.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────
  return (
    <Container
      disablePaddingBottomMobile
      disableMarginBottomMobile
      disablePaddingTopMobile
      className="bg-[#F6F9FC] pt-12 lg:pt-0"
    >
      <section>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-3">
            <div className="max-w-2xl md:hidden block">
              <Badge label="Our Track Record" />
              <h2 className="text-[26px] mt-4 md:text-5xl font-[400] leading-8 md:leading-[58px]">
                Focused on Value,
                <br />{" "}
                <span className="text-primary">Powered by Experience</span>
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.45fr_0.55fr] items-end">
            {/* Left Column - Desktop Fund Selection */}
            <div className="hidden md:block lg:max-w-md">
              <div className="mb-3">
                <Badge label="Our Track Record" />
                <div className="lg:max-w-2xl mt-4">
                  <h2 className="text-[26px] md:text-5xl font-[400] leading-8 md:leading-[58px] md:block hidden">
                    Focused on Value,
                    <br className="hidden lg:block" />{" "}
                    <span className="text-primary">Powered by Experience</span>
                  </h2>
                </div>
              </div>

              <p className="text-sm md:text-lg text-secondary leading-6 md:leading-[31px] lg:max-w-lg font-[400] lg:mb-16 md:mb-4">
                <SlideUpText animationMode="always">
                  We have consistently delivered strong, risk-adjusted returns
                  across market cycles.
                </SlideUpText>
              </p>

              <h3 className="text-lg font-medium text-black mb-5">
                <SlideUpText animationMode="always">Offerings</SlideUpText>
              </h3>

              {/* Desktop buttons */}
              <div className="space-y-3">
                {fundOptions.map((fund) => (
                  <button
                    key={fund}
                    onClick={() => setSelectedFund(fund)}
                    className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg leading-[33px] text-lg ${
                      selectedFund === fund
                        ? "bg-[#F6F9FC] text-black border border-[#ECF0F4]"
                        : "opacity-50"
                    }`}
                  >
                    <span className="font-medium">{fund}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 🔹 Mobile Fund Buttons */}
            <div className="md:hidden mt-6 relative">
              <select
                id="fund-selector"
                value={selectedFund}
                onChange={(e) => setSelectedFund(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-lg border border-[#ECF0F4] bg-white text-gray-800 text-base font-medium  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              >
                {fundOptions.map((fund) => (
                  <option key={fund} value={fund}>
                    {fund}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Chart Column */}
            <div className="mt-4 md:mt-12">
              {/* Disclaimer or tagline */}
              <div className="text-secondary font-medium md:mb-3.5 mb-2 md:text-center md:text-lg md:leading-[23px] text-xs leading-[18px] text-center">
                <AnimatePresence mode="wait">
                  {selectedFund === "Aurum SME Trust" ? (
                    <motion.div
                      key="sme-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <SlideUpText animationMode="always">
                        Empowering India’s small-&-medium enterprises for
                        structured growth
                      </SlideUpText>
                    </motion.div>
                  ) : selectedFund !== "Aurum Rising India Fund (ARIF)" ? (
                    <motion.div
                      key="sebi-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <SlideUpText animationMode="always">
                        Performance-related information is not verified by SEBI;
                        individual portfolio performance may vary.
                      </SlideUpText>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Chart */}
              {renderChart()}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
