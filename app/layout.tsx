// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/Layouts/SiteLayout";
import localFont from "next/font/local";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Local Fonts - SF Pro with WOFF2 fallback for iOS
const sfPro = localFont({
  src: [
    // Light - WOFF2 first (iOS compatible), then OTF fallback
    {
      path: "../public/fonts/SF-Pro-Display-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    // Regular - WOFF2 first (iOS compatible), then OTF fallback
    {
      path: "../public/fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    // Semibold - WOFF2 first (iOS compatible), then OTF fallback
    {
      path: "../public/fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    // Bold - WOFF2 first (iOS compatible), then OTF fallback
    {
      path: "../public/fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
});

// Local Font - Century Gothic
export const centuryGothic = localFont({
  src: [
    {
      path: "../public/fonts/century-gothic.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

// Metadata with dark/light mode icons
export const metadata: Metadata = {
  title: "NRC",
  description: "NRC",
  icons: {
    icon: [
      { url: "/NRC_Logo_light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/NRC_Logo_dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/NRC_Logo_light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/NRC_Logo_dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sfPro.variable} ${centuryGothic.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-[#F6F9FC] dark:bg-[#F6F9FC] transition-colors`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
