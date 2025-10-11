import React, { forwardRef, useRef, useEffect, useState } from "react";

// Placeholder for CenterLogo - replace with your actual logo
const CenterLogo = () => (
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
        AI
    </div>
);

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode; size?: "small" | "medium" | "large" }
>(({ className = "", children, size = "medium" }, ref) => {
    const sizeClasses = {
        small: "w-12 h-12",
        medium: "w-14 h-14",
        large: "w-40 h-40"
    };

    return (
        <div
            ref={ref}
            className={`z-10 flex items-center justify-center rounded-lg bg-white p-3 backdrop-blur-sm shadow-lg border ${sizeClasses[size]} ${className}`}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

interface AnimatedBeamProps {
    containerRef: any;
    fromRef: any;
    toRef: any;
    pathType?: "straight" | "L-shaped" | "curved";
    cornerRadius?: number;
    reverse?: boolean;
    duration?: number;
    strokeWidth?: number;
    color?: string;
    glowColor?: string;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
    containerRef,
    fromRef,
    toRef,
    pathType = "L-shaped",
    cornerRadius = 20,
    reverse = false,
    duration = 3000,
    strokeWidth = 3,
    color = "#3b82f6",
    glowColor
}) => {
    const [path, setPath] = useState("");
    const [pathLength, setPathLength] = useState(0);
    const gradientId = useState(() => `gradient-${Math.random().toString(36).substr(2, 9)}`)[0];
    const glowId = useState(() => `glow-${Math.random().toString(36).substr(2, 9)}`)[0];

    useEffect(() => {
        const updatePath = () => {
            if (!containerRef.current || !fromRef.current || !toRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const fromRect = fromRef.current.getBoundingClientRect();
            const toRect = toRef.current.getBoundingClientRect();

            const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
            const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
            const toX = toRect.left - containerRect.left + toRect.width / 2;
            const toY = toRect.top - containerRect.top + toRect.height / 2;

            let pathString = "";

            if (pathType === "straight") {
                pathString = `M ${fromX} ${fromY} L ${toX} ${toY}`;
            } else if (pathType === "L-shaped") {
                const dx = toX - fromX;
                const dy = toY - fromY;

                if (Math.abs(dx) > cornerRadius && Math.abs(dy) > cornerRadius) {
                    pathString = `M ${fromX} ${fromY}`;

                    if (Math.abs(dx) > Math.abs(dy)) {
                        const cornerX = toX - Math.sign(dx) * cornerRadius;
                        const cornerY = fromY;
                        pathString += ` L ${cornerX} ${cornerY}`;
                        pathString += ` Q ${toX} ${cornerY} ${toX} ${cornerY + Math.sign(dy) * cornerRadius}`;
                        pathString += ` L ${toX} ${toY}`;
                    } else {
                        const cornerX = fromX;
                        const cornerY = toY - Math.sign(dy) * cornerRadius;
                        pathString += ` L ${cornerX} ${cornerY}`;
                        pathString += ` Q ${cornerX} ${toY} ${cornerX + Math.sign(dx) * cornerRadius} ${toY}`;
                        pathString += ` L ${toX} ${toY}`;
                    }
                } else {
                    pathString = `M ${fromX} ${fromY} L ${toX} ${toY}`;
                }
            } else {
                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2;
                const dx = toX - fromX;
                const dy = toY - fromY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0) {
                    const controlOffset = distance * 0.3;
                    const controlX = midX + (dy / distance) * controlOffset;
                    const controlY = midY - (dx / distance) * controlOffset;
                    pathString = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
                } else {
                    pathString = `M ${fromX} ${fromY} L ${toX} ${toY}`;
                }
            }

            setPath(pathString);

            // Calculate path length
            if (pathString) {
                const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                tempPath.setAttribute("d", pathString);
                tempSvg.appendChild(tempPath);
                tempSvg.style.position = "absolute";
                tempSvg.style.visibility = "hidden";
                document.body.appendChild(tempSvg);
                try {
                    const length = tempPath.getTotalLength();
                    setPathLength(length);
                } catch (e) {
                    console.warn("Could not calculate path length:", e);
                }
                document.body.removeChild(tempSvg);
            }
        };

        updatePath();
        const handleResize = () => updatePath();
        window.addEventListener("resize", handleResize);

        const interval = setInterval(updatePath, 100);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, [containerRef, fromRef, toRef, pathType, cornerRadius]);

    if (!path || pathLength === 0) return null;

    const animationName = reverse ? 'beam-reverse' : 'beam-forward';
    const glowColorFinal = glowColor || color;

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes beam-forward {
                    0% { 
                        stroke-dashoffset: ${pathLength}; 
                        opacity: 0;
                    }
                    5% {
                        opacity: 0.3;
                    }
                    15% {
                        opacity: 1;
                    }
                    85% {
                        opacity: 1;
                    }
                    95% {
                        opacity: 0.3;
                    }
                    100% { 
                        stroke-dashoffset: 0;
                        opacity: 0;
                    }
                }
                @keyframes beam-reverse {
                    0% { 
                        stroke-dashoffset: -${pathLength};
                        opacity: 0;
                    }
                    5% {
                        opacity: 0.3;
                    }
                    15% {
                        opacity: 1;
                    }
                    85% {
                        opacity: 1;
                    }
                    95% {
                        opacity: 0.3;
                    }
                    100% { 
                        stroke-dashoffset: 0;
                        opacity: 0;
                    }
                }
                `
            }} />
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                width="100%"
                height="100%"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={color} stopOpacity="0" />
                        <stop offset="20%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="40%" stopColor={color} stopOpacity="0.8" />
                        <stop offset="50%" stopColor={color} stopOpacity="1" />
                        <stop offset="60%" stopColor={color} stopOpacity="0.8" />
                        <stop offset="80%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>

                    <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path
                    d={path}
                    stroke={glowColorFinal}
                    strokeWidth={strokeWidth + 4}
                    fill="none"
                    opacity="0.15"
                    filter={`url(#${glowId})`}
                />

                <path
                    d={path}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    opacity="0.3"
                    strokeLinecap="round"
                />

                <path
                    d={path}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={pathLength * 0.3}
                    strokeDashoffset={reverse ? -pathLength : pathLength}
                    strokeLinecap="round"
                    filter={`url(#${glowId})`}
                    style={{
                        animation: `${animationName} ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite`,
                    }}
                />

                <path
                    d={path}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth - 1}
                    fill="none"
                    strokeDasharray={pathLength * 0.15}
                    strokeDashoffset={reverse ? -pathLength : pathLength}
                    strokeLinecap="round"
                    style={{
                        animation: `${animationName} ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1) infinite ${duration * 0.1}ms`,
                        opacity: 0.6
                    }}
                />
            </svg>
        </>
    );
};

const Icons = {
    notion: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="currentColor" />
        </svg>
    ),
    googleDrive: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
        </svg>
    ),
    whatsapp: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg">
            <path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z" fill="#25d366" />
        </svg>
    ),
    googleDocs: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 47 65" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z" fill="#4285F4" />
        </svg>
    ),
    zapier: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 244 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z" fill="#ff4f00" />
        </svg>
    ),
    messenger: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1292ff" d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z" />
        </svg>
    ),
};

