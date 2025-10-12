'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface LogoScrollProps {
    logos: any[]
}

export default function LogoScroll({ logos }: LogoScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let animationId: number
        let scrollPos = 0

        const scroll = () => {
            scrollPos += 0.5 // Adjust speed here (lower = slower)

            if (scrollPos >= scrollContainer.scrollWidth / 2) {
                scrollPos = 0
            }

            scrollContainer.scrollLeft = scrollPos
            animationId = requestAnimationFrame(scroll)
        }

        // Only auto-scroll on mobile
        const isMobile = window.innerWidth < 768
        if (isMobile) {
            animationId = requestAnimationFrame(scroll)
        }

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [])

    return (
        <div className="my-12 mb-20">
            {/* Desktop: Static logos */}
            <div className="hidden lg:flex flex-row items-center justify-between">
                {logos.map((logo, index) => (
                    <div key={index}>
                        <Image src={logo} alt={`Logo-${index}`} width={100} height={100} />
                    </div>
                ))}
            </div>

            {/* Mobile: Scrolling logos */}
            <div
                ref={scrollRef}
                className="lg:hidden flex overflow-x-hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
                {/* Duplicate logos for infinite scroll effect */}
                <div className="flex flex-row items-center gap-8 animate-scroll">
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                            <Image src={logo} alt={`Logo-${index}`} width={80} height={80} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}