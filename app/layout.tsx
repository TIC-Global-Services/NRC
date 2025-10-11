// layout.tsx - Fixed version
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/Layouts/SiteLayout";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sfPro = localFont({
  src: [
    {
      path: '../public/fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

// Century Gothic - Fixed path and configuration
export const centuryGothic = localFont({
  src: [
    {
      path: "../public/fonts/century-gothic.ttf", // Make sure this file exists
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
  fallback: ['Arial', 'sans-serif'], // Add fallback fonts
});

export const metadata: Metadata = {
  title: "NRC",
  description: "NRC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  
  return (
    <html lang="en">
      <body
        className={`${sfPro.variable} ${centuryGothic.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}