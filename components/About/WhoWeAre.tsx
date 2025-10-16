'use client'

import { Whoweare, WhoweareWider } from '@/assets/About'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Container from '../Reusable/Container'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WhoWeAre = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mm = gsap.matchMedia()

        mm.add("(min-width: 768px)", () => {
            if (sectionRef.current && contentRef.current && imageRef.current) {

                // Wait for images to load and DOM to be ready
                const initScrollTrigger = () => {
                    const imageHeight = imageRef.current!.offsetHeight
                    const contentHeight = contentRef.current!.offsetHeight
                    const scrollDistance = imageHeight - contentHeight

                    // Only pin if image is taller than content
                    if (scrollDistance > 0) {
                        ScrollTrigger.create({
                            trigger: sectionRef.current,
                            start: "top top",
                            end: `+=${scrollDistance}`,
                            pin: contentRef.current,
                            pinSpacing: false,
                            scrub: 0.1, // Smooth scrubbing prevents jarring
                            anticipatePin: 1,
                            fastScrollEnd: 3000,
                            preventOverlaps: true,
                            invalidateOnRefresh: true,
                            onRefresh: (self) => {
                                // Recalculate on refresh
                                const newImageHeight = imageRef.current!.offsetHeight
                                const newContentHeight = contentRef.current!.offsetHeight
                                const newScrollDistance = newImageHeight - newContentHeight
                                if (newScrollDistance > 0) {
                                    self.vars.end = `+=${newScrollDistance}`
                                }
                            }
                        })
                    }
                }

                // Initialize after a small delay to ensure layout is calculated
                const timeoutId = setTimeout(() => {
                    initScrollTrigger()
                    ScrollTrigger.refresh()
                }, 100)

                // Handle resize with debounce
                let resizeTimeout: NodeJS.Timeout
                const handleResize = () => {
                    clearTimeout(resizeTimeout)
                    resizeTimeout = setTimeout(() => {
                        ScrollTrigger.refresh()
                    }, 250)
                }

                window.addEventListener('resize', handleResize)

                return () => {
                    clearTimeout(timeoutId)
                    window.removeEventListener('resize', handleResize)
                }
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
            mm.revert()
        }
    }, [])

    return (
        <Container disableYSpacing className="md:pt-24 md:pb-32 pt-11 pb-40">
            <div
                ref={sectionRef}
                className="lg:grid lg:grid-cols-[40%_55%] flex flex-col-reverse items-start gap-x-10"
            >
                {/* Mobile Image */}
                <Image
                    src={WhoweareWider}
                    alt="WhoweareImg"
                    className="lg:hidden block h-[384px] md:h-[50%] w-full rounded-xl"
                    width={532}
                    height={384}
                />

                {/* Desktop Image */}
                <div ref={imageRef} className="lg:block hidden">
                    <Image
                        src={Whoweare}
                        alt="WhoweareImg"
                        className=" rounded-xl"
                        width={532}
                        height={610}
                        priority
                    />
                </div>

                {/* Content - Sticky on Desktop */}
                <div className="mb-3 lg:mb-0 lg:h-auto">
                    <div
                        ref={contentRef}
                        className="will-change-transform transform-gpu"
                        style={{ transform: "translate3d(0, 0, 0)" }}
                    >
                        <h1 className="lg:text-[44px] md:text-5xl text-[26px] leading-8 lg:leading-14 font-normal mb-4">
                            Who <span className="text-primary">we are</span>
                        </h1>
                        <p className="lg:text-[20px] md:text-lg text-base leading-7 lg:leading-8 text-secondary font-normal">
                            Nine Rivers Capital is an independent asset management and
                            corporate advisory group that helps high-net-worth individuals
                            and family offices build, preserve and grow wealth through
                            bespoke PMS and AIF strategies and strategic corporate advisory.
                            We combine long-term, research-driven investing with active
                            stewardship to identify asymmetric, mid-market and growth
                            opportunities across sectors.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default WhoWeAre