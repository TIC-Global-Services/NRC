import React, { useState, useEffect, useRef } from "react";

export const AnimatedChart = ({
  data,
  isActive,
  maxXAxisPoints = 20,
  showQuarterlyLabels = true,
  lastUpdated,
}: {
  data: {
    title: string;
    benchmarkLabel: string;
    data: Array<{ month: string; value: number; percentage?: number }>;
    benchmarkData: Array<{ month: string; value: number }>;
  };
  isActive: boolean;
  maxXAxisPoints?: number;
  showQuarterlyLabels?: boolean;
  lastUpdated?: string;
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{
    type: "portfolio" | "benchmark";
    index: number;
    value: number;
    month: string;
    x: number;
    y: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = window.innerWidth < 768 ? 200 : 300;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const duration = 1800;
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Super smooth easing function
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const easedProgress = easeInOutCubic(rawProgress);
      setAnimationProgress(easedProgress);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setAnimationProgress(1);
      }
    };

    setAnimationProgress(0);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data, isActive]);

  const minValue = -50;
  const maxValue = 2150;

  const getAnimatedValue = (targetValue: number, progress: number) => {
    return targetValue * progress;
  };

  const createPath = (
    points: any[],
    progress: number,
    isAnimated: boolean = true
  ) => {
    if (points.length === 0) return "";

    const { width, height } = dimensions;
    const paddingLeft = 55;
    const paddingRight = 10;
    const paddingTop = 10;
    const paddingBottom = 50;
    const xStep = (width - paddingLeft - paddingRight) / (points.length - 1);

    const visiblePoints = isAnimated
      ? Math.ceil(points.length * progress)
      : points.length;

    if (visiblePoints < 2) {
      const x = paddingLeft;
      const y =
        height -
        paddingBottom -
        ((getAnimatedValue(points[0].value, progress) - minValue) /
          (maxValue - minValue)) *
          (height - paddingTop - paddingBottom);
      return `M ${x} ${y}`;
    }

    let path = "";

    for (let i = 0; i < visiblePoints; i++) {
      const currentValue = isAnimated
        ? getAnimatedValue(points[i].value, progress)
        : points[i].value;
      const x = paddingLeft + i * xStep;
      const y =
        height -
        paddingBottom -
        ((currentValue - minValue) / (maxValue - minValue)) *
          (height - paddingTop - paddingBottom);

      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevValue = isAnimated
          ? getAnimatedValue(points[i - 1].value, progress)
          : points[i - 1].value;
        const prevX = paddingLeft + (i - 1) * xStep;
        const prevY =
          height -
          paddingBottom -
          ((prevValue - minValue) / (maxValue - minValue)) *
            (height - paddingTop - paddingBottom);

        const cp1x = prevX + (x - prevX) * 0.5;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) * 0.5;
        const cp2y = y;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
      }
    }

    // Smooth partial segment for the last visible point
    if (isAnimated && visiblePoints < points.length) {
      const fraction =
        points.length * progress - Math.floor(points.length * progress);
      if (fraction > 0) {
        const i = visiblePoints;
        const prevValue = getAnimatedValue(points[i - 1].value, progress);
        const currentValue = getAnimatedValue(points[i].value, progress);

        const prevX = paddingLeft + (i - 1) * xStep;
        const prevY =
          height -
          paddingBottom -
          ((prevValue - minValue) / (maxValue - minValue)) *
            (height - paddingTop - paddingBottom);

        const x = paddingLeft + i * xStep;
        const y =
          height -
          paddingBottom -
          ((currentValue - minValue) / (maxValue - minValue)) *
            (height - paddingTop - paddingBottom);

        const partialX = prevX + (x - prevX) * fraction;
        const partialY = prevY + (y - prevY) * fraction;

        const cp1x = prevX + (partialX - prevX) * 0.5;
        const cp1y = prevY;
        const cp2x = prevX + (partialX - prevX) * 0.5;
        const cp2y = partialY;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${partialX} ${partialY}`;
      }
    }

    return path;
  };

  const months = data.data.map((d: any) => d.month);
  const { width, height } = dimensions;
  const paddingLeft = 55;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 50;
  const xStep = (width - paddingLeft - paddingRight) / (data.data.length - 1);

  const yAxisLabels = [
    -50, 150, 350, 550, 750, 950, 1150, 1350, 1550, 1750, 1950, 2150,
  ];

  const getLabelsToShow = () => {
    const totalLabels = months.length;

    if (totalLabels <= maxXAxisPoints) {
      return months.map((_, index) => index);
    }

    return getSmartLabelIndices(totalLabels, maxXAxisPoints);
  };

  const getSmartLabelIndices = (totalLabels: number, maxLabels: number) => {
    const indices = new Set<number>();

    indices.add(0);
    indices.add(totalLabels - 1);

    const intermediatePoints = maxLabels - 2;

    if (intermediatePoints > 0) {
      const step = (totalLabels - 1) / (intermediatePoints + 1);

      for (let i = 1; i <= intermediatePoints; i++) {
        const index = Math.round(step * i);
        if (index > 0 && index < totalLabels - 1) {
          indices.add(index);
        }
      }

      if (indices.size < maxLabels) {
        const yearBoundaryMonths = ["Jan", "Dec"];

        for (let i = 1; i < totalLabels - 1; i++) {
          if (indices.size >= maxLabels) break;

          const month = months[i];
          const hasYearBoundary = yearBoundaryMonths.some((boundaryMonth) =>
            month.includes(boundaryMonth)
          );

          if (hasYearBoundary && !indices.has(i)) {
            indices.add(i);
          }
        }
      }
    }

    return Array.from(indices).sort((a, b) => a - b);
  };

  const labelsToShow = getLabelsToShow();

  const calculateCAGR = (
    dataPoints: Array<{ month: string; value: number }>
  ) => {
    if (dataPoints.length < 2) return 0;

    const firstValue = dataPoints[0].value;
    const lastValue = dataPoints[dataPoints.length - 1].value;

    const parseMonthYear = (monthStr: string) => {
      const [month, year] = monthStr.split("-");
      const monthIndex = [
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
      ].indexOf(month);
      return { month: monthIndex, year: parseInt("20" + year) };
    };

    const start = parseMonthYear(dataPoints[0].month);
    const end = parseMonthYear(dataPoints[dataPoints.length - 1].month);

    const yearDiff = end.year - start.year;
    const monthDiff = end.month - start.month;
    const totalYears = yearDiff + monthDiff / 12;

    const growthMultiple = (1 + lastValue / 100) / (1 + firstValue / 100);
    const cagr = (Math.pow(growthMultiple, 1 / totalYears) - 1) * 100;

    return cagr;
  };

  const portfolioCAGR = calculateCAGR(data.data);
  const benchmarkCAGR = calculateCAGR(data.benchmarkData);

  const findBestGrowthPoint = () => {
    let maxDifference = -Infinity;
    let bestIndex = -1;

    data.data.forEach((portfolioPoint, index) => {
      if (index < data.benchmarkData.length) {
        const difference =
          portfolioPoint.value - data.benchmarkData[index].value;
        if (difference > maxDifference && difference > 100) {
          maxDifference = difference;
          bestIndex = index;
        }
      }
    });

    return bestIndex;
  };

  const bestGrowthIndex = findBestGrowthPoint();

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * width;
    const mouseY = ((e.clientY - rect.top) / rect.height) * height;

    const dataIndex = Math.round((mouseX - paddingLeft) / xStep);

    if (dataIndex < 0 || dataIndex >= data.data.length) {
      setHoveredPoint(null);
      return;
    }

    const portfolioValue = getAnimatedValue(
      data.data[dataIndex].value,
      animationProgress
    );
    const benchmarkValue = getAnimatedValue(
      data.benchmarkData[dataIndex].value,
      animationProgress
    );

    const portfolioY =
      height -
      paddingBottom -
      ((portfolioValue - minValue) / (maxValue - minValue)) *
        (height - paddingTop - paddingBottom);
    const benchmarkY =
      height -
      paddingBottom -
      ((benchmarkValue - minValue) / (maxValue - minValue)) *
        (height - paddingTop - paddingBottom);

    const distToPortfolio = Math.abs(mouseY - portfolioY);
    const distToBenchmark = Math.abs(mouseY - benchmarkY);

    const threshold = 30;

    if (distToPortfolio < threshold || distToBenchmark < threshold) {
      const isPortfolioCloser = distToPortfolio < distToBenchmark;
      const x = paddingLeft + dataIndex * xStep;

      setHoveredPoint({
        type: isPortfolioCloser ? "portfolio" : "benchmark",
        index: dataIndex,
        value: isPortfolioCloser
          ? data.data[dataIndex].value
          : data.benchmarkData[dataIndex].value,
        month: data.data[dataIndex].month,
        x,
        y: isPortfolioCloser ? portfolioY : benchmarkY,
      });
    } else {
      setHoveredPoint(null);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:px-10 px-5 pt-6 pb-6 transition-all duration-300 hover:shadow-[0_6px_25px_rgba(0,0,0,0.08)]">
      {/* Title */}
      <h3 className="md:text-xl text-base font-semibold text-primary text-center mb-6">
        {data.title}
      </h3>

      {/* Chart Container */}
      <div ref={containerRef} className="relative w-full">
        <svg
          ref={svgRef}
          width="100%"
          height={dimensions.height}
          className="overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            {/* Glow for active line */}
            <filter id="shadow-blur">
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="1.5"
                floodColor="#6366F1"
                floodOpacity="0.25"
              />
            </filter>

            {/* Gradient under Portfolio Line */}
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6976EB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6976EB" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {yAxisLabels.map((_, index) => {
            const y =
              height -
              paddingBottom -
              (index / (yAxisLabels.length - 1)) *
                (height - paddingTop - paddingBottom);
            return (
              <line
                key={index}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            );
          })}

          {/* Y-axis Labels */}
          {yAxisLabels.map((label, index) => {
            const y =
              height -
              paddingBottom -
              (index / (yAxisLabels.length - 1)) *
                (height - paddingTop - paddingBottom);
            return (
              <text
                key={index}
                x={paddingLeft - 10}
                y={y}
                className="text-[10px] fill-gray-500 font-medium"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {label > 0 ? "+" : ""}
                {label}%
              </text>
            );
          })}

          {/* X-axis Labels */}
          {labelsToShow.map((labelIndex: number) => {
            const month = months[labelIndex];
            const x = paddingLeft + labelIndex * xStep;
            const labelY = height - paddingBottom + 15;

            return (
              <text
                key={`${month}-${labelIndex}`}
                x={x}
                y={labelY}
                className="text-[10px] fill-gray-600 font-medium"
                textAnchor="end"
                transform={`rotate(-90 ${x} ${labelY})`}
              >
                {month}
              </text>
            );
          })}

          {/* Benchmark Line */}
          <path
            d={createPath(data.benchmarkData, animationProgress)}
            stroke="#FEC700"
            strokeWidth="2"
            fill="none"
            className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
          />

          {/* Portfolio Line + Gradient */}
          <path
            d={createPath(data.data, animationProgress)}
            stroke="#6976EB"
            strokeWidth="2.5"
            fill="url(#portfolioGradient)"
            filter="url(#shadow-blur)"
          />

          {/* +X.X% Bubble */}
          {bestGrowthIndex !== -1 && animationProgress >= 0.98 && (
            <g
              style={{
                opacity: Math.min((animationProgress - 0.98) / 0.02, 1),
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            >
              {/* Circle highlight */}
              <circle
                cx={paddingLeft + bestGrowthIndex * xStep}
                cy={
                  height -
                  paddingBottom -
                  ((getAnimatedValue(
                    data.data[bestGrowthIndex].value,
                    animationProgress
                  ) -
                    minValue) /
                    (maxValue - minValue)) *
                    (height - paddingTop - paddingBottom)
                }
                r="10"
                fill="#6976EB"
                fillOpacity="0.15"
              />
              <circle
                cx={paddingLeft + bestGrowthIndex * xStep}
                cy={
                  height -
                  paddingBottom -
                  ((getAnimatedValue(
                    data.data[bestGrowthIndex].value,
                    animationProgress
                  ) -
                    minValue) /
                    (maxValue - minValue)) *
                    (height - paddingTop - paddingBottom)
                }
                r="3.5"
                fill="#6976EB"
              />

              {/* Tooltip bubble */}
              <g
                transform={`translate(${
                  paddingLeft + bestGrowthIndex * xStep - 24.5
                }, ${
                  height -
                  paddingBottom -
                  ((getAnimatedValue(
                    data.data[bestGrowthIndex].value,
                    animationProgress
                  ) -
                    minValue) /
                    (maxValue - minValue)) *
                    (height - paddingTop - paddingBottom) -
                  50
                })`}
              >
                <rect width="50" height="26" rx="6" fill="#1F1A5F" />
                <path d="M24.5 31L22.3 26.8H26.7L24.5 31Z" fill="#1F1A5F" />
                <text
                  x="25"
                  y="14"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  +{data.data[bestGrowthIndex].value.toFixed(1)}%
                </text>
              </g>
            </g>
          )}

          {/* Hover point */}
          {hoveredPoint && (
            <circle
              cx={hoveredPoint.x}
              cy={hoveredPoint.y}
              r="5"
              fill={hoveredPoint.type === "portfolio" ? "#6976EB" : "#FEC700"}
              stroke="white"
              strokeWidth="2"
            />
          )}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-100 pointer-events-none transition-all duration-150 text-xs"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <p className="font-semibold text-gray-800 mb-1">
              {hoveredPoint.month}
            </p>
            <p
              className="font-bold"
              style={{
                color:
                  hoveredPoint.type === "portfolio" ? "#6976EB" : "#FEC700",
              }}
            >
              {hoveredPoint.type === "portfolio"
                ? "Aurum Portfolio"
                : "S&P BSE 500 TR"}{" "}
              : {hoveredPoint.value.toFixed(2)}%
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mt-6 mb-4"></div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-[3px] rounded-full bg-[#FEC700]" />
          <p className="text-sm text-gray-700 font-medium">S&P BSE 500 TR</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-[3px] rounded-full bg-[#6976EB]" />
          <p className="text-sm text-gray-700 font-medium">
            NRC Aurum Smallcap Portfolio
          </p>
        </div>
      </div>

      {/* CAGR Section */}
      <div className="mt-5 text-center space-y-1.5">
        <p className="text-sm font-semibold text-[#1A1A1A]">
          CAGR Since Inception*
        </p>
        <p className="text-[15px] font-bold text-primary">
          Aurum Small Cap: {portfolioCAGR.toFixed(2)}% | Benchmark:{" "}
          {benchmarkCAGR.toFixed(2)}%
        </p>

        {/* Returns as of date (only if available) */}
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-1">
            Returns as of{" "}
            {new Date(lastUpdated).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            *
          </p>
        )}

        {/* SEBI Disclaimer */}
        <p className="text-[7px] text-gray-500 mt-1 leading-relaxed max-w-md mx-auto">
          *Performance-related information is not verified by SEBI. As prescribed
          by SEBI, individual portfolio performance under the equity strategy
          may vary.
        </p>
      </div>
    </div>
  );
};
