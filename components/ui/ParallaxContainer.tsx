import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
} from "framer-motion";

// Main Parallax Container Component
interface ParallaxContainerProps {
    children: React.ReactNode;
    className?: string;
    speed?: "slow" | "medium" | "fast" | "custom";
    customSpeed?: number;
    direction?: "up" | "down" | "left" | "right";
    scale?: boolean;
    rotate?: boolean;
    opacity?: boolean;
    blur?: boolean;
    offset?: [string, string]; // e.g., ['start end', 'end start']
    spring?: boolean;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
    children,
    className = "",
    speed = "medium",
    customSpeed,
    direction = "up",
    scale = false,
    rotate = false,
    opacity = false,
    blur = false,
    offset = ["start end", "end start"],
    spring = false,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset as any,
    });

    // Speed configurations
    const speedConfigs = {
        slow: 0.3,
        medium: 0.5,
        fast: 0.8,
        custom: customSpeed || 0.5,
    };

    const speedValue = speedConfigs[speed];

    const distance = 200 * speedValue;

    let outputRange: [number, number];
    if (direction === "up") {
        outputRange = [distance, -distance];
    } else if (direction === "down") {
        outputRange = [-distance, distance];
    } else if (direction === "left") {
        outputRange = [distance, -distance];
    } else if (direction === "right") {
        outputRange = [-distance, distance];
    } else {
        outputRange = [distance, -distance];
    }

    const transform = useTransform(scrollYProgress, [0, 1], outputRange);
    const smoothTransform = spring
        ? useSpring(transform, { stiffness: 400, damping: 40 })
        : transform;

    // Additional effects
    const scaleTransform = scale
        ? useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
        : 1;
    const rotateTransform = rotate
        ? useTransform(scrollYProgress, [0, 1], [0, 360])
        : 0;
    const opacityTransform = opacity
        ? useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
        : 1;
    const blurTransform = blur
        ? useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0])
        : 0;

    const motionProps: any = {
        ref,
        className,
        style: {
            scale: scaleTransform,
            rotate: rotateTransform,
            opacity: opacityTransform,
            filter: blur ? `blur(${blurTransform}px)` : undefined,
        },
    };

    // Apply transform based on direction
    if (direction === "left" || direction === "right") {
        motionProps.style.x = smoothTransform;
    } else {
        motionProps.style.y = smoothTransform;
    }

    return <motion.div {...motionProps}>{children}</motion.div>;
};

// Staggered Parallax Component for multiple elements
interface ParallaxStaggerProps {
    children: React.ReactNode[];
    staggerDelay?: number;
    baseSpeed?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

const ParallaxStagger: React.FC<ParallaxStaggerProps> = ({
    children,
    staggerDelay = 0.1,
    baseSpeed = 0.3,
    direction = "up",
    className = "",
}) => {
    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => {
                const speed = baseSpeed + index * staggerDelay;
                return (
                    <ParallaxContainer
                        key={index}
                        customSpeed={speed}
                        speed="custom"
                        direction={direction}
                    >
                        {child}
                    </ParallaxContainer>
                );
            })}
        </div>
    );
};

// Advanced Parallax with Trigger Animations
interface ParallaxTriggerProps {
    children: React.ReactNode;
    triggerAnimation?: "fadeIn" | "slideUp" | "scale" | "rotate" | "custom";
    customAnimation?: any;
    parallaxSpeed?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
    delay?: number;
}

const ParallaxTrigger: React.FC<ParallaxTriggerProps> = ({
    children,
    triggerAnimation = "fadeIn",
    customAnimation,
    parallaxSpeed = 0.5,
    direction = "up",
    className = "",
    delay = 0,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const parallaxY = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "up"
            ? [100 * parallaxSpeed, -100 * parallaxSpeed]
            : direction === "down"
                ? [-100 * parallaxSpeed, 100 * parallaxSpeed]
                : [0, 0]
    );

    const parallaxX = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "left"
            ? [100 * parallaxSpeed, -100 * parallaxSpeed]
            : direction === "right"
                ? [-100 * parallaxSpeed, 100 * parallaxSpeed]
                : [0, 0]
    );

    // Predefined animations
    const fadeInAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const animations = {
        fadeIn: fadeInAnimation,
        slideUp: {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 },
        },
        scale: {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.9 },
        },
        rotate: {
            initial: { opacity: 0, rotate: -10 },
            animate: { opacity: 1, rotate: 0 },
            exit: { opacity: 0, rotate: 10 },
        },
        custom: customAnimation || fadeInAnimation,
    };

    const selectedAnimation = animations[triggerAnimation] || fadeInAnimation;

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                y: direction === "up" || direction === "down" ? parallaxY : 0,
                x: direction === "left" || direction === "right" ? parallaxX : 0,
            }}
            initial={selectedAnimation.initial}
            animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
            exit={selectedAnimation.exit}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