export default function AnimatedBeamDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full max-w-5xl mx-auto p-8">
            <div
                className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100"
                ref={containerRef}
            >
                {/* Center Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Circle ref={centerRef} size="large" className="border-2 border-gray-200">
                        <CenterLogo />
                    </Circle>
                </div>

                {/* Surrounding Elements */}
                <div className="absolute top-10 left-16">
                    <Circle ref={topLeftRef} size="small" className="bg-blue-50">
                        <Icons.googleDrive className="w-5 h-5 text-blue-600" />
                    </Circle>
                </div>

                <div className="absolute top-20 right-12">
                    <Circle ref={topRightRef} size="small" className="bg-orange-50">
                        <Icons.googleDocs className="w-5 h-5 text-blue-500" />
                    </Circle>
                </div>

                <div className="absolute left-8 top-1/2 transform translate-y-12">
                    <Circle ref={leftRef} size="small" className="bg-purple-50">
                        <Icons.notion className="w-5 h-5 text-black" />
                    </Circle>
                </div>

                <div className="absolute right-14 top-1/2 transform -translate-y-16">
                    <Circle ref={rightRef} size="small" className="bg-red-50">
                        <Icons.zapier className="w-5 h-5 text-orange-500" />
                    </Circle>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <Circle ref={bottomLeftRef} size="small" className="bg-green-50">
                        <Icons.whatsapp className="w-5 h-5 text-green-500" />
                    </Circle>
                </div>

                <div className="absolute bottom-8 right-20">
                    <Circle ref={bottomRightRef} size="small" className="bg-blue-50">
                        <Icons.messenger className="w-5 h-5 text-blue-500" />
                    </Circle>
                </div>

                {/* Animated Beams */}
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={topLeftRef}
                    toRef={centerRef}
                    pathType="L-shaped"
                    color="#10b981"
                    glowColor="#34d399"
                    duration={2500}
                    strokeWidth={4}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={topRightRef}
                    toRef={centerRef}
                    pathType="L-shaped"
                    color="#f59e0b"
                    glowColor="#fbbf24"
                    duration={2800}
                    strokeWidth={4}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={leftRef}
                    toRef={centerRef}
                    pathType="L-shaped"
                    color="#8b5cf6"
                    glowColor="#a78bfa"
                    duration={2200}
                    strokeWidth={4}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={rightRef}
                    toRef={centerRef}
                    pathType="L-shaped"
                    color="#ef4444"
                    glowColor="#f87171"
                    duration={2600}
                    strokeWidth={4}
                    reverse
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={bottomLeftRef}
                    toRef={centerRef}
                    pathType="straight"
                    color="#06b6d4"
                    glowColor="#22d3ee"
                    duration={2400}
                    strokeWidth={4}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={bottomRightRef}
                    toRef={centerRef}
                    pathType="L-shaped"
                    color="#ec4899"
                    glowColor="#f472b6"
                    duration={2700}
                    strokeWidth={4}
                    reverse
                />
            </div>
        </div>
    );
}