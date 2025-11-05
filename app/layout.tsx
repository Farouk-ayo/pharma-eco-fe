import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./layout.client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title:
    "PharmaEco | AI-Powered Pharmaceutical Waste & Packaging Management in Nigeria",
  description:
    "PharmaEco is an AI-driven social enterprise addressing pharmaceutical waste and packaging management in Nigeria. We combine technology, innovation, and sustainability to ensure safe, efficient, and eco-friendly disposal of medicines and packaging materials.",
  keywords: [
    "PharmaEco",
    "AI pharmaceutical waste management",
    "pharmaceutical waste disposal Nigeria",
    "eco-friendly drug disposal",
    "AI-powered waste tracking",
    "pharmaceutical recycling Nigeria",
    "green health technology",
    "sustainable waste management",
    "expired drug disposal",
    "medicine recycling",
    "pharmacy waste solutions",
    "clean water and sanitation Nigeria",
    "circular economy healthcare",
    "PharmaEcoBot",
    "waste education and awareness",
    "NAFDAC waste initiative",
    "healthcare waste compliance",
    "public health and environment",
    "environmentally responsible pharmacy",
    "AI waste assistant",
  ],

  openGraph: {
    title:
      "PharmaEco | AI-Powered Pharmaceutical Waste & Packaging Management in Nigeria",
    description:
      "PharmaEco is an AI-powered social enterprise pioneering safe, sustainable, and technology-driven pharmaceutical waste and packaging management across Nigeria.",
    url: "https://www.pharmaeco.org",
    type: "website",
    images: [
      {
        url: "https://www.pharmaeco.org/og-image.webp",
        alt: "PharmaEco - AI-Powered Pharmaceutical Waste & Packaging Management",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PharmaEco | AI-Powered Pharmaceutical Waste & Packaging Management in Nigeria",
    description:
      "PharmaEco integrates AI, innovation, and sustainability to make pharmaceutical waste management smarter, safer, and greener.",
    images: ["https://www.pharmaeco.org/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSansPro.className}>
      <body className="antialiased">
        <RootClientLayout>{children}</RootClientLayout>
        <GoogleAnalytics gaId="G-3XEL136MDR" />
        <Analytics />
      </body>
    </html>
  );
}
