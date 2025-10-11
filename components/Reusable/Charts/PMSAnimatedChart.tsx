import React, { useState, useEffect, useRef } from "react";

export const PMSAnimatedChart = ({
    data,
    isActive,
    maxXAxisPoints = 20,
    showQuarterlyLabels = true,
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
}) => {
    const [animationProgress, setAnimationProgress] = useState(0);
    const [hoveredPoint, setHoveredPoint] = useState<{
        type: 'portfolio' | 'benchmark';
        index: number;
        value: number;
        month: string;
        x: number;
        y: number;
    } | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const [dimensions, setDimensions] = useState({ width: 500, height: 300 });
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
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const duration = 1800;
        startTimeRef.current = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTimeRef.current;
            const rawProgress = Math.min(elapsed / duration, 1);

            const easeInOutCubic = (t: number): number => {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

    const getMinMaxValues = () => {
        const allValues = [
            ...data.data.map((d) => d.value),
            ...data.benchmarkData.map((d) => d.value),
        ];
        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);

        const range = maxValue - minValue;
        const padding = range * 0.1;

        return {
            min: Math.floor(minValue - padding),
            max: Math.ceil(maxValue + padding),
        };
    };

    const { min: minValue, max: maxValue } = getMinMaxValues();

    const getAnimatedValue = (targetValue: number, progress: number) => {
        return targetValue * progress;
    };

    const createPath = (points: any[], progress: number, isAnimated: boolean = true) => {
        if (points.length === 0) return "";

        const { width, height } = dimensions;
        const paddingLeft = 45;
        const paddingRight = 10;
        const paddingTop = 10;
        const paddingBottom = 50;
        const xStep = (width - paddingLeft - paddingRight) / (points.length - 1);

        const visiblePoints = isAnimated ? Math.ceil(points.length * progress) : points.length;

        if (visiblePoints < 2) {
            const x = paddingLeft;
            const y = height - paddingBottom - ((getAnimatedValue(points[0].value, progress) - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);
            return `M ${x} ${y}`;
        }

        let path = "";

        for (let i = 0; i < visiblePoints; i++) {
            const currentValue = isAnimated ? getAnimatedValue(points[i].value, progress) : points[i].value;
            const x = paddingLeft + i * xStep;
            const y = height - paddingBottom - ((currentValue - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);

            if (i === 0) {
                path += `M ${x} ${y}`;
            } else {
                const prevValue = isAnimated ? getAnimatedValue(points[i - 1].value, progress) : points[i - 1].value;
                const prevX = paddingLeft + (i - 1) * xStep;
                const prevY = height - paddingBottom - ((prevValue - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);

                const cp1x = prevX + (x - prevX) * 0.5;
                const cp1y = prevY;
                const cp2x = prevX + (x - prevX) * 0.5;
                const cp2y = y;

                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
            }
        }

        if (isAnimated && visiblePoints < points.length) {
            const fraction = (points.length * progress) - Math.floor(points.length * progress);
            if (fraction > 0) {
                const i = visiblePoints;
                const prevValue = getAnimatedValue(points[i - 1].value, progress);
                const currentValue = getAnimatedValue(points[i].value, progress);

                const prevX = paddingLeft + (i - 1) * xStep;
                const prevY = height - paddingBottom - ((prevValue - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);

                const x = paddingLeft + i * xStep;
                const y = height - paddingBottom - ((currentValue - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);

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
    const paddingLeft = 45;
    const paddingRight = 10;
    const paddingTop = 10;
    const paddingBottom = 50;
    const xStep = (width - paddingLeft - paddingRight) / (data.data.length - 1);

    const generateYAxisLabels = () => {
        const labelCount = 8;
        const step = (maxValue - minValue) / (labelCount - 1);
        return Array.from({ length: labelCount }, (_, i) => {
            const value = minValue + i * step;
            return Math.round(value);
        });
    };

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
    const yAxisLabels = generateYAxisLabels();

    const calculateCAGR = (dataPoints: Array<{ month: string; value: number }>) => {
        if (dataPoints.length < 2) return 0;

        const firstValue = dataPoints[0].value;
        const lastValue = dataPoints[dataPoints.length - 1].value;

        const parseMonthYear = (monthStr: string) => {
            const [month, year] = monthStr.split('-');
            const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
            return { month: monthIndex, year: parseInt('20' + year) };
        };

        const start = parseMonthYear(dataPoints[0].month);
        const end = parseMonthYear(dataPoints[dataPoints.length - 1].month);

        const yearDiff = end.year - start.year;
        const monthDiff = end.month - start.month;
        const totalYears = yearDiff + (monthDiff / 12);

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
                const difference = portfolioPoint.value - data.benchmarkData[index].value;
                if (difference > maxDifference && difference > 5) {
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

        const portfolioValue = getAnimatedValue(data.data[dataIndex].value, animationProgress);
        const benchmarkValue = getAnimatedValue(data.benchmarkData[dataIndex].value, animationProgress);

        const portfolioY = height - paddingBottom - ((portfolioValue - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);
        const benchmarkY = height - paddingBottom - ((benchmarkValue - minValue) / (maxValue - minValue)) * (height - paddingTop - paddingBottom);

        const distToPortfolio = Math.abs(mouseY - portfolioY);
        const distToBenchmark = Math.abs(mouseY - benchmarkY);

        const threshold = 30;

        if (distToPortfolio < threshold || distToBenchmark < threshold) {
            const isPortfolioCloser = distToPortfolio < distToBenchmark;
            const x = paddingLeft + dataIndex * xStep;

            setHoveredPoint({
                type: isPortfolioCloser ? 'portfolio' : 'benchmark',
                index: dataIndex,
                value: isPortfolioCloser ? data.data[dataIndex].value : data.benchmarkData[dataIndex].value,
                month: data.data[dataIndex].month,
                x,
                y: isPortfolioCloser ? portfolioY : benchmarkY
            });
        } else {
            setHoveredPoint(null);
        }
    };

    return (
        <div className="relative bg-white rounded-lg md:px-8 px-4 pt-5 pb-3">
            <h3 className="md:text-lg text-sm leading-3 md:leading-8 font-[400] text-black">
                Aurum Multiplier Portfolio
            </h3>

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
                        <filter id="filter0_d_growth" x="0" y="0" width="60" height="40">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
                            <feMerge>
                                <feMergeNode in="offsetBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Y-axis labels */}
                    {yAxisLabels.map((label, index) => {
                        const y =
                            height -
                            paddingBottom -
                            (index / (yAxisLabels.length - 1)) * (height - paddingTop - paddingBottom);
                        return (
                            <text
                                key={index}
                                x={paddingLeft - 10}
                                y={y}
                                className="text-[10px] fill-[#484848] font-medium"
                                textAnchor="end"
                                dominantBaseline="middle"
                            >
                                {label > 0 ? "+" : ""}
                                {label}%
                            </text>
                        );
                    })}

                    {/* X-axis labels */}
                    {labelsToShow.map((labelIndex: number) => {
                        const month = months[labelIndex];
                        const x = paddingLeft + labelIndex * xStep;

                        return (
                            <text
                                key={`${month}-${labelIndex}`}
                                x={x}
                                y={height - paddingBottom + 20}
                                className="text-[10px] fill-[#484848] font-medium"
                                textAnchor="middle"
                                transform={`rotate(-90 ${x} ${height - paddingBottom + 20})`}
                            >
                                {month}
                            </text>
                        );
                    })}

                    {/* Grid lines */}
                    {yAxisLabels.map((_, index) => {
                        const y =
                            height -
                            paddingBottom -
                            (index / (yAxisLabels.length - 1)) * (height - paddingTop - paddingBottom);
                        return (
                            <line
                                key={index}
                                x1={paddingLeft}
                                y1={y}
                                x2={width - paddingRight}
                                y2={y}
                                stroke="#f0f0f0"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                            />
                        );
                    })}

                    {/* Zero line */}
                    {minValue <= 0 && maxValue >= 0 && (
                        <line
                            x1={paddingLeft}
                            y1={
                                height -
                                paddingBottom -
                                ((0 - minValue) / (maxValue - minValue)) *
                                (height - paddingTop - paddingBottom)
                            }
                            x2={width - paddingRight}
                            y2={
                                height -
                                paddingBottom -
                                ((0 - minValue) / (maxValue - minValue)) *
                                (height - paddingTop - paddingBottom)
                            }
                            stroke="#d0d0d0"
                            strokeWidth="2"
                        />
                    )}

                    {/* Benchmark path */}
                    <path
                        d={createPath(data.benchmarkData, animationProgress)}
                        stroke="#FEC700"
                        strokeWidth="2"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Portfolio path */}
                    <path
                        d={createPath(data.data, animationProgress)}
                        stroke="#6976EB"
                        strokeWidth="3"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Growth indicator */}
                    {bestGrowthIndex !== -1 && animationProgress >= 0.98 && (
                        <g style={{ opacity: Math.min((animationProgress - 0.98) / 0.02, 1) }}>
                            <circle
                                cx={paddingLeft + bestGrowthIndex * xStep}
                                cy={
                                    height -
                                    paddingBottom -
                                    ((getAnimatedValue(data.data[bestGrowthIndex].value, animationProgress) - minValue) /
                                        (maxValue - minValue)) *
                                    (height - paddingTop - paddingBottom)
                                }
                                r="10.5538"
                                fill="#6A48E8"
                                fillOpacity="0.2"
                            />
                            <circle
                                cx={paddingLeft + bestGrowthIndex * xStep}
                                cy={
                                    height -
                                    paddingBottom -
                                    ((getAnimatedValue(data.data[bestGrowthIndex].value, animationProgress) - minValue) /
                                        (maxValue - minValue)) *
                                    (height - paddingTop - paddingBottom)
                                }
                                r="3.19813"
                                fill="#6A48E8"
                            />

                            <g
                                transform={`translate(${paddingLeft + bestGrowthIndex * xStep - 24.5}, ${height -
                                    paddingBottom -
                                    ((getAnimatedValue(data.data[bestGrowthIndex].value, animationProgress) - minValue) /
                                        (maxValue - minValue)) *
                                    (height - paddingTop - paddingBottom) - 50
                                    })`}
                            >
                                <g opacity="0.75" filter="url(#filter0_d_1431_1390)">
                                    <rect width="49.2512" height="26.8643" rx="6.39626" fill="#1F1A5F" />
                                    <path d="M24.5 31L22.3404 26.8643H26.6596L24.5 31Z" fill="#1F1A5F" />
                                    <text
                                        x="24.5"
                                        y="13.4"
                                        className="text-[10px] fill-white font-medium"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        +{data.data[bestGrowthIndex].value.toFixed(1)}%
                                    </text>
                                </g>
                            </g>
                        </g>
                    )}

                    {/* Hover circles */}
                    {data.benchmarkData.map((point, index) => {
                        const x = paddingLeft + index * xStep;
                        const y =
                            height -
                            paddingBottom -
                            ((getAnimatedValue(point.value, animationProgress) - minValue) / (maxValue - minValue)) *
                            (height - paddingTop - paddingBottom);

                        return (
                            <circle
                                key={`benchmark-hover-${index}`}
                                cx={x}
                                cy={y}
                                r="8"
                                fill="transparent"
                                className="cursor-pointer"
                            />
                        );
                    })}

                    {data.data.map((point, index) => {
                        const x = paddingLeft + index * xStep;
                        const y =
                            height -
                            paddingBottom -
                            ((getAnimatedValue(point.value, animationProgress) - minValue) / (maxValue - minValue)) *
                            (height - paddingTop - paddingBottom);

                        return (
                            <circle
                                key={`portfolio-hover-${index}`}
                                cx={x}
                                cy={y}
                                r="8"
                                fill="transparent"
                                className="cursor-pointer"
                            />
                        );
                    })}

                    {hoveredPoint && (
                        <circle
                            cx={hoveredPoint.x}
                            cy={hoveredPoint.y}
                            r="5"
                            fill={hoveredPoint.type === 'portfolio' ? '#6976EB' : '#FEC700'}
                            stroke="white"
                            strokeWidth="2"
                        />
                    )}
                </svg>

                {hoveredPoint && (
                    <div
                        className="absolute bg-white shadow-lg rounded-lg px-3 py-2 pointer-events-none z-50 border border-gray-200"
                        style={{
                            left: `${(hoveredPoint.x / width) * 100}%`,
                            top: `${(hoveredPoint.y / height) * 100}%`,
                            transform: 'translate(-50%, -120%)',
                        }}
                    >
                        <div className="text-xs font-semibold text-gray-800 mb-1">
                            {hoveredPoint.month}
                        </div>
                        <div className={`text-sm font-bold`} style={{ color: hoveredPoint.type === 'portfolio' ? '#6976EB' : '#FEC700' }}>
                            {hoveredPoint.type === 'portfolio' ? 'Portfolio' : 'Benchmark'}: {hoveredPoint.value.toFixed(2)}%
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-6 mt-5">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-1 rounded-full" style={{ backgroundColor: '#FEC700' }}></div>
                    <p className="text-xs text-gray-700">S&P BSE 500 Index</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-1 rounded-full" style={{ backgroundColor: '#6976EB' }}></div>
                    <p className="text-xs text-gray-700">Aurum Multiplier Portfolio</p>
                </div>
            </div>

            <div className="mt-3">
                <h1 className="text-primary">
                    CAGR Since Inception*: Aurum Multiplier: {portfolioCAGR.toFixed(2)}% | S&P BSE 500 Index: {benchmarkCAGR.toFixed(2)}%
                </h1>
                <p className="text-xs mt-1">
                    Performance related information provided above is not verified by SEBI
                    As prescribed by SEBI for investment approaches covered under the
                    Equity strategy
                </p>
            </div>
        </div>
    );
};