import React, { useEffect, useRef, useState } from 'react';

interface ProcessStep {
    topText?: string;
    bottomText?: string;
}

interface HorizontalScrollProgressProps {
    title?: string;
    steps: ProcessStep[];
}

const HorizontalScrollProgress: React.FC<HorizontalScrollProgressProps> = ({
    title = "Investment Process",
    steps
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const [currentProgress, setCurrentProgress] = useState(0);
    const animationRef = useRef<any>(null);
    const triggerRef = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;

        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                const existing = document.querySelector(`script[src="${src}"]`);
                if (existing) {
                    // Check if already loaded
                    if (existing.getAttribute('data-loaded') === 'true') {
                        resolve();
                        return;
                    }
                    existing.addEventListener('load', () => {
                        existing.setAttribute('data-loaded', 'true');
                        resolve();
                    });
                    return;
                }

                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => {
                    script.setAttribute('data-loaded', 'true');
                    resolve();
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const waitForGSAP = (): Promise<void> => {
            return new Promise((resolve) => {
                const checkGSAP = () => {
                    if ((window as any).gsap && (window as any).ScrollTrigger) {
                        resolve();
                    } else {
                        setTimeout(checkGSAP, 50);
                    }
                };
                checkGSAP();
            });
        };

        const initAnimation = async () => {
            try {
                // Load scripts in sequence
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');

                // Wait for GSAP to be available
                await waitForGSAP();

                if (!isMounted) return;

                const gsap = (window as any).gsap;
                const ScrollTrigger = (window as any).ScrollTrigger;

                gsap.registerPlugin(ScrollTrigger);

                const wrapper = wrapperRef.current;
                const sections = sectionsRef.current;
                const progressLine = progressLineRef.current;

                if (!wrapper || !sections || !progressLine) return;

                // Kill any existing animations on these elements
                gsap.killTweensOf(sections);
                if (triggerRef.current) {
                    triggerRef.current.kill();
                }

                // Calculate the scroll distance
                const getScrollAmount = () => {
                    return sections.scrollWidth - window.innerWidth;
                };

                // Create the animation with ScrollTrigger
                animationRef.current = gsap.to(sections, {
                    x: () => -getScrollAmount(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper,
                        pin: true,
                        start: "top top",
                        end: () => `+=${getScrollAmount()}`,
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        onUpdate: (self: any) => {
                            if (!isMounted) return;
                            const progress = self.progress;
                            if (progressLine) {
                                gsap.set(progressLine, { width: `${progress * 100}%` });
                            }
                            setCurrentProgress(progress);
                        }
                    }
                });

                // Store the trigger reference
                triggerRef.current = animationRef.current.scrollTrigger;

            } catch (error) {
                console.error('Failed to initialize GSAP animation:', error);
            }
        };

        initAnimation();

        return () => {
            isMounted = false;

            // Clean up only this component's animations
            if (animationRef.current) {
                animationRef.current.kill();
            }
            if (triggerRef.current) {
                triggerRef.current.kill();
            }
        };
    }, [steps.length]); // Re-run if number of steps changes

    const getStepProgress = (index: number): boolean => {
        if (steps.length <= 1) return currentProgress > 0;

        // Calculate the progress threshold for this step
        const stepThreshold = index / (steps.length - 1);

        // Add small buffer to ensure smooth transitions
        return currentProgress >= stepThreshold - 0.01;
    };

    return (
        <div
            ref={wrapperRef}
            className="relative w-full h-screen overflow-hidden bg-white"
        >
            {/* Fixed Title */}
            <div className="absolute top-20 md:top-36 left-8 md:left-14 z-20">
                <h1 className="text-2xl md:text-4xl leading-9 font-normal">{title}</h1>
            </div>

            <div
                ref={sectionsRef}
                className="flex h-full items-center mt-8"
            >
                {/* Progress Line Section */}
                <section
                    className="h-screen flex-shrink-0 flex flex-col justify-center px-8 md:px-14"
                    style={{ width: `${steps.length * 50}vw` }}
                >
                    <div className="w-full relative">
                        {/* Gray Background Line with rounded ends */}
                        <div className="relative h-2 w-full bg-gray-300 rounded-full">
                            {/* Purple Progress Line with rounded ends */}
                            <div
                                ref={progressLineRef}
                                className="absolute top-0 left-0 h-2 bg-indigo-500 rounded-full"
                                style={{ width: '0%' }}
                            />
                        </div>

                        {/* Steps */}
                        <div
                            className="absolute top-0 w-full left-0 right-0 flex justify-between"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            {steps.map((step, index) => {
                                const isProgressed = getStepProgress(index);

                                return (
                                    <div key={index} className="relative flex flex-col items-center">
                                        {/* Top Text */}
                                        {step.topText && (
                                            <div className="absolute bottom-full mb-6 md:mb-8 left-0 text-left w-32 md:w-72">
                                                <p className="text-xs md:text-base text-gray-700 leading-4 md:leading-7">
                                                    {step.topText}
                                                </p>
                                            </div>
                                        )}

                                        {/* Dot SVG */}
                                        <div className="relative z-10 mt-2">
                                            {isProgressed ? (
                                                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <ellipse cx="22.5" cy="22.5" rx="21.8711" ry="21.8738" fill="#B8B5FF" fillOpacity="0.5" />
                                                    <ellipse cx="22.5" cy="22.5" rx="8.32867" ry="8.32969" fill="#6366F1" />
                                                </svg>
                                            ) : (
                                                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <ellipse cx="22.5" cy="22.5" rx="21.8711" ry="21.8738" fill="#484848" fillOpacity="0.2" />
                                                    <ellipse cx="22.5" cy="22.5" rx="8.33" ry="8.33102" fill="#B4B0B0" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Bottom Text */}
                                        {step.bottomText && (
                                            <div className="absolute top-full mt-6 md:mt-8 left-4 text-left w-32 md:w-72">
                                                <p className="text-xs md:text-base text-gray-700 leading-4 md:leading-7">
                                                    {step.bottomText}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HorizontalScrollProgress;