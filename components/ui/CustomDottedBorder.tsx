import React from 'react';

interface CustomDottedBorderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  borderRadius?: string | number;
  backgroundColor?: string;
  dashArray?: string;
  children?: React.ReactNode;
}

const CustomDottedBorder: React.FC<CustomDottedBorderProps> = ({
  width = "100%",
  height = "100%",
  className = "",
  strokeColor = "#6A48E8",
  strokeWidth = 1,
  borderRadius = 7,
  backgroundColor = "transparent",
  dashArray = "10 10",
  children
}) => {
  // Convert dimensions to numbers for SVG calculations
  const numWidth = typeof width === 'number' ? width : 337;
  const numHeight = typeof height === 'number' ? height : 71;
  const numRadius = typeof borderRadius === 'number' ? borderRadius : 7;
  
  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div 
      className={`relative ${className}`}
      style={containerStyle}
    >
      {/* SVG Border */}
      <svg 
        width={numWidth} 
        height={numHeight} 
        viewBox={`0 0 ${numWidth} ${numHeight}`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <rect 
          x={strokeWidth / 2} 
          y={strokeWidth / 2} 
          width={numWidth - strokeWidth} 
          height={numHeight - strokeWidth} 
          rx={numRadius} 
          fill={backgroundColor}
          stroke={strokeColor} 
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
        />
      </svg>
      
      {/* Content */}
      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          {children}
        </div>
      )}
    </div>
  );
};


export default CustomDottedBorder;