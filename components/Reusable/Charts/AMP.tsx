"use client";

import { TrackRecord } from "@/assets/Home";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface AMPProps {
  data: {
    title: string;
    benchmarkLabel: string;
    data: Array<{ month: string; value: number; percentage?: number }>;
    benchmarkData: Array<{ month: string; value: number }>;
  };
  isActive?: boolean;
  maxXAxisPoints?: number;
  showQuarterlyLabels?: boolean;
}

// Helper function to parse month-year string
function parseMonthYear(monthStr: string): Date {
  const formats = [
    /^([A-Za-z]{3})-(\d{2,4})$/,
    /^([A-Za-z]{3}|\d{1,2})\/(\d{4})$/,
    /^(\d{4})-([A-Za-z]{3}|\d{1,2})$/,
  ];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (const format of formats) {
    const match = monthStr.match(format);
    if (match) {
      let month: number;
      let year: number;

      if (format === formats[0]) {
        const monthName = match[1];
        month = monthNames.indexOf(monthName);
        year = parseInt(match[2]);
        if (year < 100) year += 2000;
      } else if (format === formats[1]) {
        const monthPart = match[1];
        if (isNaN(parseInt(monthPart))) {
          month = monthNames.indexOf(monthPart);
        } else {
          month = parseInt(monthPart) - 1;
        }
        year = parseInt(match[2]);
      } else {
        year = parseInt(match[1]);
        const monthPart = match[2];
        if (isNaN(parseInt(monthPart))) {
          month = monthNames.indexOf(monthPart);
        } else {
          month = parseInt(monthPart) - 1;
        }
      }

      if (month >= 0 && month <= 11 && year > 1900) {
        return new Date(year, month);
      }
    }
  }

  return new Date();
}

// Calculate annualized returns
function calculateAnnualizedReturn(
  startValue: number,
  endValue: number,
  years: number
): number {
  if (years <= 0 || startValue <= 0) return 0;
  const ratio = endValue / startValue;
  const annualized = (Math.pow(ratio, 1 / years) - 1) * 100;
  return annualized;
}

// Get performance metrics
function getPerformanceMetrics(data: Array<{ month: string; value: number }>) {
  if (!data || data.length < 2) {
    return {
      oneYear: 0,
      twoYear: 0,
      threeYear: 0,
      sinceInception: 0,
    };
  }

  const sortedData = [...data].sort((a, b) => {
    return (
      parseMonthYear(a.month).getTime() - parseMonthYear(b.month).getTime()
    );
  });

  const latestDataPoint = sortedData[sortedData.length - 1];
  const latestDate = parseMonthYear(latestDataPoint.month);
  const latestValue = latestDataPoint.value;

  const oneYearAgo = new Date(latestDate);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const twoYearsAgo = new Date(latestDate);
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  const threeYearsAgo = new Date(latestDate);
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  const findClosestDataPoint = (targetDate: Date) => {
    let closest = sortedData[0];
    let minDiff = Math.abs(
      parseMonthYear(sortedData[0].month).getTime() - targetDate.getTime()
    );

    for (const point of sortedData) {
      const pointDate = parseMonthYear(point.month);
      const diff = Math.abs(pointDate.getTime() - targetDate.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = point;
      }
    }
    return closest;
  };

  const oneYearData = findClosestDataPoint(oneYearAgo);
  const twoYearData = findClosestDataPoint(twoYearsAgo);
  const threeYearData = findClosestDataPoint(threeYearsAgo);
  const inceptionData = sortedData[0];

  const oneYear = calculateAnnualizedReturn(oneYearData.value, latestValue, 1);
  const twoYear = calculateAnnualizedReturn(twoYearData.value, latestValue, 2);
  const threeYear = calculateAnnualizedReturn(
    threeYearData.value,
    latestValue,
    3
  );

  const inceptionDate = parseMonthYear(inceptionData.month);
  const yearsSinceInception =
    (latestDate.getTime() - inceptionDate.getTime()) /
    (365.25 * 24 * 60 * 60 * 1000);
  const sinceInception = calculateAnnualizedReturn(
    inceptionData.value,
    latestValue,
    yearsSinceInception
  );

  return {
    oneYear: Math.round(oneYear * 10) / 10,
    twoYear: Math.round(twoYear * 10) / 10,
    threeYear: Math.round(threeYear * 10) / 10,
    sinceInception: Math.round(sinceInception * 10) / 10,
  };
}

export const AMP = ({ data }: AMPProps) => {
  const [portfolioMetrics, setPortfolioMetrics] = useState({
    oneYear: 0,
    twoYear: 0,
    threeYear: 0,
    sinceInception: 0,
  });

  const [benchmarkMetrics, setBenchmarkMetrics] = useState({
    oneYear: 0,
    twoYear: 0,
    threeYear: 0,
    sinceInception: 0,
  });

  useEffect(() => {
    if (data.data && data.data.length > 0) {
      const pMetrics = getPerformanceMetrics(data.data);
      setPortfolioMetrics(pMetrics);
    }

    if (data.benchmarkData && data.benchmarkData.length > 0) {
      const bMetrics = getPerformanceMetrics(data.benchmarkData);
      setBenchmarkMetrics(bMetrics);
    }
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-[1fr_0.4fr_0.7fr] items-center justify-center">
        {/* column 1 */}
        <div className="flex flex-col items-center justify-center ">
          <h1 className="md:text-[20px] text-base leading-[25px] font-medium text-secondary mb-3">
            Aurum&#160;Multiplier&#160;Portfolio
          </h1>
          <div className="grid grid-cols-2 gap-3 text-xs md:text-base">
            <div className="flex flex-col gap-2">
              <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[95px] rounded-[8px]">
                1 Year
              </div>
              <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[95px] rounded-[8px]">
                2 Year
              </div>
              <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[95px] rounded-[8px]">
                3 Year
              </div>
              <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[95px] rounded-[8px]">
                Since Inception
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-[#E6E8FD] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
                {portfolioMetrics.oneYear}%
              </div>
              <div className="bg-[#E6E8FD] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
                {portfolioMetrics.twoYear}%
              </div>
              <div className="bg-[#E6E8FD] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
                {portfolioMetrics.threeYear}%
              </div>
              <div className="bg-[#E6E8FD] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
                {portfolioMetrics.sinceInception}%
              </div>
            </div>
          </div>
        </div>

        {/* column 2 */}
        <div className="flex items-center justify-center">
          <Image
            src={TrackRecord}
            alt="TrackRecord"
            width={200}
            height={400}
            className="md:w-[100px] md:h-[250px] w-[70px] h-[170px]"
          />
        </div>

        {/* column 3 */}
        <div className="flex flex-col items-center justify-center ">
          <h1 className="md:text-[20px] text-base leading-[25px] font-medium text-secondary mb-3">
            BSE 500TR
          </h1>

          <div className="flex flex-col gap-2 text-xs md:text-base">
            <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
              {benchmarkMetrics.oneYear}%
            </div>
            <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
              {benchmarkMetrics.twoYear}%
            </div>
            <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
              {benchmarkMetrics.threeYear}%
            </div>
            <div className="bg-[#F5F6F8] py-2 md:h-[44px] h-[35px] text-center md:w-[140px] w-[90px] rounded-[8px] flex items-center justify-center">
              {benchmarkMetrics.sinceInception}%
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 text-center px-2">
        <p className="text-[10px] md:text-xs text-gray-600">
          Performance related information provided above is not verified by
          SEBI. As prescribed by SEBI for investment approaches covered under
          the Equity strategy.
        </p>
      </div>
    </div>
  );
};