import React, { useEffect, useRef, useState } from 'react';

// TypeScript Interfaces
interface ProcessStep {
    topText?: string;
    bottomText?: string;
}

interface MobileScrollProgressProps {
    title?: string;
    steps: ProcessStep[];
}

const MobileScrollProgress: React.FC<MobileScrollProgressProps> = ({
    title = "Investment Process",
    steps
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const [currentProgress, setCurrentProgress] = useState(0);
    const scrollTriggerRef = useRef<any>(null);

    useEffect(() => {
        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initAnimation = async () => {
            try {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');

                const gsap = (window as any).gsap;
                const ScrollTrigger = (window as any).ScrollTrigger;

                if (!gsap || !ScrollTrigger) return;

                gsap.registerPlugin(ScrollTrigger);

                const wrapper = wrapperRef.current;
                const sections = sectionsRef.current;
                const progressLine = progressLineRef.current;

                if (!wrapper || !sections || !progressLine) return;

                const getTotalWidth = () => sections.scrollWidth;

                // Kill any existing ScrollTrigger for this component
                if (scrollTriggerRef.current) {
                    scrollTriggerRef.current.kill();
                }

                // Create the ScrollTrigger and store the reference
                const tl = gsap.to(sections, {
                    x: () => -(getTotalWidth() - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper,
                        pin: true,
                        start: "top top",
                        end: () => "+=" + (getTotalWidth() - window.innerWidth),
                        scrub: 1,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        onUpdate: (self: any) => {
                            progressLine.style.width = `${self.progress * 100}%`;
                            setCurrentProgress(self.progress);
                        }
                    }
                });

                // Store the ScrollTrigger instance
                scrollTriggerRef.current = tl.scrollTrigger;

            } catch (error) {
                console.error('Failed to load GSAP:', error);
            }
        };

        initAnimation();

        return () => {
            // Clean up only this component's ScrollTrigger
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
        };
    }, [steps]);

    return (
        <div
            ref={wrapperRef}
            className="relative w-full bg-white overflow-hidden"
            style={{ height: '60vh' }}
        >
            {/* Fixed Title */}
            <div className="absolute top-20 lg:top-36 left-8 md:left-14 z-20">
                <h1 className="text-2xl lg:text-4xl leading-9 font-normal">{title}</h1>
            </div>

            <div
                ref={sectionsRef}
                className="flex items-center will-change-transform"
                style={{ height: '60vh' }}
            >
                {/* Progress Line Section */}
                <section
                    className="flex-shrink-0 flex flex-col justify-center px-6"
                    style={{ width: `${steps.length * 50}vw`, height: '60vh' }}
                >
                    <div className="w-full relative">
                        {/* Gray Background Line */}
                        <div className="relative h-1.5 w-full bg-gray-300 rounded-full">
                            {/* Purple Progress Line */}
                            <div
                                ref={progressLineRef}
                                className="absolute top-0 left-0 h-1.5 bg-[#6366F1] rounded-full transition-all duration-100"
                                style={{ width: '0%' }}
                            />
                        </div>

                        {/* Steps */}
                        <div
                            className="absolute top-[3px] w-full left-0 right-0 flex justify-between"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            {steps.map((step, index) => {
                                const stepProgress = steps.length === 1 ? 0 : index / (steps.length - 1);
                                const isProgressed = currentProgress * 100 >= stepProgress * 100;

                                return (
                                    <div key={index} className="relative flex flex-col items-center">
                                        {/* Top Text */}
                                        {step.topText && (
                                            <div className="absolute bottom-full mb-2 left-0 text-left w-[120px]">
                                                <p className="text-xs text-gray-700 leading-tight">
                                                    {step.topText}
                                                </p>
                                            </div>
                                        )}

                                        {/* Dot SVG - Smaller for mobile */}
                                        <div className="relative z-10">
                                            {isProgressed ? (
                                                <svg width="32" height="32" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <ellipse cx="22.6338" cy="22.823" rx="21.8711" ry="21.8738" fill="#B8B5FF" fillOpacity="0.5" />
                                                    <ellipse cx="22.6343" cy="22.8238" rx="8.32867" ry="8.32969" fill="#6A48E8" />
                                                </svg>
                                            ) : (
                                                <svg width="32" height="32" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <ellipse cx="22.5" cy="22.5" rx="21.8711" ry="21.8738" fill="#484848" fillOpacity="0.2" />
                                                    <ellipse cx="22.5" cy="22.5" rx="8.33" ry="8.33102" fill="#B4B0B0" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Bottom Text */}
                                        {step.bottomText && (
                                            <div className="absolute top-full mt-2 left-3 text-left w-[120px]">
                                                <p className="text-xs text-gray-700 leading-tight">
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

export default MobileScrollProgress;