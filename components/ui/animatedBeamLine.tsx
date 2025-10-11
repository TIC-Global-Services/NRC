"use client";

import React from "react";

interface AnimatedBeamLineProps {
  y1?: number;
  x2: number;
  y2?: number;
  transform: string;
  stroke?: string;
  delay?: number; // global offset
  duration?: number; // total animation duration
  strokeWidth?: number;
  className?: string;
  segmentOffset?: number; // offset to continue from previous line
  segmentLength?: number; // length of this segment
}

const AnimatedBeamLine: React.FC<AnimatedBeamLineProps> = ({
  y1 = -0.5,
  x2,
  y2 = -0.5,
  transform,
  stroke = "#D9D9D9",
  delay = 0,
  duration = 3,
  strokeWidth = 1,
  className = "",
  segmentOffset = 0,
  segmentLength,
}) => {
  const lineId = React.useId();
  const gradientId = `gradient-${lineId}`;
  const animationId = `beam-${lineId}`;

  const length = segmentLength ?? Math.sqrt(x2 * x2 + (y2 - y1) * (y2 - y1));

  return (
    <>
      <style>
        {`
          @keyframes ${animationId} {
            0% {
              stroke-dashoffset: ${length + segmentOffset};
            }
            100% {
              stroke-dashoffset: -${segmentOffset};
            }
          }
          .beam-line-${lineId} {
            strokeDasharray: ${length};
            animation: ${animationId} ${duration}s linear infinite;
            animation-delay: ${delay}s;
          }
        `}
      </style>

      <g className={className}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6A48E8" stopOpacity="1" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base line */}
        <line
          y1={y1}
          x2={x2}
          y2={y2}
          transform={transform}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />

        {/* Animated beam */}
        <line
          y1={y1}
          x2={x2}
          y2={y2}
          transform={transform}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth + 1.5}
          strokeLinecap="round"
          className={`beam-line-${lineId}`}
        />
      </g>
    </>
  );
};

export default AnimatedBeamLine;