// Demo Component
const ParallaxDemo = () => {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Hero Section */}
            <div className="h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <ParallaxContainer speed="slow" direction="down" opacity blur>
                        <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-primary/20" />
                    </ParallaxContainer>
                </div>

                <div className="text-center z-10 space-y-8">
                    <ParallaxContainer speed="medium" direction="up">
                        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Advanced Parallax
                        </h1>
                    </ParallaxContainer>

                    <ParallaxContainer speed="fast" direction="up" scale>
                        <p className="text-2xl text-gray-300 max-w-3xl">
                            Professional parallax effects made simple
                        </p>
                    </ParallaxContainer>
                </div>
            </div>

            {/* Staggered Section */}
            <div className="container mx-auto px-6 py-32">
                <ParallaxTrigger
                    triggerAnimation="slideUp"
                    parallaxSpeed={0.3}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-bold mb-6">
                        Staggered Parallax Effects
                    </h2>
                    <p className="text-xl text-gray-300">
                        Different speeds create depth and dimension
                    </p>
                </ParallaxTrigger>

                <ParallaxStagger
                    staggerDelay={0.15}
                    baseSpeed={0.2}
                    direction="up"
                    className="grid md:grid-cols-3 gap-8 mb-32"
                >
                    <div className="bg-slate-800/50 backdrop-blur p-8 rounded-xl border border-slate-700">
                        <div className="text-3xl mb-4">🚀</div>
                        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                            Fast Layer
                        </h3>
                        <p className="text-gray-300">
                            This moves faster creating a floating effect
                        </p>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur p-8 rounded-xl border border-slate-700">
                        <div className="text-3xl mb-4">⚡</div>
                        <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                            Medium Layer
                        </h3>
                        <p className="text-gray-300">
                            Balanced movement for smooth transitions
                        </p>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur p-8 rounded-xl border border-slate-700">
                        <div className="text-3xl mb-4">🌊</div>
                        <h3 className="text-2xl font-semibold mb-4 text-pink-400">
                            Slow Layer
                        </h3>
                        <p className="text-gray-300">
                            Subtle movement adds depth without distraction
                        </p>
                    </div>
                </ParallaxStagger>

                {/* Advanced Effects */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                    <ParallaxTrigger
                        triggerAnimation="scale"
                        parallaxSpeed={0.4}
                        direction="right"
                    >
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-green-400">
                                Advanced Effects
                            </h2>
                            <div className="space-y-4 text-gray-300">
                                <p>• Scale animations during scroll</p>
                                <p>• Rotation effects</p>
                                <p>• Opacity transitions</p>
                                <p>• Blur animations</p>
                                <p>• Spring physics</p>
                                <p>• Custom offset ranges</p>
                            </div>
                        </div>
                    </ParallaxTrigger>

                    <ParallaxContainer speed="medium" direction="left" scale rotate>
                        <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur p-12 rounded-2xl border border-green-500/30">
                            <div className="text-6xl text-center mb-6">🎨</div>
                            <h3 className="text-2xl font-semibold text-center text-green-400">
                                Multi-Effect Parallax
                            </h3>
                            <p className="text-center text-gray-300 mt-4">
                                Scale + Rotate + Parallax combined
                            </p>
                        </div>
                    </ParallaxContainer>
                </div>

                {/* Directional Parallax */}
                <ParallaxTrigger
                    triggerAnimation="fadeIn"
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-6">Directional Movement</h2>
                    <p className="text-xl text-gray-300">
                        Elements can move in any direction
                    </p>
                </ParallaxTrigger>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                    <ParallaxContainer
                        speed="medium"
                        direction="up"
                        className="text-center"
                    >
                        <div className="bg-blue-500/20 p-8 rounded-xl border border-blue-500/30">
                            <div className="text-4xl mb-4">↑</div>
                            <div className="text-blue-400 font-semibold">Up Movement</div>
                        </div>
                    </ParallaxContainer>

                    <ParallaxContainer
                        speed="medium"
                        direction="down"
                        className="text-center"
                    >
                        <div className="bg-green-500/20 p-8 rounded-xl border border-green-500/30">
                            <div className="text-4xl mb-4">↓</div>
                            <div className="text-green-400 font-semibold">Down Movement</div>
                        </div>
                    </ParallaxContainer>

                    <ParallaxContainer
                        speed="medium"
                        direction="left"
                        className="text-center"
                    >
                        <div className="bg-purple-500/20 p-8 rounded-xl border border-purple-500/30">
                            <div className="text-4xl mb-4">←</div>
                            <div className="text-purple-400 font-semibold">Left Movement</div>
                        </div>
                    </ParallaxContainer>

                    <ParallaxContainer
                        speed="medium"
                        direction="right"
                        className="text-center"
                    >
                        <div className="bg-pink-500/20 p-8 rounded-xl border border-pink-500/30">
                            <div className="text-4xl mb-4">→</div>
                            <div className="text-pink-400 font-semibold">Right Movement</div>
                        </div>
                    </ParallaxContainer>
                </div>

                {/* Complex Scene */}
                <div className="relative h-96 mb-32 overflow-hidden rounded-2xl">
                    <ParallaxContainer
                        speed="slow"
                        direction="down"
                        opacity
                        className="absolute inset-0"
                    >
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-blue-600/30" />
                    </ParallaxContainer>

                    <ParallaxContainer
                        speed="medium"
                        direction="up"
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <div className="text-8xl mb-6">🌟</div>
                            <h3 className="text-3xl font-bold text-white">
                                Layered Parallax
                            </h3>
                        </div>
                    </ParallaxContainer>

                    <ParallaxContainer
                        speed="fast"
                        direction="right"
                        className="absolute bottom-0 left-0 w-full"
                    >
                        <div className="h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    </ParallaxContainer>
                </div>

                {/* Final Section */}
                <ParallaxTrigger
                    triggerAnimation="custom"
                    customAnimation={{
                        initial: { opacity: 0, y: 100, scale: 0.8, rotate: -5 },
                        animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
                        exit: { opacity: 0, y: -100, scale: 0.9, rotate: 5 },
                    }}
                    parallaxSpeed={0.6}
                    className="text-center pb-32"
                >
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-8">
                        Ready to Parallax!
                    </h2>
                    <p className="text-2xl text-gray-300">
                        Professional parallax effects with simple, powerful components
                    </p>
                </ParallaxTrigger>
            </div>
        </div>
    );
};

export default ParallaxDemo;
