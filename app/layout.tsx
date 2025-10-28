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

export const metadata: Metadata = {
  metadataBase: new URL("https://nrc-tic.vercel.app"),
  title: {
    default: "Nine Rivers Capital | Private-Equity Rigor in Public Markets",
    template: "%s | Nine Rivers Capital",
  },
  description:
    "Nine Rivers Capital (NRC) is a boutique investment management firm offering SEBI-registered Portfolio Management Services (PMS) and Alternative Investment Funds (AIFs) for HNIs and Family Offices. We apply private-equity rigor to public markets to create long-term value through disciplined, research-driven investing.",
  keywords: [
    "Nine Rivers Capital",
    "NRC TIC",
    "Portfolio Management Services",
    "Alternative Investment Funds",
    "Aurum Small Cap Opportunities",
    "Aurum Multiplier Fund",
    "Wealth Management",
    "Private Equity Approach",
    "HNIs Investment",
    "Family Office Investments",
    "Value Investing India",
    "Long-term investing",
    "Research-based investing",
  ],
  authors: [{ name: "Nine Rivers Capital" }],
  creator: "Nine Rivers Capital",
  publisher: "Nine Rivers Capital Holdings Pvt. Ltd.",
  openGraph: {
    type: "website",
    url: "https://nrc-tic.vercel.app",
    title: "Nine Rivers Capital | Private-Equity Rigor in Public Markets",
    description:
      "Nine Rivers Capital offers SEBI-registered PMS and AIF investment strategies, combining deep research and conviction-driven investing for HNIs and Family Offices.",
    siteName: "Nine Rivers Capital",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Nine Rivers Capital – Private-Equity Approach to Public Markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nine Rivers Capital | Investing for Long-Term Value Creation",
    description:
      "A boutique partner in wealth creation. NRC brings private-equity-style diligence and conviction-driven investing to public markets.",
    images: ["/og-image.jpg"],
    creator: "@NineRiversCap", 
  },
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
  // icons: {
  //   icon: [
  //     { url: "/NRC_Logo_light.ico", media: "(prefers-color-scheme: light)" },
  //     { url: "/NRC_Logo_dark.ico", media: "(prefers-color-scheme: dark)" },
  //   ],
  //   apple: [
  //     { url: "/NRC_Logo_light.ico", media: "(prefers-color-scheme: light)" },
  //     { url: "/NRC_Logo_dark.ico", media: "(prefers-color-scheme: dark)" },
  //   ],
  // },
  alternates: {
    canonical: "https://nrc-tic.vercel.app",
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
