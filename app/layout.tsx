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

// Local Fonts - SF Pro
const sfPro = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Display-Semibold.otf",
      weight: "600",
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

// ✅ Metadata with dark/light mode icons
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
        className={`${sfPro.variable} ${centuryGothic.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black transition-colors`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
