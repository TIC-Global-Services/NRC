'use client'

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Reusable/NavBar';
// import ScrollController from '@/lib/controller/ScrollController';
import Footer from '../Reusable/Footer';
import MobileNavbar from '../Reusable/MobileNavbar';
import { HeroScrollProvider } from '@/context/HeroScrollContext';

interface SiteLayoutProps {
    children: ReactNode;
}

// In SiteLayout
const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '/home';

    return (
        <div>
            <HeroScrollProvider>
                <div className="min-h-screen flex flex-col">
                    <Navbar visibility isHomePage={isHomePage} />
                    <MobileNavbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </HeroScrollProvider>
        </div>
    );
}

export default SiteLayout;