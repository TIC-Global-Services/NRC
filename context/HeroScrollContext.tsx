"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface HeroScrollContextType {
    isHeroScrolled: boolean;
    setHeroScrolled: (scrolled: boolean) => void;
    isHeroContentRevealed: boolean;
    setHeroContentRevealed: (revealed: boolean) => void;
}

const HeroScrollContext = createContext<HeroScrollContextType | undefined>(undefined);

export const HeroScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isHeroScrolled, setIsHeroScrolled] = useState(false);
    const [isHeroContentRevealed, setIsHeroContentRevealed] = useState(false);

    const setHeroScrolled = useCallback((scrolled: boolean) => {
        setIsHeroScrolled(scrolled);
    }, []);

    const setHeroContentRevealed = useCallback((revealed: boolean) => {
        setIsHeroContentRevealed(revealed);
    }, []);

    return (
        <HeroScrollContext.Provider value={{
            isHeroScrolled,
            setHeroScrolled,
            isHeroContentRevealed,
            setHeroContentRevealed
        }}>
            {children}
        </HeroScrollContext.Provider>
    );
};

export const useHeroScroll = () => {
    const context = useContext(HeroScrollContext);
    if (context === undefined) {
        throw new Error('useHeroScroll must be used within a HeroScrollProvider');
    }
    return context;
};