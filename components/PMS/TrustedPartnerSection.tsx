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
import FlexibleHeading from "../ui/FlexibleHeading";
import AnimatedButton from "../ui/animatedButton";

export default function TrustedPartner() {
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

  return (
    <Container className="bg-[#F6F9FC]">
      <div className="mx-auto">
        <div className="grid lg:grid-cols-[0.45fr_0.55fr] md:items-center items-start">
          {/* LEFT SIDE */}
          <div className="lg:max-w-md max-w-md md:max-w-full">
            <div className="mt-4">
              <FlexibleHeading
                title="A Proven Journey<br/> A Trusted Partner."
                description="For more than a decade, our PMS has delivered differentiated returns through market cycles — not by chasing trends, but by backing scalable businesses early."
                alignment="left"
                highlights={{ "A Trusted Partner.": "text-primary" }}
                isMB={false}
              />

              {/* Fund Selector - Desktop */}
              <div className="hidden lg:block md:mb-6 md:mt-6">
                <div className="space-y-3">
                  {fundOptions.map((fund) => (
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
                        <SlideUpText animationMode="once">{fund}</SlideUpText>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fund Selector - Mobile / Tablet */}
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

              {/* CTA Button */}
              <div className="mt-6 hidden lg:block">
                <SlideUpText animationMode="once">
                  <AnimatedButton
                    isBtnScale={false}
                    label="Detailed Performance Data"
                  />
                </SlideUpText>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CHART */}
          <div className="mt-4 md:mt-12 mb-12 md:mb-0">
            {loading ? (
              renderChart()
            ) : (
              <>
                {selectedFund === "Aurum Small Cap Opportunities (ASCO)" ? (
                  <AnimatedChart
                    data={getChartData()}
                    isActive={!loading}
                    maxXAxisPoints={20}
                    showQuarterlyLabels={false}
                    lastUpdated={meta.lastUpdated} // ✅ add this
                  />
                ) : (
                  <PMSAnimatedChart
                    data={getChartData()}
                    isActive={!loading}
                    maxXAxisPoints={20}
                    showQuarterlyLabels={false}
                    lastUpdated={meta.lastUpdated} // ✅ add this
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
